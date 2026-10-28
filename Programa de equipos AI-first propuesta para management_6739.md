# Programa de equipos AI-first: propuesta para management

Oct 15, 2026 · @Oscar Hurtado

## Resumen ejecutivo

Proponemos que equipos de 3-4 developers construyan en 4 semanas una aplicación de prueba con asistencia de IA. El objetivo es que el equipo entregue software que otro developer pueda ejecutar, comprender y continuar sin depender de la memoria de quien hizo el cambio ni de una conversación previa.

El método será **rules-first**: las reglas del repositorio, los contratos, las decisiones y los pasos de verificación se escriben una vez, se versionan junto al código y se aplican a cada tarea. Codex, Claude u otro asistente deben seguir esas reglas. Los prompts pueden ayudar en un caso puntual, pero no son el proceso ni el entregable central.

Cada equipo entrega un repositorio con instrucciones claras, reglas compartidas, documentación útil, tareas con alcance y criterios definidos, automatización de calidad, revisión humana y un handoff verificable. Los developers colaboran entre capas; tener un área asignada no significa que el conocimiento quede aislado. Dedicación estimada: 2-8 horas semanales por persona.

Este documento define el mínimo para arrancar y las decisiones que management debe tomar para desbloquear el programa.

## Stack tecnológico común

El stack aprobado aplica tanto al training site como a los tres proyectos de práctica:

- **Frontend:** React con TypeScript estricto y Vike (`vike-react`). Vite queda integrado bajo Vike; no se configura por separado.
- **Backend:** Bun con Hono.
- **Datos:** Drizzle ORM. SQLite para desarrollo local y PostgreSQL cuando se necesite almacenamiento compartido en nube.
- **Validación e IA:** Zod valida contratos, datos y esquemas de herramientas. Vercel AI SDK (`ai`) se usa cuando una función de producto aprobada necesite llamar a un modelo; no se agrega IA al producto solo para usar la dependencia.
- **Complementos:** Tailwind CSS; TanStack Query con `fetch` nativo; Zustand solo si React Context no cubre el estado necesario.
- **Acceso en nube:** autenticación por el gateway SSO compartido de West Monroe. No crear autenticación propia para reemplazarlo. La demo local no requiere login.

El training site ya tiene una implementación React/Vike y una API Bun/Hono con Drizzle y SQLite local. Los proyectos de los equipos deben respetar el mismo stack y documentar cualquier decisión de despliegue en su README y ADR cuando corresponda.

## Objetivo y resultados esperados

El objetivo es que cada developer practique el ciclo completo de un proyecto AI-first: entender las reglas del repo, definir el cambio, planificar, usar IA dentro de los límites acordados, verificar, documentar y entregar para que otra persona pueda continuar.

Al cierre de las 4 semanas esperamos:

- Una aplicación funcional y demostrable con decisiones y límites comprensibles.
- Un repositorio que un developer nuevo pueda clonar, ejecutar y usar para completar una tarea pequeña sin explicación oral.
- Reglas de trabajo, arquitectura, contratos, comandos y verificaciones documentados dentro del repo.
- Un handoff por cambio: qué se modificó, por qué, qué se comprobó, qué falta y dónde continuar.
- Developers capaces de trabajar en su área y entender cómo su cambio afecta el flujo completo.
- Una plantilla de repositorio y reglas reutilizables para los siguientes equipos.
- Grupos de aprendizaje visibles en el sitio, con developers y roles asignados para coordinar el trabajo.

## Gestión de grupos y asignación de roles

El sitio del programa debe permitir organizar participantes sin depender de una lista paralela:

- Crear un grupo y asignarle un nombre.
- Agregar developers al grupo y elegir un rol para cada uno: Backend/API, Base de datos, Frontend, QA/pruebas o Producto/diseño.
- Ver la lista de developers y sus roles por grupo.
- Quitar un developer de un grupo sin borrar el grupo ni a los demás integrantes.

El rol se asigna por pertenencia al grupo, para que una persona pueda participar en proyectos distintos con responsabilidades distintas. En la primera versión, esta pantalla mantiene un roster local de práctica: no crea cuentas, autenticación ni permisos. La administración de acceso y el progreso individual requieren identidad y almacenamiento multiusuario antes de publicar el sitio a varios equipos.

