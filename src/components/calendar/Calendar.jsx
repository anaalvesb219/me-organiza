import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTrash, FaEdit, FaCalendarDay } from 'react-icons/fa';
import EventModal from './EventModal';
import '../../styles/calendar.css';

const Calendar = ({ events = [], onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Funções de navegação do calendário
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, getDaysInMonth(year, month)).getDay();
  };

  // Gerar dias do calendário
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const lastDay = getLastDayOfMonth(year, month);
    
    // Dias do mês anterior
    const daysFromPrevMonth = firstDay;
    const prevMonthDays = [];
    
    if (daysFromPrevMonth > 0) {
      const prevMonthDaysCount = getDaysInMonth(year, month - 1);
      for (let i = prevMonthDaysCount - daysFromPrevMonth + 1; i <= prevMonthDaysCount; i++) {
        prevMonthDays.push({
          day: i,
          month: month - 1,
          year: month === 0 ? year - 1 : year,
          currentMonth: false
        });
      }
    }
    
    // Dias do mês atual
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month: month,
        year: year,
        currentMonth: true
      });
    }
    
    // Dias do próximo mês
    const daysFromNextMonth = 6 - lastDay;
    const nextMonthDays = [];
    
    if (daysFromNextMonth > 0) {
      for (let i = 1; i <= daysFromNextMonth; i++) {
        nextMonthDays.push({
          day: i,
          month: month + 1,
          year: month === 11 ? year + 1 : year,
          currentMonth: false
        });
      }
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Obter eventos para um dia específico
  const getEventsForDay = (day, month, year) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  // Manipuladores de eventos
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setModalMode('add');
    setShowModal(true);
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddEvent = (newEvent) => {
    if (onAddEvent) {
      onAddEvent({
        ...newEvent,
        date: selectedDate.toISOString().split('T')[0]
      });
    }
    setShowModal(false);
  };

  const handleEditEvent = (updatedEvent) => {
    if (onEditEvent) {
      onEditEvent(updatedEvent);
    }
    setShowModal(false);
  };

  const handleDeleteEvent = () => {
    if (onDeleteEvent && selectedEvent) {
      onDeleteEvent(selectedEvent.id);
    }
    setShowModal(false);
  };

  // Renderizar dia do calendário
  const renderDay = (dayInfo) => {
    const { day, month, year, currentMonth } = dayInfo;
    const dayEvents = getEventsForDay(day, month, year);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    const isSelected = selectedDate && selectedDate.toDateString() === new Date(year, month, day).toDateString();
    
    const dayClassName = `calendar-day ${!currentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`;
    
    return (
      <div 
        key={`${year}-${month}-${day}`} 
        className={dayClassName}
        onClick={() => handleDayClick(new Date(year, month, day))}
      >
        <div className="day-number">{day}</div>
        <div className="day-events">
          {dayEvents.slice(0, 3).map((event, index) => (
            <div 
              key={event.id} 
              className={`day-event event-${event.category || 'outro'} event-priority-${event.priority || 'low'}`}
              onClick={(e) => handleEventClick(e, event)}
            >
              {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="event-more">+{dayEvents.length - 3} mais</div>
          )}
        </div>
      </div>
    );
  };

  // Renderizar calendário completo
  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title">
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </div>
        <div className="calendar-nav">
          <button onClick={prevMonth} title="Mês anterior"><FaChevronLeft /></button>
          <button onClick={goToToday} title="Ir para hoje"><FaCalendarDay /></button>
          <button onClick={nextMonth} title="Próximo mês"><FaChevronRight /></button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
          <div key={index} className="weekday">{day}</div>
        ))}
        
        {calendarDays.map(dayInfo => renderDay(dayInfo))}
      </div>
      
      {showModal && (
        <EventModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={modalMode === 'add' ? handleAddEvent : handleEditEvent}
          onDelete={handleDeleteEvent}
          event={selectedEvent}
          mode={modalMode}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;
