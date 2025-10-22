import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Small plugin to log a readiness line once the dev server starts.
 * Also serves a minimal health endpoint for readiness probes: GET /health -> 200 OK.
 * Does not alter preview behavior; only affects dev server.
 */
function readinessLogPlugin(): Plugin {
  return {
    name: 'readiness-log',
    configureServer(server) {
      // Health route middleware
      server.middlewares.use((req, res, next) => {
        if (req.url === '/health') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('ok');
          return;
        }
        next();
      });

      server.httpServer?.once('listening', () => {
        const addr = server.httpServer!.address();
        let host = '0.0.0.0';
        let port = 3000;
        if (typeof addr === 'object' && addr && 'port' in addr) {
          port = (addr.port as number) ?? 3000;
          host = ((addr.address as string) || '0.0.0.0');
        }
        // Provide a clear single-line indicator
        console.log(`[vite] dev server ready at http://${host}:${port} (health: /health)`);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), readinessLogPlugin()],
  server: {
    // Bind to all interfaces and enforce port 3000 for preview readiness
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true
  }
});
