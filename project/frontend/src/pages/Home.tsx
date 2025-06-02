import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gift, CreditCard, ShieldCheck, Gift as GiftIcon } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-primary-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {t('welcome_message')}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <Link to="/catalog" className="btn-primary text-center">
                  {t('navigation.catalog')}
                </Link>
                <Link to="/login" className="btn-outline text-center">
                  {t('auth.login')}
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-10 -right-6 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <motion.div 
                  className="relative z-10 bg-white p-8 rounded-xl shadow-xl overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Gift className="w-24 h-24 text-primary-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Digital Gift Cards</h3>
                    <p className="text-gray-600 text-center">Send the perfect gift instantly to your loved ones</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Gift Cards</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Send the perfect gift instantly with our digital gift cards
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <div className="bg-primary-100 p-3 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Gift className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-gray-700">
                Send gift cards instantly via email. Perfect for last-minute gifts.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-gradient-to-br from-secondary-50 to-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <div className="bg-secondary-100 p-3 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="text-secondary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-700">
                Shop with confidence knowing your transactions are secure.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-gradient-to-br from-accent-50 to-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <div className="bg-accent-100 p-3 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-accent-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Guaranteed</h3>
              <p className="text-gray-700">
                All gift cards are guaranteed to work or your money back.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Preview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our most popular gift card categories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Gaming', 'Shopping', 'Entertainment', 'Food', 'Travel', 'Other'].map((category, index) => (
              <motion.div
                key={category}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GiftIcon className="mx-auto h-8 w-8 text-primary-600 mb-3" />
                <h3 className="font-medium text-gray-900">{t(`giftCard.categories.${category.toLowerCase()}`)}</h3>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/catalog" className="btn-primary inline-block">
              Browse All Gift Cards
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Create an account today and discover the perfect gift cards for your loved ones.
            </p>
            <Link 
              to="/register" 
              className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Create Account
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;