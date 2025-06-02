import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'credit', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎' },
];

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState<string>('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Here you would typically integrate with a payment processor
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear the cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment error
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">{t('checkout.emptyCart')}</h1>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('checkout.continueShopping')}
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
        <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{t('checkout.shippingInfo')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('checkout.name')}
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('checkout.email')}
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{t('checkout.paymentMethod')}</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? t('checkout.processing') : t('checkout.payNow')}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.orderSummary')}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('checkout.subtotal')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('checkout.tax')}</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t('checkout.total')}</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout; 