import type { TeamRole } from "@wm-ai-first/contracts";
import type { WeeklyRoleGuide, WeeklyRolePlan } from "./weeklyGuides";

type SpecialistRole = "aiIntegration" | "productUx";
type SpecialistMap<T> = Record<string, Partial<Record<SpecialistRole, T>>>;

export const specialistWeeklyGuides: SpecialistMap<WeeklyRoleGuide> = {
  "01": {
    aiIntegration: {
      goal: "Definir si existe una frontera de IA aprobada y qué condiciones tendría que cumplir.",
      actions: [
        "Inspeccionen en solo lectura dónde podría llamarse un proveedor externo; no hagan llamadas reales.",
        "Confirmen con Producto si una función de IA forma parte del alcance aprobado; no la agreguen por defecto.",
        "Describan entradas, salidas, datos prohibidos y un proveedor simulado para pruebas deterministas.",
      ],
      deliverable: "Mapa de la frontera de proveedor, esquema de salida y supuestos registrados; sin datos reales ni llamadas externas.",
    },
    productUx: {
      goal: "Definir el problema, el alcance y los resultados que el equipo puede comprobar.",
      actions: [
        "Conviertan la solicitud en un resultado para el usuario e indiquen qué queda dentro y fuera.",
        "Escriban criterios de aceptación verificables y señalen supuestos que requieran una decisión.",
        "Revisen el plan de solo lectura y confirmen que atiende los criterios sin ampliar el alcance.",
      ],
      deliverable: "Brief del proyecto con usuario, necesidad, límites, criterios y decisiones bloqueantes.",
    },
  },
  "02": {
    aiIntegration: {
      goal: "Crear una frontera de proveedor controlable, validada y fácil de probar.",
      actions: [
        "Implemente un wrapper pequeño solo si la función fue aprobada; valide entradas y salidas con un esquema estricto.",
        "Use un proveedor simulado para pruebas deterministas y no envíe datos reales a un modelo.",
        "Incluya manejo de timeout, errores y límites antes de conectar cualquier proveedor real.",
      ],
      deliverable: "Módulo de wrapper con validación y mock local, o una práctica sintética aislada si el producto no requiere IA.",
    },
    productUx: {
      goal: "Confirmar que los cambios propuestos siguen resolviendo la necesidad acordada.",
      actions: [
        "Aclare preguntas bloqueantes antes de que el equipo implemente.",
        "Revise cada ticket contra sus criterios y límites antes de aprobar su plan.",
        "Compare la interfaz propuesta con los estados y acciones que acordaron con el equipo.",
      ],
      deliverable: "Criterios y decisiones del brief enlazados a los tickets pequeños.",
    },
  },
  "03": {
    aiIntegration: {
      goal: "Comprobar límites y fallbacks del flujo de IA con entradas sintéticas.",
      actions: [
        "Ejecute casos locales con el proveedor simulado: salida válida, salida inválida y timeout.",
        "Revise validación, sanitización, privacidad, rate limits y manejo de errores.",
        "Registre latencia o costo solo con datos sintéticos; nunca use entradas de clientes.",
      ],
      deliverable: "Resultados reproducibles del mock y evidencia de validación, fallbacks y límites.",
    },
    productUx: {
      goal: "Revisar el comportamiento integrado frente a los criterios de aceptación.",
      actions: [
        "Recorra el flujo normal, los estados vacíos y los errores desde la perspectiva del usuario.",
        "Separe los defectos de las decisiones nuevas de producto; detenga cambios de alcance sin acuerdo.",
        "Aclare cualquier estado o mensaje cuya respuesta esperada no esté definida.",
      ],
      deliverable: "Notas de revisión vinculadas a criterios y lista breve de decisiones pendientes.",
    },
  },
  "04": {
    aiIntegration: {
      goal: "Entregar una frontera de IA explicable y segura, si el alcance la requiere.",
      actions: [
        "Verifique el wrapper y sus fallbacks con el proveedor simulado y pruebas deterministas.",
        "Documente límites de privacidad, timeout, rate limit, costo y latencia; indique qué no se conectó.",
        "Deje pasos claros para evaluar calidad con casos sintéticos.",
      ],
      deliverable: "Resumen de la frontera, resultados de pruebas mock y límites operativos; sin credenciales ni datos reales.",
    },
    productUx: {
      goal: "Confirmar que la demo y el handoff representan los criterios y límites acordados.",
      actions: [
        "Revise la demo contra cada criterio de aceptación y señale cualquier diferencia observada.",
        "Compruebe que no se presenten funciones o comportamientos fuera del alcance aprobado.",
        "Resuma qué queda listo, qué tiene límites y cuál es el siguiente paso del producto.",
      ],
      deliverable: "Resumen de demo y handoff ligado a los criterios, decisiones y pendientes de producto.",
    },
  },
};

