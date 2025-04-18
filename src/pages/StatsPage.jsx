import React from 'react';
import { FaClock, FaBook, FaChartPie, FaCalendarAlt } from 'react-icons/fa';

const StatsPage = () => {
  // Dados simulados
  const studyStats = [
    { subject: "Matemática", hours: 12, percentage: 30 },
    { subject: "História", hours: 8, percentage: 20 },
    { subject: "Física", hours: 10, percentage: 25 },
    { subject: "Química", hours: 6, percentage: 15 },
    { subject: "Português", hours: 4, percentage: 10 },
  ];

  const weeklyData = [
    { day: "Segunda", hours: 2.5 },
    { day: "Terça", hours: 3.0 },
    { day: "Quarta", hours: 1.5 },
    { day: "Quinta", hours: 4.0 },
    { day: "Sexta", hours: 2.0 },
    { day: "Sábado", hours: 3.5 },
    { day: "Domingo", hours: 1.0 },
  ];

  const totalHours = studyStats.reduce((total, item) => total + item.hours, 0);
  const averagePerDay = (totalHours / 7).toFixed(1);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaClock className="text-cyan-500 mr-2" />
            Estatísticas de Estudo
          </h1>
          <p className="text-gray-600 mt-1">Análise do seu tempo de estudo por matéria e período</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-white rounded-lg shadow-sm p-2">
          <span className="text-gray-600 mr-2 text-sm">Período:</span>
          <select className="border-none focus:ring-0 text-sm bg-transparent">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
            <option>Este semestre</option>
          </select>
        </div>
      </div>

      {/* Resumo em cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="rounded-full bg-cyan-100 p-3 mr-4">
            <FaClock className="text-cyan-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total de horas</p>
            <p className="text-2xl font-bold">{totalHours}h</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="rounded-full bg-cyan-100 p-3 mr-4">
            <FaCalendarAlt className="text-cyan-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Média diária</p>
            <p className="text-2xl font-bold">{averagePerDay}h</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="rounded-full bg-cyan-100 p-3 mr-4">
            <FaBook className="text-cyan-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Matérias estudadas</p>
            <p className="text-2xl font-bold">{studyStats.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="rounded-full bg-cyan-100 p-3 mr-4">
            <FaChartPie className="text-cyan-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Dia mais produtivo</p>
            <p className="text-2xl font-bold">Quinta</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Tempo por matéria */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Tempo por Matéria</h2>
          
          <div className="space-y-4">
            {studyStats.map(stat => (
              <div key={stat.subject}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{stat.subject}</span>
                  <span className="text-sm text-gray-500">{stat.hours}h ({stat.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-cyan-500 h-2.5 rounded-full" 
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Distribuição semanal */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Distribuição Semanal</h2>
          
          <div className="h-64 flex items-end justify-between">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex flex-col items-center">
                <div 
                  className="w-12 bg-cyan-500 rounded-t" 
                  style={{ height: `${day.hours * 15}px` }}
                ></div>
                <span className="text-xs mt-2">{day.day.substring(0, 3)}</span>
                <span className="text-xs text-gray-500">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recomendações</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-cyan-200 rounded-lg p-4 bg-cyan-50">
            <h3 className="font-medium text-cyan-700 mb-2">Otimize seu tempo</h3>
            <p className="text-sm text-cyan-600">
              Suas sessões de estudo mais produtivas são nas quintas. Considere programar suas tarefas mais 
              complexas para este dia.
            </p>
          </div>
          
          <div className="border border-cyan-200 rounded-lg p-4 bg-cyan-50">
            <h3 className="font-medium text-cyan-700 mb-2">Foco em Português</h3>
            <p className="text-sm text-cyan-600">
              Você está dedicando apenas 10% do seu tempo para Português. Considere aumentar suas horas de estudo nessa matéria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage; 