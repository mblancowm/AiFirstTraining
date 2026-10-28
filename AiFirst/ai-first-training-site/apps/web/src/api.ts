import type { GroupMember, LearningGroup, ProjectKey, TeamRole } from "@wm-ai-first/contracts";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `La solicitud no se completó (${response.status}).`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const trainingApi = {
  listGroups: () => request<LearningGroup[]>("/api/groups"),
  createGroup: (name: string) => request<LearningGroup>("/api/groups", { method: "POST", body: JSON.stringify({ name }) }),
  chooseProject: (groupId: string, projectKey: ProjectKey) =>
    request<LearningGroup>(`/api/groups/${groupId}/project`, { method: "PATCH", body: JSON.stringify({ projectKey }) }),
  addMember: (groupId: string, email: string, role: TeamRole) =>
    request<GroupMember>(`/api/groups/${groupId}/members`, { method: "POST", body: JSON.stringify({ email, role }) }),
  removeMember: (groupId: string, memberId: string) =>
    request<void>(`/api/groups/${groupId}/members/${memberId}`, { method: "DELETE" }),
};
