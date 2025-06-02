import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface GiftCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency?: string;
  available: boolean;
  category: string;
}

const GiftCard: React.FC<GiftCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  currency = 'USD',
  available,
  category
}) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price / 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!available) return;
    
    addToCart({
      id,
      name,
      price,
      image: imageUrl
    });
  };

  return (
    <motion.div 
      className="card-3d glass-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/catalog/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl || "/placeholder-gift.png"} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-gift.png";
            }}
          />
          <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-full">
            {t(`giftCard.categories.${category.toLowerCase()}`)}
          </div>
          {!available && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t('giftCard.not_available')}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">{formattedPrice}</span>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  available 
                    ? 'bg-primary-100 text-primary-600 hover:bg-primary-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleAddToCart}
                disabled={!available}
                aria-label={t('giftCard.add_to_cart')}
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link 
                  to={`/catalog/${id}`}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  aria-label={t('giftCard.details')}
                >
                  <Eye className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GiftCard;