## Harness mínimo por equipo

Siete componentes definen "terminado" para la parte de ingeniería. Primero se acuerdan el propósito, las reglas del repo y los contratos mínimos; después empieza la implementación. Las reglas sirven tanto a developers como a asistentes.

| Componente | Qué debe existir | Criterio de aceptación |
| --- | --- | --- |
| Reglas del repo | `AGENTS.md` como fuente canónica: propósito, estructura, comandos, límites, convenciones, pruebas, seguridad y handoff. Archivos específicos de herramientas solo apuntan a estas reglas. | Una persona o asistente nuevo puede comenzar leyendo `README.md` y `AGENTS.md`; no hay instrucciones contradictorias duplicadas. |
| Documentación viva | `docs/` con brief, criterios, arquitectura, contratos, modelo de datos, decisiones, backlog, QA y entrega. | El repo explica por qué existe cada componente y cómo se relaciona con los demás. Los cambios relevantes actualizan sus docs por PR. |
| Regla para cada cambio | Ticket o plan corto con problema, alcance, exclusiones, criterios, rutas probables, dependencias y verificación. | Otro developer puede continuar el trabajo con el ticket, las reglas y el estado actual del repo. El plan puede ajustarse si aparece nueva evidencia; no se convierte en trámite rígido. |
| Contratos entre áreas | API, tipos compartidos, esquema y comportamiento acordados antes de dividir tareas dependientes. | Web, API y datos pueden avanzar en paralelo con fixtures o datos sintéticos sin inventar contratos incompatibles. |
| Calidad automatizada | Build, lint y pruebas relevantes en CI por PR; comandos locales documentados. | La integración bloquea cambios que incumplen controles automáticos acordados. La revisión humana sigue siendo obligatoria. |
| Seguridad de Git | Rama principal protegida, PR obligatorio, al menos una revisión, sin push directo y secretos fuera del repo. | Las protecciones y el escaneo de secretos están activos y comprobados. |
| Revisión y handoff | Checklist de revisión y formato de entrega con evidencia, limitaciones y siguiente paso. | Cualquier developer del equipo puede explicar y retomar el cambio siguiendo lo escrito; los conocimientos no quedan encerrados en el rol asignado. |

## Estructura de repositorio recomendada

Una estructura base reduce la curva de aprendizaje y ayuda al siguiente developer a encontrar el contexto. Para este programa se usa un repositorio compartido con frontend, API y documentación. Si un proyecto existente requiere otra distribución, se registra la decisión en vez de forzar carpetas vacías.

```
/
├── AGENTS.md              # reglas canónicas para el equipo y asistentes
├── CLAUDE.md              # opcional: referencia a AGENTS.md, sin duplicar reglas
├── README.md
├── apps/
│   ├── api/                 # Bun + Hono; rutas, validación y reglas
│   │   ├── src/db/           # Drizzle: esquema
│   │   └── drizzle/          # migraciones versionadas
│   └── web/                  # Vike + React + TypeScript estricto
│       ├── pages/            # rutas por archivos
│       └── src/              # componentes y lógica por funcionalidad
├── packages/
│   └── contracts/            # tipos y esquemas Zod compartidos
├── docs/
│   ├── product/           # problema, alcance y criterios de aceptación
│   ├── architecture/      # mapa de componentes y flujo
│   ├── api/               # rutas y contratos
│   ├── data/              # modelo, migraciones y datos sintéticos
│   ├── backlog/           # tickets pequeños, estado y dependencias
│   ├── qa/                # casos, comandos y evidencia
│   ├── delivery/          # handoff, demo y definición de terminado
│   └── decisions/         # ADRs y cambios de decisiones
└── .github/
    ├── workflows/         # CI
    ├── CODEOWNERS
    └── pull_request_template.md
```

