import { starterAgents } from "./content";

export const repoTree = `
/
├── AGENTS.md
├── README.md
├── package.json
├── bun.lock
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
    week: "SEMANA 1",
    title: "Crear el mapa mínimo",
    files: "README.md, AGENTS.md, brief.md, screen-flow.md, overview.md, contract.md, model.md y acceptance.md.",
    note: "Deben ser breves y concordar entre sí. El equipo revisa contrato, flujo y criterios antes de repartir tareas dependientes.",
  },
  {
    week: "SEMANA 2",
    title: "Documentar cada cambio pequeño",
    files: "Un docs/backlog/T-###-tema.md por tarea; actualizar README y contratos si cambia cómo se ejecuta o se integra.",
    note: "El ticket conecta problema, alcance, criterios, rutas que probablemente cambiarán y verificación. No documenta una solución supuesta como requisito.",
  },
  {
    week: "SEMANA 3",
    title: "Registrar lo que se comprobó y decidió",
    files: "test-plan.md con resultados observados; ADR solo para una decisión con impacto; handoff por cada PR.",
    note: "Actualicen modelo, API o arquitectura cuando la implementación revele un cambio real. Separen evidencia, pendientes y suposiciones.",
  },
  {
    week: "SEMANA 4",
    title: "Dejar a otra persona lista para continuar",
    files: "demo.md, handoff.md, retro.md y README actualizado; repetir los pasos desde un clon limpio.",
    note: "El material debe permitir ejecutar el flujo, explicar sus límites y encontrar el próximo ticket sin explicación oral.",
  },
];

export const markdownFileGuide = [
  {
    path: "README.md",
    week: "Semana 1; actualizar si cambian los comandos",
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
    week: "Semana 1; mantener como reglas canónicas",
    coordinator: "Todo el equipo; revisar con el responsable de repositorio",
    purpose: "Da las mismas reglas permanentes a developers y asistentes de IA. No dupliquen instrucciones contradictorias en otros archivos.",
    template: starterAgents,
  },
  {
    path: "docs/product/brief.md",
    week: "Semana 1",
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
Qué observará el equipo durante la demo de 10 minutos.`,
  },
  {
    path: "docs/product/screen-flow.md",
    week: "Semana 1",
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
    week: "Semana 1; revisar cuando cambie el flujo entre capas",
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
    week: "Semana 1 antes de separar trabajo dependiente",
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
    week: "Semana 1; migraciones y seed durante semana 2",
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
    week: "Semana 2; crear un archivo por tarea",
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
    week: "Semana 1; actualizar con cambios de alcance acordados",
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
    week: "Semana 2; resultados de integración en semana 3",
    coordinator: "QA / pruebas con evidencia de las cuatro áreas",
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
    week: "Cuando haya una decisión con impacto o alternativas reales",
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
    week: "Semana 4",
    coordinator: "Todo el equipo; QA reúne criterios y evidencia",
    purpose: "Permite repetir la demo final de 10 minutos con datos sintéticos y sin preparación oral del autor.",
    template: `# Demo final · 10 minutos

## Preparación
Clon limpio, comandos, URL, cuenta de prueba si aplica y datos sintéticos.

## Guion
| Tiempo | Qué mostrar | Criterio/evidencia |
| --- | --- | --- |
| 1 min | Usuario, problema y límite | Brief |
| 4 min | Flujo principal | AC-01 y fixture |
| 2 min | Caso límite y recuperación | AC-02 y resultado QA |
| 2 min | Reglas, decisiones y verificaciones | AGENTS.md, ADR y CI |
| 1 min | Siguiente paso | Handoff y backlog |

## Plan alterno
Qué mostrar si un servicio o entorno falla.

## Límites conocidos
Qué no debe interpretarse como terminado.`,
  },
  {
    path: "docs/delivery/handoff.md",
    week: "Por PR y cierre final; cada PR también incluye su propio handoff",
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
    week: "Semana 4",
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
    files: markdownFileGuide.slice(0, 4),
  },
  {
    title: "2. Definir cómo se conecta la solución",
    intro: "Acordar estas piezas permite que Web, API y datos construyan contra el mismo flujo.",
    files: markdownFileGuide.slice(4, 7),
  },
  {
    title: "3. Construir y comprobar cambios",
    intro: "Cada tarea pequeña enlaza criterios, rutas afectadas y evidencia; registren decisiones cuando tengan impacto.",
    files: markdownFileGuide.slice(7, 11),
  },
  {
    title: "4. Entregar y mejorar la plantilla",
    intro: "Preparen una demo repetible, dejen un punto claro para continuar y conviertan lo aprendido en una mejora concreta.",
    files: markdownFileGuide.slice(11),
  },
];
