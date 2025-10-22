import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/calculator.css';

// Ensure the root element exists; fail fast with a clear message if not found.
const rootEl = document.getElementById('root');
if (!rootEl) {
  // In unusual cases where index.html didn't include #root, create one to avoid runtime crash
  const created = document.createElement('div');
  created.id = 'root';
  document.body.appendChild(created);
  const root = createRoot(created);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
