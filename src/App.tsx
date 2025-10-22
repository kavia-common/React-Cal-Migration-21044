import React from 'react';
import { Calculator } from './components/calculator/Calculator';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** Main application component that renders the calculator at the root route. */
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="visually-hidden">React Calculator</h1>
      </header>
      <main>
        {/* In case Calculator fails to render for any reason, ensure a minimal fallback renders. */}
        <React.Suspense fallback={<div role="status">Loading…</div>}>
          <Calculator />
        </React.Suspense>
      </main>
    </div>
  );
}
