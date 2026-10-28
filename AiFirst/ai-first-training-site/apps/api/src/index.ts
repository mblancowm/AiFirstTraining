import { addMemberSchema, createGroupSchema, selectProjectSchema } from "@wm-ai-first/contracts";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { connectDatabase } from "./db/database";
import { groupMembers, groups } from "./db/schema";

const { db, tables } = await connectDatabase();
const { groups, groupMembers } = tables;
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:8080")
  .split(",")
  .map((origin) => origin.trim());
const app = new Hono();

app.use("/api/*", cors({ origin: (origin) => (allowedOrigins.includes(origin) ? origin : "") }));
app.get("/api/healthz", (context) => context.json({ status: "ok" }));

app.get("/api/groups", async (context) => {
  const groupRows = await db.select().from(groups).orderBy(asc(groups.createdAt));
  const members = await db.select().from(groupMembers).orderBy(asc(groupMembers.createdAt));
  return context.json(
    groupRows.map((group: typeof groups.$inferSelect) => ({
      ...group,
      projectKey: group.projectKey ?? null,
      members: members.filter((member: typeof groupMembers.$inferSelect) => member.groupId === group.id),
    })),
  );
});

app.post("/api/groups", zValidator("json", createGroupSchema), async (context) => {
  const { name } = context.req.valid("json");
  const group = { id: crypto.randomUUID(), name, projectKey: null, createdAt: new Date().toISOString() };
  await db.insert(groups).values(group);
  return context.json({ ...group, members: [] }, 201);
});

app.patch("/api/groups/:groupId/project", zValidator("json", selectProjectSchema), async (context) => {
  const groupId = context.req.param("groupId");
  const { projectKey } = context.req.valid("json");
  const [group] = await db.update(groups).set({ projectKey }).where(eq(groups.id, groupId)).returning();
  if (!group) return context.json({ error: "No encontramos ese grupo." }, 404);
  return context.json({ ...group, members: [] });
});

app.post("/api/groups/:groupId/members", zValidator("json", addMemberSchema), async (context) => {
  const groupId = context.req.param("groupId");
  const { email, role } = context.req.valid("json");
  const [group] = await db.select({ id: groups.id }).from(groups).where(eq(groups.id, groupId)).limit(1);
  if (!group) return context.json({ error: "No encontramos ese grupo." }, 404);

  const [existing] = await db
    .select({ id: groupMembers.id })
    .from(groupMembers)
    .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.email, email)))
    .limit(1);
  if (existing) return context.json({ error: "Ese correo ya está en el grupo." }, 409);

  const member = { id: crypto.randomUUID(), groupId, email, role, createdAt: new Date().toISOString() };
  await db.insert(groupMembers).values(member);
  return context.json(member, 201);
});

app.delete("/api/groups/:groupId/members/:memberId", async (context) => {
  const { groupId, memberId } = context.req.param();
  const [removed] = await db
    .delete(groupMembers)
    .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.id, memberId)))
    .returning({ id: groupMembers.id });
  if (!removed) return context.json({ error: "No encontramos a esa persona en el grupo." }, 404);
  return context.body(null, 204);
});

app.notFound((context) => context.json({ error: "Ruta no encontrada." }, 404));
app.onError((error, context) => {
  console.error("API request failed:", error.message);
  return context.json({ error: "Ocurrió un problema. Intenta de nuevo." }, 500);
});

const port = Number(process.env.PORT ?? 3001);
console.log(`AI-first training API listening on ${port}`);
export default { port, hostname: "0.0.0.0", fetch: app.fetch };
