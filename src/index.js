import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure correct import for React 18
import './index.css'; // Ensure this file exists
import App from './App'; // Ensure this file exists

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);