import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente de botão para alternar entre temas claro e escuro
 */
const ThemeToggle = ({ className = '' }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkTheme ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      className={`theme-toggle relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full transition-all duration-200 ${className}`}
      title={isDarkTheme ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <span className="w-8 h-8 flex items-center justify-center">
        {isDarkTheme ? (
          // Ícone de sol (tema escuro ativo, clique para mudar para claro)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          // Ícone de lua (tema claro ativo, clique para mudar para escuro)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle; 