import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MiniCalendar = ({ events = [], onDateClick }) => {
  // Formatar tooltip para mostrar detalhes do evento
  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-dot" 
        style={{ 
          backgroundColor: eventInfo.event.backgroundColor || '#4dabf7',
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          margin: '0 auto'
        }}
        title={eventInfo.event.title}
      />
    );
  };

  // Manipular clique em uma data
  const handleDateClick = (info) => {
    if (onDateClick) {
      onDateClick(info.date);
    }
  };

  return (
    <div className="mini-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        locale="pt-br"
        height="auto"
        dayMaxEvents={1}
        eventDisplay="dot"
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
        dayHeaderFormat={(date) => {
          return format(date.date, 'EEE', { locale: ptBR });
        }}
      />
      <style jsx>{`
        .mini-calendar {
          font-size: 0.85em;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .mini-calendar :global(.fc-theme-standard) {
          border-radius: 8px;
        }
        
        .mini-calendar :global(.fc-button) {
          background: var(--primary-color);
          border-color: var(--primary-color);
          font-size: 0.8em;
          padding: 0.3em 0.5em;
        }
        
        .mini-calendar :global(.fc-button:hover) {
          background: var(--primary-dark);
          border-color: var(--primary-dark);
        }
        
        .mini-calendar :global(.fc-daygrid-day) {
          cursor: pointer;
        }
        
        .mini-calendar :global(.fc-daygrid-day:hover) {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .mini-calendar :global(.fc-today) {
          background-color: rgba(var(--primary-rgb), 0.15) !important;
        }
        
        @media (max-width: 768px) {
          .mini-calendar {
            font-size: 0.75em;
          }
          
          .mini-calendar :global(.fc-button) {
            font-size: 0.7em;
            padding: 0.2em 0.4em;
          }
        }
      `}</style>
    </div>
  );
};

export default MiniCalendar; 