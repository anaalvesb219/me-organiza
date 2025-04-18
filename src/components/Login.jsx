import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaUser } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const { login, loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique seu email e senha.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setIsGoogleLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Falha ao fazer login com Google.');
      console.error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setError('');
      setIsGuestLoading(true);
      await loginAsGuest();
      navigate('/dashboard');
    } catch (err) {
      setError('Falha ao fazer login como convidado.');
      console.error(err);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Desktop banner gradient - hidden on mobile */}
        <div className="hidden md:block h-16 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              MeOrganiza
            </h1>
            <p className="text-gray-500 mt-2">Faça login para continuar</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <BiLoaderAlt className="animate-spin mr-2" size={20} />
                ) : null}
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                {isGoogleLoading ? (
                  <BiLoaderAlt className="animate-spin mr-2" size={18} />
                ) : (
                  <FaGoogle className="text-red-500 mr-2" size={18} />
                )}
                Google
              </button>
              
              <button
                onClick={handleGuestLogin}
                disabled={isGuestLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                {isGuestLoading ? (
                  <BiLoaderAlt className="animate-spin mr-2" size={18} />
                ) : (
                  <FaUser className="text-gray-500 mr-2" size={16} />
                )}
                Convidado
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 