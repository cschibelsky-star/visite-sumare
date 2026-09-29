import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PwaSplash from './components/PwaSplash';
import './index.css';
import 'leaflet/dist/leaflet.css';

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js?v=4.1.2', {updateViaCache:'none'});
      await registration.update();

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        const key='sumare-sw-reloaded-4.1.2';
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key,'1');
          window.location.reload();
        }
      });
    } catch (error) {
      console.warn('Service worker registration failed:', error);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PwaSplash />
    <App />
  </React.StrictMode>
);