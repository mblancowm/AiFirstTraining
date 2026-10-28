import type { ProjectKey, TeamRole } from "@wm-ai-first/contracts";
import { projects } from "./content";

export type WeeklyRoleGuide = {
  goal: string;
  actions: string[];
  deliverable: string;
};

export const weeklyTeamPractices: Record<string, string> = {
  "01": "Todo el equipo acuerda usuario, problema y alcance. QA convierte los criterios en comprobaciones; API, datos y frontend confirman que el mismo ejemplo de request, respuesta y fixture permite construir el flujo.",
  "02": "En cada PR, una persona de otra área explica qué entendió del cambio y qué comprobó. El foco del rol coordina; la responsabilidad sigue siendo del equipo.",
  "03": "Hagan un intercambio: otra persona retoma un ticket o reproduce el defecto leyendo solo el repo, el ticket y el handoff.",
  "04": "Una persona que no implementó el flujo clona el repo, lo ejecuta, completa una tarea pequeña y da la demo usando la documentación.",
};

export const weeklyRoleGuides: Record<string, Record<TeamRole, WeeklyRoleGuide>> = {
  "01": {
    backend: {
      goal: "Hacer explícita la conversación entre la interfaz y la API antes de implementarla.",
      actions: [
        "Identifiquen las operaciones necesarias para completar el flujo elegido.",
        "Especifiquen entradas, respuestas, validaciones y errores con un ejemplo concreto.",
        "Revisen el contrato con frontend, datos y QA; aclaren qué capa es responsable de cada regla.",
      ],
      deliverable: "docs/api/contract.md y tipos compartidos acordados antes de dividir tickets dependientes.",
    },
    data: {
      goal: "Definir los datos mínimos y las reglas que deben seguir siendo ciertas.",
      actions: [
        "Dibujen las entidades a partir del flujo y de los criterios, no de supuestos futuros.",
        "Aclaren identificadores, relaciones, campos obligatorios, estados y restricciones.",
        "Preparen pocos datos sintéticos, repetibles y reconocibles para probar el caso normal y un límite.",
      ],
      deliverable: "docs/data/model.md y un primer fixture sintético versionado.",
    },
    frontend: {
      goal: "Convertir el flujo acordado en pantallas y estados que la persona pueda entender.",
      actions: [
        "Dibujen el recorrido de pantalla en pantalla y qué acción inicia cada paso.",
        "Para cada pantalla, describan carga, resultado, vacío y error; no asuman que siempre hay datos.",
        "Confirmen con backend los nombres y formas del contrato antes de crear respuestas ficticias en la UI.",
      ],
      deliverable: "docs/product/screen-flow.md con pantallas, acciones, estados y campos del contrato.",
    },
    qa: {
      goal: "Facilitar acuerdos del equipo y convertirlos en comprobaciones que otra persona pueda repetir.",
      actions: [
        "Faciliten que todo el equipo defina usuario, necesidad, alcance y exclusiones antes de escribir los tickets.",
        "Transformen los criterios acordados en una condición inicial, una acción y un resultado observable.",
        "Agreguen al menos un caso límite, uno inválido y uno de estado vacío o error.",
        "Confirmen con frontend que los estados y mensajes ayudan a recuperarse; acuerden evidencia y comando de verificación.",
      ],
      deliverable: "docs/product/brief.md y docs/qa/acceptance.md con alcance del equipo y criterios Given / When / Then.",
    },
  },
  "02": {
    backend: {
      goal: "Implementar una operación a la vez y conservar el contrato acordado.",
      actions: [
        "Antes de editar, lean AGENTS.md, el ticket, el contrato y las validaciones existentes.",
        "Implementen la ruta y la regla de negocio en el lugar definido por la arquitectura.",
        "Prueben respuesta normal y errores; expliquen el diff y el resultado real de los comandos en el PR.",
      ],
      deliverable: "Un PR pequeño con ruta, validación, pruebas y vínculo al criterio que satisface.",
    },
    data: {
      goal: "Hacer que el esquema y los datos iniciales se puedan reconstruir en cualquier clon.",
      actions: [
        "Implementen una migración versionada; eviten depender de cambios manuales en una base local.",
        "Preparen un seed pequeño con identificadores estables y datos completamente sintéticos.",
        "Comprueben creación, actualización o eliminación según el flujo, y documenten cómo reiniciar los datos.",
      ],
      deliverable: "Migración y seed reproducibles, con instrucciones de inicio o reinicio en README.",
    },
    frontend: {
      goal: "Construir el camino principal con estados claros y el contrato real del equipo.",
      actions: [
        "Implementen una pantalla o interacción pequeña y conecten la operación del contrato acordado.",
        "Muestren carga, éxito, vacío y error con mensajes que indiquen el siguiente paso.",
        "Revisen teclado, etiquetas y mensajes accesibles; no oculten errores detrás de una pantalla vacía.",
      ],
      deliverable: "Un flujo navegable y un PR con estados de interfaz comprobados.",
    },
    qa: {
      goal: "Ayudar al equipo a dividir el alcance y detectar regresiones antes de integrar.",
      actions: [
        "Trabajen con las otras tres áreas para dividir el flujo en tickets pequeños vinculados a criterios.",
        "En cada ticket, comprueben que el problema, alcance, exclusiones, dependencias y verificación están claros.",
        "Automaticen primero los criterios de mayor valor y las reglas que no deben romperse.",
        "Prueben entradas normales, inválidas y límites en la capa adecuada; eviten duplicar pruebas sin propósito.",
        "Revisen el diff y el reporte de CI, y separen lo que se comprobó de lo que sigue pendiente.",
      ],
      deliverable: "Pruebas pertinentes en CI y una nota de verificación con comandos y resultados reales.",
    },
  },
  "03": {
    backend: {
      goal: "Encontrar y corregir problemas de integración sin crear una segunda versión del contrato.",
      actions: [
        "Reproduzcan el problema con request, datos y respuesta observados; guarden los pasos en un caso de prueba.",
        "Comprueben límites de transacción, validaciones, códigos de error y compatibilidad de la respuesta.",
        "Corrijan la causa y actualicen el contrato o la documentación si el comportamiento acordado estaba incompleto.",
      ],
      deliverable: "Defecto reproducible, corrección cubierta por prueba y contrato coherente con la implementación.",
    },
    data: {
      goal: "Confirmar que la información conserva su integridad durante el flujo integrado.",
      actions: [
        "Reinicien la base y carguen el seed desde cero para detectar dependencias locales ocultas.",
        "Comprueben relaciones, duplicados, estados e historial después de las operaciones del flujo.",
        "Verifiquen que las migraciones anteriores y nuevas se aplican en orden y están documentadas.",
      ],
      deliverable: "Resultado de una reconstrucción limpia y evidencia de integridad para los casos principales.",
    },
    frontend: {
      goal: "Conectar la interfaz a la API y hacer visible qué ocurre en cada resultado.",
      actions: [
        "Usen la respuesta real del contrato y confirmen nombres, estados y formatos con backend.",
        "Comprueben carga, éxito, vacío, error de validación y conflicto; preserven la entrada cuando ayude a recuperarse.",
        "Revisen juntos al menos un cambio de otra área y dejen en el PR cualquier impacto de integración.",
      ],
      deliverable: "Flujo integrado con estados de error recuperables y notas sobre el impacto entre capas.",
    },
    qa: {
      goal: "Probar el sistema como una persona usuaria y ayudar al equipo a resolver discrepancias con evidencia.",
      actions: [
        "Ejecuten de inicio a fin el flujo normal y un límite usando el fixture del equipo.",
        "Si hay una discrepancia, faciliten una decisión: defecto, regla faltante o cambio de alcance; registren el acuerdo.",
        "Registren el defecto con estado inicial, pasos, resultado esperado, resultado observado y evidencia.",
        "Después de la corrección, repitan el caso y pidan a otra persona continuar un ticket o PR distinto.",
      ],
      deliverable: "Caso integrado en docs/qa/, evidencia de la corrección y resultado de la prueba de transferencia.",
    },
  },
  "04": {
    backend: {
      goal: "Dejar una API que otra persona pueda ejecutar, comprender y modificar con seguridad.",
      actions: [
        "Comprueben que rutas, errores y contratos publicados coinciden con el comportamiento final.",
        "Escriban los comandos reales para instalar, iniciar, verificar y reconstruir desde un clon limpio.",
        "Cierre cada PR con decisión, pruebas ejecutadas, límites y el siguiente ticket que puede tomar alguien más.",
      ],
      deliverable: "README y docs/api actualizados, CI útil y handoff final del flujo backend.",
    },
    data: {
      goal: "Probar que el modelo y los datos se pueden reconstruir sin archivos locales del equipo.",
      actions: [
        "Desde una base vacía, apliquen todas las migraciones y carguen el seed sintético.",
        "Repitan las operaciones principales y confirmen persistencia después de reiniciar la aplicación.",
        "Documenten supuestos del modelo, límites del fixture y cómo preparar un entorno nuevo.",
      ],
      deliverable: "Evidencia de migración y seed desde cero, más instrucciones y límites en docs/data/.",
    },
    frontend: {
      goal: "Dejar un flujo completo demostrable, accesible y entendible para quien recibe el repo.",
      actions: [
        "Recorran la aplicación desde el punto de entrada documentado y corrijan bloqueos del flujo principal.",
        "Verifiquen errores y estados vacíos, etiquetas, navegación por teclado y lectura en pantalla pequeña.",
        "Anoten cualquier limitación visual o funcional conocida junto al handoff, no solo en la demo oral.",
      ],
      deliverable: "Flujo listo para demo y un handoff que indique pantallas, estados y límites conocidos.",
    },
    qa: {
      goal: "Coordinar la comprobación final, la transferencia y la demostración de los criterios acordados por el equipo.",
      actions: [
        "Con el equipo, ordenen la demo alrededor de usuario, necesidad, flujo, criterio cumplido y límite conocido.",
        "Pidan a alguien fuera del equipo que clone el repo y siga únicamente el README.",
        "Observen si puede iniciar la aplicación, completar una tarea pequeña y explicar cómo verificarla.",
        "Seleccionen datos sintéticos para la demo y registren tiempos, pasos confusos, evidencia, defectos y resultado de CI.",
      ],
      deliverable: "docs/delivery/demo.md, checklist de clon limpio y evidencia por criterio con hallazgos de transferencia.",
    },
  },
};

