import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrashAlt, FaSave, FaClock } from 'react-icons/fa';

const EventModal = ({ isOpen, onClose, onSave, onDelete, event, selectedDate, mode = 'add' }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('aula');
  const [priority, setPriority] = useState('média');

  // Inicializar o formulário com os dados do evento se estiver editando
  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      
      // Formatação de data e hora para os campos input
      const start = new Date(event.startDate || event.date);
      setStartDate(formatDateForInput(start));
      setStartTime(formatTimeForInput(start));
      
      const end = new Date(event.endDate || event.date);
      setEndDate(formatDateForInput(end));
      setEndTime(formatTimeForInput(end));
      
      setCategory(event.category || 'aula');
      setPriority(event.priority || 'média');
    } else if (selectedDate) {
      // Se for um novo evento e uma data foi selecionada
      setStartDate(formatDateForInput(selectedDate));
      setEndDate(formatDateForInput(selectedDate));
      
      // Definir horário padrão (hora atual arredondada para próxima hora)
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      
      setStartTime(formatTimeForInput(nextHour));
      
      // Definir duração padrão de 1 hora
      const endTime = new Date(nextHour);
      endTime.setHours(endTime.getHours() + 1);
      setEndTime(formatTimeForInput(endTime));
    }
  }, [event, selectedDate]);

  // Formatar data para o input date (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Formatar hora para o input time (HH:MM)
  const formatTimeForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  // Construir objetos Date a partir dos inputs de data e hora
  const buildDateFromInputs = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return new Date();
    
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    return new Date(year, month - 1, day, hours, minutes);
  };

  // Opções para categorias e prioridades
  const categoryOptions = [
    { value: 'aula', label: 'Aula' },
    { value: 'prova', label: 'Prova' },
    { value: 'trabalho', label: 'Trabalho' },
    { value: 'estudo', label: 'Estudo' },
    { value: 'evento', label: 'Evento' },
    { value: 'outro', label: 'Outro' }
  ];

  const priorityOptions = [
    { value: 'alta', label: 'Alta' },
    { value: 'média', label: 'Média' },
    { value: 'baixa', label: 'Baixa' }
  ];

  // Validação do formulário
  const validateForm = () => {
    if (!title.trim()) {
      alert('Por favor, informe um título para o evento.');
      return false;
    }
    
    if (!startDate || !startTime) {
      alert('Por favor, informe a data e hora de início.');
      return false;
    }
    
    if (!endDate || !endTime) {
      alert('Por favor, informe a data e hora de término.');
      return false;
    }
    
    const start = buildDateFromInputs(startDate, startTime);
    const end = buildDateFromInputs(endDate, endTime);
    
    if (end < start) {
      alert('A data/hora de término deve ser posterior à data/hora de início.');
      return false;
    }
    
    return true;
  };

  // Lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const eventData = {
      id: event?.id, // Manter o ID se estiver editando
      title: title,
      description: description,
      date: buildDateFromInputs(startDate, startTime),
      startDate: buildDateFromInputs(startDate, startTime),
      endDate: buildDateFromInputs(endDate, endTime),
      category: category,
      priority: priority
    };
    
    onSave(eventData);
  };

  // Lidar com a exclusão de um evento
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      onDelete();
    }
  };

  // Se o modal não estiver aberto, não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{mode === 'edit' ? 'Editar Evento' : 'Novo Evento'}</h2>
          <button onClick={onClose} className="modal-close" aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do evento"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição detalhada do evento"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="priority">Prioridade</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="datetime-container">
            <div className="form-group">
              <label htmlFor="startDate">Data de Início</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="startTime">Hora de Início</label>
              <div className="time-input">
                <FaClock className="time-icon" />
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="datetime-container">
            <div className="form-group">
              <label htmlFor="endDate">Data de Término</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endTime">Hora de Término</label>
              <div className="time-input">
                <FaClock className="time-icon" />
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            {mode === 'edit' && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-button"
              >
                <FaTrashAlt /> Excluir
              </button>
            )}
            
            <button type="submit" className="save-button">
              <FaSave /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
