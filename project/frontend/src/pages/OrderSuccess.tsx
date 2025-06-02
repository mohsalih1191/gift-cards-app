import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <span className="text-4xl">✓</span>
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">{t('orderSuccess.title')}</h1>
        <p className="text-gray-600 mb-8">{t('orderSuccess.message')}</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('orderSuccess.viewOrders')}
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t('orderSuccess.continueShopping')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 