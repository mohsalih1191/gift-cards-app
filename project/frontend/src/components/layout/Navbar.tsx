import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">Gift Cards</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/catalog"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                {t('navigation.catalog')}
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="p-2 text-gray-500 hover:text-gray-700">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {isAuthenticated ? (
              <div className="ml-4 flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title={t('admin.dashboard')}
                  >
                    <Settings className="w-6 h-6" />
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title={t('navigation.account')}
                >
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title={t('auth.logout')}
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  {t('auth.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 