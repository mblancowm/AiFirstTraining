# Programa de equipos AI-first

Sitio estático de aprendizaje autodirigido en español para practicar desarrollo AI-first mediante cuatro learning tracks flexibles. Los equipos pueden avanzar en orden o elegir módulos según su capacidad y el trabajo del sprint; aprenden con un proyecto real o sintético y verifican cada cambio.

## Qué contiene

- Cuatro tracks independientes y conectados: fundamentos y alcance, contexto y planificación segura, implementación por foco, e integración y handoff.
- Ciclo AI-first de seis pasos y reglas no negociables de seguridad y privacidad.
- Biblioteca de prompts Markdown P0–P6 y guías por foco; las prácticas de integración de IA usan mocks y datos sintéticos.
- Aprendizaje autogobernado mediante pull requests, revisiones entre pares y demos breves de funciones en vivo; no hay backend, tracking automatizado ni tutor de IA integrado.
- Página de arquitectura de referencia para los tres proyectos de estudiantes: stack, flujo entre capas, carpetas por foco y guía de integración.
- Tres proyectos de práctica, cada uno con alcance, exclusiones, trabajo por foco, criterios QA y fixtures sintéticos.
- Guía del árbol de carpetas y archivos, mapa de documentación por track y plantillas copiables para README, AGENTS.md, brief, plan de función, arquitectura, contrato, modelo, tickets, QA, ADR, demo, handoff y retro.
- Descarga de un kit Markdown por proyecto con brief, arquitectura, flujo de integración, guía por track y foco, prompts P0–P6, árbol del repo y plantillas documentales.
- Ruta personal para elegir uno de los tres proyectos y un foco de aprendizaje.
- Plantillas y ejemplos de AGENTS.md, ticket, estructura de repo y handoff de PR.
- Proyecto y foco guardados en el navegador actual para personalizar las guías; no requiere cuenta ni correo.

## Arquitectura
La página «Arquitectura del proyecto» presenta el diseño que los estudiantes aplican a sus proyectos de práctica. Esta sección describe la implementación técnica del portal de aprendizaje. La selección de proyecto y foco personaliza las guías en el navegador; el sitio no crea grupos, solicita correos ni registra avances.


| Parte | Tecnología | Uso |
| --- | --- | --- |
| Web | Vike, React, TypeScript estricto | Sitio estático pre-renderizado, servido por Nginx en contenedor |
| API | Bun, Hono, Zod | Servicio preparado para funciones compartidas futuras; no es necesario para el training actual |
| Datos | Drizzle ORM | SQLite para desarrollo local y PostgreSQL para funciones compartidas futuras |
| Contratos | Zod y tipos compartidos | Contrato de la API preparada para funciones futuras |
| Despliegue | Docker Compose | Un contenedor Web; las lecciones no necesitan API ni base de datos |

El training actual no llama a `/api`: los materiales se sirven desde Web. El proyecto y el foco elegidos viven en el navegador para personalizar las guías; el sitio no guarda tareas completadas ni mide avance. El código de API y base de datos permanece disponible en el repositorio para funciones compartidas futuras, pero no forma parte del despliegue estándar. Nginx sirve el frontend estático.

## Ejecutar localmente

Requisitos: Bun 1.2 o compatible con las dependencias del proyecto.

1. Desde esta carpeta, instala las dependencias:

   ```sh
   bun install
   ```

2. Inicia el sitio web:

   ```sh
   bun run dev:web
   ```

3. Abre `http://localhost:5173`. Las lecciones, proyectos y kits funcionan sin iniciar API ni base de datos.

### Servicio API opcional

El servicio está disponible para desarrollo de funciones compartidas futuras. Para ejecutarlo localmente, inicia la API:

```sh
bun run dev:api
```

La API acepta `DATABASE_URL`. El valor local por defecto es `file:./data/ai-first.db`; también se puede usar una ruta absoluta con `file:`. Nada de esto es requisito para completar el training.

## Ejecutar localmente en contenedores

Esta opción empaqueta únicamente el sitio web, sin API ni base de datos:

```sh
docker compose up --build
```

Abre `http://localhost:8080`. Para detenerlo, usa `Ctrl+C` o `docker compose down`.

## Moverlo al hosting de West Monroe

El sitio puede servirse como frontend web; para las lecciones no necesita base de datos, cuentas ni almacenamiento compartido. El despliegue estándar usa únicamente el contenedor web.

1. Publica el repositorio en el Git/registry aprobado y construye `apps/web/Dockerfile`.
2. Despliega el contenedor web en el puerto `8080` detrás del gateway aprobado.
3. El sitio de training no requiere instancia PostgreSQL, API, secretos ni datos de usuarios.
4. Cuando SSO esté disponible, integra el gateway compartido de West Monroe delante del sitio. No agregues contraseñas ni un proveedor de identidad propio.

El host concreto aún no está codificado: solo cambian el registro de imágenes, dominio y reglas de red. `compose.yaml` sirve como referencia reproducible para el contenedor web.

## Correo, acceso y SSO

El training no pide login, contraseña ni correo. Cada persona puede guardar su proyecto elegido y foco en el navegador para personalizar la consulta; no se guardan tareas completadas ni se registra el progreso del estudiante. Cuando SSO esté disponible, puede proteger el acceso al sitio mediante el gateway compartido de West Monroe. El sitio no implementa autenticación propia.

## Configuración

| Variable | Dónde | Default de desarrollo | Descripción |
| --- | --- | --- | --- |
| `DATABASE_URL` | API opcional | `file:./data/ai-first.db` | SQLite local o URL `postgresql://...`; no la necesita el training |
| `PORT` | API opcional | `3001` | Puerto de Hono |
| `CORS_ORIGIN` | API opcional | `http://localhost:5173,http://localhost:8080` | Orígenes permitidos si la API recibe llamadas cross-origin |
| `DB_POOL_SIZE` | API opcional | `8` | Máximo de conexiones PostgreSQL |

## Estructura

```text
apps/
  api/                 # Bun + Hono, Drizzle y migraciones SQL
  web/                 # Vike + React + TypeScript
packages/
  contracts/           # Tipos y esquemas Zod compartidos
compose.yaml           # Web estática
```
