import type { ProjectKey, TeamRole } from "@wm-ai-first/contracts";

export const roles: { key: TeamRole; label: string; short: string }[] = [
  { key: "backend", label: "Backend / API", short: "Rutas, validación y reglas de negocio" },
  { key: "data", label: "Base de datos", short: "Modelo, migraciones y datos de ejemplo" },
  { key: "frontend", label: "Frontend", short: "Pantallas, estados y accesibilidad" },
  { key: "aiIntegration", label: "Integración de IA", short: "Límites del proveedor, validación y fallbacks" },
  { key: "qa", label: "QA / pruebas", short: "Criterios, automatización y evidencia" },
  { key: "productUx", label: "Producto / UX", short: "Problema, límites y criterios de aceptación" },
];

export const coreWorkflow = [
  { title: "Define · Define el alcance", detail: "Convierte la solicitud en alcance claro y criterios de aceptación comprobables." },
  { title: "Plan · Planifica", detail: "Inspecciona el repositorio en modo de solo lectura y acuerda el cambio más pequeño que resuelve la necesidad." },
  { title: "Build · Construye", detail: "Implementa el plan aprobado con cambios pequeños y fáciles de entender." },
  { title: "Verify · Verifica", detail: "Ejecuta pruebas, revisa registros de ejecución y examina el diff." },
  { title: "Review · Revisa", detail: "Busca riesgos de seguridad y privacidad, casos límite y regresiones." },
  { title: "Deliver · Entrega", detail: "Resume el cambio, comparte evidencia real de ejecución y documenta límites." },
];

export const moduleSequence = [
  { title: "Aprende", detail: "Revisa el propósito del track, las reglas de seguridad y los criterios que debe cumplir el resultado." },
  { title: "Observa", detail: "Analiza ejemplos trabajados, sugerencias aceptadas o rechazadas y formas de verificar el cambio." },
  { title: "Practica", detail: "Resuelve una tarea del proyecto real o sintético, en el alcance y el ritmo del equipo." },
  { title: "Comprueba", detail: "Compara el resultado con los criterios, pruebas y revisión por pares; registra lo que observaste." },
  { title: "Comparte", detail: "Presenta una demo breve y deja los artefactos y el siguiente paso en el repositorio." },
];

export const learningTracks = [
  {
    number: "01",
    title: "Fundamentos y alcance",
    theme: "Entender por qué y cómo",
    focus: "Convierte una solicitud amplia en una necesidad, un alcance acordado y criterios que se puedan comprobar.",
    steps: [
      "Revisen la política aplicable: usen herramientas aprobadas y datos sintéticos; nunca incluyan secretos ni datos reales de clientes.",
      "Tomen una solicitud amplia, como agregar clasificación de tickets, y usen P0 para aclarar el resultado esperado.",
      "Acuerden qué entra y qué queda fuera, identifiquen supuestos y conviertan el resultado en criterios de aceptación observables.",
      "Actualicen el README y el brief del proyecto para que el equipo comparta el mismo propósito y alcance.",
    ],
    outputs: ["Solicitud aclarada", "Alcance incluido y excluido", "Criterios de aceptación acordados", "README y brief actualizados"],
    gate: "El equipo puede explicar el problema, el alcance y cómo comprobar que el resultado lo resuelve.",
  },
  {
    number: "02",
    title: "Planificación segura y contexto",
    theme: "Entender dónde y qué cambiar",
    focus: "Conoce el repositorio y sus límites; prepara un plan de solo lectura y obtén acuerdo del equipo antes de editar.",
    steps: [
      "Coloquen AGENTS.md en la raíz con reglas de seguridad, rutas permitidas y prohibidas y límites para las herramientas de IA.",
      "Lean primero AGENTS.md y README.md; inspeccionen arquitectura y código relacionado sin editar archivos.",
      "Usen P1 para documentar el comportamiento actual, los archivos afectados, los pasos propuestos, las pruebas y los riesgos.",
      "Guarden el plan en docs/planning/ y pídanle al equipo que lo revise y apruebe antes de tocar código.",
    ],
    outputs: ["AGENTS.md en la raíz", "Inspección de solo lectura", "Plan de implementación en docs/planning/", "Aprobación del equipo"],
    gate: "El plan identifica alcance, archivos, verificaciones, riesgos y límites; el equipo lo aprueba antes de editar.",
  },
  {
    number: "03",
    title: "Implementación por foco",
    theme: "Construir con cambios pequeños",
    focus: "Implementa una parte del plan aprobado según el foco profesional, con pruebas pertinentes y diffs fáciles de revisar.",
    steps: [
      "Elijan una tarea acotada para Backend/API, Datos, Frontend, Integración de IA, QA o Producto/UX.",
      "Confirmen que el estado actual del repositorio coincide con el plan aprobado; deténganse si cambió el alcance o el riesgo.",
      "Usen P2 y las guías del foco para realizar el cambio mínimo, añadir pruebas unitarias o de integración y registrar sugerencias de IA aceptadas o rechazadas.",
      "Ejecuten las verificaciones localmente, inspeccionen el diff y preparen un PR con comandos y resultados observados.",
    ],
    outputs: ["Diffs pequeños por foco", "Pruebas asociadas a cada cambio", "Registro de sugerencias aceptadas/rechazadas", "PRs con evidencia de ejecución"],
    gate: "Los PRs se pueden relacionar con el plan y los criterios, y muestran pruebas ejecutadas y revisadas.",
  },
  {
    number: "04",
    title: "Integración, depuración y handoff",
    theme: "Entregar software de calidad",
    focus: "Conecta los componentes entre focos, diagnostica con registros y deja una entrega que el equipo pueda continuar.",
    steps: [
      "Conecten API, esquema de datos e interfaz usando los contratos que el equipo aprobó.",
      "Usen P3 para reproducir y diagnosticar un defecto sintético con pasos y registros; apoyen la causa con evidencia.",
      "Usen P4 para revisar diffs por seguridad, casos límite y regresiones; registren hallazgos y correcciones entre pares.",
      "Usen P5 para documentar la entrega, resultados de pruebas, límites y siguiente paso; demuestren el flujo en una sesión breve.",
    ],
    outputs: ["Función integrada", "Defecto reproducible y evidencia de corrección", "Notas de revisión por pares", "Demo funcional y handoff final"],
    gate: "Otra persona puede ejecutar la función, revisar las pruebas y continuar desde el handoff sin depender de una explicación oral.",
  },
];

