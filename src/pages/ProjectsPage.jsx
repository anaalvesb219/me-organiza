import React, { useState } from 'react';
import { FaProjectDiagram, FaPlus, FaFolder, FaBook, FaClock, FaStar, FaEdit, FaTrash } from 'react-icons/fa';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Dados simulados
  const projects = [
    {
      id: 1,
      title: "Trabalho de Física - Energias Renováveis",
      description: "Pesquisa sobre fontes de energia renovável e seus impactos ambientais",
      subject: "Física",
      deadline: new Date(Date.now() + 1209600000), // 2 semanas
      progress: 75,
      color: "bg-indigo-500"
    },
    {
      id: 2,
      title: "Apresentação de História - Revolução Francesa",
      description: "Apresentação em slides sobre as causas e consequências da Revolução Francesa",
      subject: "História",
      deadline: new Date(Date.now() + 604800000), // 1 semana
      progress: 30,
      color: "bg-red-500"
    },
    {
      id: 3,
      title: "Projeto de Matemática - Equações",
      description: "Lista de exercícios sobre equações diferenciais",
      subject: "Matemática",
      deadline: new Date(Date.now() + 259200000), // 3 dias
      progress: 90,
      color: "bg-blue-500"
    },
    {
      id: 4,
      title: "Redação - Tema Livre",
      description: "Redação dissertativa-argumentativa sobre tema de escolha",
      subject: "Português",
      deadline: new Date(Date.now() + 432000000), // 5 dias
      progress: 50,
      color: "bg-green-500"
    }
  ];
  
  const favoriteSubjects = [
    {
      id: 1,
      name: "Matemática",
      icon: <FaBook />,
      totalProjects: 3,
      totalHours: 24,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Física",
      icon: <FaBook />,
      totalProjects: 2,
      totalHours: 18,
      color: "bg-indigo-500"
    },
    {
      id: 3,
      name: "História",
      icon: <FaBook />,
      totalProjects: 2,
      totalHours: 12,
      color: "bg-red-500"
    },
    {
      id: 4,
      name: "Química",
      icon: <FaBook />,
      totalProjects: 1,
      totalHours: 10,
      color: "bg-yellow-500"
    },
    {
      id: 5,
      name: "Português",
      icon: <FaBook />,
      totalProjects: 2,
      totalHours: 15,
      color: "bg-green-500"
    }
  ];
  
  // Formatação de data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };
  
  // Cálculo de dias restantes
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaProjectDiagram className="text-indigo-500 mr-2" />
            Projetos e Disciplinas
          </h1>
          <p className="text-gray-600 mt-1">Gerencie seus projetos e disciplinas favoritas</p>
        </div>
        <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" />
          Novo Projeto
        </button>
      </div>

      {/* Abas de navegação */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'projects' 
            ? 'text-indigo-600 border-b-2 border-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('projects')}
        >
          <FaFolder className="inline mr-2" />
          Projetos
        </button>
        
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'subjects' 
            ? 'text-indigo-600 border-b-2 border-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('subjects')}
        >
          <FaBook className="inline mr-2" />
          Disciplinas
        </button>
      </div>

      {/* Conteúdo de Projetos */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className={`h-2 ${project.color}`}></div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 truncate">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FaBook className="mr-1" />
                    {project.subject}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <FaClock className="mr-1" />
                    Prazo: {formatDate(project.deadline)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{project.progress}% completo</span>
                    <span className={
                      getDaysRemaining(project.deadline) <= 2 ? 'text-red-600 font-semibold' : 
                      getDaysRemaining(project.deadline) <= 5 ? 'text-yellow-600' : 'text-gray-500'
                    }>
                      {getDaysRemaining(project.deadline)} dias restantes
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${project.color}`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Abrir
                  </button>
                  <div className="space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Card para adicionar novo projeto */}
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full">
            <FaPlus className="text-gray-400 text-2xl mb-2" />
            <p className="text-gray-500 text-center font-medium">Adicionar Projeto</p>
          </div>
        </div>
      )}

      {/* Conteúdo de Disciplinas */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteSubjects.map(subject => (
            <div key={subject.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full ${subject.color} flex items-center justify-center text-white mr-3`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center">
                      <FaStar className="text-yellow-400 mr-1" /> Favorita
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Projetos</p>
                    <p className="font-semibold">{subject.totalProjects}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Horas estudadas</p>
                    <p className="font-semibold">{subject.totalHours}h</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Ver detalhes
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Card para adicionar nova disciplina */}
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full">
            <FaPlus className="text-gray-400 text-2xl mb-2" />
            <p className="text-gray-500 text-center font-medium">Adicionar Disciplina</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage; 