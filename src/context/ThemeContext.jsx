import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto de tema
const ThemeContext = createContext();

// Hook personalizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  
  return context;
};

// Provider do tema
export const ThemeProvider = ({ children }) => {
  // Verificar se há preferência salva no localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    // Se não houver tema salvo, verificar preferência do sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    
    return savedTheme;
  };
  
  const [theme, setTheme] = useState(getInitialTheme);
  
  // Alternar entre temas claro e escuro
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Aplicar o tema ao documento HTML
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);
  
  const value = {
    theme,
    isDarkTheme: theme === 'dark',
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 