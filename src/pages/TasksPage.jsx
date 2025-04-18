import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaFilter, FaSearch, FaPlus, FaSort, FaSortAmountDown, FaBook, FaTimes } from 'react-icons/fa';
import Todo from '../components/Todo';

const TasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'Média',
  });

  // Verificar se o dispositivo é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Dados simulados de tarefas
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Estudar Matemática - Capítulo 3', 
      description: 'Resolver os exercícios 1-15 do livro de Álgebra',
      subject: 'Matemática',
      dueDate: new Date(), 
      priority: 'Alta',
      status: 'pending',
      completed: false,
      important: true
    },
    { 
      id: 2, 
      title: 'Pesquisa de História - Revolução Industrial', 
      description: 'Fazer pesquisa sobre as causas e consequências da Revolução Industrial',
      subject: 'História',
      dueDate: new Date(Date.now() + 86400000), 
      priority: 'Média',
      status: 'pending',
      completed: false,
      important: false
    },
    { 
      id: 3, 
      title: 'Relatório de Física - Leis de Newton', 
      description: 'Escrever relatório sobre as 3 leis de Newton e suas aplicações',
      subject: 'Física',
      dueDate: new Date(Date.now() + 172800000), 
      priority: 'Alta',
      status: 'pending',
      completed: false,
      important: true
    },
    { 
      id: 4, 
      title: 'Trabalho de Química - Tabela Periódica', 
      description: 'Apresentação sobre a evolução da tabela periódica',
      subject: 'Química',
      dueDate: new Date(Date.now() + 259200000), 
      priority: 'Baixa',
      status: 'completed',
      completed: true,
      important: false
    },
    { 
      id: 5, 
      title: 'Leitura para Português - Dom Casmurro', 
      description: 'Ler capítulos 1-10 do livro',
      subject: 'Português',
      dueDate: new Date(Date.now() + 345600000), 
      priority: 'Média',
      status: 'pending',
      completed: false,
      important: false
    },
  ]);

  // Lista de disciplinas disponíveis
  const subjects = ['Matemática', 'História', 'Física', 'Química', 'Português', 'Geografia', 'Biologia', 'Inglês'];

  // Função para formatar data para exibição nos inputs
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Filtrar tarefas com base nos filtros aplicados
  const filteredTasks = tasks.filter(task => {
    // Filtro de status
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterStatus === 'pending' && task.completed) return false;
    if (filterStatus === 'important' && !task.important) return false;
    
    // Filtro de prioridade
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    
    // Filtro de disciplina
    if (filterSubject !== 'all' && task.subject !== filterSubject) return false;
    
    // Filtro de busca
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Ordenar tarefas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priorityOrder = { 'Alta': 0, 'Média': 1, 'Baixa': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Lidar com mudança de status de uma tarefa
  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {...task, completed: !task.completed, status: task.completed ? 'pending' : 'completed'} 
        : task
    ));
  };

  // Lidar com exclusão de uma tarefa
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Lidar com alternar importância de uma tarefa
  const handleTogglePriority = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {...task, important: !task.important} 
        : task
    ));
  };

  // Lidar com edição de uma tarefa
  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      subject: task.subject || '',
      dueDate: formatDateForInput(task.dueDate) || '',
      priority: task.priority || 'Média',
    });
    setShowForm(true);
  };

  // Lidar com mudanças nos campos do formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Lidar com envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('O título da tarefa é obrigatório');
      return;
    }
    
    const taskData = {
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      priority: formData.priority,
      completed: editingTask ? editingTask.completed : false,
      status: editingTask ? editingTask.status : 'pending',
      important: editingTask ? editingTask.important : false,
    };
    
    if (editingTask) {
      // Atualizando tarefa existente
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData } 
          : task
      ));
    } else {
      // Criando nova tarefa
      const newTask = {
        id: Date.now(),
        ...taskData,
      };
      setTasks([...tasks, newTask]);
    }
    
    // Resetar formulário
    setFormData({
      title: '',
      description: '',
      subject: '',
      dueDate: '',
      priority: 'Média',
    });
    setEditingTask(null);
    setShowForm(false);
  };

  // Cancelar edição ou criação
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      dueDate: '',
      priority: 'Média',
    });
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaCheckCircle className="text-blue-500 mr-2" />
            Tarefas
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Gerencie suas tarefas e atividades</p>
        </div>
        <button 
          onClick={() => {
            setEditingTask(null);
            setFormData({
              title: '',
              description: '',
              subject: '',
              dueDate: '',
              priority: 'Média',
            });
            setShowForm(true);
          }}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Nova Tarefa
        </button>
      </div>

      {/* Formulário de Tarefa (mostrado/ocultado baseado no estado) */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <button 
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Fechar formulário"
            >
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Título*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Título da tarefa"
                  required
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição detalhada da tarefa"
                  rows="3"
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Disciplina</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione uma disciplina</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Prioridade</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Data de Entrega</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {editingTask ? 'Salvar Alterações' : 'Criar Tarefa'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barra de filtros e busca */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar tarefa..."
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5">
              <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm dark:text-gray-300"
              >
                <option value="all">Status: Todos</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
                <option value="important">Importantes</option>
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5">
              <FaSortAmountDown className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm dark:text-gray-300"
              >
                <option value="all">Prioridade: Todas</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5">
              <FaBook className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm dark:text-gray-300"
              >
                <option value="all">Disciplina: Todas</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5">
              <FaSort className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm dark:text-gray-300"
              >
                <option value="date">Ordenar: Data</option>
                <option value="priority">Ordenar: Prioridade</option>
                <option value="alphabetical">Ordenar: Alfabética</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {sortedTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">Nenhuma tarefa encontrada</div>
            <p className="text-gray-500 dark:text-gray-400">Tente ajustar os filtros ou criar uma nova tarefa</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTasks.map((task) => (
              <Todo
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onTogglePriority={handleTogglePriority}
                onEdit={handleEditTask}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage; 