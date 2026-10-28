export const rolePromptTemplates = [
  {
    title: "Backend / API",
    purpose: "Planifica sin cambiar rutas ni contratos acordados.",
    body: [
      "Ticket: [ID y resumen]. Área: [ruta o endpoint]. Criterios: [lista]. Contrato aprobado: [ruta o enlace].",
      "Inspecciona en solo lectura las instrucciones, el plan, el contrato y el código y las pruebas relacionadas. No edites archivos ni cambies el contrato.",
      "Describe el comportamiento actual y propone un plan con validación, autorización, errores, compatibilidad y pruebas. Señala diferencias y espera aprobación antes de implementar.",
    ].join("\n"),
  },
  {
    title: "Base de datos / Datos",
    purpose: "Revisa cambios de esquema, compatibilidad y reversión con datos sintéticos.",
    body: [
      "Ticket: [ID]. Área: [ruta]. Criterios: [lista]. Modelo aprobado: [ruta o enlace].",
      "Inspecciona en solo lectura instrucciones, esquema, modelos y migraciones. No edites, no te conectes a bases de datos ni ejecutes migraciones.",
      "Propón un plan que cubra campos nulos y defaults, compatibilidad, backfill, índices, rollback y pruebas con datos sintéticos. Señala riesgos.",
      "Espera aprobación antes de alterar código o datos.",
    ].join("\n"),
  },
  {
    title: "Web / Frontend",
    purpose: "Planifica estados de interfaz, accesibilidad y pruebas sin cambiar el contrato.",
    body: [
      "Ticket: [ID]. Área: [pantalla o flujo]. Criterios: [lista]. Contrato API aprobado: [ruta o enlace].",
      "Inspecciona en solo lectura instrucciones, diseño de componentes, contrato y pruebas. No edites archivos ni cambies los datos del contrato.",
      "Propón componentes y rutas afectados, estados de carga, éxito, vacío y error, accesibilidad, adaptación móvil y pruebas. Señala decisiones UX pendientes y espera aprobación.",
    ].join("\n"),
  },
  {
    title: "Integración de IA",
    purpose: "Planifica el límite del proveedor, validación, privacidad y fallbacks.",
    body: [
      "Ticket: [ID]. Área: [paquete o ruta]. Entrada y salida aprobadas: [contrato]. Criterios: [lista].",
      "Inspecciona en solo lectura las instrucciones, la integración actual, contratos, configuración y pruebas. No uses credenciales, datos reales ni llamadas externas.",
      "Propón un plan que cubra límite del proveedor, validación de entradas y salidas, fallbacks, privacidad, timeout y costo, pruebas unitarias con mocks y evaluación sintética. Señala discrepancias y espera aprobación.",
    ].join("\n"),
  },
  {
    title: "QA / Pruebas",
    purpose: "Relaciona cada criterio con casos reproducibles y evidencia.",
    body: [
      "Ticket: [ID]. Criterios de aceptación: [lista]. Inspecciona en solo lectura instrucciones, plan, implementación y pruebas existentes. No edites código de producto.",
      "Propón una matriz de pruebas con casos normales, límites y errores. Para cada caso indica pasos reproducibles, datos sintéticos, evidencia esperada y si se ejecutó o solo se propone.",
      "Indica los comandos que se usarían y espera aprobación antes de cambiar pruebas.",
    ].join("\n"),
  },
  {
    title: "Product Manager / UX",
    purpose: "Define resultados, límites, criterios y supuestos sin inventar requisitos.",
    body: [
      "Flujo: [descripción]. Usuario: [tipo]. Solicitud: [ticket]. Límites: [lista]. Contexto autorizado: [rutas o enlaces].",
      "No edites archivos ni inventes requisitos.",
      "Devuelve los resultados del usuario, el flujo principal, casos límite, criterios verificables, supuestos y preguntas pendientes. Separa decisiones bloqueantes de detalles de implementación.",
    ].join("\n"),
  },
];
