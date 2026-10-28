import { useEffect, useState } from "react";
import type { ProjectKey, TeamRole } from "@wm-ai-first/contracts";
import { closeChecklist, coreWorkflow, harness, indicators, learningTracks, moduleSequence, operationalPrompts, projectOptions, projects, roles, risks, sampleHandoff, sampleTicket, starterAgents } from "./content";
import { rolePromptTemplates } from "./rolePrompts";
import { architectureByRole, integrationPlaybook, integrationTracks, sharedTechnologies, studentProjectComponents } from "./architecture";
import { documentationSchedule, markdownFileGroups, repoTree } from "./repositoryGuide";
import { makeProjectKit } from "./kits";
import { makeRoleExample, weeklyRoleGuides, weeklyRolePlans, weeklyTeamPractices } from "./weeklyGuides";
import { getSpecialistWeeklyGuide, getSpecialistWeeklyPlan, makeSpecialistRoleExample } from "./specialistGuides";

type Section = "home" | "method" | "path" | "tracks" | "architecture" | "projects" | "kit";
type Notice = { kind: "success" | "error" | "info"; message: string } | null;
type SavedLearningPath = { projectKey: ProjectKey; role: TeamRole | "all" };

const learningPathStorageKey = "wm-ai-first-learning-path-v1";
const projectKeys = projectOptions.map((project) => project.key);

function isSavedLearningPath(value: unknown): value is SavedLearningPath {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SavedLearningPath>;
  return projectKeys.includes(candidate.projectKey as ProjectKey)
    && (candidate.role === "all" || roles.some((role) => role.key === candidate.role));
}

const navigation: { key: Section; label: string; eyebrow: string }[] = [
  { key: "home", label: "Inicio", eyebrow: "PROGRAMA" },
  { key: "method", label: "Método AI-first", eyebrow: "MÉTODO" },
  { key: "path", label: "Mi ruta", eyebrow: "PREPARAR" },
  { key: "tracks", label: "Tracks de aprendizaje", eyebrow: "APRENDER" },
  { key: "architecture", label: "Arquitectura del proyecto", eyebrow: "PROYECTOS" },
  { key: "projects", label: "Elegir proyecto", eyebrow: "PRACTICAR" },
  { key: "kit", label: "Kit de trabajo", eyebrow: "ENTREGAR" },
];

