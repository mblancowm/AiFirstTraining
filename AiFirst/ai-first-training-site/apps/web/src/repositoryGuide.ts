import { starterAgents } from "./content";

export const repoTree = `
/
├── AGENTS.md
├── README.md
├── package.json
├── bun.lock
├── prompts/                         # Plantillas Markdown P0–P6
│   ├── P0-clarify-scope.md
│   ├── P1-inspect-and-plan.md
│   ├── P2-implement-plan.md
│   ├── P3-debug-and-fix.md
│   ├── P4-review-diff.md
│   ├── P5-verify-and-deliver.md
│   └── P6-teach-back-check.md
├── apps/
│   ├── api/                         # Bun + Hono
│   │   ├── src/
│   │   │   ├── routes/              # Backend/API: endpoints y validación
│   │   │   ├── services/            # Backend/API: reglas de negocio
│   │   │   └── db/                  # Base de datos: persistencia y seeds
│   │   │       ├── schema.ts         # Esquema Drizzle
│   │   │       └── seed.ts           # Datos sintéticos repetibles
│   │   ├── drizzle/                  # Migraciones SQL versionadas
│   │   └── test/                     # QA coordina; Backend aporta casos de API
│   └── web/                          # Frontend: Vike + React + TypeScript
│       ├── pages/                    # Rutas de la aplicación
│       ├── src/                      # Componentes y llamadas a la API
│       └── test/                     # QA coordina; Frontend aporta casos de UI
├── packages/
│   └── contracts/src/index.ts        # Backend + Frontend acuerdan; QA revisa ejemplos
├── docs/
│   ├── planning/                    # Planes de solo lectura aprobados antes de editar
│   │   └── ticket-triage.md
│   ├── product/                      # Todo el equipo; Frontend coordina screen-flow
│   │   ├── brief.md
│   │   └── screen-flow.md
│   ├── architecture/overview.md      # Backend coordina; todas las áreas revisan
│   ├── api/contract.md               # Backend coordina; Frontend y QA validan
│   ├── data/model.md                 # Base de datos coordina; Backend y QA revisan
│   ├── backlog/T-001-short-title.md  # Un archivo por tarea; QA revisa criterios
│   ├── qa/                           # QA coordina; todo el equipo aporta evidencia
│   │   ├── acceptance.md
│   │   └── test-plan.md
│   ├── decisions/ADR-001-short-title.md  # Proponente y áreas afectadas; cuando aplique
│   ├── delivery/                     # Todo el equipo; QA reúne verificaciones
│   │   ├── demo.md
│   │   └── handoff.md
│   └── retro.md
└── .github/workflows/ci.yml          # QA coordina CI; el equipo mantiene sus controles
`;

export const documentationSchedule = [
  {
    stage: "TRACK 1 · FUNDAMENTOS Y ALCANCE",
    title: "Aclarar el problema",
    files: "README.md, docs/product/brief.md y docs/qa/acceptance.md.",
    note: "El usuario, el alcance y los criterios deben describir el mismo resultado. Usa ejemplos sintéticos y registra los supuestos.",
  },
  {
    stage: "TRACK 2 · CONTEXTO Y PLAN SEGURO",
    title: "Inspeccionar y planear en solo lectura",
    files: "AGENTS.md, docs/planning/ticket-triage.md, docs/architecture/overview.md y contratos relacionados.",
    note: "Lee AGENTS.md y README.md antes de editar. El plan documenta archivos, pasos, pruebas, riesgos y dependencias y recibe aprobación del equipo.",
  },
  {
    stage: "TRACK 3 · IMPLEMENTACIÓN POR FOCO",
    title: "Construir en cambios pequeños",
    files: "Prompts P0–P6, docs/backlog/T-###-tema.md, pruebas pertinentes y PRs.",
    note: "Ajusta las guías a Backend/API, Datos, Frontend, Integración de IA, QA o Producto/UX. Registra pruebas ejecutadas y sugerencias aceptadas o rechazadas.",
  },
  {
    stage: "TRACK 4 · INTEGRACIÓN Y HANDOFF",
    title: "Conectar, revisar y transferir",
    files: "docs/qa/test-plan.md, docs/delivery/demo.md, docs/delivery/handoff.md y README actualizado.",
    note: "Conecta los focos, depura con registros, revisa diffs entre pares y demuestra cómo otra persona puede ejecutar y continuar el flujo.",
  },
];

