
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');
if (container) {
  const globalWithRoot = window as unknown as { __reactRoot?: Root };
  if (!globalWithRoot.__reactRoot) {
    globalWithRoot.__reactRoot = createRoot(container);
  }
  globalWithRoot.__reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Fatal Error: #root container not found");
}
