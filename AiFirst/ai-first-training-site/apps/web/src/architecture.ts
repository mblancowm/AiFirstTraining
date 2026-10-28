import type { TeamRole } from "@wm-ai-first/contracts";

export const architectureByRole: Record<TeamRole, {
  technology: string;
  responsibility: string;
  connectsWith: string;
  integrationArtifact: string;
}> = {
  frontend: {
    technology: "Vike (vike-react) + React + TypeScript estricto + Tailwind CSS. Vite queda integrado por Vike; TanStack Query usa fetch nativo para la API.",
    responsibility: "Construir las pantallas y el recorrido de la persona usuaria. Mostrar carga, éxito, vacío y error; validar accesibilidad y no duplicar reglas que pertenecen a la API.",
    connectsWith: "Consume el contrato compartido y llama rutas /api del Backend. Revisa con QA que cada respuesta tenga un estado visible y una acción clara.",
    integrationArtifact: "Flujo de interfaz que usa respuestas reales del contrato y casos de error reproducibles.",
  },
  backend: {
    technology: "Bun + Hono para rutas y servicios. Zod para validar entradas y respuestas del contrato compartido.",
    responsibility: "Implementar las rutas, aplicar reglas de negocio, validar la entrada y responder con estados y errores acordados.",
    connectsWith: "Alinea request, response y errores con Frontend en packages/contracts; usa Drizzle para consultar o modificar datos.",
    integrationArtifact: "Rutas verificadas con pruebas pertinentes y compatibles con el contrato y el modelo de datos.",
  },
  data: {
    technology: "Drizzle ORM y migraciones SQL versionadas. SQLite en desarrollo local; PostgreSQL para almacenamiento compartido en hosting.",
    responsibility: "Diseñar esquema y restricciones, preparar fixtures sintéticos y asegurar que migraciones y datos se puedan reconstruir.",
    connectsWith: "Alinea tipos y restricciones con Backend; prepara fixtures que QA y Frontend puedan usar para avanzar antes de integrar.",
    integrationArtifact: "Migraciones aplicables desde cero, seed repetible y evidencia de persistencia tras reiniciar.",
  },
  qa: {
    technology: "Build, lint y pruebas pertinentes automatizadas en CI por PR; revisión humana y evidencia registrada en el repositorio.",
    responsibility: "Facilitar que el equipo acuerde criterios, diseñar casos normales y límite, comprobar el flujo entre capas y documentar resultados observados.",
    connectsWith: "Trabaja con los cuatro focos: criterios con el grupo, errores con Backend, estados con Frontend, integridad con Base de datos.",
    integrationArtifact: "Casos vinculados a criterios, evidencia de CI y reporte reproducible de los defectos encontrados.",
  },
};

export const sharedTechnologies = [
  { name: "Contrato compartido", technology: "Zod + tipos TypeScript en packages/contracts", purpose: "Una definición de request, response, validación y errores para Web y API." },
  { name: "Reglas del equipo", technology: "AGENTS.md + documentación en docs/", purpose: "Fuente de verdad para arquitectura, comandos, límites, verificación y handoff; también orienta a los asistentes de IA." },
  { name: "Calidad e integración", technology: "Git por PR + CI", purpose: "Build, lint y pruebas pertinentes antes de integrar; la revisión humana sigue siendo obligatoria." },
  { name: "Estado opcional", technology: "React Context; Zustand solo si no alcanza", purpose: "No agreguen una dependencia de estado global sin una necesidad concreta." },
  { name: "IA en el producto", technology: "Vercel AI SDK solo si un criterio aprobado la necesita", purpose: "Codex o Claude ayudan a desarrollar bajo las reglas del repo; eso no requiere agregar IA a la aplicación." },
  { name: "Acceso en hosting", technology: "Gateway SSO compartido de West Monroe cuando esté disponible", purpose: "La demo local no requiere login y el equipo no crea autenticación propia." },
];