export const harness = [
  { title: "Reglas del repo", source: "AGENTS.md", detail: "Propósito, estructura, comandos, límites, convenciones, pruebas, seguridad y handoff. Es la fuente canónica." },
  { title: "Documentación viva", source: "docs/", detail: "Brief, arquitectura, contratos, datos, decisiones, backlog, QA y entrega; se actualiza junto al cambio." },
  { title: "Una regla para cada cambio", source: "Ticket o plan breve", detail: "Problema, alcance, exclusiones, criterios, rutas probables, dependencias y cómo verificar." },
  { title: "Contratos entre áreas", source: "docs/api/ + tipos compartidos", detail: "Acordar request, response, validación y errores antes de dividir trabajo dependiente." },
  { title: "Calidad automatizada", source: "CI por PR", detail: "Build, lint y pruebas pertinentes; la revisión humana sigue siendo obligatoria." },
  { title: "Seguridad de Git", source: "Branch protection", detail: "Rama principal protegida, PR obligatorio, al menos una revisión y secretos fuera del repo." },
  { title: "Revisión y handoff", source: "Checklist de PR", detail: "Dejar objetivo, decisiones, evidencia, límites y un siguiente paso claro." },
];

export const projects: Record<ProjectKey, {
  key: ProjectKey;
  name: string;
  subtitle: string;
  user: string;
  flow: string;
  scope: string[];
  outOfScope: string[];
  tasks: { role: string; work: string }[];
  criteria: string[];
  sample: string;
  dataModel: string;
  contractExample: string;
}> = {
  appointments: {
    key: "appointments",
    name: "Agenda de citas",
    subtitle: "Una reserva clara, sin dobles horarios",
    user: "Una persona que atiende un negocio pequeño y necesita organizar sus citas.",
    flow: "Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.",
    scope: ["Consultar espacios disponibles", "Crear una cita", "Impedir dos reservas en el mismo horario", "Cancelar y liberar el horario"],
    outOfScope: ["Calendarios externos", "Notificaciones", "Pagos", "Cuentas de producción"],
    tasks: [
      { role: "Backend / API", work: "Validar horarios, crear/cancelar citas y devolver conflictos como errores entendibles." },
      { role: "Base de datos", work: "Modelar servicios, horarios y citas; cargar datos sintéticos." },
      { role: "Frontend", work: "Acordar el recorrido con el equipo y construir búsqueda de espacios, formulario, confirmación y cancelación." },
      { role: "QA / pruebas", work: "Facilitar criterios observables con el equipo y probar reserva normal, horario ocupado, horario inválido y cancelación." },
      { role: "Integración de IA", work: "Si el ticket aprobado requiere IA, definir un wrapper y un mock sintético; de lo contrario, documentar que esta práctica no modifica el producto." },
      { role: "Producto / UX", work: "Acordar el problema de la reserva, el alcance y los criterios del flujo; señalar decisiones pendientes sin ampliar el ticket." },
    ],
    criteria: ["Un horario ocupado no se puede reservar de nuevo.", "Una cita creada aparece al consultar disponibilidad.", "Cancelar una cita vuelve a ofrecer ese horario.", "Los errores indican qué debe corregir la persona."],
    sample: `[{"id":"S-1","service":"Consulta inicial","durationMinutes":30},{"id":"S-2","service":"Seguimiento","durationMinutes":45}]\n[{"date":"2026-11-04","start":"09:00","available":true},{"date":"2026-11-04","start":"09:30","available":false}]`,
    dataModel: "Service(id, name, durationMinutes) · AvailabilityRule(id, weekday, startTime, endTime) · Appointment(id, serviceId, startsAt, status). A unique constraint or transaction must prevent two active appointments in the same slot.",
    contractExample: "GET /api/availability?serviceId=S-1&date=2026-11-04\n200 { data: [{ startsAt: \"2026-11-04T09:00:00\", available: true }] }\n\nPOST /api/appointments\n{ serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\" }\n201 { data: { id: \"APT-101\", serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\", status: \"booked\" } }\n409 { error: { code: \"SLOT_TAKEN\", message: \"Ese horario ya está reservado.\" } }\n\nDELETE /api/appointments/APT-101\n204 No Content",
  },
  knowledge: {
    key: "knowledge",
    name: "Base de conocimiento",
    subtitle: "Encontrar la fuente útil y mantenerla al día",
    user: "Una persona del equipo que necesita encontrar una respuesta documentada y abrir su fuente.",
    flow: "Buscar artículos sintéticos por texto y categoría, abrir la fuente y crear o editar artículos.",
    scope: ["Buscar por texto", "Filtrar por categoría", "Abrir el detalle y la fuente", "Crear y editar artículos", "Persistir los cambios"],
    outOfScope: ["Documentos reales", "Respuestas generadas", "Embeddings", "Permisos de producción", "Conectores externos"],
    tasks: [
      { role: "Backend / API", work: "Consultar y validar artículos; guardar creación y edición." },
      { role: "Base de datos", work: "Crear artículos, categorías y fuentes completamente ficticias." },
      { role: "Frontend", work: "Acordar con el equipo qué necesita ver la persona y construir búsqueda, filtros y detalle de la fuente." },
      { role: "QA / pruebas", work: "Acordar criterios observables y probar filtros, consulta sin resultados, fuente visible y persistencia." },
      { role: "Integración de IA", work: "Mantener las respuestas generadas fuera del alcance; practicar esquemas y fallbacks con un mock local solo si se aprueba un ejercicio separado." },
      { role: "Producto / UX", work: "Definir cómo buscar, filtrar y reconocer una fuente ficticia; comprobar criterios y límites de privacidad." },
    ],
    criteria: ["Texto y categoría se pueden combinar.", "Cada resultado abre el artículo correcto.", "La fuente ficticia se identifica claramente.", "Un artículo guardado aparece al volver a buscar."],
    sample: `[{"id":"A-014","title":"Solicitar acceso de prueba","category":"Herramientas","source":"Wiki ficticia · artículo 014"},{"id":"A-021","title":"Preparar una demo","category":"Entrega","source":"Wiki ficticia · artículo 021"}]`,
    dataModel: "Category(id, name) · Article(id, title, body, categoryId, sourceId, updatedAt) · Source(id, label, url). La fuente es ficticia y se muestra como referencia, nunca como documento real.",
    contractExample: "GET /api/articles?q=demo&category=Entrega\n200 { data: [{ id: \"A-021\", title: \"Preparar una demo\", category: \"Entrega\", source: \"Wiki ficticia · artículo 021\" }] }\n\nPOST /api/articles\n{ title: \"Preparar una demo\", body: \"...\", categoryId: \"C-2\", sourceId: \"SRC-1\" }\n201 { data: { id: \"A-022\", title: \"Preparar una demo\", ... } }\n\nPATCH /api/articles/A-022\n{ title: \"Preparar una demo corta\" }\n200 { data: { id: \"A-022\", title: \"Preparar una demo corta\", ... } }",
  },
  support: {
    key: "support",
    name: "Triage de tickets",
    subtitle: "Ver el estado, dejar contexto y continuar",
    user: "Una persona que coordina solicitudes internas y necesita mantener su estado actualizado.",
    flow: "Consultar seis tickets ficticios, filtrar por estado, abrir un ticket y guardar una actualización.",
    scope: ["Mostrar seis tickets sintéticos", "Filtrar por estado", "Abrir detalle", "Cambiar estado y guardar historial"],
    outOfScope: ["Tickets reales", "Integraciones externas", "Decisiones automáticas de IA", "Notificaciones"],
    tasks: [
      { role: "QA / pruebas", work: "Facilitar con el equipo las reglas de estado, transiciones y prioridad; probar el flujo completo, estados vacíos y casos límite." },
      { role: "Backend / API", work: "Consultar y actualizar tickets; validar transiciones y guardar historial." },
      { role: "Base de datos", work: "Modelar tickets e historial; preparar exactamente seis ejemplos ficticios." },
      { role: "Frontend", work: "Acordar el recorrido de triage con el equipo y construir bandeja, filtros, detalle y confirmación." },
      { role: "Integración de IA", work: "Mantener la decisión automática de IA fuera del alcance; si se usa un ejercicio sintético separado, probar el proveedor simulado y su salida validada." },
      { role: "Producto / UX", work: "Definir estados, prioridades y transiciones acordadas; confirmar que cada criterio se puede observar y explicar." },
    ],
    criteria: ["El filtro muestra solo el estado elegido.", "Cambiar estado actualiza el ticket y registra quién lo cambió como texto de ejemplo.", "No se permite una transición fuera de las reglas acordadas.", "La aplicación parte de seis tickets sintéticos."],
    sample: `[{"id":"T-101","title":"No puedo abrir el portal de prueba","status":"nuevo","priority":"normal"},{"id":"T-102","title":"La guía muestra un enlace roto","status":"en_progreso","priority":"alta"}]`,
    dataModel: "Ticket(id, title, description, status, priority, createdAt) · TicketHistory(id, ticketId, previousStatus, newStatus, note, changedAt). Los seis tickets y las notas son sintéticos.",
    contractExample: "GET /api/tickets?status=nuevo\n200 { data: [{ id: \"T-101\", title: \"No puedo abrir el portal de prueba\", status: \"nuevo\", priority: \"normal\" }] }\n\nPATCH /api/tickets/T-101/status\n{ status: \"en_progreso\", note: \"Revisando pasos de reproducción.\" }\n200 { data: { id: \"T-101\", status: \"en_progreso\", history: [{ previousStatus: \"nuevo\", newStatus: \"en_progreso\" }] } }\n409 { error: { code: \"INVALID_TRANSITION\", message: \"No se permite ese cambio de estado.\" } }",
  },
};

