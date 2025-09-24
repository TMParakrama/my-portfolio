# Qwik City App Performance & Reliability — To‑Do Notes

Findings (concise)

- Heavy client islands: ogl (Aurora), framer-motion scrollers, react-icons, MUI demo. Mostly deferred already; can be gated/paused further.
- Docs route fetches via server$ + useTask$ (client waterfall) → prefer routeLoader$ for SSR, caching, and typed head.
- No route-level cache headers yet; add onGet cacheControl in a layout.
- Internal navigation sometimes uses window.location.href from React islands (full reloads).
- Potential missing home route (src/routes/index.tsx) — ensure BentoBox mounts there.
- Profile image loads from Google Drive (extra latency, reliability risk). Localize + responsive + preload.

Prioritized actions (checklist)

Critical (largest wins)

- [ ] Convert docs route to loader
  - Move public/mockData/ProjectDoc.json → src/data/project-docs.json (importable)
  - Use routeLoader$ to fetch by id; handle not found with status(404)
  - Render with useDocData(); add head for title/description/canonical
  - Remove useTask$/readystatechange spinner waterfall
- [ ] Add route-level cache headers
  - src/routes/layout.tsx → onGet cacheControl({ public: true, maxAge: 5, staleWhileRevalidate: 604800 })
- [ ] Verify home route exists
  - Ensure src/routes/index.tsx renders <BentoBox/>
- [ ] 404 UX for unknown docs
  - Friendly 404 UI or redirect when status(404)

High impact (medium effort)

- [ ] Gate heavy islands (performance + a11y)
  - Aurora (ogl): pause rAF off-screen (IntersectionObserver), pause when document.hidden, support prefers-reduced-motion, reduce resolution on high DPR
  - Framer-motion scrollers: pause off-screen; respect prefers-reduced-motion; clear all intervals timeouts reliably
  - Keep MUI/DataGrid demo off landing route
- [ ] Explicit bundle splitting
  - Vite build.rollupOptions.output.manualChunks: react/react-dom, framer-motion, ogl, react-icons
- [ ] Optimize hero/profile image
  - Move local to public/images, add srcset/sizes WebP/PNG; preload best candidate; add width/height/decoding attrs
- [ ] Global prefers-reduced-motion CSS guard
  - Disable/shorten animations globally under @media (prefers-reduced-motion: reduce)
- [ ] SPA navigation from islands
  - Prefer <a href="/..."> for internal routes instead of window.location.href
- [ ] Service worker tune-up (prefetch only)
  - Add routes/service-worker.ts to enable prefetching; install/activate with skipWaiting/clients.claim if desired

Reliability and correctness

- [ ] Stop importing from public in code
  - Keep JSON/data under src/ (module graph) or fetch via loader
- [ ] Debounce/throttle resize in BentoBox; remove console.log; prefer matchMedia('(min-width:1278px)')
- [ ] Ensure manifest.json exists (since linked in prod) or remove the link until ready
- [ ] Add minimal tests (Vitest)
  - Docs route loader: returns data/404; DocPage renders title/description

File-by-file checklist

- [ ] src/routes/docs/[id]/index.tsx: replace server$ + useTask$ with routeLoader$; add head; remove client waterfall
- [ ] src/routes/layout.tsx: add onGet cacheControl (SWR)
- [ ] src/routes/index.tsx: mount <BentoBox/>
- [ ] src/components/ui/aurora/ui-aurora.tsx: IO-driven start/stop, prefers-reduced-motion, DPR-aware resolution
- [ ] src/components/ui/projects.tsx, src/components/ui/testimonials.tsx, src/components/ui/proof-of-work.tsx: pause off-screen, PRM, clear timers
- [ ] src/components/ui/bento-box.tsx: throttle/debounce resize; use matchMedia; remove console.log
- [ ] src/root.tsx: keep ServiceWorkerRegister in prod; only link manifest if present; optionally preload hero image
- [ ] vite.config.ts: add manualChunks for react/motion/ogl/icons
- [ ] public/images: add local optimized profile image variants (e.g., 256/512px webp/png)
- [ ] src/global.css: add prefers-reduced-motion overrides
- [ ] src/data/project-docs.json: new file with docs moved from public
- [ ] tests/: vitest for docs loader and DocPage

