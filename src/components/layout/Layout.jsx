import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar se é um dispositivo móvel ao carregar e em caso de redimensionamento
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Em dispositivos móveis, colapsar a sidebar por padrão
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    // Verificar inicialmente
    checkMobile();

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [sidebarCollapsed]);

  // Função para alternar a sidebar em dispositivos móveis
  const toggleMobileSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-wrapper">
      {/* Overlay para dispositivos móveis - aparece quando o menu está aberto */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed} 
        setSidebarCollapsed={setSidebarCollapsed} 
        isMobile={isMobile}
      />

      {/* Conteúdo principal */}
      <main className="main-content flex flex-col overflow-hidden transition-all duration-300">
        {/* Navbar superior */}
        <header className="header">
          {/* Botão de menu móvel */}
          {isMobile && (
            <button 
              className="mobile-menu-toggle mr-3 text-white focus:outline-none"
              onClick={toggleMobileSidebar}
              aria-label="Abrir menu"
            >
              <span className="text-xl">📱</span>
            </button>
          )}
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md mr-3 flex items-center justify-center bg-white/10 text-white">
              <span>
                {location.pathname.includes("dashboard") && "🏠"}
                {location.pathname.includes("board") && "📋"}
                {location.pathname.includes("calendar") && "📅"}
                {location.pathname.includes("tasks") && "✅"}
                {location.pathname.includes("notes") && "📝"}
                {location.pathname.includes("schedule") && "⏰"}
                {location.pathname.includes("subjects") && "📚"}
                {location.pathname.includes("notifications") && "🔔"}
                {location.pathname.includes("settings") && "⚙️"}
              </span>
            </div>
            <h1 className="font-bold text-white truncate max-w-[150px] md:max-w-full">
              {location.pathname.includes("dashboard") && "Dashboard"}
              {location.pathname.includes("board") && "Quadro"}
              {location.pathname.includes("calendar") && "Calendário"}
              {location.pathname.includes("tasks") && "Tarefas"}
              {location.pathname.includes("notes") && "Notas"}
              {location.pathname.includes("schedule") && "Horários"}
              {location.pathname.includes("subjects") && "Matérias"}
              {location.pathname.includes("notifications") && "Notificações"}
              {location.pathname.includes("settings") && "Configurações"}
            </h1>
          </div>
          
          <div className="mx-3 hidden sm:block">
            <span className="workspace-badge">
              Workspace
            </span>
          </div>
          
          <div className="ml-auto flex items-center space-x-3 md:space-x-4">
            {/* Botão de alternar tema */}
            <ThemeToggle />
            
            <button className="text-white opacity-80 hover:opacity-100 focus:outline-none hidden sm:block">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <div className="relative">
              <button className="text-white opacity-80 hover:opacity-100 relative focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-xs text-white">
                  2
                </span>
              </button>
            </div>
            
            <div className="relative">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer ring-1 ring-white/30 hover:ring-white/50 transition-all"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer ring-1 ring-white/30 hover:ring-white/50 transition-all">
                  <span className="font-medium text-sm">
                    {currentUser?.displayName?.charAt(0) || "A"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Área de conteúdo */}
        <div className="flex-1 overflow-auto p-3 md:p-6 board">
          <div className="workspace">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
