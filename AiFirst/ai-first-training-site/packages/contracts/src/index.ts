import { z } from "zod";

export const projectKeySchema = z.enum(["appointments", "knowledge", "support"]);
export const roleSchema = z.enum(["backend", "data", "frontend", "qa"]);

export const createGroupSchema = z.object({
  name: z.string().trim().min(2, "Usa al menos 2 caracteres.").max(60, "Máximo 60 caracteres."),
});

export const selectProjectSchema = z.object({ projectKey: projectKeySchema });

export const addMemberSchema = z.object({
  email: z.string().trim().email("Escribe un correo válido.").max(254).transform((value) => value.toLowerCase()),
  role: roleSchema,
});

export type ProjectKey = z.infer<typeof projectKeySchema>;
export type TeamRole = z.infer<typeof roleSchema>;
export type GroupMember = {
  id: string;
  groupId: string;
  email: string;
  role: TeamRole;
  createdAt: string;
};
export type LearningGroup = {
  id: string;
  name: string;
  projectKey: ProjectKey | null;
  createdAt: string;
  members: GroupMember[];
};
