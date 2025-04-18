import React, { useState } from 'react';
import { 
  FaBook, 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaStar, 
  FaRegStar, 
  FaSortAmountDown, 
  FaChartBar, 
  FaClipboardList, 
  FaClock,
  FaEllipsisH,
  FaFilter
} from 'react-icons/fa';

const SubjectsPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, favorites, archived
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    teacher: '',
    color: 'bg-blue-500',
    notes: '',
    isFavorite: false
  });

  // Dados simulados de disciplinas
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Matemática',
      teacher: 'Prof. Roberto Silva',
      color: 'bg-blue-500',
      averageGrade: 8.5,
      totalClasses: 18,
      totalHours: 36,
      nextExam: new Date(Date.now() + 86400000 * 5), // 5 dias no futuro
      pendingTasks: 3,
      notes: 'Foco em geometria e álgebra linear neste semestre',
      lastAccessed: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      isFavorite: true,
      isArchived: false
    },
    {
      id: 2,
      name: 'História',
      teacher: 'Profa. Lúcia Mendes',
      color: 'bg-red-500',
      averageGrade: 7.8,
      totalClasses: 14,
      totalHours: 28,
      nextExam: new Date(Date.now() + 86400000 * 10), // 10 dias no futuro
      pendingTasks: 1,
      notes: 'Período medieval e renascimento',
      lastAccessed: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
      isFavorite: false,
      isArchived: false
    },
    {
      id: 3,
      name: 'Física',
      teacher: 'Prof. Carlos Eduardo',
      color: 'bg-purple-500',
      averageGrade: 7.2,
      totalClasses: 16,
      totalHours: 32,
      nextExam: new Date(Date.now() + 86400000 * 3), // 3 dias no futuro
      pendingTasks: 4,
      notes: 'Eletromagnetismo e física moderna',
      lastAccessed: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      isFavorite: true,
      isArchived: false
    },
    {
      id: 4,
      name: 'Química',
      teacher: 'Profa. Ana Paula Lima',
      color: 'bg-yellow-500',
      averageGrade: 8.0,
      totalClasses: 15,
      totalHours: 30,
      nextExam: new Date(Date.now() + 86400000 * 8), // 8 dias no futuro
      pendingTasks: 2,
      notes: 'Química orgânica e reações',
      lastAccessed: new Date(Date.now() - 86400000 * 4), // 4 dias atrás
      isFavorite: false,
      isArchived: false
    },
    {
      id: 5,
      name: 'Português',
      teacher: 'Prof. João Martins',
      color: 'bg-green-500',
      averageGrade: 8.7,
      totalClasses: 17,
      totalHours: 34,
      nextExam: new Date(Date.now() + 86400000 * 12), // 12 dias no futuro
      pendingTasks: 1,
      notes: 'Literatura brasileira contemporânea',
      lastAccessed: new Date(Date.now() - 86400000 * 6), // 6 dias atrás
      isFavorite: true,
      isArchived: false
    },
    {
      id: 6,
      name: 'Biologia',
      teacher: 'Profa. Maria Luiza',
      color: 'bg-emerald-500',
      averageGrade: 7.5,
      totalClasses: 14,
      totalHours: 28,
      nextExam: new Date(Date.now() + 86400000 * 7), // 7 dias no futuro
      pendingTasks: 2,
      notes: 'Genética e biologia celular',
      lastAccessed: new Date(Date.now() - 86400000 * 5), // 5 dias atrás
      isFavorite: false,
      isArchived: false
    },
    {
      id: 7,
      name: 'Geografia',
      teacher: 'Prof. André Costa',
      color: 'bg-orange-500',
      averageGrade: 8.2,
      totalClasses: 13,
      totalHours: 26,
      nextExam: new Date(Date.now() + 86400000 * 9), // 9 dias no futuro
      pendingTasks: 0,
      notes: 'Geografia política e econômica',
      lastAccessed: new Date(Date.now() - 86400000 * 8), // 8 dias atrás
      isFavorite: false,
      isArchived: true
    },
    {
      id: 8,
      name: 'Inglês',
      teacher: 'Profa. Silvia Thomaz',
      color: 'bg-sky-500',
      averageGrade: 9.0,
      totalClasses: 12,
      totalHours: 24,
      nextExam: new Date(Date.now() + 86400000 * 14), // 14 dias no futuro
      pendingTasks: 1,
      notes: 'Conversação e gramática avançada',
      lastAccessed: new Date(Date.now() - 86400000 * 7), // 7 dias atrás
      isFavorite: false,
      isArchived: true
    }
  ]);

  // Lista de cores disponíveis
  const availableColors = [
    { name: 'Azul', value: 'bg-blue-500' },
    { name: 'Vermelho', value: 'bg-red-500' },
    { name: 'Roxo', value: 'bg-purple-500' },
    { name: 'Amarelo', value: 'bg-yellow-500' },
    { name: 'Verde', value: 'bg-green-500' },
    { name: 'Verde-esmeralda', value: 'bg-emerald-500' },
    { name: 'Laranja', value: 'bg-orange-500' },
    { name: 'Azul-céu', value: 'bg-sky-500' },
    { name: 'Rosa', value: 'bg-pink-500' },
    { name: 'Índigo', value: 'bg-indigo-500' }
  ];

  // Formatação de data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  // Contagem de dias para a próxima prova
  const getDaysUntil = (date) => {
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filtrar disciplinas com base nos filtros aplicados
  const filteredSubjects = subjects.filter(subject => {
    // Filtro por tipo (todos, favoritos, arquivados)
    if (activeTab === 'favorites' && !subject.isFavorite) return false;
    if (activeTab === 'archived' && !subject.isArchived) return false;
    if (activeTab === 'all' && subject.isArchived) return false;
    
    // Filtro de busca
    if (searchTerm && !subject.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())) 
      return false;
    
    return true;
  });

  // Ordenar disciplinas
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'recent':
        return new Date(b.lastAccessed) - new Date(a.lastAccessed);
      case 'grade':
        return b.averageGrade - a.averageGrade;
      case 'exam':
        return new Date(a.nextExam) - new Date(b.nextExam);
      default:
        return 0;
    }
  });

  // Manipular a adição de nova disciplina
  const handleAddSubject = () => {
    setSelectedSubject(null);
    setEditFormData({
      name: '',
      teacher: '',
      color: availableColors[0].value,
      notes: '',
      isFavorite: false
    });
    setShowModal(true);
  };

  // Manipular a edição de uma disciplina existente
  const handleEditSubject = (subject) => {
    setSelectedSubject(subject.id);
    setEditFormData({
      name: subject.name,
      teacher: subject.teacher,
      color: subject.color,
      notes: subject.notes,
      isFavorite: subject.isFavorite
    });
    setShowModal(true);
  };

  // Salvar uma disciplina (nova ou editada)
  const handleSaveSubject = () => {
    if (!editFormData.name.trim()) {
      alert('Por favor, insira um nome para a disciplina.');
      return;
    }

    if (selectedSubject) {
      // Editando uma disciplina existente
      setSubjects(subjects.map(subject => 
        subject.id === selectedSubject ? {
          ...subject,
          name: editFormData.name,
          teacher: editFormData.teacher,
          color: editFormData.color,
          notes: editFormData.notes,
          isFavorite: editFormData.isFavorite
        } : subject
      ));
    } else {
      // Adicionando uma nova disciplina
      const newSubject = {
        id: Date.now(),
        name: editFormData.name,
        teacher: editFormData.teacher,
        color: editFormData.color,
        averageGrade: 0,
        totalClasses: 0,
        totalHours: 0,
        nextExam: new Date(Date.now() + 86400000 * 14), // 14 dias no futuro por padrão
        pendingTasks: 0,
        notes: editFormData.notes,
        lastAccessed: new Date(),
        isFavorite: editFormData.isFavorite,
        isArchived: false
      };
      setSubjects([...subjects, newSubject]);
    }

    setShowModal(false);
  };

  // Alternar status de favorito de uma disciplina
  const handleToggleFavorite = (id) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? {...subject, isFavorite: !subject.isFavorite} : subject
    ));
  };

  // Alternar status de arquivado de uma disciplina
  const handleToggleArchived = (id) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? {...subject, isArchived: !subject.isArchived} : subject
    ));
  };

  // Excluir uma disciplina
  const handleDeleteSubject = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina? Esta ação não pode ser desfeita.')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaBook className="text-blue-500 mr-2" />
            Disciplinas
          </h1>
          <p className="text-gray-600 mt-1">Gerencie suas matérias e desempenho acadêmico</p>
        </div>
        <button 
          onClick={handleAddSubject}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Nova Disciplina
        </button>
      </div>

      {/* Filtros e busca */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar disciplinas..."
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="all">Mostrar: Ativas</option>
                <option value="favorites">Mostrar: Favoritas</option>
                <option value="archived">Mostrar: Arquivadas</option>
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
              <FaSortAmountDown className="text-gray-500 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="alphabetical">Ordenar: Alfabética</option>
                <option value="recent">Ordenar: Acessadas recentemente</option>
                <option value="grade">Ordenar: Melhor desempenho</option>
                <option value="exam">Ordenar: Próximas provas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de disciplinas */}
      {sortedSubjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FaBook className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma disciplina encontrada</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 
              `Nenhuma disciplina corresponde à busca "${searchTerm}"` : 
              'Comece adicionando uma nova disciplina para organizar seus estudos'
            }
          </p>
          <button
            onClick={handleAddSubject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <FaPlus className="mr-2" />
            Adicionar Disciplina
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubjects.map(subject => (
            <div key={subject.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className={`${subject.color} h-2`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${subject.color} flex items-center justify-center text-white mr-3`}>
                      <FaBook />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{subject.name}</h3>
                      <p className="text-gray-500 text-sm">{subject.teacher}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleToggleFavorite(subject.id)}
                      className="text-gray-400 hover:text-yellow-500"
                      aria-label={subject.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      {subject.isFavorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
                    </button>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-700">
                        <FaEllipsisH />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                        <button 
                          onClick={() => handleEditSubject(subject)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <FaEdit className="mr-2" /> Editar disciplina
                        </button>
                        <button 
                          onClick={() => handleToggleArchived(subject.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          {subject.isArchived ? 
                            <>Desarquivar disciplina</> : 
                            <>Arquivar disciplina</>
                          }
                        </button>
                        <button 
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <FaTrash className="mr-2" /> Excluir disciplina
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Média</p>
                    <p className="font-semibold">{subject.averageGrade.toFixed(1)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Tarefas pendentes</p>
                    <p className="font-semibold">{subject.pendingTasks}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-500">Próxima prova</span>
                    <span className={`font-medium ${getDaysUntil(subject.nextExam) <= 3 ? 'text-red-500' : 'text-gray-700'}`}>
                      {formatDate(subject.nextExam)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {getDaysUntil(subject.nextExam) <= 0 
                      ? 'Hoje!' 
                      : `Faltam ${getDaysUntil(subject.nextExam)} dias`
                    }
                  </div>
                </div>
                
                {subject.notes && (
                  <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg italic">
                    "{subject.notes}"
                  </div>
                )}
                
                <div className="flex justify-around border-t border-gray-100 pt-4 mt-2">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    <FaClipboardList className="mr-1" /> Conteúdos
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    <FaChartBar className="mr-1" /> Desempenho
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    <FaClock className="mr-1" /> Horários
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de adição/edição de disciplina */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedSubject ? 'Editar Disciplina' : 'Adicionar Disciplina'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Disciplina
                </label>
                <input
                  id="subject-name"
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Matemática"
                />
              </div>
              
              <div>
                <label htmlFor="subject-teacher" className="block text-sm font-medium text-gray-700 mb-1">
                  Professor(a)
                </label>
                <input
                  id="subject-teacher"
                  type="text"
                  value={editFormData.teacher}
                  onChange={(e) => setEditFormData({...editFormData, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Prof. João Silva"
                />
              </div>
              
              <div>
                <label htmlFor="subject-color" className="block text-sm font-medium text-gray-700 mb-1">
                  Cor da Disciplina
                </label>
                <select
                  id="subject-color"
                  value={editFormData.color}
                  onChange={(e) => setEditFormData({...editFormData, color: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableColors.map(color => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
                <div className="flex mt-2 gap-1">
                  {availableColors.map(color => (
                    <div 
                      key={color.value}
                      className={`w-6 h-6 rounded-full cursor-pointer ${color.value} ${editFormData.color === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      onClick={() => setEditFormData({...editFormData, color: color.value})}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject-notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Anotações
                </label>
                <textarea
                  id="subject-notes"
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 h-24"
                  placeholder="Ex: Foco em geometria e trigonometria neste bimestre"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="subject-favorite"
                  type="checkbox"
                  checked={editFormData.isFavorite}
                  onChange={(e) => setEditFormData({...editFormData, isFavorite: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="subject-favorite" className="ml-2 text-sm text-gray-700">
                  Marcar como favorita
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSubject}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {selectedSubject ? 'Salvar Alterações' : 'Adicionar Disciplina'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsPage; 