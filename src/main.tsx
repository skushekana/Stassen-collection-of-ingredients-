import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle benign browser IndexedDB / Firestore lifecycle notifications when tabs/iframes transition
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const msg = typeof reason === 'string' ? reason : reason?.message || '';
    if (
      msg.includes('Database is closing') ||
      msg.includes('database is closing') ||
      msg.includes('Database is closing/hidden') ||
      msg.includes('closing/hidden') ||
      msg.includes('The database connection is closing')
    ) {
      event.preventDefault();
      console.warn('Handled benign database lifecycle transition:', msg);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