Optional (nice-to-haves)

- [ ] Tailwind content paths: ensure all component paths included if you move files out of src/
- [ ] Consider imagetools/responsive image pipeline at build-time
- [ ] Add CSP/security headers (Netlify) if you later introduce inline scripts/styles

---

# Prompt analysis and response for performance and reliability improvements

Here’s a focused review of your Qwik City app with concrete, high-impact steps to improve performance and reliability. I scanned the repo’s key configs (Vite, Netlify adapter, Tailwind, TS), entries, root, head, routes, and all the heavy islands (React via qwikify$).

Summary of key findings
• Heavy client-side islands: ogl (Aurora), framer-motion-driven lists, react-icons, MUI examples. You’re already deferring most of these with client:idle/visible, which is great; we can further gate, split, and pause them.
• Data fetching for docs uses server$ inside useTask$; moving to route loaders improves SSR, caching, and reliability (and enables head meta).
• Cache headers for SSR responses aren’t set in routes; adding a layout-level onGet improves TTFB for repeat visitors.
• A few navigation and UX concerns (full reloads inside React islands; no 404 handling for unknown docs).
• Potentially missing home route: I didn’t see src/routes/index.tsx. If it’s unintentionally removed, the home page won’t render the BentoBox.
• Assets: a large above-the-fold profile image comes from Google Drive; move local + preload or apply responsive source sets for speed and reliability.

Prioritized steps

Critical (largest wins, low-medium effort)

1. Convert docs data fetching to route loader + typed head
   • Why: Improves SSR, enables streaming to client, better caching, and removes client-side waterfall from useTask$. Also gives you strongly typed data and simpler error handling.
•  How:
•  Move public/mockData/ProjectDoc.json to src/data/project-docs.json so it’s part of the module graph. Or keep it in public and fetch it, but “import from public” is brittle.
•  In src/routes/docs/[id]/index.tsx:
◦  Replace server$ + useTask$ with routeLoader$ to fetch and validate by id.
   ◦ Render with const data = useDocData(); and handle 404 via status().
   ◦ Add a head export using the resolved loader value.
   • Example (illustrative):
   ts
   • Remove readystatechange loader and client fetching from the component; render skeletons only when loaders suspense isn’t resolved.

2. Add route-level cache headers (global layout)
   • Why: Faster repeat views at the edge and better resilience.
   • How: Create src/routes/layout.tsx with an onGet handler to set SWR caching.
   ts
3. Verify home route exists; add it if missing
   • Why: Your WARP.md mentions src/routes/index.tsx mounting BentoBox, but that file wasn’t found. If missing, home is empty/404.
   • How: Add src/routes/index.tsx to render BentoBox (keep BentoBox island triggers minimal above the fold, see step 5).

4. Stabilize docs id handling and 404 UX
   • Why: Unknown ids currently render a spinner forever until data is null; show proper 404 and navigation back.
   • How: With routeLoader$ + status(404), add a simple 404 UI or redirect.

High impact (medium effort) 5) Gate and pause heavy islands more aggressively
• Aurora (ogl): It runs a continuous WebGL rAF loop.
• Use the React island’s intersection to start/stop animation when off-screen, and pause when document.hidden or prefers-reduced-motion is set.
• Reduce resolution on high DPR devices or when backgrounded.
• If it’s decorative, consider client:visible instead of client:idle, and only mount after first paint.
• Add an option to disable entirely when prefers-reduced-motion.
• Framer-motion scrollers (projects, testimonials, proof-of-work)
• Prefer pausing animations when not visible using IntersectionObserver.
• Respect prefers-reduced-motion for auto-scrolling and transitions.
• Ensure all setInterval/setTimeout timers are cleared (you already do for most; keep it consistent across all islands).
• Example visibility-aware rAF pattern (illustrative):
ts
• For MUI/DataGrid example (demo), make sure it’s not included on the landing route; keep it isolated on a secondary route if you plan to keep it.