`AGENTS.md` debe explicar qué hace el proyecto, dónde está la fuente de verdad de cada decisión, cómo iniciarlo y comprobarlo, las convenciones, los límites de seguridad y cómo dejar el handoff. Puede haber instrucciones más específicas en subcarpetas. `CLAUDE.md` u otros archivos de herramientas deben referir al archivo canónico para evitar que las reglas diverjan. No se exige aprender ni copiar una biblioteca de prompts: el comportamiento esperado vive en el repo y en sus controles automáticos.

Se recomienda mantenerlo breve y práctico con estas secciones:

```markdown
# Reglas para trabajar en este repositorio
## Qué hace el producto y qué queda fuera
## Mapa del repositorio y fuente de verdad
## Arquitectura y contratos que se deben preservar
## Cómo iniciar y verificar cambios
## Flujo de trabajo para un ticket y actualización de documentación
## Seguridad, datos y acciones que requieren autorización
## Qué incluir en el handoff de cada PR
```

El ticket aporta el resultado de la tarea y sus criterios. `AGENTS.md` aporta las reglas permanentes para realizarla. La plantilla de PR conserva el estado del trabajo y la evidencia. Así, cada persona no tiene que reconstruir las mismas instrucciones en cada conversación con la IA.

Las reglas se mantienen por nivel para que sean concretas y fáciles de encontrar:

| Nivel | Fuente de verdad | Responde a |
| --- | --- | --- |
| Reglas compartidas | `AGENTS.md` raíz | ¿Qué es el proyecto? ¿Cómo se ejecuta y verifica? ¿Qué límites aplican a todos? |
| Reglas del área | `AGENTS.md` en una subcarpeta, solo cuando hace falta | ¿Qué convenciones específicas aplican a esta capa? |
| Decisiones y contratos | `docs/architecture/`, `docs/api/`, `docs/data/` | ¿Por qué está organizado así? ¿Qué comportamiento y compatibilidad acordamos? |
| Trabajo actual | Ticket o plan breve en `docs/backlog/` | ¿Qué resultado buscamos ahora, qué no incluye y cómo sabremos que terminó? |
| Reglas automatizables | CI, linters, pruebas y protecciones de Git | ¿Qué puede comprobarse de forma consistente sin depender de la memoria del reviewer? |
| Entrega | Plantilla de PR | ¿Qué cambió, cómo se verificó y cómo puede continuar otra persona? |

### Regla principal: cada cambio debe poder retomarse

El cambio no se considera entregado cuando solo compila en la máquina de quien lo hizo. El ticket, el PR y el repositorio deben dejar el contexto suficiente para que otro developer sepa qué hacer a continuación.

Todo PR deja un handoff breve con:

1. **Objetivo y estado:** qué necesidad atiende y qué queda hecho o pendiente.
2. **Decisiones:** qué cambió y por qué; enlaces a contrato o ADR cuando corresponda.
3. **Verificación:** comandos realmente ejecutados y resultados; qué no se pudo comprobar.
4. **Impacto y límites:** áreas tocadas, riesgos, datos sintéticos usados y compatibilidad.
5. **Siguiente paso:** tarea pendiente, bloqueo o instrucción para continuar.

La regla de incorporación se prueba al menos una vez: un developer que no construyó la funcionalidad clona el repo, sigue el README, ejecuta las comprobaciones y completa un cambio pequeño usando solo el ticket, las reglas y la documentación. Los problemas que encuentre se corrigen como parte del proyecto.

## Cadencia de 4 semanas

| Semana | Trabajo | Evidencia / puerta de salida |
| --- | --- | --- |
| 1 — Preparar para compartir | Elegir un flujo pequeño; definir propósito, no objetivos, criterios, arquitectura, contrato, modelo y reglas del repo. Acordar comandos locales y datos sintéticos. | Un developer que no escribió los documentos encuentra dónde empezar, entiende el contrato y puede iniciar el proyecto siguiendo el README. |
| 2 — Construir con reglas comunes | Dividir el backlog por cambios pequeños. Antes de editar, cada persona lee las reglas y el ticket; trabaja mediante PR con verificaciones pertinentes. | PRs pequeños enlazan los criterios, archivos afectados, comandos ejecutados y decisiones. CI aplica controles acordados. |
| 3 — Integrar y transferir | Integrar las áreas, reproducir y corregir un defecto, revisar impacto entre capas. Un developer retoma un PR o ticket de otra persona usando solo el repositorio. | El handoff permite continuar sin explicación oral; se registran faltantes o reglas ambiguas y se corrigen. |
| 4 — Demostrar y dejar listo para el siguiente equipo | Completar un cambio nuevo, ejecutar la demo desde un clon limpio, revisar el README y cerrar la retro con mejoras puntuales a las reglas. | Cualquier integrante del equipo puede ejecutar el flujo y explicar criterios, evidencia, límites y siguiente paso. El repositorio queda listo para que otro developer tome una tarea. |

