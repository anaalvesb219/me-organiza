import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import PrivateRoute from './PrivateRoute';

// Páginas
import Dashboard from './pages/Dashboard';
import BoardView from './pages/BoardView';
import CalendarView from './pages/CalendarView';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Layout from './components/layout/Layout';
import Register from './components/Register';

// Novas páginas
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';
import SchedulePage from './pages/SchedulePage';
import SubjectsPage from './pages/SubjectsPage';
import GoalsPage from './pages/GoalsPage';
import StatsPage from './pages/StatsPage';
import ProjectsPage from './pages/ProjectsPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';

// Hook para detectar dispositivo móvel
const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobileUA = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
      );
      setIsMobile(mobileUA || window.innerWidth < 768);
    };
    
    // Verifica no carregamento inicial
    checkMobile();
    
    // Verifica ao redimensionar a janela
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};

// Componente de Login
const Login = () => {
  const { loginWithGoogle, currentUser, loading } = useAuth();
  const { isMobile } = useDeviceDetect();
  const [isGuest, setIsGuest] = useState(false);

  // Lidar com acesso de convidado
  const handleGuestAccess = () => {
    setIsGuest(true);
    // Simular carregamento antes de redirecionar
    setTimeout(() => {
      localStorage.setItem('guestUser', 'true');
      window.location.href = '/dashboard';
    }, 1000);
  };

  // Se estiver carregando, mostra um indicador de carregamento
  if (loading || isGuest) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="text-white text-center">
          <div className="text-3xl font-bold mb-3 animate-pulse">MeOrganiza</div>
          <div className="text-sm">{isGuest ? 'Entrando como convidado...' : 'Carregando...'}</div>
        </div>
      </div>
    );
  }

  // Se já estiver autenticado, redireciona para o dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // O redirecionamento acontecerá automaticamente quando o estado do usuário for atualizado
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      alert("Falha ao fazer login com o Google. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-4">
      <div className={`bg-white p-${isMobile ? '5' : '8'} rounded-xl shadow-xl w-full max-w-md animate-slide-up`}>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold purple-pink-gradient-text mb-2">MeOrganiza</h1>
          <p className="text-gray-600 text-sm md:text-base">Organize sua vida escolar com facilidade</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Entrar com Google"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm md:text-base">Entrar com Google</span>
          </button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>
          
          <button 
            onClick={handleGuestAccess}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg py-3 font-medium hover:from-purple-700 hover:to-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Iniciar como Convidado"
          >
            <span className="text-sm md:text-base">Iniciar como Convidado</span>
          </button>
          
          <div className="text-center text-xs md:text-sm text-gray-600 mt-5">
            <p>Acesse com sua conta Google para salvar seus dados {!isMobile && 'e utilizar todos os recursos'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de rotas principal
const AppRoutes = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota pública de login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rota pública de registro */}
            <Route path="/register" element={<Register />} />
            
            {/* Rotas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                {/* Redirecionamento da raiz para o dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Páginas da aplicação */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/board" element={<BoardView />} />
                
                {/* Rotas originais renomeadas para compatibilidade */}
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Novas rotas conforme solicitado */}
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/subjects" element={<SubjectsPage />} />
                <Route path="/tarefas" element={<TasksPage />} />
                <Route path="/calendario" element={<CalendarView />} />
                <Route path="/notificacoes" element={<Notifications />} />
                <Route path="/metas" element={<GoalsPage />} />
                <Route path="/estatisticas" element={<StatsPage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/notas" element={<NotesPage />} />
              </Route>
            </Route>
            
            {/* Rota para qualquer caminho não definido */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;
