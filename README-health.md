# Dev/Preview Health Notes

- Dev server readiness:
  - Bound to 0.0.0.0:3000 with strictPort.
  - Logs readiness line in console: "[vite] dev server ready at http://0.0.0.0:3000 (health: /health)"
  - Health path: GET /health -> 200 OK, body: "ok"

- Preview readiness:
  - Vite preview is also bound to 0.0.0.0:3000 with strictPort.
  - Static health file served from public: /health.txt with "ok"

No functional changes beyond readiness logging and health endpoints.