export const projectOptions = Object.values(projects);

export const operationalPrompts = [
  {
    id: "P0",
    file: "P0-clarify-scope.md",
    title: "Aclarar una solicitud y definir alcance",
    purpose: "Convertir un ticket ambiguo en una solicitud comprobable sin inventar requisitos.",
    body: [
      "Quiero lograr: [resultado para la persona o el sistema].",
      "Solicitud: [pega una descripción autorizada].",
      "Contexto conocido: [ruta, componente o comportamiento relacionado].",
      "Límites: [qué no debe cambiar y políticas aplicables].",
      "",
      "No edites archivos. Devuelve:",
      "1. Resultado esperado.",
      "2. Alcance incluido y excluido.",
      "3. Criterios de aceptación verificables.",
      "4. Supuestos y preguntas que sí bloquean.",
      "",
      "No inventes requisitos. Señala lo que falta y las suposiciones seguras.",
    ].join("\n"),
  },
  {
    id: "P1",
    file: "P1-inspect-and-plan.md",
    title: "Inspeccionar el repositorio y planificar en solo lectura",
    purpose: "Entender el comportamiento actual y acordar el plan antes de cambiar archivos.",
    body: [
      "Repositorio y rama: [nombre/rama].",
      "Tarea: [descripción y criterios de aceptación].",
      "",
      "Primero lee las instrucciones del repositorio (por ejemplo, AGENTS.md y README.md) y los archivos relacionados. Todavía no edites archivos.",
      "",
      "Entrega:",
      "1. Cómo funciona hoy, con rutas exactas.",
      "2. Plan conciso con los archivos que cambiarías.",
      "3. Pruebas unitarias o de integración pertinentes.",
      "4. Riesgos, dependencias y supuestos.",
      "5. Guarda el plan en docs/planning/[feature-name].md y espera la aprobación humana antes de editar código.",
      "",
      "Si el repositorio contradice la solicitud, explica la diferencia. No amplíes el alcance.",
    ].join("\n"),
  },
  {
    id: "P2",
    file: "P2-implement-plan.md",
    title: "Implementar un plan aprobado",
    purpose: "Hacer el cambio mínimo que cumple los criterios acordados.",
    body: [
      "Implementa [tarea] con este plan aprobado: [pega el plan].",
      "Criterios: [lista].",
      "Límites: [archivos, comportamientos o contratos que no deben cambiar].",
      "",
      "Antes de editar, confirma que el repositorio coincide con el plan. Si hay una diferencia que afecte alcance o riesgo, detente y descríbela.",
      "Haz el cambio más pequeño que cumpla los criterios y agrega o actualiza pruebas pertinentes. Deja fuera cambios no relacionados.",
      "",
      "Ejecuta las verificaciones pertinentes e informa comandos y resultados exactos. Indica qué no pudiste verificar.",
      "No hagas commit, push, migraciones ni despliegues.",
    ].join("\n"),
  },
  {
    id: "P3",
    file: "P3-debug-and-fix.md",
    title: "Diagnosticar un defecto",
    purpose: "Reproducir primero el problema y apoyar la causa con evidencia.",
    body: [
      "Comportamiento esperado: [resultado].",
      "Comportamiento observado: [error o resultado].",
      "Pasos para reproducir: [pasos].",
      "Registros o pruebas: [fragmentos sin secretos ni datos personales].",
      "",
      "Inspecciona el código e intenta reproducir el problema antes de proponer una causa. Explica la causa más probable y la evidencia que la sustenta.",
      "No ocultes errores ni debilites las aserciones. Si la causa está clara y el cambio cabe en el alcance, implementa la corrección mínima y agrega una prueba de regresión.",
      "Ejecuta verificaciones específicas y comunica resultados exactos. Si no puedes reproducirlo, explica qué información o acceso falta.",
    ].join("\n"),
  },
  {
    id: "P4",
    file: "P4-review-diff.md",
    title: "Revisar código en solo lectura",
    purpose: "Buscar defectos accionables en un diff sin editar archivos.",
    body: [
      "Revisa el diff de [rama/PR] contra [rama base]. Esta revisión es de solo lectura: no edites archivos.",
      "",
      "Busca errores, vulnerabilidades de seguridad o privacidad, pérdida de datos, contratos rotos y regresiones de rendimiento. Ordena hallazgos por gravedad. Para cada uno indica:",
      "- Ruta y línea aproximada.",
      "- Situación que lo activa.",
      "- Impacto y evidencia.",
      "- Corrección sugerida.",
      "",
      "No enumeres preferencias de estilo. Si no encuentras defectos, dilo e indica qué no pudiste verificar.",
    ].join("\n"),
  },
  {
    id: "P5",
    file: "P5-verify-and-deliver.md",
    title: "Verificar la entrega y preparar el PR",
    purpose: "Relacionar criterios con evidencia ejecutada y un handoff claro.",
    body: [
      "Prepara la entrega de [tarea/PR]. Criterios: [lista].",
      "",
      "Ejecuta las pruebas y comprobaciones disponibles. No afirmes que una comprobación pasó si no la ejecutaste.",
      "",
      "Entrega:",
      "1. Resumen del cambio y su objetivo.",
      "2. Criterios cumplidos con evidencia.",
      "3. Comandos ejecutados y resultados exactos.",
      "4. Pruebas no ejecutadas y motivo.",
      "5. Riesgos, límites y pendientes.",
      "6. Borrador de título y descripción del PR.",
    ].join("\n"),
  },
  {
    id: "P6",
    file: "P6-teach-back-check.md",
    title: "Comprobar comprensión y enseñar el cambio",
    purpose: "Ayudar al estudiante a explicar código y pruebas sin editar nada.",
    body: [
      "Usa el diff y las pruebas de [tarea] para ayudarme a aprender. No edites archivos.",
      "",
      "Hazme UNA pregunta a la vez sobre:",
      "1. Qué cambió y por qué.",
      "2. Una decisión técnica importante.",
      "3. Cómo una prueba o un registro confirma el resultado.",
      "",
      "Espera mi respuesta antes de preguntar otra cosa. Corrige errores con rutas o pruebas concretas. Al final, resume qué entendí y qué debo repasar.",
    ].join("\n"),
  },
];