export const markdownFileGuide = [
  {
    path: "README.md",
    stage: "Track 1; actualizar si cambian los comandos",
    coordinator: "Todo el equipo; una persona integra las instrucciones",
    purpose: "Es la primera puerta de entrada: explica para qué sirve el repo y permite instalar, iniciar y comprobar el proyecto.",
    template: `# Nombre del proyecto

## Qué resuelve
Usuario, necesidad y flujo que cubre el MVP.

## Alcance y límites
Incluye: [lista corta]. Fuera de alcance: [lista corta].

## Requisitos
Bun [versión acordada], Git y cualquier otro requisito real.

## Preparar y ejecutar
1. Clonar el repositorio.
2. Instalar: [comando real].
3. Preparar datos: [comando real].
4. Iniciar Web y API: [comandos reales y puertos].

## Comprobar cambios
Build: [comando]. Lint: [comando]. Pruebas: [comando].

## Variables de entorno
Enlazar .env.example. Nunca pegar secretos en este archivo.

## Mapa de documentación
Brief · arquitectura · contrato API · modelo de datos · QA · entrega.

## Datos y límites conocidos
Explicar qué datos son sintéticos y qué no cubre esta versión.`,
  },
  {
    path: "AGENTS.md",
    stage: "Track 2; mantener como reglas canónicas",
    coordinator: "Todo el equipo; revisar con el responsable de repositorio",
    purpose: "Da las mismas reglas permanentes a developers y asistentes de IA. No dupliquen instrucciones contradictorias en otros archivos.",
    template: starterAgents,
  },
  {
    path: "docs/planning/ticket-triage.md",
    stage: "Track 2; revisar y aprobar antes de editar código",
    coordinator: "Developer que prepara el plan; el equipo lo aprueba",
    purpose: "Registra el comportamiento actual, el alcance y un plan de implementación de solo lectura, con pruebas y riesgos visibles.",
    template: `# Feature Implementation Plan: Ticket Priority Triage

## Goal and Acceptance Criteria
- Goal: classify a support ticket as LOW, MEDIUM, HIGH, or URGENT.
- Acceptance criteria:
  1. POST /api/tickets/triage accepts a title and body.
  2. Empty bodies and bodies over the agreed limit are rejected with a clear error.
  3. The response follows the documented contract.
  4. Provider failure follows a documented fallback without a live network call in tests.

## Current Behavior and Context
- Relevant routes, services, schemas, and tests:
- Existing conventions and instructions from AGENTS.md:
- Related contracts or decisions:

## Scope and Boundaries
- Included:
- Excluded:
- Assumptions and questions that block the plan:

## Affected Files
- [path] — [reason]

## Proposed Steps
1. [small implementation step]
2. [test or documentation step]

## Verification Plan
- Unit/integration tests:
- Manual checks:
- Commands to run after approval:

## Risks and Dependencies
- [risk, dependency, or mitigation]

## Team Approval
- Reviewers:
- Decision and date:

This plan is read-only until the team approves it.`,
  },
  {
    path: "docs/product/brief.md",
    stage: "Track 1",
    coordinator: "Todo el equipo; QA facilita criterios verificables",
    purpose: "Fija el usuario, el problema, el objetivo y los límites que guían las decisiones de producto.",
    template: `# Brief del proyecto

## Usuario y contexto
¿Quién usará el flujo y en qué situación?

## Problema
¿Qué obstáculo concreto tiene hoy esa persona?

## Resultado esperado
¿Qué podrá hacer al terminar el flujo?

## Alcance del MVP
- Incluye:
- No incluye:

## Criterios de aceptación
Enlazar docs/qa/acceptance.md.

## Restricciones y supuestos
Stack, tiempo, datos sintéticos, privacidad y dependencias.

## Señal de éxito
Qué observará el equipo durante una demo breve.`,
  },
  {
    path: "docs/product/screen-flow.md",
    stage: "Track 1; actualizar cuando cambien criterios",
    coordinator: "Frontend; validar el recorrido con todo el equipo",
    purpose: "Muestra pantallas, acciones y estados antes de implementar. Evita que la interfaz prometa un comportamiento distinto al contrato.",
    template: `# Recorrido de pantalla

## Flujo principal
1. [Pantalla inicial] → [acción de la persona].
2. [Resultado] → [siguiente acción].

## Pantallas y estados
| Pantalla | Acción | Carga | Éxito | Vacío | Error |
| --- | --- | --- | --- | --- | --- |
| [nombre] | [acción] | [mensaje] | [resultado] | [mensaje] | [recuperación] |

## Datos del contrato que presenta
Enlazar la ruta y los campos en docs/api/contract.md.

## Teclado y accesibilidad
Etiquetas, foco, orden de tabulación y anuncio de errores.

## Criterios relacionados
Enlazar IDs de docs/qa/acceptance.md.`,
  },
  {
    path: "docs/architecture/overview.md",
    stage: "Track 2; actualizar si el plan cambia el flujo entre capas",
    coordinator: "Backend/API con revisión de Frontend y Base de datos",
    purpose: "Explica las piezas, sus límites y cómo viaja una solicitud. Debe corresponder con el contrato y el código.",
    template: `# Arquitectura del MVP

## Diagrama de componentes
~~~mermaid
flowchart LR
  Persona --> Web[Web: Vike + React]
  Web -->|HTTP /api · contrato compartido| API[API: Bun + Hono + Zod]
  API -->|Drizzle ORM| DB[(SQLite local / PostgreSQL compartido)]
~~~

## Responsabilidad de cada componente
| Componente | Hace | No hace |
| --- | --- | --- |
| Web | Presenta el flujo y sus estados | No accede directamente a la base |
| API | Valida y aplica reglas de negocio | No redefine el contrato por pantalla |
| Datos | Conserva estado y restricciones | No contiene reglas duplicadas sin acuerdo |

## Recorrido de una solicitud
Describir request → validación → persistencia → response/error.

## Límites, supuestos y riesgos
Enlazar ADRs si la decisión tiene impacto.`,
  },
  {
    path: "docs/api/contract.md",
    stage: "Track 2 antes de separar trabajo dependiente",
    coordinator: "Backend/API; Frontend implementa como consumidor y QA revisa casos",
    purpose: "Es el acuerdo que permite construir Web y API en paralelo sin inventar formatos diferentes.",
    template: `# Contrato de API

## Convenciones
Base path, formato JSON, fechas, códigos HTTP y forma de errores.

## [MÉTODO] /api/[ruta]
Propósito: [qué hace y criterio relacionado].

Request:
~~~json
{ "campo": "valor sintético" }
~~~

Respuesta de éxito ([código]):
~~~json
{ "data": { "id": "ejemplo-1" } }
~~~

Errores esperados:
| Código HTTP | Código de error | Cuándo ocurre | Mensaje recuperable |
| --- | --- | --- | --- |
| [código] | [nombre] | [condición] | [mensaje] |

## Validaciones y reglas
Campos obligatorios, límites, conflictos y quién aplica cada regla.

## Compatibilidad
Consumidores afectados y cómo coordinar cambios.`,
  },
  {
    path: "docs/data/model.md",
    stage: "Track 2 para acordar; Track 3 para implementar",
    coordinator: "Base de datos con revisión de Backend/API y QA",
    purpose: "Registra entidades, relaciones, restricciones, migraciones y cómo reconstruir datos sintéticos desde cero.",
    template: `# Modelo de datos

## Entidades y relaciones
~~~text
[Entidad](id, campo, otroId) → [Entidad relacionada]
~~~

## Restricciones que protegen reglas
Unicidad, claves foráneas, campos requeridos y transacciones necesarias.

## Migraciones
Cómo aplicar en orden y cómo volver a empezar en un entorno local.

## Seed y fixtures sintéticos
Qué datos cargar, qué casos cubren y cómo repetirlos. No usar datos reales.

## Impacto de cambio
Qué rutas, contratos y pruebas deben revisarse al cambiar el modelo.`,
  },
  {
    path: "docs/backlog/T-001-short-title.md",
    stage: "Track 3; crear un archivo por tarea",
    coordinator: "La persona que toma la tarea; QA revisa los criterios",
    purpose: "Divide el trabajo en un cambio pequeño que alguien pueda implementar, revisar y verificar sin contexto oral.",
    template: `# T-001: Verbo + resultado esperado

## Problema
Qué necesidad o defecto origina el cambio.

## Resultado y alcance
Qué debe quedar funcionando y qué queda fuera.

## Criterios de aceptación
- [ ] AC-01: Dado [contexto], cuando [acción], entonces [resultado observable].

## Dependencias y contrato
Enlaces a tareas, rutas, tipos, campos o errores relacionados.

## Rutas probables
Archivos que se podrían afectar; confirmar al inspeccionar el repo.

## Verificación
Comandos y casos que demostrarán los criterios.

## Handoff
Estado, limitaciones y siguiente paso después del PR.`,
  },
  {
    path: "docs/qa/acceptance.md",
    stage: "Track 1; actualizar solo con cambios de alcance acordados",
    coordinator: "QA / pruebas con todo el equipo",
    purpose: "Convierte la necesidad en resultados observables que Frontend, Backend y datos puedan comprobar.",
    template: `# Criterios de aceptación

## Flujo principal
- AC-01: Dado [estado inicial], cuando [acción], entonces [resultado visible y persistido].

## Casos límite y errores
- AC-02: Dado [condición límite], cuando [acción], entonces [respuesta y recuperación esperadas].

## Vacío y datos sintéticos
- AC-03: Dado [sin resultados], cuando [consulta], entonces [estado vacío claro].

## Revisión cruzada
| ID | Frontend | API | Datos | Evidencia QA |
| --- | --- | --- | --- | --- |
| AC-01 | [estado] | [respuesta] | [persistencia] | [caso] |`,
  },
  {
    path: "docs/qa/test-plan.md",
    stage: "Track 3 para pruebas; Track 4 para resultados integrados",
    coordinator: "QA / pruebas con evidencia de los seis focos",
    purpose: "Relaciona criterios con pruebas, comandos y resultados reales; hace visible lo que no se probó.",
    template: `# Plan y resultados de verificación

## Entorno
Versión, pasos para iniciar y datos sintéticos usados.

## Cobertura
| Criterio | Caso normal / límite | Capa | Prueba o comando | Esperado | Resultado observado |
| --- | --- | --- | --- | --- | --- |
| AC-01 | [caso] | [Web/API/datos] | [comando] | [esperado] | [resultado] |

## Controles automáticos
Build: [resultado]. Lint: [resultado]. Pruebas pertinentes: [resultado].

## No comprobado y límites
Qué falta, por qué y quién lo toma después.

## Evidencia reproducible
Pasos exactos o enlaces a CI/PR; no anotar solo “pasa”.`,
  },
  {
    path: "docs/decisions/ADR-001-short-title.md",
    stage: "Cuando haya una decisión con impacto o alternativas reales",
    coordinator: "Quien propone la decisión; revisan las áreas afectadas",
    purpose: "Conserva por qué se eligió una opción y qué consecuencias tiene. No hace falta un ADR para decisiones fáciles de revertir.",
    template: `# ADR-001: Título de la decisión

- Estado: propuesto | aceptado | reemplazado
- Fecha: AAAA-MM-DD
- Participantes: [focos que revisaron]

## Contexto
Problema, restricciones y evidencia que motivan decidir.

## Opciones consideradas
Opción A: ventajas y costos. Opción B: ventajas y costos.

## Decisión
Qué opción se elige y por qué satisface mejor los criterios acordados.

## Consecuencias
Impacto en Web, API, datos, QA, operación y documentos que deben actualizarse.

## Revisión futura
Qué señal justificaría revisar la decisión.`,
  },
  {
    path: "docs/delivery/demo.md",
    stage: "Track 4 y demos del equipo",
    coordinator: "Todo el equipo; QA reúne criterios y evidencia",
    purpose: "Permite hacer una demo breve y repetible con datos sintéticos, sin preparación oral del autor.",
    template: `# Demo de equipo · 15 minutos

## Preparación
Clon limpio, comandos, URL, cuenta de prueba si aplica y datos sintéticos.

## Guion
| Tiempo | Qué mostrar | Criterio/evidencia |
| --- | --- | --- |
| 2 min | Usuario, problema y alcance | Brief y criterios |
| 7 min | Flujo principal con datos sintéticos | Criterios de aceptación |
| 3 min | Caso límite, registros y pruebas | Evidencia de QA |
| 3 min | Decisiones, límites y siguiente paso | Plan y handoff |

## Plan alterno
Qué mostrar si un servicio o entorno falla.

## Límites conocidos
Qué no debe interpretarse como terminado.`,
  },
  {
    path: "docs/delivery/handoff.md",
    stage: "Por cada PR y en Track 4",
    coordinator: "Autor del cambio; QA confirma evidencia",
    purpose: "Da a la siguiente persona el estado, decisiones y verificaciones suficientes para continuar desde el repo.",
    template: `# Handoff

## Objetivo y estado
Qué necesidad atiende el cambio y qué quedó listo o pendiente.

## Decisiones y áreas afectadas
Qué cambió, por qué, y enlaces al contrato, modelo o ADR.

## Verificación observada
Comandos ejecutados y resultados reales; especificar lo no comprobado.

## Límites, defectos y riesgos
Datos sintéticos, casos sin cubrir, dependencias o follow-ups.

## Continuar desde aquí
Rama/PR relacionado y siguiente tarea concreta con su archivo de backlog.`,
  },
  {
    path: "docs/retro.md",
    stage: "Track 4; después de una demo o integración significativa",
    coordinator: "Todo el equipo; cada mejora tiene responsable",
    purpose: "Convierte la experiencia del programa en una mejora concreta para las reglas y la plantilla reutilizable.",
    template: `# Retrospectiva

## Qué ayudó a continuar el trabajo
Una práctica o archivo y un ejemplo observado.

## Dónde faltó contexto o hubo espera
Hecho concreto, impacto y documento o acuerdo relacionado.

## Ajustes para el siguiente equipo
| Mejora | Archivo/regla afectada | Responsable | Cuándo revisar |
| --- | --- | --- | --- |
| [acción] | [ruta] | [persona/foco] | [fecha o siguiente cohorte] |

## Qué no cambia todavía
Decisiones que requieren evidencia antes de alterar la plantilla.`,
  },
];

export const markdownFileGroups = [
  {
    title: "1. Preparar el repositorio",
    intro: "Empiecen aquí: orienta a la persona nueva, fija reglas compartidas y define el problema y el recorrido.",
    files: markdownFileGuide.slice(0, 5),
  },
  {
    title: "2. Definir cómo se conecta la solución",
    intro: "Acordar estas piezas permite que Web, API y datos construyan contra el mismo flujo.",
    files: markdownFileGuide.slice(5, 8),
  },
  {
    title: "3. Construir y comprobar cambios",
    intro: "Cada tarea pequeña enlaza criterios, rutas afectadas y evidencia; registren decisiones cuando tengan impacto.",
    files: markdownFileGuide.slice(8, 12),
  },
  {
    title: "4. Entregar y mejorar la plantilla",
    intro: "Preparen una demo repetible, dejen un punto claro para continuar y conviertan lo aprendido en una mejora concreta.",
    files: markdownFileGuide.slice(12),
  },
];
