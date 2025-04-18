import React, { useState } from 'react';
import { FaClock, FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaFilter } from 'react-icons/fa';

const SchedulePage = () => {
  const [activeDay, setActiveDay] = useState('monday');
  const [editModal, setEditModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [editFormData, setEditFormData] = useState({
    subject: '',
    teacher: '',
    room: '',
    startTime: '',
    endTime: '',
    day: 'monday'
  });

  // Dados simulados dos horários para cada dia da semana
  const [schedule, setSchedule] = useState({
    monday: [
      { id: 1, subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101', startTime: '07:30', endTime: '08:20', color: 'bg-blue-500' },
      { id: 2, subject: 'Física', teacher: 'Prof. Oliveira', room: 'Sala 102', startTime: '08:20', endTime: '09:10', color: 'bg-purple-500' },
      { id: 3, subject: 'Química', teacher: 'Prof. Santos', room: 'Lab. Química', startTime: '09:30', endTime: '10:20', color: 'bg-yellow-500' },
      { id: 4, subject: 'História', teacher: 'Prof. Lima', room: 'Sala 105', startTime: '10:20', endTime: '11:10', color: 'bg-red-500' },
      { id: 5, subject: 'Português', teacher: 'Prof. Ferreira', room: 'Sala 101', startTime: '11:10', endTime: '12:00', color: 'bg-green-500' },
    ],
    tuesday: [
      { id: 6, subject: 'Biologia', teacher: 'Prof. Costa', room: 'Lab. Biologia', startTime: '07:30', endTime: '08:20', color: 'bg-emerald-500' },
      { id: 7, subject: 'Geografia', teacher: 'Prof. Almeida', room: 'Sala 103', startTime: '08:20', endTime: '09:10', color: 'bg-orange-500' },
      { id: 8, subject: 'Inglês', teacher: 'Prof. Rodrigues', room: 'Sala 104', startTime: '09:30', endTime: '10:20', color: 'bg-sky-500' },
      { id: 9, subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101', startTime: '10:20', endTime: '11:10', color: 'bg-blue-500' },
      { id: 10, subject: 'Português', teacher: 'Prof. Ferreira', room: 'Sala 101', startTime: '11:10', endTime: '12:00', color: 'bg-green-500' },
    ],
    wednesday: [
      { id: 11, subject: 'Física', teacher: 'Prof. Oliveira', room: 'Sala 102', startTime: '07:30', endTime: '08:20', color: 'bg-purple-500' },
      { id: 12, subject: 'Química', teacher: 'Prof. Santos', room: 'Lab. Química', startTime: '08:20', endTime: '09:10', color: 'bg-yellow-500' },
      { id: 13, subject: 'Educação Física', teacher: 'Prof. Souza', room: 'Quadra', startTime: '09:30', endTime: '10:20', color: 'bg-pink-500' },
      { id: 14, subject: 'Biologia', teacher: 'Prof. Costa', room: 'Lab. Biologia', startTime: '10:20', endTime: '11:10', color: 'bg-emerald-500' },
      { id: 15, subject: 'Artes', teacher: 'Prof. Moreira', room: 'Sala Artes', startTime: '11:10', endTime: '12:00', color: 'bg-indigo-500' },
    ],
    thursday: [
      { id: 16, subject: 'História', teacher: 'Prof. Lima', room: 'Sala 105', startTime: '07:30', endTime: '08:20', color: 'bg-red-500' },
      { id: 17, subject: 'Geografia', teacher: 'Prof. Almeida', room: 'Sala 103', startTime: '08:20', endTime: '09:10', color: 'bg-orange-500' },
      { id: 18, subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101', startTime: '09:30', endTime: '10:20', color: 'bg-blue-500' },
      { id: 19, subject: 'Português', teacher: 'Prof. Ferreira', room: 'Sala 101', startTime: '10:20', endTime: '11:10', color: 'bg-green-500' },
      { id: 20, subject: 'Inglês', teacher: 'Prof. Rodrigues', room: 'Sala 104', startTime: '11:10', endTime: '12:00', color: 'bg-sky-500' },
    ],
    friday: [
      { id: 21, subject: 'Português', teacher: 'Prof. Ferreira', room: 'Sala 101', startTime: '07:30', endTime: '08:20', color: 'bg-green-500' },
      { id: 22, subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101', startTime: '08:20', endTime: '09:10', color: 'bg-blue-500' },
      { id: 23, subject: 'Física', teacher: 'Prof. Oliveira', room: 'Sala 102', startTime: '09:30', endTime: '10:20', color: 'bg-purple-500' },
      { id: 24, subject: 'Química', teacher: 'Prof. Santos', room: 'Lab. Química', startTime: '10:20', endTime: '11:10', color: 'bg-yellow-500' },
      { id: 25, subject: 'História', teacher: 'Prof. Lima', room: 'Sala 105', startTime: '11:10', endTime: '12:00', color: 'bg-red-500' },
    ],
  });

  // Lista de disciplinas disponíveis com suas cores
  const subjects = [
    { name: 'Matemática', color: 'bg-blue-500' },
    { name: 'Português', color: 'bg-green-500' },
    { name: 'Física', color: 'bg-purple-500' },
    { name: 'Química', color: 'bg-yellow-500' },
    { name: 'História', color: 'bg-red-500' },
    { name: 'Geografia', color: 'bg-orange-500' },
    { name: 'Biologia', color: 'bg-emerald-500' },
    { name: 'Inglês', color: 'bg-sky-500' },
    { name: 'Educação Física', color: 'bg-pink-500' },
    { name: 'Artes', color: 'bg-indigo-500' },
  ];

  // Nomes dos dias da semana em português
  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
  };

  // Abrir o modal para adicionar uma nova aula
  const handleAddClass = () => {
    setEditingClass(null);
    setEditFormData({
      subject: subjects[0].name,
      teacher: '',
      room: '',
      startTime: '',
      endTime: '',
      day: activeDay
    });
    setEditModal(true);
  };

  // Abrir o modal para editar uma aula existente
  const handleEditClass = (classItem) => {
    setEditingClass(classItem.id);
    setEditFormData({
      subject: classItem.subject,
      teacher: classItem.teacher,
      room: classItem.room,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      day: activeDay
    });
    setEditModal(true);
  };

  // Excluir uma aula
  const handleDeleteClass = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este horário?')) {
      setSchedule({
        ...schedule,
        [activeDay]: schedule[activeDay].filter(item => item.id !== id)
      });
    }
  };

  // Salvar uma aula (nova ou editada)
  const handleSaveClass = () => {
    if (!editFormData.subject || !editFormData.startTime || !editFormData.endTime) {
      alert('Por favor, preencha a disciplina, horário de início e término.');
      return;
    }

    // Verificar se o horário está em formato válido
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(editFormData.startTime) || !timeRegex.test(editFormData.endTime)) {
      alert('Por favor, insira os horários no formato HH:MM (ex: 08:30).');
      return;
    }

    // Verificar se o horário de término é posterior ao de início
    if (editFormData.startTime >= editFormData.endTime) {
      alert('O horário de término deve ser posterior ao horário de início.');
      return;
    }

    const subjectColor = subjects.find(s => s.name === editFormData.subject)?.color || 'bg-gray-500';

    if (editingClass) {
      // Editando uma aula existente
      setSchedule({
        ...schedule,
        [activeDay]: schedule[activeDay].map(item => 
          item.id === editingClass 
            ? {
                ...item,
                subject: editFormData.subject,
                teacher: editFormData.teacher,
                room: editFormData.room,
                startTime: editFormData.startTime,
                endTime: editFormData.endTime,
                color: subjectColor
              } 
            : item
        )
      });
    } else {
      // Adicionando uma nova aula
      const newId = Math.max(...Object.values(schedule).flat().map(item => item.id), 0) + 1;
      
      setSchedule({
        ...schedule,
        [activeDay]: [
          ...schedule[activeDay],
          {
            id: newId,
            subject: editFormData.subject,
            teacher: editFormData.teacher,
            room: editFormData.room,
            startTime: editFormData.startTime,
            endTime: editFormData.endTime,
            color: subjectColor
          }
        ].sort((a, b) => a.startTime.localeCompare(b.startTime))
      });
    }

    // Fechar o modal e limpar o formulário
    setEditModal(false);
    setEditingClass(null);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaClock className="text-purple-500 mr-2" />
            Horário de Aulas
          </h1>
          <p className="text-gray-600 mt-1">Visualize e organize seu cronograma semanal</p>
        </div>
        <button 
          className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddClass}
        >
          <FaPlus className="mr-2" />
          Adicionar Aula
        </button>
      </div>

      {/* Navegação dos dias da semana */}
      <div className="flex flex-wrap md:flex-nowrap bg-white rounded-lg shadow-sm p-2 mb-6 overflow-x-auto">
        {Object.keys(dayNames).map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 min-w-[120px] py-2 px-4 mx-1 rounded-md transition-colors ${
              activeDay === day
                ? 'bg-purple-500 text-white font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {dayNames[day]}
          </button>
        ))}
      </div>

      {/* Tabela de horários */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {schedule[activeDay].length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">Nenhuma aula registrada para {dayNames[activeDay]}</div>
            <p className="text-gray-500">Clique em "Adicionar Aula" para começar a montar seu horário</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disciplina
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Professor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sala
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule[activeDay]
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((classItem) => (
                    <tr key={classItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${classItem.color} mr-2`}></div>
                          <div className="text-sm font-medium text-gray-900">{classItem.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{classItem.teacher}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{classItem.room}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClass(classItem)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classItem.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de edição/adição */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingClass ? 'Editar Aula' : 'Adicionar Nova Aula'}
              </h2>
              <button 
                onClick={() => setEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Disciplina
                </label>
                <select
                  id="subject"
                  value={editFormData.subject}
                  onChange={(e) => setEditFormData({...editFormData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  {subjects.map(subject => (
                    <option key={subject.name} value={subject.name}>{subject.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">
                  Professor
                </label>
                <input
                  id="teacher"
                  type="text"
                  value={editFormData.teacher}
                  onChange={(e) => setEditFormData({...editFormData, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Nome do professor"
                />
              </div>
              
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                  Sala
                </label>
                <input
                  id="room"
                  type="text"
                  value={editFormData.room}
                  onChange={(e) => setEditFormData({...editFormData, room: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Número ou nome da sala"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Início
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={editFormData.startTime}
                    onChange={(e) => setEditFormData({...editFormData, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Término
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={editFormData.endTime}
                    onChange={(e) => setEditFormData({...editFormData, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setEditModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-3"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveClass}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage; 