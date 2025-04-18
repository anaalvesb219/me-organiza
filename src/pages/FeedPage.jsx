import React, { useState } from 'react';
import { FaRss, FaSearch, FaFilter, FaUserCircle, FaPaperclip, FaThumbsUp, FaComment, FaShare, FaCalendarAlt } from 'react-icons/fa';

const FeedPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados simulados para o feed
  const feedItems = [
    {
      id: 1,
      type: 'announcement',
      author: 'Coordenação Escolar',
      avatar: 'C',
      content: 'Informamos que no próximo dia 20 de outubro haverá reunião de pais e mestres. É importante a presença de todos para acompanhamento do desenvolvimento escolar.',
      date: '3h atrás',
      comments: 5,
      likes: 12,
      hasAttachment: true
    },
    {
      id: 2,
      type: 'material',
      author: 'Prof. Ana Silva - Matemática',
      avatar: 'A',
      content: 'Disponibilizei a lista de exercícios para a prova da próxima semana. Por favor, resolvam os problemas 1-15 e tragam dúvidas para a aula de revisão.',
      date: '1d atrás',
      comments: 8,
      likes: 21,
      hasAttachment: true
    },
    {
      id: 3,
      type: 'event',
      author: 'Grêmio Estudantil',
      avatar: 'G',
      content: 'A Feira de Ciências acontecerá nos dias 28 e 29 de outubro. Inscrevam seus projetos até o dia 15/10 através do formulário disponibilizado pela coordenação.',
      date: '2d atrás',
      comments: 15,
      likes: 42,
      hasAttachment: false
    },
    {
      id: 4,
      type: 'message',
      author: 'Prof. Carlos Santos - História',
      avatar: 'C',
      content: 'Atualizei as notas do último trabalho. Quem ficou com nota abaixo de 7 deve procurar a monitoria para atividades de recuperação.',
      date: '2d atrás',
      comments: 3,
      likes: 7,
      hasAttachment: false
    },
    {
      id: 5,
      type: 'material',
      author: 'Prof. Mariana Costa - Física',
      avatar: 'M',
      content: 'Enviei novos exercícios para revisar antes da prova. Foquem especialmente nas questões sobre Leis de Newton e aplicações práticas.',
      date: '3d atrás',
      comments: 6,
      likes: 18,
      hasAttachment: true
    }
  ];
  
  // Filtrar itens com base no tipo e termo de busca
  const filteredItems = feedItems.filter(item => {
    // Filtro por tipo
    if (filterType !== 'all' && item.type !== filterType) return false;
    
    // Filtro por termo de busca
    if (searchTerm && !item.content.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.author.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });
  
  // Obter o ícone com base no tipo de item
  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <div className="bg-blue-100 text-blue-500 p-1.5 rounded-full"><FaRss /></div>;
      case 'material':
        return <div className="bg-green-100 text-green-500 p-1.5 rounded-full"><FaPaperclip /></div>;
      case 'event':
        return <div className="bg-purple-100 text-purple-500 p-1.5 rounded-full"><FaCalendarAlt /></div>;
      case 'message':
        return <div className="bg-yellow-100 text-yellow-500 p-1.5 rounded-full"><FaComment /></div>;
      default:
        return <div className="bg-gray-100 text-gray-500 p-1.5 rounded-full"><FaRss /></div>;
    }
  };
  
  // Obter o nome do tipo para exibição
  const getTypeName = (type) => {
    switch (type) {
      case 'announcement': return 'Aviso';
      case 'material': return 'Material';
      case 'event': return 'Evento';
      case 'message': return 'Mensagem';
      default: return 'Atualização';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaRss className="text-red-500 mr-2" />
            Feed de Atualizações
          </h1>
          <p className="text-gray-600 mt-1">Acompanhe avisos, materiais e mensagens importantes</p>
        </div>
      </div>

      {/* Filtros e busca */}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Buscar no feed..."
              />
            </div>
          </div>
          
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm"
            >
              <option value="all">Todos os tipos</option>
              <option value="announcement">Avisos</option>
              <option value="material">Materiais</option>
              <option value="event">Eventos</option>
              <option value="message">Mensagens</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed de atualizações */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">Nenhuma atualização encontrada</div>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                  {item.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-semibold">{item.author}</h3>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {getTypeName(item.type)}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{item.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{item.content}</p>
                  
                  {item.hasAttachment && (
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 flex items-center">
                      <FaPaperclip className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Arquivo anexado</span>
                      <button className="text-red-500 text-sm ml-auto">Baixar</button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-red-500">
                        <FaThumbsUp className="mr-1" />
                        <span className="text-xs">{item.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-red-500">
                        <FaComment className="mr-1" />
                        <span className="text-xs">{item.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-red-500">
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Entrada para nova postagem */}
      <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
        <div className="flex items-start">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-4">
            <FaUserCircle className="text-gray-500 text-xl" />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-red-500 focus:border-red-500"
              placeholder="Escreva um comentário ou dúvida..."
              rows={3}
            ></textarea>
            <div className="flex justify-between mt-2">
              <button className="text-gray-500 hover:text-red-500">
                <FaPaperclip />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage; 