export const starterAgents = `# AI Developer Tool Instructions & Safety Boundaries

## Project Overview
This repository uses an AI-first workflow. AI tools assist; human developers remain responsible for code quality, security, and verification.

## Non-Negotiable Rules
1. Never commit, log, or transmit passwords, API keys, credentials, or real customer data.
2. Do not edit application code until the team approves a plan in /docs/planning/.
3. Make the smallest change that satisfies the accepted criteria. Keep unrelated files untouched.
4. Add or update relevant unit or integration tests for every code change.
5. Never claim a check passed unless you ran the exact command and observed its output.

## File and Directory Boundaries
- Read first: /AGENTS.md and /README.md. Treat /docs/ as reference material unless the task explicitly updates documentation or the approved plan.
- Allowed code paths: /apps/ and /packages/, scoped to the approved task.
- Forbidden paths: .env*, *.pem, *.key, and CI/CD workflow secrets.

## Execution Rules
- Report exact commands and observed results; separate facts from assumptions.
- Do not commit, push, run shared-environment migrations, or deploy externally without explicit human authorization.

## Handoff
Summarize the objective, decisions, changed areas, checks actually run, known limits, and the next step.
`;

export const sampleTicket = `# Título: Evitar reservar un horario ocupado

## Problema
Una persona puede intentar confirmar un horario que otra reserva ya tomó.

## Alcance
Validar el conflicto en la API y mostrar un mensaje que permita elegir otro horario.

## Fuera de alcance
Calendarios externos, pagos y notificaciones.

## Criterios de aceptación
- Una reserva existente bloquea el mismo servicio, fecha y horario.
- La API responde con un conflicto comprensible.
- La web mantiene los datos ingresados y ofrece volver a consultar.

## Verificación
- Prueba de API para horario libre y ocupado.
- Verificación del flujo en web.
- Build y lint del repo.

## Rutas probables
Contrato compartido, ruta de citas, formulario y pruebas de reserva.
`;

