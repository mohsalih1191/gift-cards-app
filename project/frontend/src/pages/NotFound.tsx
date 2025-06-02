import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">{t('page_not_found')}</h2>
        <p className="text-gray-600 mb-8">{t('page_not_found_message')}</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {t('go_home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 