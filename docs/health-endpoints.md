# Health Endpoints

- Dev (npm run dev):
  - Server binds to 0.0.0.0:3000 with strictPort.
  - Console readiness log: "[vite] dev server ready at http://0.0.0.0:3000 (health: /health)"
  - Health probe: GET /health -> 200 OK, body: "ok"

- Preview (npm run preview):
  - Server binds to 0.0.0.0:3000 with strictPort.
  - Static health files:
    - /health.txt -> "ok"
    - /health.html -> "ok"