export const sampleHandoff = `## Handoff
- **Objetivo y estado:** qué necesidad atiende y qué quedó listo o pendiente.
- **Decisiones:** qué cambió y por qué; enlace al contrato o ADR.
- **Verificación:** comandos ejecutados y resultado real; qué no se pudo comprobar.
- **Impacto y límites:** áreas tocadas, riesgos, datos sintéticos y compatibilidad.
- **Siguiente paso:** ticket, bloqueo o instrucción para continuar.
`;

export const closeChecklist = [
  "Proyecto funcional con una demo breve que recorre criterios principales usando datos sintéticos.",
  "Pull requests revisados por pares con comandos, resultados reales y comentarios resueltos o pendientes.",
  "Resumen de handoff con cambios, verificaciones ejecutadas, límites y el siguiente paso.",
];

export const indicators = [
  "El PR enlaza cada cambio con un criterio y resultados de verificación observados.",
  "La revisión entre pares registra hallazgos, correcciones y pendientes concretos.",
  "La demo muestra una función completa con datos sintéticos y explica sus límites.",
  "Otra persona puede ejecutar el flujo y encontrar el siguiente paso desde README y handoff.",
  "El equipo puede explicar qué sugerencias de IA aceptó o rechazó y por qué.",
];

export const risks = [
  { risk: "Capacidad de sprint limitada", response: "Avanzar al ritmo del equipo y elegir el track o la tarea que mejor encaje con el trabajo actual." },
  { risk: "Reglas largas o desactualizadas", response: "Responsable de reglas; conservar solo instrucciones activas y concretas." },
  { risk: "Código de IA que nadie entiende", response: "Revisión humana, evidencia y una segunda persona capaz de explicar y continuar." },
  { risk: "Áreas bloqueadas entre sí", response: "Acordar contratos antes de dividir trabajo dependiente y avanzar con ejemplos sintéticos." },
  { risk: "Conocimiento atrapado en conversaciones", response: "Registrar decisiones y probar la continuidad con otra persona." },
  { risk: "Secretos en el repositorio", response: "Protección de rama, escaneo de secretos en CI y gestor de secretos." },
];
