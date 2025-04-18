import React, { useState } from 'react';
import MyCalendar from '../components/calendar/FullCalendar';

const CalendarView = () => {
  // Estado para controlar a visibilidade da sidebar do calendário
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(true);

  return (
    <div className="container mx-auto p-0">
      {/* Header da página */}
      <div className="mb-6 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Calendário</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Gerencie seus eventos, compromissos e tarefas em um único lugar
            </p>
          </div>
          
          {/* Botão para alternar a sidebar do calendário */}
          <button 
            onClick={() => setShowCalendarSidebar(!showCalendarSidebar)}
            className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            {showCalendarSidebar ? 'Ocultar Sidebar' : 'Mostrar Sidebar'}
          </button>
        </div>
      </div>

      {/* Container do calendário com a classe do Notion Calendar */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[calc(100vh-150px)]`}>
        <div className="notion-calendar w-full h-full">
          {/* A classe fullcalendar-layout já está definida dentro do componente MyCalendar */}
          <MyCalendar showSidebar={showCalendarSidebar} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