Las puertas dependen de evidencia y reglas acordadas, no de aprobar prompts ni de que un mentor esté presente en cada fase.

## Roles y reglas de colaboración

Cada developer tiene un foco principal y trabaja bajo las mismas reglas del repositorio. Los contratos entre capas se acuerdan antes de dividir trabajo dependiente y todo integrante debe entender el flujo completo a nivel suficiente para mantenerlo.

| Rol | Foco principal | Área típica | Acuerdo de colaboración |
| --- | --- | --- | --- |
| Dev 1 | API y reglas de negocio | `apps/api/src/routes/`, `apps/api/src/services/` | Mantiene el contrato Hono/Zod junto con web; no decide el comportamiento solo. |
| Dev 2 | Persistencia y modelo de datos | `apps/api/src/db/`, `apps/api/drizzle/` | Sigue el modelo Drizzle y documenta impacto/reversa de SQLite o PostgreSQL. |
| Dev 3 | Web y experiencia de uso | `apps/web/pages/`, `apps/web/src/` | Consume el contrato con React, TanStack Query y `fetch`; cubre carga, error, vacío y éxito. |
| Dev 4 | QA, integración y entrega | `docs/qa/`, `.github/`, automatización | Vincula criterios con evidencia, mantiene CI y facilita el handoff. |

Reglas del equipo:

- Los contratos (`docs/api/` y tipos compartidos si existen) se acuerdan en la semana 1 y se cambian por PR con impacto explícito para quienes los consumen.
- `CODEOWNERS` solicita revisión de personas con contexto; la responsabilidad de entender el sistema es compartida y nadie queda como única persona capaz de mantener una carpeta.
- Con 3 devs, QA e integración se rotan o comparten. Una funcionalidad de IA dentro del producto solo se agrega si los criterios de producto la requieren; no es requisito para practicar desarrollo AI-first.
- Cada developer revisa cambios de otra área y deja instrucciones de continuidad. La asignación de foco no crea silos ni propiedad exclusiva del conocimiento.

## Proyectos para elegir

Cada equipo elige **un proyecto** de estas tres opciones y lo desarrolla durante las cuatro semanas. Todas practican el mismo método rules-first; la IA se usa para apoyar el desarrollo, no es requisito incorporarla al producto. Los datos y escenarios de demo son sintéticos.

| Proyecto | Flujo de MVP | Trabajo por especialidad |
| --- | --- | --- |
| **Agenda de citas para un negocio pequeño** | Consultar espacios disponibles, crear una cita, impedir dobles reservas y cancelar para liberar el horario. | Producto define disponibilidad y criterios; API valida reservas y conflictos; Datos modela servicios, horarios y citas; Web construye calendario/formulario; QA cubre reserva, conflicto y cancelación. |
| **Base de conocimiento interna** | Buscar artículos sintéticos por texto y categoría, abrir la fuente, y crear o editar artículos. | Producto define qué resultados son útiles; API consulta y valida artículos; Datos prepara artículos, categorías y fuentes ficticias; Web implementa búsqueda y detalle; QA prueba filtros, vacío, fuente y persistencia. |
| **Triage de tickets de soporte** | Consultar seis tickets sintéticos, filtrar por estado y guardar actualizaciones. | Producto define estados y criterios; API consulta y actualiza tickets; Datos modela tickets e historial; Web construye bandeja y detalle; QA prueba flujo, validación y casos límite. |

