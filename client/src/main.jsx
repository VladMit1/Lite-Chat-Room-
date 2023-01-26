import React from 'react';
import { App } from './components/app';
import { StrictMode } from 'react';
import './scss/main.scss';
// ✅ now importing from react-dom/client
import { createRoot } from 'react-dom/client';

// 👇️ IMPORTANT: make sure to specify correct ID
// must be the ID of the div element in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
   <StrictMode>
      <App />
   </StrictMode>
);
