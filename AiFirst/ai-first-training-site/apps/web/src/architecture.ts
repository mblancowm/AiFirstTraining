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
    connectsWith: "Trabaja con todos los focos: criterios con Producto, errores con Backend, estados con Frontend e integridad con Datos.",
    integrationArtifact: "Casos vinculados a criterios, evidencia de CI y reporte reproducible de los defectos encontrados.",
  },
  aiIntegration: {
    technology: "Wrapper de proveedor con validación de esquema, proveedor simulado para pruebas y mediciones sintéticas de calidad, latencia y costo.",
    responsibility: "Definir la frontera del proveedor, validar entradas y salidas, manejar timeout, errores y límites, y cuidar privacidad.",
    connectsWith: "Acuerda con Producto si una función de IA pertenece al alcance. Usa contratos aprobados y mocks deterministas; no envía datos reales.",
    integrationArtifact: "Wrapper reproducible con validación, fallbacks y evidencia de pruebas locales; proveedor real solo con autorización explícita.",
  },
  productUx: {
    technology: "Brief, historias, mapas de flujo, criterios de aceptación y decisiones de alcance.",
    responsibility: "Definir el problema, establecer límites, hacer verificables los criterios y señalar supuestos que requieren acuerdo.",
    connectsWith: "Alinea criterios con QA, contratos con Backend y estados con Frontend; detiene cambios de alcance sin acuerdo del equipo.",
    integrationArtifact: "Brief y criterios vinculados a tickets, demo y handoff; preguntas pendientes claramente identificadas.",
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
  { path: "apps/api/src/ai/ · docs/ai/", role: "Integración de IA (si se aprueba)", responsibility: "Frontera del proveedor, validación, mocks locales, fallbacks y evaluación con datos sintéticos." },
  { path: "docs/product/", role: "Producto / UX coordina", responsibility: "Problema, alcance, criterios verificables, flujos y decisiones de experiencia." },
];

export const integrationTracks = [
  {
    track: "01",
    title: "Acordar el problema y el alcance",
    together: "Producto define el resultado y sus límites; QA vuelve los criterios comprobables; los demás focos identifican qué partes del sistema podrían participar.",
    checkpoint: "El brief y los criterios describen el mismo resultado y excluyen cambios que el equipo no acordó.",
  },
  {
    track: "02",
    title: "Planear antes de implementar",
    together: "El equipo inspecciona arquitectura, contratos y reglas del repositorio en solo lectura; asigna límites y dependencias antes de aprobar el plan.",
    checkpoint: "AGENTS.md y el plan aprobado señalan archivos afectados, riesgos, dependencias y verificaciones.",
  },
  {
    track: "03",
    title: "Implementar por foco contra el mismo contrato",
    together: "Frontend puede usar el fixture; Backend implementa la ruta; Datos prepara migración y seed; QA automatiza criterios; AI Integration usa un mock si aplica y Producto revisa que se respete el alcance.",
    checkpoint: "Los PRs pequeños incluyen pruebas pertinentes y no redefinen el contrato por separado.",
  },
  {
    track: "04",
    title: "Integrar y preparar el handoff",
    together: "El equipo conecta el flujo completo, usa registros para depurar, revisa los cambios entre pares y presenta una demo breve con evidencia y límites.",
    checkpoint: "Otra persona puede ejecutar el flujo, revisar resultados y continuar desde el README y el handoff.",
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
