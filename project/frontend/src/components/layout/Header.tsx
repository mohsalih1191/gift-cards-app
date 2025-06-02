import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ShoppingCart, User, Gift, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle language switch
  const switchLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md dark:bg-gray-900' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Gift 
              className="text-primary-600 h-8 w-8" 
              strokeWidth={2}
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {t('welcome_message').split(' ').pop()}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link 
              to="/" 
              className={`text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-200'
              } transition-colors`}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/catalog" 
              className={`text-sm font-medium ${
                location.pathname === '/catalog' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-200'
              } transition-colors`}
            >
              {t('navigation.catalog')}
            </Link>
            {user && (
              <Link 
                to="/orders" 
                className={`text-sm font-medium ${
                  location.pathname === '/orders' 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-200'
                } transition-colors`}
              >
                {t('navigation.orders')}
              </Link>
            )}
          </nav>

          {/* Right section: cart, language, user */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${
                  i18n.language === 'en' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => switchLanguage('en')}
              >
                EN
              </button>
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${
                  i18n.language === 'ar' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => switchLanguage('ar')}
              >
                عربي
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account */}
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 rtl:space-x-reverse"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                    >
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('navigation.account')}
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('navigation.orders')}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        {t('auth.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden sm:block text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {t('auth.login')}
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className={`text-base font-medium ${
                    location.pathname === '/' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {t('navigation.home')}
                </Link>
                <Link 
                  to="/catalog" 
                  className={`text-base font-medium ${
                    location.pathname === '/catalog' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {t('navigation.catalog')}
                </Link>
                <Link 
                  to="/cart" 
                  className={`text-base font-medium ${
                    location.pathname === '/cart' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {t('navigation.cart')}
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/orders" 
                      className={`text-base font-medium ${
                        location.pathname === '/orders' 
                          ? 'text-primary-600' 
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {t('navigation.orders')}
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`text-base font-medium ${
                        location.pathname === '/profile' 
                          ? 'text-primary-600' 
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {t('navigation.account')}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-base font-medium text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t('auth.logout')}</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-base font-medium text-primary-600"
                  >
                    {t('auth.login')}
                  </Link>
                )}

                {/* Mobile Language Switcher */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    className={`px-3 py-1 text-sm font-medium rounded ${
                      i18n.language === 'en' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => switchLanguage('en')}
                  >
                    English
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm font-medium rounded ${
                      i18n.language === 'ar' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => switchLanguage('ar')}
                  >
                    العربية
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;