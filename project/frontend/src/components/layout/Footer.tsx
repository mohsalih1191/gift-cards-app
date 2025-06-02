import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gift, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and short description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Gift className="text-primary-600 h-7 w-7" strokeWidth={2} />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {t('welcome_message').split(' ').pop()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/catalog" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('navigation.catalog')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('navigation.cart')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <form className="mb-4">
              <div className="flex rtl:flex-row-reverse">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-s-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <button 
                  type="submit" 
                  className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-e-lg border border-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('footer.copyright').replace('2025', currentYear.toString())}
            </p>
            <div className="flex items-center space-x-1 rtl:space-x-reverse mt-4 md:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">Made with</span>
              <Heart className="h-3 w-3 text-red-500" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;