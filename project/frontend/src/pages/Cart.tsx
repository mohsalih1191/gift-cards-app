import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">{t('cart.empty')}</h1>
          <p className="text-gray-600 mb-8">{t('cart.emptyMessage')}</p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('cart.continueShopping')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 p-4 border-b"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  {t('cart.remove')}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{t('cart.summary')}</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.tax')}</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>{t('cart.total')}</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('cart.checkout')}
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-gray-600 hover:text-gray-800"
              >
                {t('cart.clearCart')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart; 