Los límites sugeridos mantienen los proyectos terminables en cuatro semanas: agenda sin calendarios externos, notificaciones ni pagos; conocimiento sin documentos reales, respuestas generadas, embeddings ni permisos de producción; triage sin tickets reales, integraciones externas ni decisiones automáticas de IA. Cada grupo conserva estas fronteras o propone un cambio por PR de documentación y plan aprobado.

La aplicación del curso presenta los tres briefs y guarda la elección por grupo. Los equipos definen el plan de implementación en su propio repositorio; el sitio no entrega un producto terminado ni crea repositorios por ellos.

## Criterios de elección

El flujo debe tener un usuario claro, alcance pequeño, datos de ejemplo fáciles de generar y una demo de 10 minutos. Los criterios de aceptación deben cubrir el caso normal, un error o límite, persistencia cuando aplique y una ejecución que otro developer pueda seguir desde el README.
## Criterios de éxito y entregables de cierre

Un equipo tiene éxito si al final de la semana 4 cumple todo lo siguiente:

- [ ] Demo de 10 minutos que inicia desde instrucciones del repo y muestra los criterios principales.
- [ ] Repo con los 7 componentes del harness verificables: reglas claras, docs útiles, CI verde y rama principal protegida.
- [ ] Todo cambio integrado tiene PR, revisión humana, verificaciones observadas y handoff breve.
- [ ] Un developer que no hizo un cambio puede explicar su propósito y continuar el siguiente paso con el contexto escrito.
- [ ] Al menos una persona que no construyó el proyecto lo clona, lo ejecuta y completa una tarea pequeña sin ayuda oral.
- [ ] Retro en `docs/retro.md` con mejoras a reglas, documentación y controles; no depende de crear prompts o skills.
- [ ] Plantilla de repositorio y reglas útiles publicadas para equipos siguientes.

Indicadores a registrar por equipo: tiempo para ejecutar desde un clon limpio; tiempo para que otra persona complete su primera tarea; porcentaje de criterios con evidencia; defectos o retrabajo encontrados después de integrar; y bloqueos atribuibles a contratos o documentación faltantes. No se mide el éxito por el porcentaje de código generado por IA ni por el volumen de prompts.

## Qué necesitamos de management

Para arrancar se necesitan cinco decisiones:

1. **Tiempo protegido:** 2-8 horas semanales por developer durante 4 semanas, reconocidas como trabajo y no como tiempo libre.
2. **Herramientas y políticas:** asistentes aprobados, política de datos, organización de GitHub con repos privados y branch protection.
3. **Equipos y proyectos:** quiénes participan y qué proyecto toma cada equipo.
4. **Un sponsor y un responsable de reglas:** el sponsor desbloquea decisiones organizacionales; una persona mantiene la plantilla y revisa cambios a las reglas. El programa no depende de un instructor.
5. **Fecha de demo y prueba de transferencia:** agendar el cierre de la semana 4 y proteger tiempo para que una persona externa al equipo haga el ejercicio de incorporación.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Poca disponibilidad de horas semanales | Alcance pequeño, hitos semanales y un plan que cubre el mínimo de 2 horas |
| Las reglas quedan obsoletas o son demasiado largas | Responsable de reglas; mantener solo instrucciones activas, concretas y revisadas junto al código |
| La IA genera código que nadie entiende | Review humano, evidencia y handoff obligatorio; una segunda persona debe poder explicar y continuar el cambio |
| Los roles se bloquean entre sí | Contratos aprobados en la semana 1, ejemplos sintéticos y revisión cruzada desde el inicio |
| Se codifica sin entender el cambio | Ticket corto con criterios y límites; las reglas exigen inspeccionar el repo, verificar el diff y reportar resultados reales |
| El conocimiento queda en conversaciones o en una sola persona | Registrar decisiones y estado en el repo; probar la continuidad con un developer distinto |
| La documentación se vuelve trámite | Mantener una única fuente de verdad y pedir solo documentos que ayuden a decidir, construir, comprobar o retomar trabajo |
| Secretos o claves de API en el repo | Branch rules, escaneo de secretos en CI y variables en el gestor de secretos |
| El programa se estanca como el plan anterior | Sponsor definido, fecha de demo fija y entrega de valor en 4 semanas |
