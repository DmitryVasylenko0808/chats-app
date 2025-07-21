import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './app';
import { Providers } from './providers';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
);
