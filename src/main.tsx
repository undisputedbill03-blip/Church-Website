import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChurchProvider } from './context/ChurchContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChurchProvider>
      <App />
    </ChurchProvider>
  </React.StrictMode>
);

