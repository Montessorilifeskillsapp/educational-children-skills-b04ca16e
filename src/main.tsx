import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { i18nReady } from './i18n'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { registerOffline } from './lib/registerOffline'
import { installStaleBuildRecovery } from './lib/staleBuild'

// Tells the start-up safety net in index.html that the app's files loaded.
(window as unknown as { __mlsBooted?: boolean }).__mlsBooted = true
installStaleBuildRecovery()
registerOffline()

const render = () => createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Wait for the chosen language (English is instant) so the page never flashes English first;
// never wait more than a few seconds, so a slow connection still opens the app.
Promise.race([i18nReady, new Promise((r) => setTimeout(r, 4000))]).finally(render);
