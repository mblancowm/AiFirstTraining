import type { ProjectKey, TeamRole } from "@wm-ai-first/contracts";

export const roles: { key: TeamRole; label: string; short: string }[] = [
  { key: "backend", label: "Backend / API", short: "Rutas, validación y reglas de negocio" },
  { key: "data", label: "Base de datos", short: "Modelo, migraciones y datos de ejemplo" },
  { key: "frontend", label: "Frontend", short: "Pantallas, estados y accesibilidad" },
  { key: "qa", label: "QA / pruebas", short: "Criterios, automatización y evidencia" },
];

export const weeks = [
  {
    number: "01",
    title: "Acordar antes de construir",
    theme: "Preparar para compartir",
    focus: "Aterrizar un flujo pequeño, sus límites y los acuerdos que permiten trabajar en paralelo.",
    steps: [
      "Elijan un usuario y un problema que quepa en una demo de 10 minutos.",
      "Escriban propósito, alcance, exclusiones y criterios que se puedan observar.",
      "Dibujen el flujo web → API → datos y acuerden el contrato con un ejemplo.",
      "Definan el modelo inicial, datos sintéticos, comandos y reglas del repositorio.",
    ],
    outputs: ["Brief y criterios", "Mapa de arquitectura", "Contrato de API", "Modelo de datos", "AGENTS.md inicial"],
    gate: "Una persona que no escribió los documentos encuentra el punto de inicio, entiende el contrato y puede iniciar el proyecto desde el README.",
  },
  {
    number: "02",
    title: "Construir con reglas comunes",
    theme: "Cambios pequeños y revisables",
    focus: "Implementar el flujo principal mediante tickets claros y PRs pequeños.",
    steps: [
      "Dividan el flujo en tareas que puedan revisarse de forma independiente.",
      "Antes de editar, lean AGENTS.md, el ticket y los contratos relacionados.",
      "Usen IA para explorar, planificar o implementar dentro de los límites acordados.",
      "Comprueben el diff, ejecuten las verificaciones indicadas y expliquen el resultado en el PR.",
    ],
    outputs: ["Tickets con criterios", "PRs pequeños", "CI con build, lint y pruebas pertinentes", "Handoffs breves"],
    gate: "Cada PR enlaza un criterio, muestra qué archivos toca, incluye verificaciones realmente ejecutadas y pasa revisión humana.",
  },
  {
    number: "03",
    title: "Integrar y transferir",
    theme: "Probar el sistema completo",
    focus: "Encontrar problemas entre capas y comprobar que el contexto escrito sirve a otra persona.",
    steps: [
      "Conecten frontend, API y persistencia usando el contrato acordado.",
      "Reproduzcan y corrijan un defecto; registren el caso en QA.",
      "Revisen errores, vacíos, validaciones y compatibilidad de datos.",
      "Pidan a alguien del equipo retomar un ticket o PR de otra persona usando solo el repo.",
    ],
    outputs: ["Flujo integrado", "Caso de defecto reproducible", "Evidencia de QA", "Documentación corregida"],
    gate: "Otra persona puede continuar el cambio desde el ticket, el estado del repo y el handoff, sin explicación oral.",
  },
  {
    number: "04",
    title: "Demostrar y dejar listo al siguiente equipo",
    theme: "Clon limpio, demo y retro",
    focus: "Entregar una aplicación que se pueda ejecutar, explicar y continuar.",
    steps: [
      "Completen un cambio nuevo a partir del backlog y el flujo de reglas acordado.",
      "Clonen el repo en una ubicación limpia y sigan el README desde cero.",
      "Hagan una demo de 10 minutos: usuario, flujo normal, límite, evidencia y siguiente paso.",
      "Cierren la retro con cambios puntuales a reglas, documentación o controles.",
    ],
    outputs: ["Demo de 10 minutos", "Repo clonable", "Handoff final", "Retro", "Plantilla reutilizable"],
    gate: "Una persona externa al equipo clona, ejecuta y completa una tarea pequeña sin ayuda oral.",
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
    ],
    criteria: ["El filtro muestra solo el estado elegido.", "Cambiar estado actualiza el ticket y registra quién lo cambió como texto de ejemplo.", "No se permite una transición fuera de las reglas acordadas.", "La aplicación parte de seis tickets sintéticos."],
    sample: `[{"id":"T-101","title":"No puedo abrir el portal de prueba","status":"nuevo","priority":"normal"},{"id":"T-102","title":"La guía muestra un enlace roto","status":"en_progreso","priority":"alta"}]`,
    dataModel: "Ticket(id, title, description, status, priority, createdAt) · TicketHistory(id, ticketId, previousStatus, newStatus, note, changedAt). Los seis tickets y las notas son sintéticos.",
    contractExample: "GET /api/tickets?status=nuevo\n200 { data: [{ id: \"T-101\", title: \"No puedo abrir el portal de prueba\", status: \"nuevo\", priority: \"normal\" }] }\n\nPATCH /api/tickets/T-101/status\n{ status: \"en_progreso\", note: \"Revisando pasos de reproducción.\" }\n200 { data: { id: \"T-101\", status: \"en_progreso\", history: [{ previousStatus: \"nuevo\", newStatus: \"en_progreso\" }] } }\n409 { error: { code: \"INVALID_TRANSITION\", message: \"No se permite ese cambio de estado.\" } }",
  },
};

