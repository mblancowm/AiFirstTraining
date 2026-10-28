import { index as pgIndex, pgTable, text as pgText, uniqueIndex as pgUniqueIndex } from "drizzle-orm/pg-core";
import { index as sqliteIndex, sqliteTable, text as sqliteText, uniqueIndex as sqliteUniqueIndex } from "drizzle-orm/sqlite-core";

const sqliteGroups = sqliteTable("learning_groups", {
  id: sqliteText("id").primaryKey(),
  name: sqliteText("name").notNull(),
  projectKey: sqliteText("project_key"),
  createdAt: sqliteText("created_at").notNull(),
});

const sqliteGroupMembers = sqliteTable(
  "group_members",
  {
    id: sqliteText("id").primaryKey(),
    groupId: sqliteText("group_id").notNull().references(() => sqliteGroups.id, { onDelete: "cascade" }),
    email: sqliteText("email").notNull(),
    role: sqliteText("role").notNull(),
    createdAt: sqliteText("created_at").notNull(),
  },
  (table) => ({
    groupIndex: sqliteIndex("group_members_group_idx").on(table.groupId),
    uniqueEmailInGroup: sqliteUniqueIndex("group_members_email_per_group_idx").on(table.groupId, table.email),
  }),
);

const postgresGroups = pgTable("learning_groups", {
  id: pgText("id").primaryKey(),
  name: pgText("name").notNull(),
  projectKey: pgText("project_key"),
  createdAt: pgText("created_at").notNull(),
});

const postgresGroupMembers = pgTable(
  "group_members",
  {
    id: pgText("id").primaryKey(),
    groupId: pgText("group_id").notNull().references(() => postgresGroups.id, { onDelete: "cascade" }),
    email: pgText("email").notNull(),
    role: pgText("role").notNull(),
    createdAt: pgText("created_at").notNull(),
  },
  (table) => ({
    groupIndex: pgIndex("group_members_group_idx").on(table.groupId),
    uniqueEmailInGroup: pgUniqueIndex("group_members_email_per_group_idx").on(table.groupId, table.email),
  }),
);

export const sqliteTables = { groups: sqliteGroups, groupMembers: sqliteGroupMembers };
export const postgresTables = { groups: postgresGroups, groupMembers: postgresGroupMembers };