export type WeeklyRolePlan = {
  files: string[];
  why: string;
  verify: string;
};

export const weeklyRolePlans: Record<string, Record<TeamRole, WeeklyRolePlan>> = {
  "01": {
    backend: {
      files: ["docs/api/contract.md", "packages/contracts/src/index.ts"],
      why: "Frontend necesita conocer los campos y errores antes de conectar pantallas. Datos valida que el contrato se pueda persistir y QA puede escribir casos sin adivinar el comportamiento.",
      verify: "Revisen un ejemplo de éxito y uno de error con Frontend, Datos y QA. Los nombres del request, respuesta y errores deben coincidir con el flujo de pantalla, los criterios y el modelo.",
    },
    data: {
      files: ["docs/data/model.md"],
      why: "Un modelo mínimo evita guardar datos de más y permite que Backend implemente reglas sobre relaciones y restricciones acordadas, no sobre supuestos locales.",
      verify: "Cada dato que aparece en un criterio o contrato tiene un lugar definido. Revisen relaciones, campos obligatorios y restricciones; el ejemplo usa datos sintéticos y se puede repetir.",
    },
    frontend: {
      files: ["docs/product/screen-flow.md"],
      why: "El mapa permite que QA derive casos y que Backend y Datos entiendan qué debe ocurrir antes de construir. También evita diseñar pantallas con respuestas que el contrato no ofrece.",
      verify: "Cada paso del flujo tiene una acción, campos del contrato y estados de carga, éxito, vacío y error. QA confirma que cada criterio se puede ver en una pantalla.",
    },
    qa: {
      files: ["docs/product/brief.md", "docs/qa/acceptance.md"],
      why: "El brief pone límites al trabajo; los criterios observables permiten que las cuatro áreas construyan y revisen el mismo resultado.",
      verify: "Cada criterio indica contexto inicial, acción y resultado observable. Incluyan el flujo normal, un límite, una entrada inválida y un caso vacío o de error; confirmen que todo cabe en el alcance del brief.",
    },
  },
  "02": {
    backend: {
      files: ["apps/api/src/routes/<recurso>.ts", "apps/api/src/services/<recurso>.ts", "apps/api/test/<operacion>.test.ts"],
      why: "Separar la ruta HTTP de la regla de negocio hace el cambio más fácil de probar. La ruta conserva el contrato acordado y el test detecta si una modificación lo rompe.",
      verify: "Ejecuten la verificación documentada en README para el caso normal y una entrada inválida. Confirmen status, respuesta y error contra el contrato; anoten el comando y resultado real en el PR.",
    },
    data: {
      files: ["apps/api/src/db/schema.ts", "apps/api/drizzle/<version>_<cambio>.sql", "apps/api/src/db/seed.ts"],
      why: "El esquema, la migración y el seed hacen que cualquier integrante pueda reconstruir el mismo estado inicial sin editar su base a mano.",
      verify: "Desde una base vacía, apliquen las migraciones en orden y carguen el seed. Repitan la preparación y comprueben que los IDs y resultados sean estables y todos los datos sean sintéticos.",
    },
    frontend: {
      files: ["apps/web/pages/<flujo>/", "apps/web/src/<componentes-del-flujo>/", "apps/web/test/<flujo>.test.ts"],
      why: "Una pantalla construida contra el contrato evita respuestas inventadas. Los estados visibles ayudan a la persona a entender qué pasó y qué acción puede tomar.",
      verify: "Recorran la pantalla con el contrato o fixture acordado. Comprueben carga, éxito, vacío y error, además de etiquetas y navegación por teclado; registren qué criterio cubre el test.",
    },
    qa: {
      files: ["docs/backlog/T-###-<tema>.md", "apps/api/test/ o apps/web/test/", "docs/qa/test-plan.md"],
      why: "Tickets ligados a criterios dejan claro qué se va a cambiar; pruebas en la capa adecuada detectan regresiones sin duplicar trabajo.",
      verify: "Cada ticket enlaza un criterio, dependencias, rutas probables y verificación. La prueba correspondiente corre con el comando de README y el reporte separa resultado observado de lo pendiente.",
    },
  },
  "03": {
    backend: {
      files: ["apps/api/test/<operacion>.test.ts", "apps/api/src/routes/<recurso>.ts", "apps/api/src/services/<recurso>.ts", "docs/api/contract.md si cambia el acuerdo"],
      why: "Reproducir primero el defecto protege contra corregir el síntoma equivocado. Mantener el contrato evita que Frontend tenga que adivinar o crear una segunda interpretación.",
      verify: "Confirmen que el caso falla antes de la corrección y pasa después. Comparen la respuesta real con el contrato y anoten request, fixture, resultado esperado y observado.",
    },
    data: {
      files: ["apps/api/src/db/schema.ts si cambia el modelo", "apps/api/src/db/seed.ts", "apps/api/test/<persistencia>.test.ts", "docs/data/model.md si cambian reglas"],
      why: "La integración revela problemas que una pantalla no muestra: relaciones rotas, duplicados o datos que desaparecen al reiniciar.",
      verify: "Reconstruyan la base desde cero, ejecuten el flujo integrado y reinicien la aplicación. Comprueben relaciones, restricciones y persistencia con el mismo fixture sintético.",
    },
    frontend: {
      files: ["apps/web/src/<componentes-del-flujo>/", "apps/web/test/<flujo>.test.ts", "docs/product/screen-flow.md si cambia un estado"],
      why: "Conectar la respuesta real permite que los estados de la pantalla reflejen lo que API y Datos realmente entregan y que el usuario pueda recuperarse de un error.",
      verify: "Prueben el flujo integrado con respuesta real: carga, éxito, vacío, error de validación y conflicto. Confirmen que el mensaje explica el problema y ofrece un siguiente paso seguro.",
    },
    qa: {
      files: ["docs/qa/test-plan.md", "docs/backlog/T-###-<defecto>.md", "handoff del PR"],
      why: "La evidencia ayuda al equipo a distinguir un defecto de una regla faltante o un cambio de alcance, y permite que otra persona repita la comprobación.",
      verify: "Registre pasos, estado inicial, esperado, observado y evidencia. Tras corregir, repita el mismo caso, actualice el resultado y pida a alguien más retomar el ticket leyendo el repo.",
    },
  },
  "04": {
    backend: {
      files: ["README.md", "docs/api/contract.md", "apps/api/test/", "handoff del PR"],
      why: "Una persona nueva necesita saber cómo iniciar y comprobar la API, cuál es su contrato y qué límites siguen abiertos antes de modificarla.",
      verify: "Siga las instrucciones desde un clon limpio y ejecute los comandos documentados. Compare rutas y errores publicados con la implementación; el handoff indica evidencia, pendientes y próximo ticket.",
    },
    data: {
      files: ["docs/data/model.md", "apps/api/drizzle/", "apps/api/src/db/seed.ts", "docs/qa/test-plan.md"],
      why: "Migraciones y seed repetibles eliminan la dependencia de una base local y permiten que el siguiente developer compruebe el comportamiento desde cero.",
      verify: "Desde una base vacía, aplique todas las migraciones, cargue los datos sintéticos, complete el flujo y reinicie. Registre comandos y resultados observados, no solo que funcionó.",
    },
    frontend: {
      files: ["apps/web/pages/", "apps/web/src/", "docs/product/screen-flow.md", "docs/delivery/demo.md"],
      why: "Una interfaz accesible y documentada deja que otra persona ejecute el recorrido y entienda sus estados sin que quien la construyó tenga que explicarla.",
      verify: "Recorra el flujo desde el README con teclado y pantalla pequeña. Compruebe estados vacíos y de error, y documente en la demo cualquier límite visual o funcional conocido.",
    },
    qa: {
      files: ["docs/delivery/demo.md", "docs/qa/test-plan.md", "docs/delivery/handoff.md"],
      why: "Una transferencia independiente comprueba si el repositorio enseña lo suficiente para ejecutar, verificar y continuar el proyecto, más allá de una demo preparada por sus autores.",
      verify: "Pida a alguien que no implementó el flujo clonarlo y seguir README sin ayuda oral. Registre si lo ejecutó, completó una tarea, explicó la verificación y terminó la demo en 10 minutos.",
    },
  },
};

