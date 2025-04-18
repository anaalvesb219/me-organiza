import React, { useState } from 'react';
import { FaTrash, FaRegEdit, FaStar, FaRegStar, FaClock } from 'react-icons/fa';

/**
 * Componente Todo para exibir e gerenciar tarefas individuais
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.task - Objeto da tarefa com id, title, description, completed, etc
 * @param {Function} props.onStatusChange - Função para mudar o status de concluído
 * @param {Function} props.onDelete - Função para excluir a tarefa
 * @param {Function} props.onTogglePriority - Função para alternar a importância da tarefa
 * @param {Function} props.onEdit - Função para editar a tarefa
 * @param {boolean} props.isMobile - Se o dispositivo é mobile
 */
const Todo = ({ 
  task, 
  onStatusChange, 
  onDelete, 
  onTogglePriority, 
  onEdit,
  isMobile = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Formatar data para exibição
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };
  
  // Verificar se tarefa está atrasada
  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));
  };
  
  // Calcular dias restantes até o prazo
  const getDaysRemaining = (date) => {
    if (!date) return null;
    
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const dueDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Obter cor para prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Texto dos dias restantes
  const getRemainingText = (date) => {
    if (!date) return null;
    
    const days = getDaysRemaining(date);
    
    if (days < 0) return null; // Não mostrar para tarefas atrasadas
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Amanhã';
    return `${days} dias`;
  };
  
  return (
    <div 
      className={`p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg border border-transparent 
        hover:border-gray-200 dark:hover:border-gray-600 ${task.completed ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onStatusChange(task.id)}
            className={`w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500 ${isMobile ? 'h-6 w-6' : ''}`}
            aria-label={`Marcar tarefa ${task.title} como ${task.completed ? 'não concluída' : 'concluída'}`}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <h3 className={`font-semibold text-base sm:text-lg ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center mt-2 sm:mt-0 gap-2">
              {task.priority && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              )}
              
              {task.subject && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {task.subject}
                </span>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs ${
                isOverdue(task.dueDate) && !task.completed 
                  ? 'text-red-600 dark:text-red-400 font-semibold' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {isOverdue(task.dueDate) && !task.completed 
                  ? 'Atrasada! ' 
                  : 'Prazo: '}
                {formatDate(task.dueDate)}
              </span>
              
              {!task.completed && task.dueDate && !isOverdue(task.dueDate) && (
                <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-2 py-0.5 rounded-full flex items-center">
                  <FaClock className="mr-1 text-blue-500 dark:text-blue-300" size={10} />
                  {getRemainingText(task.dueDate)}
                </span>
              )}
            </div>
            
            <div className={`flex gap-2 ${isMobile ? 'opacity-100' : (isHovered ? 'opacity-100' : 'opacity-0')}`}>
              <button 
                onClick={() => onTogglePriority(task.id)}
                className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors p-1"
                aria-label={`${task.important ? 'Remover importância' : 'Marcar como importante'}`}
              >
                {task.important ? <FaStar className="text-yellow-500 dark:text-yellow-400" /> : <FaRegStar />}
              </button>
              
              <button 
                onClick={() => onEdit(task)}
                className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-1"
                aria-label="Editar tarefa"
              >
                <FaRegEdit />
              </button>
              
              <button 
                onClick={() => onDelete(task.id)}
                className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                aria-label="Excluir tarefa"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo; 