import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Database } from "bun:sqlite";
import { drizzle as drizzleSqlite } from "drizzle-orm/bun-sqlite";
import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { postgresTables, sqliteTables } from "./schema";

const migrationsDirectory = fileURLToPath(new URL("../../drizzle", import.meta.url));
const migrationFiles = readdirSync(migrationsDirectory).filter((file) => file.endsWith(".sql")).sort();

function migrationSql(file: string) {
  return readFileSync(resolve(migrationsDirectory, file), "utf8");
}

async function migratePostgres(pool: Pool) {
  await pool.query("CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY NOT NULL)");
  for (const file of migrationFiles) {
    const prior = await pool.query("SELECT version FROM schema_migrations WHERE version = $1", [file]);
    if (prior.rowCount) continue;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(migrationSql(file));
      await client.query("INSERT INTO schema_migrations(version) VALUES ($1)", [file]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

function migrateSqlite(sqlite: Database) {
  sqlite.exec("CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY NOT NULL)");
  const applied = sqlite.prepare("SELECT version FROM schema_migrations WHERE version = ?");
  const record = sqlite.prepare("INSERT INTO schema_migrations(version) VALUES (?)");
  for (const file of migrationFiles) {
    if (applied.get(file)) continue;
    sqlite.transaction(() => {
      sqlite.exec(migrationSql(file));
      record.run(file);
    })();
  }
}

export async function connectDatabase(databaseUrl = process.env.DATABASE_URL ?? "file:./data/ai-first.db") {
  if (/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
    const pool = new Pool({ connectionString: databaseUrl, max: Number(process.env.DB_POOL_SIZE ?? 8) });
    await migratePostgres(pool);
    return { db: drizzlePostgres(pool, { schema: postgresTables }) as any, tables: postgresTables as any, close: () => pool.end() };
  }

  const path = databaseUrl.startsWith("file:") ? databaseUrl.slice(5) : databaseUrl;
  const filename = isAbsolute(path) ? path : resolve(process.cwd(), path);
  mkdirSync(dirname(filename), { recursive: true });
  const sqlite = new Database(filename, { create: true });
  sqlite.exec("PRAGMA foreign_keys = ON");
  migrateSqlite(sqlite);
  return { db: drizzleSqlite(sqlite, { schema: sqliteTables }) as any, tables: sqliteTables as any, close: () => sqlite.close() };
}
