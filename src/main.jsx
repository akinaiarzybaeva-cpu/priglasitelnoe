import React from 'react';
import ReactDOM from 'react-dom/client';
import config from './config';
import App from './App';
import './styles/global.css';

// config.js ичиндеги түстөрдү CSS өзгөрмөлөрүнө өткөрүү
Object.entries(config.theme || {}).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});

// Барак жаңыртылганда браузер мурунку скроллго секирбеши үчүн
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
