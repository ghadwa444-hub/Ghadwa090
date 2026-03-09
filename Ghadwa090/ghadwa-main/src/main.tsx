import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { logger } from '@/infrastructure/logging/logger';
// Supabase imports removed

// Log application startup
logger.info('APP', '🚀 Ghadwa Application Starting', {
  timestamp: new Date().toISOString(),
  environment: 'development',
  userAgent: navigator.userAgent
});

// Log HMR configuration
logger.debug('APP', '🔗 HMR configured for localhost:3000', {
  hmr: {
    host: 'localhost',
    port: 3000,
    protocol: 'ws'
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  logger.error('APP', '❌ Root element not found', { elementId: 'root' });
  throw new Error("Could not find root element to mount to");
}

logger.info('APP', '✅ Root element found', { elementId: 'root' });

const root = ReactDOM.createRoot(rootElement);

logger.info('APP', '📦 Rendering React application');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

logger.info('APP', '✅ React application rendered successfully');