export const projectOptions = Object.values(projects);



export const starterAgents = `# Reglas para trabajar en este repositorio

## Qué hace el producto y qué queda fuera
Describe el usuario, el problema, el flujo acordado y las exclusiones.

## Mapa del repositorio y fuente de verdad
Enlaza brief, arquitectura, contratos, modelo, backlog y QA.

## Arquitectura y contratos que se deben preservar
Explica web → API → datos y dónde se validan las entradas.

## Cómo iniciar y verificar cambios
Escribe comandos reales para instalar, iniciar, construir y comprobar.

## Flujo de trabajo para un ticket y actualización de documentación
Lee reglas y ticket, inspecciona el repo, cambia lo necesario, revisa el diff y actualiza docs con el PR.

## Seguridad, datos y acciones que requieren autorización
Usa datos sintéticos, no guardes secretos y documenta límites.

## Qué incluir en el handoff de cada PR
Objetivo, decisiones, comandos ejecutados, límites y siguiente paso.
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
  "Demo de 10 minutos que inicia desde el README y muestra los criterios principales.",
  "Repo con los siete componentes del harness, CI verde y rama principal protegida.",
  "Cada cambio integrado tiene PR, revisión humana, verificaciones observadas y handoff breve.",
  "Otra persona puede explicar el propósito del cambio y continuar el siguiente paso con el contexto escrito.",
  "Alguien externo al equipo clona el repo, lo ejecuta y completa una tarea pequeña sin ayuda oral.",
  "Retro en docs/retro.md con mejoras puntuales a reglas, documentación y controles.",
  "Plantilla de repositorio y reglas útiles listas para los siguientes equipos.",
];

export const indicators = [
  "Tiempo para ejecutar desde un clon limpio.",
  "Tiempo para que otra persona complete su primera tarea.",
  "Porcentaje de criterios con evidencia.",
  "Defectos o retrabajo encontrados después de integrar.",
  "Bloqueos por contratos o documentación faltantes.",
];

export const risks = [
  { risk: "Pocas horas disponibles", response: "Mantener el flujo pequeño, hitos semanales y un plan que funcione con 2 horas." },
  { risk: "Reglas largas o desactualizadas", response: "Responsable de reglas; conservar solo instrucciones activas y concretas." },
  { risk: "Código de IA que nadie entiende", response: "Revisión humana, evidencia y una segunda persona capaz de explicar y continuar." },
  { risk: "Áreas bloqueadas entre sí", response: "Acordar contratos en semana 1 y avanzar con ejemplos sintéticos." },
  { risk: "Conocimiento atrapado en conversaciones", response: "Registrar decisiones y probar la continuidad con otra persona." },
  { risk: "Secretos en el repositorio", response: "Protección de rama, escaneo de secretos en CI y gestor de secretos." },
];