export const specialistWeeklyPlans: SpecialistMap<WeeklyRolePlan> = {
  "01": {
    aiIntegration: {
      files: ["docs/ai/provider-boundary.md", "docs/ai/output-schema.md"],
      why: "Una frontera explícita y un proveedor simulado permiten acordar privacidad y validar respuestas sin llamadas externas.",
      verify: "Confirme el alcance con Producto. El mapa señala entradas y salidas sintéticas, datos prohibidos y un mock local.",
    },
    productUx: {
      files: ["docs/product/brief.md", "docs/product/acceptance-criteria.md", "docs/product/decisions.md"],
      why: "Un resultado esperado y unos límites claros permiten que ingeniería y QA resuelvan la misma necesidad.",
      verify: "Cada criterio tiene un resultado observable. Marque supuestos y preguntas bloqueantes sin convertirlos en requisitos inventados.",
    },
  },
  "02": {
    aiIntegration: {
      files: ["apps/api/src/ai/<wrapper>.ts", "apps/api/src/ai/<provider-mock>.ts", "apps/api/test/ai/<wrapper>.test.ts"],
      why: "La validación estricta y los mocks permiten probar la integración sin datos reales ni dependencias externas.",
      verify: "Pruebe con mocks salidas correctas e inválidas, timeout y fallback. Confirme que no se invoca un proveedor real.",
    },
    productUx: {
      files: ["docs/backlog/T-###-<tema>.md", "docs/product/acceptance-criteria.md", "docs/product/decisions.md"],
      why: "Revisar los tickets contra sus criterios evita que preguntas abiertas se conviertan en decisiones implícitas.",
      verify: "Compare el ticket con el alcance y los criterios. Señale estados indefinidos y pida acuerdo antes de cambiar comportamiento o contrato.",
    },
  },
  "03": {
    aiIntegration: {
      files: ["apps/api/test/ai/<wrapper>.test.ts", "docs/ai/provider-boundary.md", "docs/ai/evaluation.md"],
      why: "Las pruebas sintéticas detectan salidas inválidas y fallbacks sin solicitudes a un proveedor real.",
      verify: "Use el mock para éxito, salida inválida, timeout y limitación de tasa. Registre resultados observados y límites de calidad, latencia y costo.",
    },
    productUx: {
      files: ["docs/product/acceptance-criteria.md", "docs/qa/review-notes.md", "docs/product/decisions.md"],
      why: "La revisión integrada descubre criterios que no definen estados límite o de error.",
      verify: "Enlace cada hallazgo con el criterio. Registre por separado defectos y decisiones que necesitan acuerdo.",
    },
  },
  "04": {
    aiIntegration: {
      files: ["README.md", "docs/ai/provider-boundary.md", "docs/ai/evaluation.md", "handoff del PR"],
      why: "Documentar mocks y límites permite que la siguiente persona pruebe la integración sin credenciales ni servicios externos.",
      verify: "Siga los comandos documentados con el mock. Revise fallbacks, privacidad, costo y casos no cubiertos.",
    },
    productUx: {
      files: ["docs/product/acceptance-criteria.md", "docs/delivery/demo.md", "docs/delivery/handoff.md"],
      why: "La demo y el handoff deben mantener el alcance y dejar claros los resultados y pendientes.",
      verify: "Compare la demo con los criterios. Explique qué está cumplido, qué no se pudo verificar y qué pregunta sigue abierta.",
    },
  },
};

export function makeSpecialistRoleExample(weekNumber: string, role: TeamRole) {
  if (role === "aiIntegration") {
    const examples: Record<string, string> = {
      "01": "Confirme si el alcance aprobado requiere IA. Inspeccione la frontera en solo lectura; acuerde esquema, datos sintéticos y proveedor simulado. No haga llamadas externas.",
      "02": "Implemente un wrapper con validación estricta y un mock determinista. Pruebe respuesta válida e inválida, timeout y fallback.",
      "03": "Ejecute éxito, salida inválida, timeout y límite de tasa con el proveedor simulado. Registre resultados y límites de latencia.",
      "04": "Demuestre las pruebas del mock y documente privacidad, límites de costo y latencia. Indique qué no se conectó.",
    };
    return { title: "Práctica sintética de integración de IA", body: examples[weekNumber] };
  }
  const examples: Record<string, string> = {
    "01": "Describa usuario, necesidad, alcance incluido y excluido, criterios observables y supuestos bloqueantes.",
    "02": "Revise el ticket y su plan contra los criterios. Señale preguntas abiertas antes de implementar.",
    "03": "Recorra el flujo integrado y compare resultado esperado y observado. Separe defectos de decisiones nuevas.",
    "04": "Revise la demo y el handoff contra los criterios. Resuma límites, pendientes y siguiente paso.",
  };
  return { title: "Práctica de producto y UX", body: examples[weekNumber] };
}

export function getSpecialistWeeklyGuide(weekNumber: string, role: TeamRole) {
  return specialistWeeklyGuides[weekNumber]?.[role as SpecialistRole];
}

export function getSpecialistWeeklyPlan(weekNumber: string, role: TeamRole) {
  return specialistWeeklyPlans[weekNumber]?.[role as SpecialistRole];
}
