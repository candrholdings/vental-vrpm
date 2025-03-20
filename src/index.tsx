import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Create this file for global styles

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