6. Bundle split large client libraries explicitly
   • Why: Ensure react, framer-motion, ogl, react-icons don’t end up in the first-interaction chunk. Vite does some splitting, but explicit manualChunks ensures clean isolation by island.
   • How: Extend base Vite config:
   ts
   • Keep heavy islands on client:visible or client:idle to avoid early fetch of these chunks.

7. Optimize the hero image (currently from Google Drive)
   • Why: Third-party host adds DNS/TLS latency and reliability risk; non-optimal sizing impacts LCP.
   • How:
   • Move the image to public/ and serve locally.
   • Provide responsive images (srcset/sizes), and preload the best candidate you need above the fold.
   • If you keep Google Drive, add preconnect/dns-prefetch for faster handshake and set width/height/decoding attributes.
   • Ensure meaningful alt text (currently alt=" ").
   • Example head preload:
   ts
8. Respect prefers-reduced-motion globally
   • Why: Accessibility + performance on low-power devices.
   • How: In src/global.css add:
   css
9. Navigation from React islands
   • Why: Using window.location.href forces a full reload and loses SPA benefits.
   • How:
   • Prefer rendering anchor tags <a href="/docs/..." /> for internal links; Qwik City intercepts them when possible.
   • Or pass a Qwik callback prop into the island that triggers Qwik City’s navigate.

10. Service worker tuning
    • Why: You register ServiceWorkerRegister in prod; add a basic routes/service-worker.ts to enable Qwik City’s prefetching strategy and immediate activation.
    • How: Add a minimal service worker route if you want control (install/activate for skipWaiting/clients.claim). Keep it for prefetch, not offline, unless you explicitly want offline.

Reliability and correctness 11) Avoid importing from public in code
• Why: Files in public aren’t part of the Vite module graph; importing JSON from public is fragile.
• How: Move public/mockData/ProjectDoc.json to src/data/project-docs.json and import from there. Or fetch it from /mockData/... with a loader.

12. Debounce/throttle resize logic in BentoBox
    • Why: Current resize handler runs on every event (and logs in production).
    • How: Wrap with requestAnimationFrame or a small debounce (e.g., 100ms) and remove console.log. Also prefer matchMedia('(min-width: 1278px)') for a more semantic check.

13. Manifest file presence
    • Why: You link the web app manifest in prod; if manifest.json is missing, it 404s.
    • How: Add public/manifest.json or remove the link until you’re ready.

14. Tests and CI quick wins
    • Why: Keeps UI robust as you evolve.
    • How: Add a simple vitest for the docs route loader (id exists/doesn’t exist) and a DOM harness test for DocPage. Run bun run test.unit in CI.

Optional, if you want to squeeze more
• Tailwind content scanning: If any components are outside src/ in the future, include their paths in tailwind.config.js content to avoid purging needed classes.
• Image tooling: consider vite-imagetools or a Qwik image helper to generate responsive variants at build time.
• CSP: On Netlify, add security headers and CSP with hashes for inline styles if you later add any. Helps reliability/security.

Concrete checkpoints per file
• src/routes/docs/[id]/index.tsx: migrate to routeLoader$, add head, remove client fetching/skeleton that depends on readystatechange.
• src/routes/layout.tsx: add onGet with SWR caching.
• src/routes/index.tsx: ensure it exists and mounts BentoBox.
• src/components/ui/aurora/ui-aurora.tsx: pause rAF when not visible/document.hidden; respect prefers-reduced-motion; consider client:visible.
• src/components/ui/projects.tsx, testimonials.tsx, proof-of-work.tsx: pause animations off-screen; respect prefers-reduced-motion.
• src/components/ui/bento-box.tsx: throttle/debounce resize; remove console.log; prefer matchMedia.
• src/root.tsx: if keeping the top image, preload and localize it; keep ServiceWorkerRegister.
• vite.config.ts: add manualChunks for react/motion/ogl/icons.
