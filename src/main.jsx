import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/index.css';

const container = document.getElementById('root');
const root = createRoot(container); // crea el root usando createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
