import React from 'react';
import { FaChartBar, FaTrophy, FaClock, FaArrowUp } from 'react-icons/fa';

const GoalsPage = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaChartBar className="text-purple-500 mr-2" />
            Metas & Objetivos
          </h1>
          <p className="text-gray-600 mt-1">Acompanhe seu progresso acadêmico</p>
        </div>
      </div>

      {/* Conteúdo da página - Em desenvolvimento */}
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <FaTrophy className="text-purple-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Acompanhamento de Metas</h2>
        <p className="text-gray-600 mb-6">
          Esta página está em desenvolvimento. Aqui você poderá acompanhar seu progresso em metas de estudo,
          visualizar gráficos de desempenho e estabelecer objetivos acadêmicos.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg inline-block">
          <p className="text-purple-700 flex items-center">
            <FaClock className="mr-2" />
            Em breve disponível!
          </p>
        </div>
      </div>

      {/* Exemplo de dashboard com dados simulados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4">Progresso do Semestre</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-purple-600">
                  65% Completo
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
              <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4">Média de Notas</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-purple-600">8.5</div>
            <div className="ml-2 flex items-center text-green-500">
              <FaArrowUp />
              <span className="text-xs ml-1">12% acima da turma</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4">Objetivos Alcançados</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">7/12</div>
            <div className="text-sm text-gray-500 mt-1">Objetivos do semestre</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage; 