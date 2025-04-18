import React, { useState } from 'react';
import { FaBook, FaSearch, FaFilter, FaPlus, FaSort, FaStickyNote, FaPencilAlt, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [editingNote, setEditingNote] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    subject: ''
  });

  // Dados simulados de notas
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'Funções do 2º grau', 
      content: 'Fórmula de Bhaskara: x = (-b ± √(b² - 4ac)) / 2a\nPara encontrar as raízes da equação ax² + bx + c = 0.',
      subject: 'Matemática',
      lastEdited: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      color: 'bg-blue-500',
      pinned: true
    },
    { 
      id: 2, 
      title: 'Revolução Francesa', 
      content: 'Período: 1789-1799\nLema: "Liberdade, Igualdade, Fraternidade"\nCausas principais: Crise econômica, absolutismo monárquico e influência iluminista',
      subject: 'História',
      lastEdited: new Date(Date.now() - 86400000 * 5), // 5 dias atrás
      color: 'bg-red-500',
      pinned: false
    },
    { 
      id: 3, 
      title: 'Leis de Newton', 
      content: '1ª Lei (Inércia): Um corpo permanece em repouso ou em movimento retilíneo uniforme, a menos que forças externas atuem sobre ele.\n2ª Lei: F = m.a\n3ª Lei: Ação e reação',
      subject: 'Física',
      lastEdited: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      color: 'bg-purple-500',
      pinned: true
    },
    { 
      id: 4, 
      title: 'Tabela Periódica - Grupos e Períodos', 
      content: 'Grupos (colunas): elementos com propriedades químicas semelhantes\nPeríodos (linhas): elementos com o mesmo número de camadas eletrônicas',
      subject: 'Química',
      lastEdited: new Date(Date.now() - 86400000 * 7), // 7 dias atrás
      color: 'bg-yellow-500',
      pinned: false
    },
    { 
      id: 5, 
      title: 'Modernismo no Brasil', 
      content: 'Período: início no século XX\nMarco inicial: Semana de Arte Moderna (1922)\nAutores principais: Mário de Andrade, Oswald de Andrade, Manuel Bandeira',
      subject: 'Português',
      lastEdited: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
      color: 'bg-green-500',
      pinned: false
    },
  ]);

  // Lista de disciplinas disponíveis
  const subjects = [
    { name: 'Matemática', color: 'bg-blue-500' },
    { name: 'História', color: 'bg-red-500' },
    { name: 'Física', color: 'bg-purple-500' },
    { name: 'Química', color: 'bg-yellow-500' },
    { name: 'Português', color: 'bg-green-500' },
    { name: 'Geografia', color: 'bg-orange-500' },
    { name: 'Biologia', color: 'bg-emerald-500' },
    { name: 'Inglês', color: 'bg-sky-500' }
  ];

  // Função para formatar data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  // Filtrar notas com base nos filtros aplicados
  const filteredNotes = notes.filter(note => {
    // Filtro de disciplina
    if (filterSubject !== 'all' && note.subject !== filterSubject) return false;
    
    // Filtro de busca
    if (searchTerm && 
      !note.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !note.content.toLowerCase().includes(searchTerm.toLowerCase())) 
      return false;
    
    return true;
  });

  // Mostrar notas fixadas primeiro, depois ordenar pelo critério escolhido
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // Priorizar notas fixadas
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // Depois aplicar o critério de ordenação
    switch (sortBy) {
      case 'date':
        return new Date(b.lastEdited) - new Date(a.lastEdited);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'subject':
        return a.subject.localeCompare(b.subject);
      default:
        return 0;
    }
  });

  // Manipular a adição de nova nota
  const handleAddNote = () => {
    setEditingNote(null);
    setEditFormData({
      title: '',
      content: '',
      subject: subjects[0].name
    });
  };

  // Manipular a edição de uma nota existente
  const handleEditNote = (note) => {
    setEditingNote(note.id);
    setEditFormData({
      title: note.title,
      content: note.content,
      subject: note.subject
    });
  };

  // Salvar uma nota (nova ou editada)
  const handleSaveNote = () => {
    if (!editFormData.title.trim() || !editFormData.content.trim()) {
      alert('Por favor, preencha o título e o conteúdo da nota.');
      return;
    }

    if (editingNote) {
      // Editando uma nota existente
      setNotes(notes.map(note => 
        note.id === editingNote 
          ? {
              ...note, 
              title: editFormData.title,
              content: editFormData.content,
              subject: editFormData.subject,
              lastEdited: new Date(),
              color: subjects.find(s => s.name === editFormData.subject)?.color || 'bg-gray-500'
            } 
          : note
      ));
    } else {
      // Adicionando uma nova nota
      setNotes([
        {
          id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
          title: editFormData.title,
          content: editFormData.content,
          subject: editFormData.subject,
          lastEdited: new Date(),
          color: subjects.find(s => s.name === editFormData.subject)?.color || 'bg-gray-500',
          pinned: false
        },
        ...notes
      ]);
    }

    // Limpar o formulário
    setEditingNote(null);
    setEditFormData({
      title: '',
      content: '',
      subject: ''
    });
  };

  // Excluir uma nota
  const handleDeleteNote = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  // Alternar o estado fixado de uma nota
  const handleTogglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? {...note, pinned: !note.pinned} 
        : note
    ));
  };

  // Cancelar a edição
  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditFormData({
      title: '',
      content: '',
      subject: ''
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaStickyNote className="text-yellow-500 mr-2" />
            Notas de Aula
          </h1>
          <p className="text-gray-600 mt-1">Organize suas anotações por disciplina</p>
        </div>
        <button 
          className="mt-4 md:mt-0 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddNote}
        >
          <FaPlus className="mr-2" />
          Nova Nota
        </button>
      </div>

      {/* Barra de filtros e busca */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Buscar nas notas..."
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
              <FaBook className="text-gray-500 mr-2" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="all">Disciplina: Todas</option>
                {subjects.map(subject => (
                  <option key={subject.name} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
              <FaSort className="text-gray-500 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="date">Ordenar: Data</option>
                <option value="alphabetical">Ordenar: Alfabética</option>
                <option value="subject">Ordenar: Disciplina</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de edição/adição */}
      {(editingNote !== null || editFormData.title || editFormData.content) && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FaPencilAlt className="text-yellow-500 mr-2" />
              {editingNote !== null ? 'Editar Nota' : 'Nova Nota'}
            </h2>
            <button 
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cancelar"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="note-title"
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Título da nota"
              />
            </div>
            
            <div>
              <label htmlFor="note-subject" className="block text-sm font-medium text-gray-700 mb-1">
                Disciplina
              </label>
              <select
                id="note-subject"
                value={editFormData.subject}
                onChange={(e) => setEditFormData({...editFormData, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              >
                {subjects.map(subject => (
                  <option key={subject.name} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1">
                Conteúdo
              </label>
              <textarea
                id="note-content"
                value={editFormData.content}
                onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                rows="6"
                placeholder="Escreva suas anotações aqui..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSaveNote}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaSave className="mr-2" />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de notas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNotes.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">Nenhuma nota encontrada</div>
            <p className="text-gray-500">Tente ajustar os filtros ou criar uma nova nota</p>
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div 
              key={note.id} 
              className={`bg-white rounded-lg shadow-sm overflow-hidden border-t-4 ${note.color} h-full flex flex-col`}
            >
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg pr-6">
                    {note.title}
                    {note.pinned && (
                      <span className="inline-block ml-2 transform rotate-45 text-yellow-500">
                        📌
                      </span>
                    )}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTogglePin(note.id)}
                      className="text-gray-500 hover:text-yellow-500"
                      aria-label={note.pinned ? "Desafixar" : "Fixar"}
                    >
                      📌
                    </button>
                    <button
                      onClick={() => handleEditNote(note)}
                      className="text-gray-500 hover:text-blue-500"
                      aria-label="Editar"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="mt-1 mb-3 flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${note.color} bg-opacity-20 text-opacity-90`}>
                    {note.subject}
                  </span>
                </div>
                
                <div className="mt-2">
                  <p className="text-gray-700 whitespace-pre-line text-sm line-clamp-6">
                    {note.content}
                  </p>
                </div>
              </div>
              
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                Editado em: {formatDate(note.lastEdited)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage; 