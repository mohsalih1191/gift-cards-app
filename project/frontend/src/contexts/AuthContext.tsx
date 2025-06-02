import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  preferredLanguage: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, language?: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if token is valid on mount
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          // Decode token to get user info
          const decoded: any = jwt_decode(token);
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            // Set auth header for all requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Get user profile
            const response = await api.get('/api/auth/me');
            setUser(response.data.data);
          }
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/api/auth/login', { email, password });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, language = 'en') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/api/auth/register', { 
        name, 
        email, 
        password,
        preferredLanguage: language
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.put('/api/auth/me', userData);
      
      setUser(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Update failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};