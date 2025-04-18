import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-gray-800">MeOrganiza</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        <div className="flex items-center">
          {currentUser?.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Perfil" 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {currentUser?.displayName?.charAt(0) || 'U'}
            </div>
          )}
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">{currentUser?.displayName || 'Usuário'}</p>
            <button 
              onClick={logout}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
