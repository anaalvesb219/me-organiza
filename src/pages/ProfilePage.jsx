import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FaUser, FaEnvelope, FaSchool, FaCog, FaBell, 
  FaMoon, FaSun, FaSignOutAlt, FaCamera, FaCheck, FaGlobe 
} from 'react-icons/fa';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [updateNotifications, setUpdateNotifications] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [autoSaveChanges, setAutoSaveChanges] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  
  const handleLogout = async () => {
    try {
      await logout();
      // Redirecionamento acontecerá automaticamente devido ao contexto de autenticação
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Falha ao sair. Por favor, tente novamente.');
    }
  };
  
  // Dados simulados de perfil
  const userProfile = {
    name: currentUser?.displayName || 'Estudante',
    email: currentUser?.email || 'estudante@exemplo.com',
    school: 'Colégio Exemplo',
    grade: '2º Ano - Ensino Médio',
    joinDate: 'Março 2023',
    photoURL: currentUser?.photoURL || null,
    notifications: {
      events: true,
      messages: true,
      reminders: true,
      updates: false
    },
    preferences: {
      darkMode: false,
      language: 'Português',
      showCompletedTasks: true,
      autoSave: true
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaUser className="text-gray-600 mr-2" />
            Perfil e Configurações
          </h1>
          <p className="text-gray-600 mt-1">Gerencie suas informações e preferências pessoais</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de navegação */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {userProfile.photoURL ? (
                <img 
                  src={userProfile.photoURL} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {userProfile.name.charAt(0)}
                </div>
              )}
              <button className="absolute bottom-0 right-0 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700">
                <FaCamera size={14} />
              </button>
            </div>
            <h2 className="text-lg font-semibold mt-4">{userProfile.name}</h2>
            <p className="text-sm text-gray-500">{userProfile.grade}</p>
          </div>
          
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2.5 rounded-md flex items-center ${
                activeTab === 'profile' 
                  ? 'bg-gray-100 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaUser className="mr-3" size={16} />
              Dados Pessoais
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-2.5 rounded-md flex items-center ${
                activeTab === 'notifications' 
                  ? 'bg-gray-100 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaBell className="mr-3" size={16} />
              Notificações
            </button>
            
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`w-full text-left px-4 py-2.5 rounded-md flex items-center ${
                activeTab === 'preferences' 
                  ? 'bg-gray-100 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaCog className="mr-3" size={16} />
              Preferências
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 rounded-md flex items-center text-red-500 hover:bg-red-50"
            >
              <FaSignOutAlt className="mr-3" size={16} />
              Sair
            </button>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {/* Aba de Perfil */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Meus Dados</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={userProfile.name}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                      disabled={!!currentUser?.providerData[0]?.providerId}
                    />
                    {currentUser?.providerData[0]?.providerId && (
                      <div className="ml-2 bg-gray-100 px-3 flex items-center rounded-md">
                        <span className="text-xs text-gray-500">Gerenciado pelo Google</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex">
                    <input 
                      type="email" 
                      value={userProfile.email}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                      disabled={!!currentUser?.providerData[0]?.providerId}
                    />
                    {currentUser?.providerData[0]?.providerId && (
                      <div className="ml-2 bg-gray-100 px-3 flex items-center rounded-md">
                        <span className="text-xs text-gray-500">Gerenciado pelo Google</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Escola</label>
                  <input 
                    type="text" 
                    value={userProfile.school}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Série / Turma</label>
                  <input 
                    type="text" 
                    value={userProfile.grade}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                
                <div className="pt-4">
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg">
                    Salvar alterações
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Aba de Notificações */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Configurações de Notificações</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações ativas</h3>
                    <p className="text-sm text-gray-500">Ativar ou desativar todas as notificações</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggle-all"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <label 
                      htmlFor="toggle-all" 
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                        notificationsEnabled ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          notificationsEnabled ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Tipos de notificações</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Eventos e prazos</p>
                        <p className="text-xs text-gray-500">Lembretes de eventos e prazos de entrega</p>
                      </div>
                      <div className="relative inline-block w-10 h-5">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="toggle-events"
                          checked={eventNotifications}
                          disabled={!notificationsEnabled}
                        />
                        <label 
                          htmlFor="toggle-events" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                            eventNotifications && notificationsEnabled ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`absolute left-1 bottom-1 bg-white w-3 h-3 rounded-full transition-transform ${
                              eventNotifications && notificationsEnabled ? 'transform translate-x-5' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Mensagens</p>
                        <p className="text-xs text-gray-500">Novas mensagens de professores e colegas</p>
                      </div>
                      <div className="relative inline-block w-10 h-5">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="toggle-messages"
                          checked={messageNotifications}
                          disabled={!notificationsEnabled}
                        />
                        <label 
                          htmlFor="toggle-messages" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                            messageNotifications && notificationsEnabled ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`absolute left-1 bottom-1 bg-white w-3 h-3 rounded-full transition-transform ${
                              messageNotifications && notificationsEnabled ? 'transform translate-x-5' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Lembretes</p>
                        <p className="text-xs text-gray-500">Lembretes de tarefas pendentes</p>
                      </div>
                      <div className="relative inline-block w-10 h-5">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="toggle-reminders"
                          checked={reminderNotifications}
                          disabled={!notificationsEnabled}
                        />
                        <label 
                          htmlFor="toggle-reminders" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                            reminderNotifications && notificationsEnabled ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`absolute left-1 bottom-1 bg-white w-3 h-3 rounded-full transition-transform ${
                              reminderNotifications && notificationsEnabled ? 'transform translate-x-5' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Atualizações</p>
                        <p className="text-xs text-gray-500">Novas funcionalidades e melhorias</p>
                      </div>
                      <div className="relative inline-block w-10 h-5">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="toggle-updates"
                          checked={updateNotifications}
                          disabled={!notificationsEnabled}
                        />
                        <label 
                          htmlFor="toggle-updates" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                            updateNotifications && notificationsEnabled ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`absolute left-1 bottom-1 bg-white w-3 h-3 rounded-full transition-transform ${
                              updateNotifications && notificationsEnabled ? 'transform translate-x-5' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg">
                    Salvar preferências
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Aba de Preferências */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Preferências do Sistema</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Modo escuro</h3>
                    <p className="text-sm text-gray-500">Alterar entre temas claro e escuro</p>
                  </div>
                  <div className="flex items-center">
                    <FaSun className={`mr-2 ${isDarkTheme ? 'text-gray-400' : 'text-yellow-500'}`} />
                    <div className="relative inline-block w-12 h-6 mx-2">
                      <input 
                        type="checkbox" 
                        className="opacity-0 w-0 h-0" 
                        id="toggle-theme"
                        checked={isDarkTheme}
                        onChange={toggleTheme}
                      />
                      <label 
                        htmlFor="toggle-theme" 
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                          isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            isDarkTheme ? 'transform translate-x-6' : ''
                          }`}
                        ></span>
                      </label>
                    </div>
                    <FaMoon className={`ml-2 ${isDarkTheme ? 'text-indigo-400' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Idioma</h3>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Opções adicionais</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="show-completed" 
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        checked={showCompletedTasks}
                      />
                      <label htmlFor="show-completed" className="ml-3 text-sm">
                        Mostrar tarefas concluídas na lista principal
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="auto-save" 
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        checked={autoSaveChanges}
                      />
                      <label htmlFor="auto-save" className="ml-3 text-sm">
                        Salvar automaticamente alterações em tarefas e eventos
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg">
                    Salvar preferências
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 