import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated for React 18
import './index.css';  // Optional, for global styling
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./components/index.css";

// Find the root DOM node
const container = document.getElementById('root');

// Create a root and render the App component into it
const root = createRoot(container);  // Updated to use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Report performance-related metrics
reportWebVitals();
