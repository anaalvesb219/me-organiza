import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para a página de login se o usuário não estiver autenticado
 * Mostra uma tela de carregamento enquanto verifica o estado de autenticação
 */
const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading || currentUser === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="text-center text-white">
          <div className="text-3xl font-bold mb-3">MeOrganiza</div>
          <div className="text-sm mb-6">Verificando autenticação...</div>
          <div className="w-12 h-12 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 