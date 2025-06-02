import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log('Attempting login with:', { email });
    try {
      await login(email, password);
      console.log('Login successful');
      // Check if user is admin and redirect accordingly
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('User data:', user);
      if (user.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin');
      } else {
        console.log('Redirecting to home');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('login')}</h1>
        {(error || authError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || authError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : t('login')}
          </button>
          <p className="mt-4 text-center">
            {t('no_account')}{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              {t('register')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 