import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaCalendarAlt, FaCheckCircle, FaClock, FaPlus, 
  FaCalendarPlus, FaClipboardList, FaBell, FaBook, 
  FaChartBar, FaProjectDiagram, FaRss, FaUser, FaCog
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Dados simulados para demonstração dos componentes
  const tasks = [
    { id: 1, title: "Estudar Matemática", dueDate: new Date(), completed: false, priority: "Hoje" },
    { id: 2, title: "Pesquisa de História", dueDate: new Date(Date.now() + 86400000), completed: true, priority: "Amanhã" },
    { id: 3, title: "Trabalho de Química", dueDate: new Date(Date.now() + 172800000), completed: false, priority: "Em breve" },
    { id: 4, title: "Ler livro para Português", dueDate: new Date(Date.now() + 86400000), completed: false, priority: "Amanhã" },
  ];
  
  const events = [
    { id: 1, title: "Prova de Física", date: new Date(Date.now() + 172800000) },
    { id: 2, title: "Aula de Reforço", date: new Date() },
  ];
  
  // Formatação da data
  const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
  const formatDate = (date) => {
    return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };
  
  // Cálculo do progresso das tarefas
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  // Definição dos módulos/páginas disponíveis
  const modulePages = [
    { 
      id: 1, 
      title: "Tarefas", 
      description: "Gerenciar todas as suas tarefas e pendências", 
      icon: <FaCheckCircle />, 
      color: "from-blue-500 to-blue-600",
      path: "/tarefas",
      badge: tasks.length > 0 ? `${tasks.length}` : null
    },
    { 
      id: 2, 
      title: "Calendário", 
      description: "Visualizar e organizar seus eventos e compromissos", 
      icon: <FaCalendarAlt />, 
      color: "from-green-500 to-green-600",
      path: "/calendario",
      badge: events.length > 0 ? `${events.length}` : null
    },
    { 
      id: 3, 
      title: "Notificações", 
      description: "Acompanhe avisos e mensagens importantes", 
      icon: <FaBell />, 
      color: "from-yellow-500 to-yellow-600",
      path: "/notificacoes",
      badge: "3"
    },
    { 
      id: 4, 
      title: "Metas & Objetivos", 
      description: "Acompanhe seu progresso acadêmico", 
      icon: <FaChartBar />, 
      color: "from-purple-500 to-purple-600",
      path: "/metas"
    },
    { 
      id: 5, 
      title: "Estatísticas", 
      description: "Análise detalhada do seu tempo de estudo", 
      icon: <FaClock />, 
      color: "from-cyan-500 to-cyan-600",
      path: "/estatisticas"
    },
    { 
      id: 6, 
      title: "Projetos", 
      description: "Gerencie seus projetos e disciplinas favoritas", 
      icon: <FaProjectDiagram />, 
      color: "from-indigo-500 to-indigo-600",
      path: "/projetos"
    },
    { 
      id: 7, 
      title: "Feed", 
      description: "Veja atualizações e mensagens da sua turma", 
      icon: <FaRss />, 
      color: "from-red-500 to-red-600",
      path: "/feed"
    },
    { 
      id: 8, 
      title: "Perfil", 
      description: "Gerencie suas informações e configurações", 
      icon: <FaUser />, 
      color: "from-gray-600 to-gray-700",
      path: "/perfil"
    }
  ];
  
  return (
    <div className="p-4 md:p-6">
      {/* 1. Resumo Diário */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
          <div>
            <h2 className="text-xl font-bold">{formatDate(currentDate)}</h2>
            <p className="text-gray-600">{tasks.length} Tarefas • {events.length} Eventos</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{progressPercentage}% concluído</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* 2. Atalhos Rápidos */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap justify-around gap-4">
          <button 
            onClick={() => navigate('/tarefas')}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg flex-1 hover:bg-blue-700 transition"
          >
            <FaPlus className="mr-2" />
            Nova Tarefa
          </button>
          <button 
            onClick={() => navigate('/calendario')}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg flex-1 hover:bg-blue-700 transition"
          >
            <FaCalendarPlus className="mr-2" />
            Novo Evento
          </button>
          <button 
            onClick={() => navigate('/projetos')}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg flex-1 hover:bg-blue-700 transition"
          >
            <FaClipboardList className="mr-2" />
            Abrir Projetos
          </button>
        </div>
      </div>
      
      {/* 3. Cards de Acesso às Páginas */}
      <h2 className="text-xl font-bold mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {modulePages.map(module => (
          <div
            key={module.id}
            onClick={() => navigate(module.path)}
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer transform transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative"
          >
            <div className={`absolute top-0 right-0 w-1 h-16 bg-gradient-to-b ${module.color} rounded-tr-lg`}></div>
            
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${module.color} text-white flex items-center justify-center mb-3`}>
              {module.icon}
            </div>
            
            <h3 className="text-lg font-semibold mb-1 pr-3">{module.title}</h3>
            <p className="text-sm text-gray-600">{module.description}</p>
            
            {module.badge && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {module.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
