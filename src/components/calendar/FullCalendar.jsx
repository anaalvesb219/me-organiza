import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FaCalendarAlt, FaCheckCircle, FaBriefcase, FaGraduationCap, FaCalendarDay, FaUsers, FaSearch, FaBookmark } from 'react-icons/fa';
import '../../styles/fullcalendar.css';

export default function MyCalendar({ showSidebar = true }) {
  const [events, setEvents] = useState([
    // Dados de exemplo para demonstração
    { id: '1', title: 'Reunião do Projeto', start: '2023-05-15', classNames: ['event-trabalho'] },
    { id: '2', title: 'Prazo de Entrega', start: '2023-05-22', end: '2023-05-23', allDay: true, classNames: ['event-prova'] },
    { id: '3', title: 'Apresentação', start: '2023-05-28', classNames: ['event-evento'] },
    { id: '4', title: 'Aula de Matemática', start: '2023-05-10', classNames: ['event-aula'] },
    { id: '5', title: 'Estudo em Grupo', start: '2023-05-18', classNames: ['event-estudo'] }
  ]);
  
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState({
    aula: true,
    estudo: true,
    trabalho: true,
    prova: true,
    evento: true,
    reuniao: true
  });

  // Em um ambiente real, buscar eventos do seu backend
  useEffect(() => {
    // Simula um atraso da API
    setTimeout(() => {
      console.log('Eventos carregados com sucesso');
    }, 1000);
  }, []);

  // Filtra eventos baseado nas categorias ativas e termo de busca
  useEffect(() => {
    let result = events;
    
    // Filtrar por categoria
    result = result.filter(event => {
      const eventCategory = event.classNames?.[0]?.replace('event-', '') || 'outro';
      return categories[eventCategory];
    });
    
    // Filtrar por termo de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term)
      );
    }
    
    setFilteredEvents(result);
  }, [events, categories, searchTerm]);

  // Ao clicar em um dia vazio
  const handleDateClick = (arg) => {
    const title = prompt('Título do evento:');
    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: arg.dateStr,
        allDay: true,
        classNames: ['event-evento'] // Categoria padrão
      };
      
      setEvents(prev => [...prev, newEvent]);
      console.log('Novo evento criado:', newEvent);
    }
  };

  // Ao clicar em evento existente
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Remover evento '${clickInfo.event.title}'?`)) {
      setEvents(prev => prev.filter(event => event.id !== clickInfo.event.id));
      console.log('Evento removido:', clickInfo.event);
    }
  };
  
  // Alternar visibilidade de uma categoria
  const toggleCategory = (category) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Gerar dias para o mini-calendário
  const generateMiniCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const miniCalendarDays = generateMiniCalendarDays();
  const currentDay = new Date().getDate();

  return (
    <div className="notion-calendar">
      <div className="fullcalendar-layout">
        {showSidebar && (
          <div className="fullcalendar-sidebar">
            <div className="calendar-sidebar">
              <div className="calendar-search">
                <FaSearch />
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="calendar-sidebar-section">
                <div className="calendar-sidebar-header">Mini Calendário</div>
                <div className="mini-calendar">
                  <div className="mini-calendar-header">
                    <div className="mini-calendar-title">
                      {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="mini-calendar-grid">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                      <div key={`wd-${i}`} className="mini-calendar-weekday">{day}</div>
                    ))}
                    
                    {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="mini-calendar-day empty"></div>
                    ))}
                    
                    {miniCalendarDays.map(day => (
                      <div 
                        key={`day-${day}`} 
                        className={`mini-calendar-day ${day === currentDay ? 'current' : ''}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="calendar-sidebar-section">
                <div className="calendar-sidebar-header">Categorias</div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.aula ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('aula')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#2383e2' }}></span>
                  <FaGraduationCap />
                  <span>Aulas</span>
                  <span className="calendar-sidebar-item-toggle">{categories.aula ? '✓' : ''}</span>
                </div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.estudo ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('estudo')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#66bb6a' }}></span>
                  <FaBookmark />
                  <span>Estudos</span>
                  <span className="calendar-sidebar-item-toggle">{categories.estudo ? '✓' : ''}</span>
                </div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.trabalho ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('trabalho')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#e4723c' }}></span>
                  <FaBriefcase />
                  <span>Trabalhos</span>
                  <span className="calendar-sidebar-item-toggle">{categories.trabalho ? '✓' : ''}</span>
                </div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.prova ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('prova')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#e35e5e' }}></span>
                  <FaCheckCircle />
                  <span>Provas</span>
                  <span className="calendar-sidebar-item-toggle">{categories.prova ? '✓' : ''}</span>
                </div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.evento ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('evento')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#9065b0' }}></span>
                  <FaCalendarDay />
                  <span>Eventos</span>
                  <span className="calendar-sidebar-item-toggle">{categories.evento ? '✓' : ''}</span>
                </div>
                
                <div 
                  className={`calendar-sidebar-item ${categories.reuniao ? '' : 'disabled'}`}
                  onClick={() => toggleCategory('reuniao')}
                >
                  <span className="calendar-sidebar-item-color" style={{ backgroundColor: '#f8df72' }}></span>
                  <FaUsers />
                  <span>Reuniões</span>
                  <span className="calendar-sidebar-item-toggle">{categories.reuniao ? '✓' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="fullcalendar-main">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            events={filteredEvents.length > 0 ? filteredEvents : events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,listWeek'
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              list: 'Lista'
            }}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            nowIndicator={true}
            navLinks={true}
          />
        </div>
      </div>
    </div>
  );
} 