function downloadProjectKit(projectKey: ProjectKey) {
  const content = makeProjectKit(projectKey);
  const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `kit-${projectKey}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadMarkdownFile(fileName: string, content: string) {
  const url = URL.createObjectURL(new Blob([`${content.trim()}\n`], { type: "text/markdown;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function TrainingApp() {
  return <TrainingShell />;
}

function TrainingShell() {
  const [section, setSection] = useState<Section>("home");
  const [notice, setNotice] = useState<Notice>(null);
  const [learningPath, setLearningPath] = useState<SavedLearningPath>({ projectKey: "appointments", role: "all" });
  const [learningPathLoaded, setLearningPathLoaded] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem("wm-ai-first-progress-v1");
    } catch {
      // Removing old checklist state is optional; the site no longer reads or writes it.
    }
    try {
      const saved = localStorage.getItem(learningPathStorageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isSavedLearningPath(parsed)) setLearningPath(parsed);
      }
    } catch {
      // A blocked or stale browser storage value does not prevent training.
    }
    setLearningPathLoaded(true);
  }, []);

  useEffect(() => {
    if (!learningPathLoaded) return;
    try {
      localStorage.setItem(learningPathStorageKey, JSON.stringify(learningPath));
    } catch {
      // The learning path remains usable for this page view if storage is unavailable.
    }
  }, [learningPath, learningPathLoaded]);

  function updateLearningPath(next: Partial<SavedLearningPath>) {
    setLearningPath((current) => ({ ...current, ...next }));
  }

  function chooseProject(projectKey: ProjectKey) {
    updateLearningPath({ projectKey });
    setNotice({ kind: "success", message: "Proyecto guardado en tu ruta de aprendizaje." });
  }

  const activeNav = navigation.find((item) => item.key === section)!;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); setSection("home"); }} aria-label="Programa AI-first, inicio">
          <img src="https://assets.westmonroe-cloud.com/logos/wm_h_pos_clr_rgb_august2024.svg" alt="West Monroe" />
          <span className="brand-divider" />
          <span className="brand-program">AI-first<br />teams</span><span className="sr-only">, página de inicio</span>
        </a>
        <div className="topbar-right">
          <span className="topbar-status"><span className="status-dot" /> Material autodirigido · sin seguimiento</span>
          <button className="button button-dark button-small" onClick={() => setSection("path")}>Configurar mi ruta <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Navegación del entrenamiento">
          <div className="sidebar-label">TU ESPACIO DE PRÁCTICA</div>
          <nav className="side-nav">
            {navigation.map((item) => (
              <button key={item.key} className={`nav-item ${section === item.key ? "active" : ""}`} onClick={() => { setSection(item.key); setNotice(null); }}>
                <span className="nav-index">{String(navigation.indexOf(item) + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
                {section === item.key && <span className="nav-arrow" aria-hidden="true">→</span>}
              </button>
            ))}
          </nav>
          <div className="sidebar-note"><span className="note-spark">✳</span><p>Los prompts ayudan en una tarea. Las reglas del repo sostienen todo el trabajo.</p></div>
        </aside>

        <main className="main-content">
          <div className="page-kicker"><span>{activeNav.eyebrow}</span><span className="kicker-line" /> <span>AI-FIRST TEAM PROGRAM</span></div>
          {notice && <div className={`notice notice-${notice.kind}`} role="status"><span>{notice.kind === "success" ? "✓" : notice.kind === "error" ? "!" : "i"}</span>{notice.message}<button aria-label="Cerrar aviso" onClick={() => setNotice(null)}>×</button></div>}
          {section === "home" && <HomeView setSection={setSection} />}
          {section === "method" && <MethodView setSection={setSection} />}
          {section === "path" && <LearningPathView learningPath={learningPath} onChange={updateLearningPath} setSection={setSection} />}
          {section === "tracks" && <TracksView learningPath={learningPath} onChangePath={updateLearningPath} setSection={setSection} />}
          {section === "architecture" && <ArchitectureView learningPath={learningPath} onChangePath={updateLearningPath} />}
          {section === "projects" && <ProjectsView selectedProjectKey={learningPath.projectKey} onChoose={chooseProject} />}
          {section === "kit" && <KitView onDownload={downloadProjectKit} />}

          <footer className="page-footer"><span>West Monroe · AI-first team program</span><span>Reglas claras. Cambios comprobables. Handoffs que continúan.</span></footer>
        </main>
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <div className="page-title"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></div>;
}

function HomeView({ setSection }: { setSection: (section: Section) => void }) {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-marker" /> APRENDER · CONSTRUIR · TRANSFERIR</div>
          <h1>Usa IA con criterio. <em>Entrega con evidencia.</em></h1>
          <p>Un programa modular para aprender desarrollo AI-first al ritmo del equipo. Completa los tracks en orden o elige uno según la necesidad del sprint, con un proyecto real o sintético como práctica.</p>
          <div className="hero-actions"><button className="button button-lime" onClick={() => setSection("path")}>Elegir proyecto y foco <span aria-hidden="true">→</span></button><button className="button button-ghost" onClick={() => setSection("tracks")}>Explorar Track 1</button></div>
          <div className="hero-footnote"><span>✳</span> El método es <strong>rules-first</strong>. La IA ayuda; el equipo conserva el criterio.</div>
        </div>
        <div className="hero-visual" aria-label="Un proyecto que avanza desde reglas compartidas hasta handoff">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="visual-center"><span className="visual-star">✳</span><span>AI<br />FIRST</span></div>
          <div className="visual-chip chip-rules"><small>01</small><b>Reglas</b><span>en el repo</span></div>
          <div className="visual-chip chip-build"><small>02</small><b>Construir</b><span>con evidencia</span></div>
          <div className="visual-chip chip-handoff"><small>03</small><b>Continuar</b><span>sin contexto oral</span></div>
          <div className="visual-caption">DEL PRIMER TICKET AL HANDOFF</div>
        </div>
        <div className="hero-stats"><div><strong>4</strong><span>tracks flexibles</span></div><div><strong>6</strong><span>focos de equipo</span></div><div><strong>PR</strong><span>revisión entre pares</span></div><div><strong>Demo</strong><span>del flujo funcional</span></div></div>
      </section>

      <div className="content-section">
        <div className="section-heading"><div><div className="eyebrow">EL PROPÓSITO</div><h2>Un cambio útil es uno que otra persona puede retomar.</h2></div><button className="text-button" onClick={() => setSection("kit")}>Ver kit de trabajo <span>→</span></button></div>
        <div className="purpose-card">
          <div className="purpose-mark">“</div>
          <div><p className="purpose-quote">El objetivo es que el equipo entregue software que otro developer pueda ejecutar, comprender y continuar sin depender de la memoria de quien hizo el cambio ni de una conversación previa.</p><div className="purpose-rule"><span className="rule-asterisk">✳</span><p>El método será <strong>rules-first</strong>: reglas, contratos, decisiones y verificaciones viven junto al código. Los prompts pueden ayudar en un caso puntual; no son el proceso ni el entregable central.</p></div></div>
        </div>

        <div className="section-heading section-heading-spaced"><div><div className="eyebrow">EL MÉTODO</div><h2>Un ciclo para cada tarea. La persona conserva la responsabilidad.</h2></div><button className="text-button" onClick={() => setSection("method")}>Ver ciclo y reglas <span>→</span></button></div>
        <div className="purpose-card"><div className="purpose-mark">“</div><div><p className="purpose-quote">Cada sugerencia de IA es una hipótesis que hay que comprobar. Quien entrega el código sigue siendo responsable de entender, verificar, probar y justificar cada línea.</p></div></div>
        <div className="section-heading section-heading-spaced"><div><div className="eyebrow">LEARNING TRACKS</div><h2>Cuatro tracks independientes y conectados.</h2><p className="section-subtitle">Puedes completarlos en orden o elegir el que mejor responda a la necesidad actual del equipo.</p></div><button className="text-button" onClick={() => setSection("tracks")}>Explorar los tracks <span>→</span></button></div>
        <div className="week-preview-grid">{learningTracks.map((track) => <button className="week-preview" key={track.number} onClick={() => setSection("tracks")}><span className="week-preview-number">{track.number}</span><span className="week-preview-theme">{track.theme}</span><strong>{track.title}</strong><small>{track.outputs.length} entregables</small><span className="preview-arrow">↗</span></button>)}</div>

        <div className="start-strip"><div><span className="strip-icon">01</span><div><strong>Un espacio de consulta para aprender y aplicar.</strong><p>Usa las guías aquí; acuerda, implementa y verifica los entregables en el repositorio del proyecto.</p></div></div><button className="button button-dark" onClick={() => setSection("path")}>Elegir proyecto y foco <span>→</span></button></div>
      </div>
    </>
  );
}

function MethodView({ setSection }: { setSection: (section: Section) => void }) {
  const safetyRules = [
    "Usa únicamente asistentes, extensiones y repositorios autorizados por la política de la empresa.",
    "Nunca compartas secretos, claves, contraseñas, credenciales de bases de datos ni información personal de clientes.",
    "Inspecciona cada línea sugerida por IA antes de integrarla; debes poder explicar cada cambio.",
    "Ejecuta las pruebas y comprobaciones y guarda evidencia. No afirmes que algo pasó si no viste el resultado.",
    "Mantén la generación separada de commits, pushes, migraciones y despliegues; esas acciones requieren autorización humana.",
    "Detente y consulta al equipo si una sugerencia cambia arquitectura, contratos públicos o permisos de seguridad.",
  ];

  return (
    <>
      <PageTitle eyebrow="MÉTODO · SEGURIDAD · GOBERNANZA" title="Un ciclo para cada tarea." intro="El sitio es material estático y autodirigido: no requiere backend, seguimiento automatizado ni tutor de IA integrado. Avanza al ritmo del equipo y guarda artefactos, evidencia y reflexiones en el repositorio." />
      <section className="method-section">
        <div className="section-heading"><div><div className="eyebrow">CICLO AI-FIRST DE SEIS PASOS</div><h2>La IA ayuda; la persona entiende y responde por el cambio.</h2></div></div>
        <div className="workflow-grid">{coreWorkflow.map((step, index) => <article className="workflow-card" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}</div>
        <div className="responsibility-rule"><strong>Regla fundamental</strong><p>Cada sugerencia de IA es una hipótesis sin verificar. Quien entrega el código conserva toda la responsabilidad de entender, verificar, probar y justificar cada línea.</p></div>
      </section>

      <section className="method-section">
        <div className="section-heading"><div><div className="eyebrow">SECUENCIA FLEXIBLE</div><h2>Aprende, observa, practica, comprueba y comparte.</h2><p className="section-subtitle">Usa esta secuencia en cada track con una tarea pequeña del proyecto o un ejercicio sintético, según la capacidad del equipo.</p></div></div>
        <div className="module-sequence-grid">{moduleSequence.map((item, index) => <article key={item.title}><span>0{index + 1} · AI-FIRST</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      </section>

      <section className="method-section">
        <div className="section-heading"><div><div className="eyebrow">SEGURIDAD Y GOBERNANZA</div><h2>Seis reglas que no se negocian.</h2><p className="section-subtitle">Aplican durante la práctica, la revisión y la entrega del cambio.</p></div></div>
        <ol className="safety-rule-list">{safetyRules.map((rule, index) => <li key={rule}><span>0{index + 1}</span><p>{rule}</p></li>)}</ol>
      </section>

      <section className="method-section">
        <div className="section-heading"><div><div className="eyebrow">PROGRESO GOBERNADO POR EL EQUIPO</div><h2>Comprueba el aprendizaje en el trabajo compartido.</h2><p className="section-subtitle">El sitio no registra avances. El equipo aprende mediante pull requests, revisiones entre pares y demos informales de funciones en vivo de 15 minutos.</p></div></div>
        <div className="transition-grid"><article><span>REVISIÓN ENTRE PARES</span><h3>PRs con evidencia</h3><p>Revisa el diff, relaciona los cambios con los criterios y comenta riesgos, casos límite, resultados observados y pasos pendientes.</p></article><article><span>DEMO DE EQUIPO</span><h3>Mostrar el flujo</h3><p>Presenta una función, el plan de IA, los cambios implementados y cómo se comprobó el resultado. Deja decisiones y handoff en el repositorio.</p></article></div>
        <button className="button button-dark" onClick={() => setSection("tracks")}>Abrir los learning tracks <span>→</span></button>
      </section>
    </>
  );
}

function LearningPathView({ learningPath, onChange, setSection }: { learningPath: SavedLearningPath; onChange: (next: Partial<SavedLearningPath>) => void; setSection: (section: Section) => void }) {
  const selectedProject = projects[learningPath.projectKey];
  const selectedRole = roles.find((role) => role.key === learningPath.role);
  return (
    <>
      <PageTitle eyebrow="PREPARAR · TU PLAN PERSONAL" title="Empieza con un contexto compartido." intro="Elige un proyecto para consultar los ejemplos y un foco para ver primero las tareas que te corresponden. Si trabajas con un equipo, acuerden usar el mismo proyecto; la selección se guarda en cada navegador." />
      <section className="learning-path-card">
        <div className="learning-path-step"><span>01</span><div><h2>Elige un proyecto</h2><p>Los ejemplos, contratos y datos de práctica de los tracks usarán este proyecto.</p><label htmlFor="learning-path-project">Proyecto para consultar</label><select id="learning-path-project" value={learningPath.projectKey} onChange={(event) => onChange({ projectKey: event.target.value as ProjectKey })}>{projectOptions.map((project) => <option key={project.key} value={project.key}>{project.name}</option>)}</select></div><button className="text-button" onClick={() => setSection("projects")}>Comparar proyectos <span>→</span></button></div>
        <div className="learning-path-step"><span>02</span><div><h2>Elige tu foco principal</h2><p>Tu ruta mostrará primero ese trabajo. Las decisiones y la integración siguen siendo responsabilidad compartida.</p><label htmlFor="learning-path-role">Foco para las guías y ejemplos</label><select id="learning-path-role" value={learningPath.role} onChange={(event) => onChange({ role: event.target.value as TeamRole | "all" })}><option value="all">Mostrar los seis focos</option>{roles.map((role) => <option key={role.key} value={role.key}>{role.label}</option>)}</select></div></div>
      </section>
      <section className="learning-path-summary"><div className="eyebrow">TU SELECCIÓN PARA CONSULTAR LAS GUÍAS</div><h2>{selectedProject.name}{selectedRole ? ` · ${selectedRole.label}` : " · Todos los focos"}</h2><p>{selectedProject.subtitle} Tu proyecto y foco se guardan solo para personalizar esta vista en este navegador. El sitio no registra tareas completadas ni requiere correo.</p><div className="learning-path-actions"><button className="button button-lime" onClick={() => setSection("tracks")}>Explorar los tracks <span>→</span></button><button className="button button-ghost" onClick={() => setSection("architecture")}>Consultar arquitectura</button></div></section>
      <div className="architecture-quick-link"><div><strong>¿Cómo aprovechar los tracks?</strong><p>Elige el track que responda a la necesidad actual, revisa las plantillas, acuerda decisiones con tu equipo y guarda los entregables en el repositorio del proyecto.</p></div><button className="text-button" onClick={() => setSection("kit")}>Abrir plantillas del repo <span>→</span></button></div>
    </>
  );
}

function TracksView({ learningPath, onChangePath, setSection }: { learningPath: SavedLearningPath; onChangePath: (next: Partial<SavedLearningPath>) => void; setSection: (section: Section) => void }) {
  const exampleProjectKey = learningPath.projectKey;
  const roleFocus = learningPath.role;

  return (
    <>
      <PageTitle eyebrow="APRENDER · A TU RITMO" title="Cuatro tracks para aprender y entregar." intro="Completa los tracks consecutivamente o elige módulos individuales según el sprint, la complejidad de la función y la capacidad del equipo. No hay calendario fijo ni seguimiento automático." />
      <div className="weekly-guide-toolbar">
        <label><span>Proyecto de los ejemplos</span><select value={exampleProjectKey} onChange={(event) => onChangePath({ projectKey: event.target.value as ProjectKey })} aria-label="Proyecto para los ejemplos">{projectOptions.map((project) => <option key={project.key} value={project.key}>{project.name}</option>)}</select></label>
        <label><span>Foco para guías de Track 3 y 4</span><select value={roleFocus} onChange={(event) => onChangePath({ role: event.target.value as TeamRole | "all" })} aria-label="Filtrar guías por foco"><option value="all">Los seis focos</option>{roles.map((role) => <option key={role.key} value={role.key}>{role.label}</option>)}</select></label>
        <p>El proyecto y el foco que elijas se conservan en Mi ruta, en este navegador.</p>
      </div>
      <div className="architecture-quick-link"><div><strong>Usa el proyecto para conectar los conceptos con un flujo concreto.</strong><p>Web consume la API; la API valida el contrato y consulta datos. Revisa la arquitectura de referencia cuando el plan o la integración lo requieran.</p></div><button className="text-button" onClick={() => setSection("architecture")}>Ver arquitectura del proyecto <span>→</span></button></div>
      <div className="role-guide-key"><strong>En las guías por foco encontrarás:</strong><span><b>Qué crear</b> · archivos y resultado</span><span><b>Cómo hacerlo</b> · acciones del track</span><span><b>Por qué importa</b> · impacto en el equipo</span><span><b>Cómo verificarlo</b> · evidencia esperada</span><small>Los nombres entre &lt;signos&gt; son marcadores: sustitúyelos por el recurso o flujo que acordó el equipo.</small></div>
      <div className="week-list">{learningTracks.map((track) => {
        const roleGuideNumber = track.number === "03" ? "02" : track.number === "04" ? "03" : null;
        const visibleRoles = roleGuideNumber ? roles.filter((role) => roleFocus === "all" || role.key === roleFocus) : [];
        return <article className="week-card" key={track.number}>
          <div className="week-card-side"><span className="week-large-number">{track.number}</span><span className="week-card-track" /></div>
          <div className="week-card-main">
            <div className="week-card-top"><div><div className="eyebrow">TRACK {Number(track.number)} · {track.theme.toUpperCase()}</div><h2>{track.title}</h2></div></div>
            <p className="week-focus">{track.focus}</p>
            <div className="week-detail-grid"><div><h3>Qué hacer</h3><ol className="weekly-step-list">{track.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="deliverable-panel"><h3>Deja en el repo</h3><ul className="deliverable-list">{track.outputs.map((output) => <li key={output}><span>↗</span>{output}</li>)}</ul></div></div>
            {roleGuideNumber && <section className="weekly-role-section" aria-label={`Guía por foco para el Track ${Number(track.number)}`}>
              <div className="weekly-role-heading"><div><h3>Tu guía por foco</h3><p>Usa tu foco para coordinar. Comparte contratos, criterios y decisiones con tu equipo.</p></div><span>{visibleRoles.length} {visibleRoles.length === 1 ? "foco" : "focos"}</span></div>
              <div className="weekly-role-grid">{visibleRoles.map((role) => {
                const baseGuide = weeklyRoleGuides[roleGuideNumber][role.key];
                const guide = baseGuide ?? getSpecialistWeeklyGuide(roleGuideNumber, role.key)!;
                const plan = weeklyRolePlans[roleGuideNumber][role.key] ?? getSpecialistWeeklyPlan(roleGuideNumber, role.key)!;
                const example = baseGuide ? makeRoleExample(roleGuideNumber, role.key, exampleProjectKey) : makeSpecialistRoleExample(roleGuideNumber, role.key);
                return <article className="weekly-role-card" key={role.key}>
                  <div className="weekly-role-label">{role.label}</div>
                  <h4>{guide.goal}</h4>
                  <section className="weekly-role-artifact"><strong>Qué crear</strong><ul>{plan.files.map((file) => <li key={file}><code>{file}</code></li>)}</ul><p><b>Resultado:</b> {guide.deliverable}</p></section>
                  <h5>Cómo hacerlo en este track</h5>
                  <ol>{guide.actions.map((action) => <li key={action}>{action}</li>)}</ol>
                  <div className="weekly-role-why"><strong>Por qué importa</strong><p>{plan.why}</p></div>
                  <div className="weekly-role-check"><strong>Cómo verificarlo</strong><p>{plan.verify}</p></div>
                  <details className="weekly-example"><summary><span>Ejemplo · {example.title}</span><span aria-hidden="true">＋</span></summary><pre>{example.body}</pre></details>
                </article>;
              })}</div>
            </section>}
            <div className="week-team-practice"><span>PRÁCTICA DE EQUIPO</span><p>{weeklyTeamPractices[track.number]}</p></div>
            <div className="gate-panel"><span className="gate-label">EVIDENCIA PARA EL EQUIPO</span><p>{track.gate}</p></div>
          </div>
        </article>;
      })}</div>
      <div className="tip-panel"><span>✳</span><div><strong>El equipo decide cuándo avanzar según la evidencia.</strong><p>Si algo no se puede comprobar todavía, anótenlo como límite y acuerden el siguiente paso con revisión entre pares.</p></div></div>
    </>
  );
}

function ArchitectureView({ learningPath, onChangePath }: { learningPath: SavedLearningPath; onChangePath: (next: Partial<SavedLearningPath>) => void }) {
  const roleFocus = learningPath.role;
  const exampleProjectKey = learningPath.projectKey;
  const visibleRoles = roles.filter((role) => roleFocus === "all" || role.key === roleFocus);
  const exampleProject = projects[exampleProjectKey];

  return (
    <>
      <PageTitle eyebrow="PROYECTOS DEL TRAINING · ARQUITECTURA" title="Arquitectura de referencia para el proyecto." intro="Usa este diseño para cualquiera de los tres proyectos. Sigue el recorrido de una solicitud, conoce el stack por foco y encuentra las carpetas donde integrar los cambios." />
      <div className="student-architecture-summary">
        <span>APLICA AL PROYECTO</span>
        <strong>{projects[learningPath.projectKey].name}</strong>
        <p>El ejemplo de request, fixture y criterios se adapta al proyecto seleccionado en Mi ruta.</p>
      </div>

      <section className="architecture-section architecture-overview">
        <div className="architecture-section-heading"><div><div className="eyebrow">ARQUITECTURA DE LA APLICACIÓN</div><h2>De la acción de la persona a los datos y de vuelta.</h2><p>Este es el flujo de la aplicación del equipo. Web consume la API; la API valida reglas y consulta la base de datos.</p></div></div>
        <figure className="architecture-diagram" aria-label="Flujo entre frontend, API y base de datos">
          <div className="architecture-flow">
            <article className="architecture-node architecture-web"><span>01 · apps/web</span><h3>Web</h3><strong>Vike (vike-react) + React + TypeScript</strong><small>Tailwind · TanStack Query + fetch presenta estados y consume /api</small></article>
            <div className="architecture-connector"><span>HTTP /api</span><b aria-hidden="true">⇄</b><small>request · response · errores del contrato</small></div>
            <article className="architecture-node architecture-api"><span>02 · apps/api</span><h3>API</h3><strong>Bun + Hono + Zod</strong><small>valida entradas y aplica reglas del proyecto</small></article>
            <div className="architecture-connector"><span>Drizzle ORM</span><b aria-hidden="true">⇄</b><small>consulta · guarda · migra</small></div>
            <article className="architecture-node architecture-data"><span>03 · PERSISTENCIA</span><h3>Datos</h3><strong>SQLite local</strong><small>PostgreSQL cuando el equipo comparte datos en hosting</small></article>
          </div>
          <div className="architecture-contract"><span>ACUERDO QUE COMPARTEN WEB Y API</span><strong>packages/contracts · esquemas Zod + tipos TypeScript</strong><small>El equipo acuerda request, response, validación y errores antes de dividir trabajo dependiente.</small></div>
          <div className="architecture-quality"><strong>QA / pruebas atraviesa las tres capas</strong><span>Criterios y casos · validación de flujo · datos íntegros · CI por PR · revisión humana</span></div>
          <figcaption>La respuesta regresa por API a Web. El mismo contrato, fixture y criterio coordinan los seis focos del equipo.</figcaption>
        </figure>
        <div className="architecture-boundary"><strong>Regla de integración</strong><p>Si cambia un request, una respuesta, un campo o un error, actualicen el contrato compartido y revisen el impacto en Frontend, Backend, datos y QA mediante un PR.</p></div>
      </section>
      <section className="architecture-section">
        <div className="architecture-section-heading"><div><div className="eyebrow">DÓNDE TRABAJA CADA FOCO</div><h2>Componentes del producto y carpetas del equipo.</h2><p>Estas rutas pertenecen al repositorio del proyecto. El Kit de trabajo explica el árbol completo y las plantillas de documentación.</p></div></div>
        <div className="student-project-component-grid">{studentProjectComponents.map((component) => <article key={component.path}><code>{component.path}</code><strong>{component.role}</strong><p>{component.responsibility}</p></article>)}</div>
      </section>

      <section className="architecture-section">
        <div className="architecture-section-heading"><div><div className="eyebrow">TECNOLOGÍA POR FOCO</div><h2>Qué usas y qué entregas para que otra área continúe.</h2><p>Filtra por tu foco para ver su responsabilidad y su conexión con las demás áreas.</p></div></div>
        <div className="architecture-filter"><label htmlFor="architecture-role">Mostrar foco</label><select id="architecture-role" value={roleFocus} onChange={(event) => onChangePath({ role: event.target.value as TeamRole | "all" })}><option value="all">Los seis focos</option>{roles.map((role) => <option value={role.key} key={role.key}>{role.label}</option>)}</select></div>
        <div className="architecture-role-grid">{visibleRoles.map((role) => {
          const detail = architectureByRole[role.key];
          return <article className="architecture-role-card" key={role.key}><div className="architecture-role-title"><span>{role.label}</span><h3>{detail.technology}</h3></div><div className="architecture-role-body"><div><strong>Tu responsabilidad</strong><p>{detail.responsibility}</p></div><div><strong>Cómo integras</strong><p>{detail.connectsWith}</p></div><div className="architecture-role-output"><strong>Salida de tu foco</strong><p>{detail.integrationArtifact}</p></div></div></article>;
        })}</div>
      </section>

      <section className="architecture-section">
        <div className="architecture-section-heading"><div><div className="eyebrow">INTEGRACIÓN POR TRACK</div><h2>Empiecen a integrar desde el primer acuerdo.</h2><p>La integración ocurre durante todo el recorrido: cada track deja una evidencia que ayuda al siguiente foco.</p></div></div>
        <div className="integration-week-grid">{integrationTracks.map((item) => <article className="integration-week-card" key={item.track}><span>TRACK {Number(item.track)}</span><h3>{item.title}</h3><p>{item.together}</p><div><strong>Comprueben esto</strong><p>{item.checkpoint}</p></div></article>)}</div>
      </section>

      <section className="architecture-section">
        <div className="architecture-section-heading"><div><div className="eyebrow">RECETA DE INTEGRACIÓN</div><h2>Cómo llevar un cambio desde el acuerdo hasta un flujo funcionando.</h2><p>Sigan estos pasos con una sola tarea del proyecto. Cada paso deja algo concreto que la siguiente área puede usar.</p></div></div>
        <ol className="integration-playbook">{integrationPlaybook.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.action}</p><div><strong>Dejen listo</strong><p>{step.artifact}</p></div></div></li>)}</ol>
      </section>

      <section className="architecture-section">
        <div className="architecture-example-heading"><div><div className="eyebrow">EJEMPLO CONCRETO</div><h2>El contrato y los datos cambian según el proyecto.</h2><p>Revisa estos ejemplos con tu equipo antes de crear los tickets de integración.</p></div><label>Proyecto de ejemplo<select value={exampleProjectKey} onChange={(event) => onChangePath({ projectKey: event.target.value as ProjectKey })}>{projectOptions.map((project) => <option key={project.key} value={project.key}>{project.name}</option>)}</select></label></div>
        <div className="architecture-example-grid"><article><h3>Fixture sintético · {exampleProject.name}</h3><p>Base compartida para que Frontend y QA puedan preparar y repetir el flujo.</p><pre>{exampleProject.sample}</pre></article><article><h3>Contrato de API · {exampleProject.name}</h3><p>Ejemplo de request y respuesta para alinear consumidor y proveedor.</p><pre>{exampleProject.contractExample}</pre></article></div>
        <div className="student-project-environments"><article><span>DESARROLLO DEL PROYECTO</span><strong>SQLite local · datos sintéticos · comandos documentados</strong><p>El README de cada repositorio indica versión de Bun, instalación, inicio de Web y API, migraciones, seed y verificaciones reales del proyecto.</p></article><article><span>DATOS COMPARTIDOS EN HOSTING</span><strong>PostgreSQL · gateway SSO compartido cuando esté disponible</strong><p>El proyecto conserva el mismo contrato Web/API. El equipo documenta variables de entorno y despliegue; no agrega autenticación propia.</p></article></div>
      </section>

      <section className="architecture-section shared-tech-section"><div className="architecture-section-heading"><div><div className="eyebrow">ACUERDOS TRANSVERSALES</div><h2>Herramientas comunes y cuándo usarlas.</h2></div></div><div className="shared-tech-grid">{sharedTechnologies.map((item) => <article key={item.name}><span>{item.name}</span><strong>{item.technology}</strong><p>{item.purpose}</p></article>)}</div></section>
    </>
  );
}

function ProjectsView({ selectedProjectKey, onChoose }: { selectedProjectKey: ProjectKey; onChoose: (key: ProjectKey) => void }) {
  return (
    <>
      <PageTitle eyebrow="PRACTICAR · ELEGIR UN PROYECTO" title="Tres flujos pequeños. El mismo método." intro="Elige un proyecto que permita practicar cualquiera de los tracks. Si trabajas con un equipo, acuerden usar el mismo; cada persona guarda su selección localmente. El alcance es acotado y los datos de práctica son sintéticos." />
      <div className="project-toolbar"><div><span className="toolbar-dot" /><span>Tu proyecto de práctica</span></div><span className="project-toolbar-note">La selección se guarda en Mi ruta, en este navegador.</span></div>
      <div className="project-grid">{projectOptions.map((project, index) => {
        const chosen = selectedProjectKey === project.key;
        return <article className={`project-card ${chosen ? "project-chosen" : ""}`} key={project.key}>
          <div className={`project-number project-number-${index + 1}`}>0{index + 1}</div><div className="project-card-kicker">PROYECTO {index + 1}{chosen && <span className="chosen-label">TU SELECCIÓN</span>}</div>
          <h2>{project.name}</h2><p className="project-subtitle">{project.subtitle}</p>
          <div className="project-user"><span className="mini-label">USUARIO</span><p>{project.user}</p></div>
          <div className="project-flow"><span className="mini-label">FLUJO MVP</span><p>{project.flow}</p></div>
          <div className="project-scope"><span className="mini-label">INCLUYE</span><ul>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <details className="project-details"><summary>Trabajo por foco, criterios y ejemplo <span>＋</span></summary><div className="project-detail-content"><h3>Focos de trabajo</h3><ul>{project.tasks.map((task) => <li key={task.role}><strong>{task.role}:</strong> {task.work}</li>)}</ul><h3>Criterios iniciales</h3><ul>{project.criteria.map((item) => <li key={item}>{item}</li>)}</ul><h3>Fixture sintético</h3><pre>{project.sample}</pre><h3>Contrato de API de partida</h3><pre>{project.contractExample}</pre><h3>Modelo de datos</h3><pre>{project.dataModel}</pre><h3>Fuera de alcance</h3><div className="tag-list">{project.outOfScope.map((item) => <span key={item}>{item}</span>)}</div></div></details>
          <div className="project-card-actions"><button className={`button ${chosen ? "button-selected" : "button-dark"}`} onClick={() => onChoose(project.key)}>{chosen ? "Proyecto seleccionado ✓" : "Usar este proyecto"}</button><button className="download-link" onClick={() => downloadProjectKit(project.key)} aria-label={`Descargar kit de ${project.name}`}>Descargar kit ↓</button></div>
        </article>;
      })}</div>
      <div className="scope-note"><span>!</span><p><strong>Una frontera ayuda a terminar.</strong> Si el equipo quiere cambiar el alcance, registre la decisión en un ticket o PR de documentación antes de implementarla.</p></div>
    </>
  );
}

function KitView({ onDownload }: { onDownload: (key: ProjectKey) => void }) {
  const [copied, setCopied] = useState("");
  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Selecciona y copia el texto manualmente.");
    }
  }
  return (
    <>
      <PageTitle eyebrow="ENTREGAR · PLANTILLAS Y REFERENCIAS" title="Todo lo necesario para dejar contexto." intro="Usen estas piezas como punto de partida. Mantengan solo la documentación que ayude a decidir, construir, comprobar o retomar trabajo." />
      <section className="stack-banner"><div><div className="eyebrow eyebrow-light">STACK COMÚN DEL PROGRAMA</div><h2>La misma base para aprender y entregar.</h2><p>Web: Vike + React + TypeScript estricto + Tailwind. API: Bun + Hono. Datos: Drizzle y Zod para contratos. TanStack Query con fetch nativo; Zustand solo si Context no alcanza. Vercel AI SDK solo si un criterio aprobado requiere una función de modelo.</p></div><div className="stack-tags"><span>SQLite · local</span><span>PostgreSQL · compartido</span><span>SSO · gateway WM después</span></div></section>
      <nav className="kit-contents" aria-label="En esta sección"><strong>Usa esta ruta</strong><a href="#kit-method"><span>01</span> Reglas de trabajo</a><a href="#kit-prompts"><span>02</span> Prompts P0–P6</a><a href="#kit-role-prompts"><span>03</span> Prompts por foco</a><a href="#kit-repo"><span>04</span> Estructura del repo</a><a href="#kit-project"><span>05</span> Kit del proyecto</a><a href="#kit-delivery"><span>06</span> Calidad y entrega</a></nav>
      <section className="kit-section" id="kit-method"><div className="section-heading"><div><div className="eyebrow">01 · CÓMO TRABAJAR</div><h2>Siete piezas hacen que el trabajo se pueda retomar.</h2><p className="section-subtitle">Lean la regla, acuerden el cambio, construyan contra un contrato común y dejen evidencia para la siguiente persona.</p></div></div><div className="harness-grid">{harness.map((item, index) => <article className="harness-card" key={item.title}><span className="harness-number">0{index + 1}</span><h3>{item.title}</h3><code>{item.source}</code><p>{item.detail}</p></article>)}</div></section>
      <section className="kit-section"><div className="section-heading"><div><div className="eyebrow">ESTRUCTURA Y MUESTRAS</div><h2>Documentos pequeños, conectados entre sí.</h2></div></div><div className="template-grid">
        <TemplateCard title="AGENTS.md inicial" desc="Reglas permanentes para cada persona y asistente." code={starterAgents} onCopy={() => void copy(starterAgents, "Reglas copiadas")} copied={copied === "Reglas copiadas"} />
        <TemplateCard title="Ticket breve" desc="El cambio tiene problema, límites, criterios y verificación." code={sampleTicket} onCopy={() => void copy(sampleTicket, "Ticket copiado")} copied={copied === "Ticket copiado"} />
        <TemplateCard title="Handoff para un PR" desc="Contexto mínimo para que otra persona continúe." code={sampleHandoff} onCopy={() => void copy(sampleHandoff, "Handoff copiado")} copied={copied === "Handoff copiado"} />
      </div>{copied && !copied.includes("copiado") && <p className="copy-note">{copied}</p>}</section>
      <section className="kit-section prompt-library" id="kit-prompts"><div className="section-heading"><div><div className="eyebrow">BIBLIOTECA OPERATIVA · P0–P6</div><h2>Prompts para definir, planear, construir y entregar.</h2><p className="section-subtitle">Sustituye los marcadores por detalles autorizados. Copia el texto o descarga cada plantilla como archivo Markdown.</p></div></div><div className="prompt-grid">{operationalPrompts.map((prompt) => <details className="prompt-card" key={prompt.id}><summary><span>{prompt.id}</span><strong>{prompt.title}</strong><b aria-hidden="true">＋</b></summary><div className="prompt-card-body"><p>{prompt.purpose}</p><div className="prompt-card-actions"><button className="copy-button" onClick={() => void copy(prompt.body, prompt.id + " copiado")}>{copied === prompt.id + " copiado" ? "Copiado ✓" : "Copiar prompt"}</button><button className="copy-button" onClick={() => downloadMarkdownFile(prompt.file, prompt.body)}>Descargar .md</button></div><pre>{prompt.body}</pre></div></details>)}</div>{copied && !copied.includes("copiado") && <p className="copy-note">{copied}</p>}</section>
      <section className="kit-section prompt-library" id="kit-role-prompts"><div className="section-heading"><div><div className="eyebrow">EJEMPLOS POR FOCO</div><h2>Adapta la revisión al trabajo de cada especialidad.</h2><p className="section-subtitle">Todos los ejemplos empiezan en modo de solo lectura y separan el plan de la implementación.</p></div></div><div className="role-prompt-grid">{rolePromptTemplates.map((prompt) => <details className="role-prompt-card" key={prompt.title}><summary><strong>{prompt.title}</strong><b aria-hidden="true">＋</b></summary><div className="prompt-card-body"><p>{prompt.purpose}</p><button className="copy-button" onClick={() => void copy(prompt.body, prompt.title + " copiado")}>{copied === prompt.title + " copiado" ? "Copiado ✓" : "Copiar prompt"}</button><pre>{prompt.body}</pre></div></details>)}</div>{copied && !copied.includes("copiado") && <p className="copy-note">{copied}</p>}</section>
      <section className="kit-section repository-blueprint">
        <div className="section-heading"><div><div className="eyebrow">02 · ESTRUCTURA Y DOCUMENTACIÓN</div><h2>Qué crear en cada etapa y qué va dentro.</h2><p className="section-subtitle">Elige un track, crea los archivos que ayuden al trabajo actual y mantén cada documento corto, enlazado y comprobable.</p></div></div>
        <div className="documentation-schedule">{documentationSchedule.map((phase) => <article key={phase.stage}><span>{phase.stage}</span><h3>{phase.title}</h3><strong>{phase.files}</strong><p>{phase.note}</p></article>)}</div>
        <article className="repo-tree-panel" id="kit-repo"><div className="repo-tree-heading"><div><h3>Árbol inicial del repositorio</h3><p>Las rutas muestran dónde vive cada responsabilidad. El foco coordina su carpeta; el equipo revisa cambios que cruzan áreas.</p></div><button className="copy-button" onClick={() => void copy(repoTree, "Árbol copiado")}>{copied === "Árbol copiado" ? "Copiado ✓" : "Copiar árbol"}</button></div><pre>{repoTree.trim()}</pre></article>
        {copied && !copied.includes("copiado") && <p className="copy-note">{copied}</p>}
        <div className="document-template-heading" id="kit-docs"><div><div className="eyebrow">PLANTILLAS MARKDOWN</div><h3>Encuentra el formato según la etapa.</h3><p>Abre solo los archivos que necesitas. Cada plantilla indica cuándo crearla, quién coordina y qué secciones incluir; el equipo sigue compartiendo las decisiones.</p></div></div>
        <div className="document-groups">{markdownFileGroups.map((group) => <section className="document-group" key={group.title}><div><h4>{group.title}</h4><p>{group.intro}</p></div><div className="document-template-grid">{group.files.map((doc) => <details className="document-template" key={doc.path}><summary><span className="document-path">{doc.path}</span><span className="document-week">{doc.stage}</span></summary><div className="document-template-content"><p>{doc.purpose}</p><p><strong>Coordina:</strong> {doc.coordinator}</p><button className="copy-button" onClick={() => void copy(doc.template, `${doc.path} copiado`)}>{copied === `${doc.path} copiado` ? "Copiado ✓" : "Copiar plantilla"}</button><pre>{doc.template.trim()}</pre></div></details>)}</div></section>)}</div>
      </section>
      <section className="kit-section" id="kit-project"><div className="section-heading"><div><div className="eyebrow">03 · PRACTICAR CON UN PROYECTO</div><h2>Descarga el material de tu proyecto.</h2><p className="section-subtitle">Incluye brief, límites, criterios, fixture sintético, guías por track y foco, prompts P0–P6, plantillas Markdown, integración y demo de equipo.</p></div></div><div className="kit-download-grid">{projectOptions.map((project) => <article key={project.key}><span className="download-file-icon">MD</span><div><strong>{project.name}</strong><small>Kit de inicio · Markdown</small></div><button onClick={() => onDownload(project.key)} aria-label={`Descargar kit ${project.name}`}>↓</button></article>)}</div></section>
      <section className="kit-section"><div className="section-heading"><div><div className="eyebrow">REGLAS DE COLABORACIÓN</div><h2>Antes de dividir, acuerden el contrato.</h2></div></div><div className="collab-grid"><div><span>01</span><p>Definan criterios y contratos antes de dividir trabajo dependiente.</p></div><div><span>02</span><p>Los cambios al contrato explican impacto para quienes lo consumen.</p></div><div><span>03</span><p>La revisión por pares comparte contexto y responsabilidad.</p></div><div><span>04</span><p>Una función de IA en el producto solo se agrega si el criterio del producto la requiere.</p></div></div></section>
      <section className="management-panel"><div className="eyebrow eyebrow-light">ANTES DE ARRANCAR</div><h2>Acuerdos para practicar con responsabilidad.</h2><ol><li>Completen los tracks en orden o elijan módulos según la capacidad del sprint y la complejidad de la función.</li><li>Confirmen qué asistentes y repositorios están autorizados. Usen datos sintéticos y no compartan secretos ni información personal.</li><li>Elijan una función demostrable, acuerden alcance y criterios, y distribuyan los seis focos de trabajo.</li><li>Revisen y aprueben el plan en solo lectura antes de editar; cualquier cambio de arquitectura, contrato o permisos vuelve al equipo.</li><li>Mantengan generación separada de commits, pushes, migraciones y despliegues. Las acciones automatizadas requieren autorización humana.</li></ol></section>
      <section className="kit-section" id="kit-delivery"><div className="section-heading"><div><div className="eyebrow">04 · INTEGRAR Y ENTREGAR</div><h2>El equipo cierra con evidencia y un próximo paso claro.</h2></div></div><div className="closing-grid"><div className="closing-checklist">{closeChecklist.map((item) => <div key={item}><span>✓</span><p>{item}</p></div>)}</div><aside className="indicator-panel"><h3>Indicadores para la retrospectiva del equipo</h3><p className="indicator-note">Son referencias para que el equipo las registre donde acuerde; el sitio no recopila estos datos.</p>{indicators.map((item) => <div key={item}><span>↗</span>{item}</div>)}</aside></div></section>
      <section className="kit-section"><div className="section-heading"><div><div className="eyebrow">RIESGOS A VIGILAR</div><h2>Resuelvan fricciones mientras todavía son pequeñas.</h2></div></div><div className="risk-grid">{risks.map((item) => <article key={item.risk}><strong>{item.risk}</strong><p>{item.response}</p></article>)}</div><p className="measurement-note">No se mide el éxito por el porcentaje de código generado por IA ni por el volumen de prompts.</p></section>
      <div className="end-of-kit"><strong>Usen demos breves de 15 minutos.</strong><span>Usuario y problema · flujo principal · caso límite · evidencia · siguiente paso.</span></div>
    </>
  );
}

function TemplateCard({ title, desc, code, onCopy, copied }: { title: string; desc: string; code: string; onCopy: () => void; copied: boolean }) {
  return <article className="template-card"><div className="template-card-heading"><div><h3>{title}</h3><p>{desc}</p></div><button className="copy-button" onClick={onCopy}>{copied ? "Copiado ✓" : "Copiar"}</button></div><pre>{code.trim()}</pre></article>;
}
