import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBound.jsx';
import '../assets/index.css'
import App from './App.jsx'
import React from 'react';

createRoot(document.getElementById('base')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