export function makeRoleExample(weekNumber: string, role: TeamRole, projectKey: ProjectKey) {
  const project = projects[projectKey];
  const criterion = project.criteria[0];
  const secondCriterion = project.criteria[1] ?? criterion;
  const firstRoute = project.contractExample.split("\n").slice(0, 6).join("\n");
  const userFlow = `${project.user}\n\nFlujo: ${project.flow}`;

  if (weekNumber === "01") {
    if (role === "backend") return { title: "Contrato que el equipo revisa", body: firstRoute };
    if (role === "data") return { title: "Modelo y datos de partida", body: `${project.dataModel}\n\nFixture sintético:\n${project.sample}` };
    if (role === "frontend") return { title: "Recorrido y estados de pantalla", body: `${userFlow}\n\nEn cada paso, acuerden: cargando · resultado · vacío · error.` };
    return { title: "Acuerdo del equipo convertido en prueba", body: `Usuario: ${project.user}\nProblema y flujo: ${project.flow}\nEn alcance: ${project.scope.slice(0, 2).join("; ")}\nFuera de alcance: ${project.outOfScope[0]}\n\nDado que el equipo usa datos sintéticos de ${project.name}\nCuando la persona completa el flujo\nEntonces: ${criterion}\n\nAgreguen un ejemplo inválido y uno sin resultados.` };
  }

  if (weekNumber === "02") {
    if (role === "backend") return { title: "Implementación guiada por contrato", body: `${firstRoute}\n\nAntes del PR: valida la entrada, cubre respuesta normal y error, y enlaza el criterio “${criterion}”.` };
    if (role === "data") return { title: "Cambio de esquema reproducible", body: `Modelo: ${project.dataModel}\n\nLa migración crea la estructura; el seed carga solo datos sintéticos:\n${project.sample}\n\nIncluyan un comando documentado para reiniciar el entorno.` };
    if (role === "frontend") return { title: "Estados de la interfaz", body: `Flujo: ${project.flow}\n\n1. Cargando: informar que se consulta.\n2. Resultado: mostrar datos y acción siguiente.\n3. Vacío: explicar qué se puede cambiar.\n4. Error: indicar cómo recuperarse.` };
    return { title: "Ticket y prueba asociados", body: `Problema: la persona necesita completar ${project.flow.toLowerCase()}\nAlcance: ${project.scope[0]}\nFuera de alcance: ${project.outOfScope[0]}\nCriterio: ${criterion}\n\nPrueba normal: completar el flujo.\nCaso límite: ${secondCriterion}\nEvidencia: comando, resultado real y enlace al PR.` };
  }

  if (weekNumber === "03") {
    if (role === "backend") return { title: "Reproducción antes de corregir", body: `${firstRoute}\n\n1. Repetir la solicitud con el fixture del repo.\n2. Registrar respuesta actual y esperada.\n3. Agregar una prueba que falla antes de corregir.\n4. Confirmar que el contrato sigue siendo compatible.` };
    if (role === "data") return { title: "Comprobación de integridad", body: `Después de completar “${project.flow}”:\n- Confirmen que ${project.dataModel.split(" · ")[0]} conserva sus relaciones.\n- Reinicien la aplicación y vuelvan a consultar el resultado.\n- Comparen el estado persistido con el fixture sintético.` };
    if (role === "frontend") return { title: "Respuesta de error conectada", body: `Si una operación de “${project.flow}” falla, la pantalla debe conservar el contexto útil, explicar el problema en lenguaje claro y ofrecer una acción segura para continuar. Verifiquen también carga, éxito y vacío con la API integrada.` };
    return { title: "Decisión y reporte de defecto", body: `Criterio relacionado: ${secondCriterion}\n\nPrimero, el equipo decide si es defecto, regla faltante o cambio de alcance.\nPasos: iniciar con el fixture → completar el flujo → observar el resultado.\nEsperado: cumplir el criterio.\nObservado: anotar el resultado exacto.\nAl corregir: repetir el mismo caso y guardar evidencia.` };
  }

  if (role === "backend") return { title: "Instrucciones verificables", body: `README: instalar dependencias → iniciar API → ejecutar verificaciones → revisar /api/healthz.\n\nPara este proyecto, documenten los comandos reales, variables requeridas, contrato final y cómo identificar errores conocidos. Nunca incluyan secretos.` };
  if (role === "data") return { title: "Prueba desde una base vacía", body: `1. Crear una base nueva.\n2. Aplicar migraciones en orden.\n3. Cargar el fixture sintético:\n${project.sample}\n4. Completar “${project.flow}”.\n5. Reiniciar y confirmar que los cambios siguen disponibles.` };
  if (role === "frontend") return { title: "Recorrido para la demo", body: `${project.flow}\n\nAntes de presentar, comprueben que cada paso tiene etiquetas claras, respuesta visible, estados de carga/error y funciona con teclado y pantalla pequeña.` };
  return { title: "Demo y checklist de una persona nueva", body: `Guion: 1 min usuario “${project.user}”; 4 min flujo “${project.flow}”; 2 min criterio “${criterion}”; 2 min verificaciones y límite “${project.outOfScope[0]}”; 1 min siguiente paso.\n\n□ Clona el repo y sigue el README sin ayuda oral.\n□ Inicia la app con datos sintéticos.\n□ Completa una tarea pequeña y registra sus verificaciones.\n□ Puede explicar qué falta y dónde continuar.` };
}
