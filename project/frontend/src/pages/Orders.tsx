import React from 'react';
import { useTranslation } from 'react-i18next';

const Orders: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('my_orders')}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Orders list will be added here */}
        <p className="text-gray-500">{t('no_orders')}</p>
      </div>
    </div>
  );
};

export default Orders; 