// Este arquivo é mantido para compatibilidade com o index.html da pasta public
// O ponto de entrada principal da aplicação é main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';

// Remover a tela de carregamento depois de renderizado
const removeLoadingScreen = () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    setTimeout(() => {
      loadingElement.style.display = 'none';
    }, 300);
  }
};

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);

// Remover a tela de carregamento após o renderizado
setTimeout(removeLoadingScreen, 500);
