# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project snapshot
- Framework: Qwik + Qwik City (SSR, file-based routing, service worker prefetching)
- Build tool: Vite (with qwik optimizer, qwik-city, tsconfig-paths, qwik-react plugins)
- Language: TypeScript (paths: "~/*" -> src, "$/*" -> repo root)
- Styling: TailwindCSS (prefix: "tw-", preflight disabled) via PostCSS
- Tests: Vitest + @builder.io/qwik/testing (DOM harness)
- Lint/format: ESLint (@typescript-eslint, eslint-plugin-qwik) + Prettier
- Deployment target: Netlify Edge Functions (adapter + netlify.toml)
- Runtime: Node >= 18.17 (see package.json engines); bun is used in CI/deploy (bun.lockb, netlify.toml)

Common commands
Use bun (preferred) or npm; examples show bun first. Replace with npm run ... if you prefer npm.
- Install dependencies
  - bun install
- Dev server (SSR mode)
  - bun run dev
  - Open in browser with auto-open: bun start
  - Debug: bun run dev.debug (Node inspector; attach a debugger to port 9229)
- Build
  - Full production build (client + server + typecheck): bun run build
  - Client-only build: bun run build.client
  - Server/adapter build (Netlify Edge): bun run build.server
  - Preview server build: bun run build.preview
  - Typecheck only: bun run build.types
- Preview production build locally (non-adapter)
  - bun run preview
- Lint and format
  - Lint: bun run lint
  - Format write: bun run fmt
  - Format check: bun run fmt.check
- Tests (Vitest)
  - Run unit tests (component tests live under src/components/**): bun run test.unit
  - UI test runner: bun run test.unit.ui
  - Run a single test file (direct Vitest invocation):
    - bunx vitest src/components/example/example.spec.tsx
  - Run a single test by name:
    - bunx vitest src/components/ui/bento-box.spec.tsx -t "should render with initial state"
- Deploy (Netlify CLI)
  - One-off deploy (build included): bun run deploy
  - For Git-based continuous deploys: netlify link then push; see README for details

High-level architecture
- Entry points and rendering
  - src/entry.ssr.tsx: Single SSR entry used across environments; renders <Root/> with manifest and sets html container attributes.
  - src/entry.preview.tsx: Vite preview integration (Node middleware) for local preview of the production build.
  - src/entry.netlify-edge.tsx: Netlify Edge adapter entry (Edge runtime) with qwikCityPlan + manifest.
  - src/entry.dev.tsx: Client-only development entry (no SSR). Not used in production.
- App shell and routing
  - src/root.tsx: Wraps app with <QwikCityProvider>, defines <head> via RouterHead and conditionally registers the service worker in production; includes a client:idle UiAurora visual layer, then renders <RouterOutlet/>.
  - src/components/router-head/router-head.tsx: Derives title, meta, links, styles, and scripts from Qwik City document head; sets canonical URL and viewport.
  - src/routes/: File-based routing and layouts via Qwik City.
    - src/routes/layout.tsx: Global layout with onGet(RequestHandler) setting cache-control (stale-while-revalidate 1 week, max-age 5s). Renders page <Slot/> and a persistent <SpotifyPlayer/>.
    - src/routes/index.tsx: Home route; uses Qwik signals and useOnWindow to show a loading UI until ready, then mounts <BentoBox/>.
    - src/routes/service-worker.ts: Registers Qwik City service worker for prefetching and fast navigations (not for offline), with install/activate events wired for immediate control.
- Components and islands
  - src/components/**: UI building blocks. Many use Tailwind classes with the tw- prefix. Some components are tested (see *.spec.tsx) using the @builder.io/qwik/testing DOM harness.
  - React interop: src/integrations/react/mui.tsx exposes Material UI Button/Slider and a DataGrid example via qwikify$ (with eagerness controls) for selective hydration.
- Styling pipeline
  - Tailwind configured in tailwind.config.js with prefix "tw-"; core preflight disabled to avoid global resets. PostCSS uses tailwindcss and autoprefixer. Global styles and animations live in src/global.css.
- Build and bundling
  - Root Vite config (vite.config.ts) loads qwikCity, qwikVite, tsconfigPaths, and qwikReact. It also contains an optional SSR noExternal/external strategy (commented) and headers for dev/preview caching behavior.
  - Adapter config (adapters/netlify-edge/vite.config.ts) extends base config, sets SSR build with inputs ["src/entry.netlify-edge.tsx", "@qwik-city-plan"], and outputs to .netlify/edge-functions/entry.netlify-edge.
  - Dependency hygiene guard: vite.config.ts defines errorOnDuplicatesPkgDeps(...) to enforce Qwik packages in devDependencies and prevent duplicates across dependencies/devDependencies.
- TypeScript config
  - tsconfig.json enables strict mode, isolatedModules, Bundler resolution, and path aliases: ~/* -> src, $/* -> repo root. JSX runtime is react-jsx with jsxImportSource set to @builder.io/qwik.

Deployment notes (Netlify)
- netlify.toml builds with bun and publishes dist: bun install && bun run build
- For local emulation of a production-like environment, use Netlify CLI:
  - netlify dev (after a production build) or follow the README guidance for previewing; deploy with netlify deploy --build [--prod]

Conventions and repository notes
- Commit policy: Conventional Commits with signed commits (see README section "Commit Guidelines").
- Node engines: ^18.17 || ^20.3 || >= 21; sharp requires Node-API v9 compatibility (documented in package.json). Use an appropriate Node version when not using bun.

