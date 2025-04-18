import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTasks, FaStickyNote, FaClock, FaBook, FaHome, FaClipboardList, FaCalendarAlt, FaBell, FaCog } from "react-icons/fa";

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, isMobile }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const sidebarBtnRef = useRef(null);

  // Função para verificar qual rota está ativa
  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  // Menu
  const menu = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <FaHome className="text-blue-500" />
    },
    { 
      name: "Quadro", 
      path: "/board", 
      icon: <FaClipboardList className="text-indigo-500" />
    },
    { 
      name: "Calendário", 
      path: "/calendar", 
      icon: <FaCalendarAlt className="text-green-500" />
    },
    { 
      name: "Tarefas", 
      path: "/tasks", 
      icon: <FaTasks className="text-red-500" />
    },
    { 
      name: "Notas", 
      path: "/notes", 
      icon: <FaStickyNote className="text-yellow-500" />
    },
    { 
      name: "Horários", 
      path: "/schedule", 
      icon: <FaClock className="text-purple-500" />
    },
    { 
      name: "Matérias", 
      path: "/subjects", 
      icon: <FaBook className="text-cyan-500" />
    },
    { 
      name: "Notificações", 
      path: "/notifications", 
      icon: <FaBell className="text-orange-500" />
    },
    { 
      name: "Configurações", 
      path: "/settings", 
      icon: <FaCog className="text-gray-500" />
    },
  ];

  return (
    <aside 
      className={`
        sidebar h-full z-30
        ${sidebarCollapsed ? 'collapsed' : ''}
        flex flex-col shadow-lg
        transition-all duration-300 ease-in-out
        ${isMobile ? 'transform fixed' : 'fixed md:relative'}
        ${isMobile && sidebarCollapsed ? '-translate-x-full' : ''}
      `}
    >
      {/* Cabeçalho da sidebar */}
      <div className="sidebar-header">
        {!sidebarCollapsed && (
          <h1 className="app-title font-bold text-white truncate">
            MeOrganiza
          </h1>
        )}
      </div>
      
      {/* Botão de ocultar abaixo do título */}
      <div className="sidebar-toggle">
        <button 
          ref={sidebarBtnRef}
          className="toggle-sidebar-btn p-1 text-white opacity-80 hover:opacity-100 rounded bg-white/10 hover:bg-white/20 transition-all"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {sidebarCollapsed ? '📂' : '📁'}
        </button>
      </div>
      
      {/* Menu de navegação */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-thin">
        <ul className="px-2 space-y-1">
          {menu.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  title={sidebarCollapsed ? item.name : ''}
                  className={`
                    menu-item ${isActive ? 'active-menu-item' : ''}
                    ${isActive 
                      ? 'bg-white/20 text-white font-medium shadow-sm' 
                      : 'text-white/80 hover:bg-white/10'
                    }
                  `}
                  onClick={isMobile ? () => setSidebarCollapsed(true) : undefined}
                >
                  <span className={`flex items-center justify-center w-8 h-8 ${isActive ? 'animate-pulse' : ''}`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-white/80'}`}>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Perfil do usuário */}
      <div className="mt-auto border-t border-white/20 p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Perfil" 
                className="w-10 h-10 rounded-full ring-1 ring-white/30 hover:ring-white/50 transition-all" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white ring-1 ring-white/30 hover:ring-white/50 transition-all">
                <span className="font-medium text-sm">
                  {currentUser?.displayName?.charAt(0) || "A"}
                </span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">
                Espaço Pessoal
              </p>
              <p className="text-xs text-white/70 truncate">
                Estudante
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