export const studentProjectComponents = [
  { path: "apps/web/", role: "Frontend", responsibility: "Rutas, pantallas, estados y llamadas HTTP al contrato compartido." },
  { path: "apps/api/src/routes/ · apps/api/src/services/", role: "Backend / API", responsibility: "Endpoints Hono, validación Zod y reglas de negocio." },
  { path: "apps/api/src/db/ · apps/api/drizzle/", role: "Base de datos", responsibility: "Esquema Drizzle, migraciones, restricciones y seed sintético." },
  { path: "packages/contracts/", role: "Frontend + Backend; QA revisa", responsibility: "Tipos y esquemas Zod de request, response y errores acordados." },
  { path: "docs/qa/ · .github/workflows/", role: "QA / pruebas coordina", responsibility: "Criterios, casos, evidencia y controles de CI; todo el equipo aporta." },
];

export const integrationWeeks = [
  {
    week: "01",
    title: "Acordar la frontera entre capas",
    together: "El equipo define el flujo; QA vuelve los criterios comprobables; Frontend y Backend acuerdan el contrato; Base de datos valida que el modelo lo soporte.",
    checkpoint: "Un ejemplo de request, respuesta, error y fixture existe antes de dividir tickets dependientes.",
  },
  {
    week: "02",
    title: "Construir en paralelo contra el mismo ejemplo",
    together: "Frontend puede usar el fixture; Backend implementa la ruta con Zod; Base de datos prepara migración y seed; QA automatiza los criterios prioritarios.",
    checkpoint: "Los PRs pequeños pasan CI y no redefinen el contrato por separado.",
  },
  {
    week: "03",
    title: "Conectar un recorrido vertical completo",
    together: "La persona inicia una acción en Web; la llamada llega a Hono; Drizzle lee o guarda en la base; la respuesta vuelve por el mismo contrato y QA recorre el resultado.",
    checkpoint: "El equipo demuestra un caso normal y un caso límite con la aplicación conectada, datos persistidos y evidencia.",
  },
  {
    week: "04",
    title: "Transferir la solución integrada",
    together: "Otra persona parte de un clon limpio, sigue README y AGENTS.md, levanta servicios, completa una tarea y explica cómo se verifica.",
    checkpoint: "La demo de 10 minutos muestra el flujo, un límite, las verificaciones y el siguiente paso sin depender de explicación oral.",
  },
];

export const integrationPlaybook = [
  {
    number: "01",
    title: "Elijan un flujo pequeño",
    action: "Partan del proyecto elegido. Escriban qué intenta hacer la persona y cómo sabrán que funcionó. QA ayuda a expresar el criterio como un resultado observable.",
    artifact: "Una historia breve y criterios en docs/product/brief.md y docs/qa/acceptance.md.",
  },
  {
    number: "02",
    title: "Acuerden contrato y datos",
    action: "Describan juntos la ruta, request, respuesta de éxito, errores esperados y un fixture sintético. Confirmen qué dato se lee o guarda y quién valida cada regla.",
    artifact: "Contrato en packages/contracts y docs/api/contract.md; modelo, migración y fixture en docs/data/.",
  },
  {
    number: "03",
    title: "Avancen en paralelo con el mismo ejemplo",
    action: "Frontend construye contra el fixture; Backend implementa la ruta Hono y su validación Zod; Base de datos prepara esquema Drizzle, migración y seed; QA prepara casos del criterio.",
    artifact: "PRs pequeños que enlazan el ticket y usan los nombres, formatos y errores del contrato acordado.",
  },
  {
    number: "04",
    title: "Conecten y revisen por PR",
    action: "Conecten la pantalla a /api. Revisen juntos los cambios que cruzan áreas. Si cambia el contrato, actualicen a la vez a quien produce y a quien consume la respuesta.",
    artifact: "Build, lint y pruebas pertinentes en CI, más revisión humana con impacto y evidencia en el PR.",
  },
  {
    number: "05",
    title: "Comprueben el recorrido y hagan handoff",
    action: "Desde un clon limpio, ejecuten la aplicación, completen el flujo normal y uno límite, confirmen datos persistidos y dejen instrucciones para que otra persona continúe.",
    artifact: "Pasos reproducibles, resultado observado, pendientes y siguiente punto de entrada en el handoff.",
  },
];
