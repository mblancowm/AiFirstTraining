import type { ProjectKey } from "@wm-ai-first/contracts";
import { learningTracks, operationalPrompts, projects, roles } from "./content";
import { makeRoleExample, weeklyRoleGuides, weeklyTeamPractices } from "./weeklyGuides";
import { getSpecialistWeeklyGuide, makeSpecialistRoleExample } from "./specialistGuides";
import { integrationPlaybook } from "./architecture";
import { documentationSchedule, markdownFileGuide, repoTree } from "./repositoryGuide";

export function makeProjectKit(projectKey: ProjectKey) {
  const project = projects[projectKey];
  const projectRoles = project.tasks.map((task) => `- **${task.role}:** ${task.work}`).join("\n");
  const scope = project.scope.map((item) => `- ${item}`).join("\n");
  const exclusions = project.outOfScope.map((item) => `- ${item}`).join("\n");
  const criteria = project.criteria.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const integrationSteps = integrationPlaybook.map((step) => `${step.number}. **${step.title}:** ${step.action}\n   - **Dejen listo:** ${step.artifact}`).join("\n");
  const docsByTrack = documentationSchedule.map((phase) => `### ${phase.stage} · ${phase.title}\n\n**Archivos:** ${phase.files}\n\n${phase.note}`).join("\n\n");
  const docTemplates = markdownFileGuide.map((doc) => `### ${doc.path}\n\n**Momento:** ${doc.stage}\n\n**Coordina:** ${doc.coordinator}\n\n${doc.purpose}\n\n~~~markdown\n${doc.template.trim()}\n~~~`).join("\n\n---\n\n");
  const trackPlan = learningTracks.map((track) => {
    const guideTrackNumber = track.number === "03" ? "02" : track.number === "04" ? "03" : null;
    const roleWork = guideTrackNumber ? roles.map((role) => {
      const baseGuide = weeklyRoleGuides[guideTrackNumber][role.key];
      const guide = baseGuide ?? getSpecialistWeeklyGuide(guideTrackNumber, role.key)!;
      const example = baseGuide ? makeRoleExample(guideTrackNumber, role.key, projectKey) : makeSpecialistRoleExample(guideTrackNumber, role.key);
      return `### ${role.label}: ${guide.goal}\n\n**Cómo hacerlo**\n${guide.actions.map((action) => `- ${action}`).join("\n")}\n\n**Deja listo:** ${guide.deliverable}\n\n**${example.title}**\n\n\`\`\`text\n${example.body}\n\`\`\``;
    }).join("\n\n") : "";
    return `## Track ${Number(track.number)} · ${track.title}\n\n**Meta:** ${track.focus}\n\n**Práctica del equipo:** ${weeklyTeamPractices[track.number]}\n\n${roleWork ? `${roleWork}\n\n` : ""}**Evidencia para el equipo:** ${track.gate}`;
  }).join("\n\n---\n\n");
  const promptLibrary = operationalPrompts.map((prompt) => `### prompts/${prompt.file}\n\n${prompt.purpose}\n\n\`\`\`text\n${prompt.body}\n\`\`\``).join("\n\n---\n\n");
  return `# Kit de proyecto: ${project.name}

> Datos sintéticos para práctica. No cargar información real de clientes, tickets ni personas.

## 1. Brief del producto

- **Usuario:** ${project.user}
- **Flujo MVP:** ${project.flow}
- **Criterio de alcance:** una función completa y explicable en una demo breve de equipo.

## 2. Incluye

${scope}

## 3. Fuera de alcance

${exclusions}

## Arquitectura de referencia para el proyecto del equipo

~~~text
Persona usuaria
  → Web en apps/web/: Vike (vike-react) + React + TypeScript estricto + Tailwind
  → HTTP /api: TanStack Query + fetch consumen el contrato compartido
  → API: Bun + Hono; Zod valida la entrada y la respuesta
  → Datos: Drizzle ORM → SQLite local | PostgreSQL compartido en hosting

packages/contracts contiene esquemas Zod y tipos TypeScript que comparten Web y API.
Carpetas del producto que construye el equipo:
- apps/web/: Frontend, pantallas y llamadas a la API.
- apps/api/src/routes/ y services/: Backend/API, endpoints y reglas.
- apps/api/src/db/ y apps/api/drizzle/: Base de datos, esquema, migraciones y seed.
- packages/contracts/: contrato común entre Frontend y Backend; QA revisa los ejemplos.
- docs/qa/ y .github/workflows/: QA coordina criterios, evidencia y CI con aportes de todo el equipo.
La Web no se conecta directamente a la base de datos.
QA / pruebas atraviesa Web, API y datos: criterios, casos, validación del flujo, CI por PR y revisión humana.
~~~

El grupo acuerda contratos antes de dividir trabajo dependiente. IA dentro de la aplicación solo se agrega si un criterio aprobado la requiere; el asistente de desarrollo trabaja bajo AGENTS.md.

## Flujo de integración del equipo

Sigan estos pasos con una tarea pequeña del proyecto. En cada paso, una salida concreta queda disponible para el siguiente foco:

${integrationSteps}

En cada PR indiquen el criterio relacionado, los archivos cambiados, cómo se verificó el cambio y su impacto en otras áreas. Si cambia el contrato, actualicen a quien produce y a quien consume la respuesta.

## 4. Trabajo sugerido por foco

${projectRoles}

## Guía paso a paso por track y foco

Completa los tracks en orden o consulta solo el que necesite el equipo. Las guías por foco aparecen en implementación e integración; las decisiones de alcance y planes se trabajan en equipo.

${trackPlan}

## 5. Criterios de aceptación iniciales

${criteria}

## 6. Fixture sintético de partida

\`\`\`json
${project.sample}
\`\`\`

Amplíen el fixture con casos normales, vacíos y límites. Identifíquenlo como sintético.

## 7. Contrato de API de partida

Usen este ejemplo para acordar la forma del contrato durante el Track 2. Confirmen estados, errores, nombres y compatibilidad con quienes consumirán la API.

\`\`\`text
${project.contractExample}
\`\`\`

## 8. Modelo de datos inicial

\`\`\`text
${project.dataModel}
\`\`\`

## 9. Casos QA mínimos

${project.criteria.map((item) => `- [ ] ${item}`).join("\n")}
- [ ] Estado vacío y error de validación visibles y comprensibles.
- [ ] Cambios guardados sobreviven una recarga.
- [ ] Otra persona puede reproducir el flujo desde README.

## 10. Demo de equipo de 15 minutos

1. **2 min:** usuario, problema y límite del MVP.
2. **7 min:** flujo principal con datos sintéticos.
3. **3 min:** caso límite, registros y pruebas.
4. **3 min:** decisiones, handoff y siguiente paso.

## 11. Estructura sugerida del repositorio

\`\`\`text
${repoTree.trim()}
\`\`\`

## 12. Archivos por track

${docsByTrack}

## 13. Plantillas Markdown por archivo

Cada plantilla indica su responsable de coordinación y secciones mínimas. Ajusten los ejemplos al proyecto y mantengan coherencia con el contrato acordado.

${docTemplates}

## 14. Biblioteca de prompts Markdown P0–P6

Guarda cada bloque en la ruta indicada dentro de \`prompts/\`. Usa solo herramientas aprobadas y contexto sin secretos ni datos personales.

${promptLibrary}
`;
}
