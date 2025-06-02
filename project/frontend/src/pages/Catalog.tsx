import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gift, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface GiftCard {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

const sampleGiftCards: GiftCard[] = [
  {
    id: '1',
    name: 'Amazon Gift Card',
    description: 'Shop millions of products on Amazon.com',
    price: 50,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500',
    category: 'Shopping',
    available: true
  },
  {
    id: '2',
    name: 'Netflix Gift Card',
    description: 'Stream your favorite movies and TV shows',
    price: 30,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500',
    category: 'Entertainment',
    available: true
  },
  {
    id: '3',
    name: 'Spotify Gift Card',
    description: 'Listen to millions of songs and podcasts',
    price: 25,
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=500',
    category: 'Music',
    available: true
  },
  {
    id: '4',
    name: 'Steam Gift Card',
    description: 'Buy games and in-game items on Steam',
    price: 40,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
    category: 'Gaming',
    available: true
  },
  {
    id: '5',
    name: 'Uber Gift Card',
    description: 'Ride with Uber anywhere in the world',
    price: 35,
    image: 'https://images.unsplash.com/photo-1556122071-eefbddc1d3c3?w=500',
    category: 'Transportation',
    available: true
  },
  {
    id: '6',
    name: 'Airbnb Gift Card',
    description: 'Book unique places to stay around the world',
    price: 100,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    category: 'Travel',
    available: true
  }
];

const Catalog: React.FC = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [giftCards, setGiftCards] = useState<GiftCard[]>(sampleGiftCards);

  const categories = ['all', ...Array.from(new Set(sampleGiftCards.map(card => card.category)))];

  const filteredGiftCards = selectedCategory === 'all'
    ? giftCards
    : giftCards.filter(card => card.category === selectedCategory);

  const handleAddToCart = (giftCard: GiftCard) => {
    addToCart({
      id: giftCard.id,
      name: giftCard.name,
      price: giftCard.price,
      image: giftCard.image
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('gift_card_catalog')}</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGiftCards.map(giftCard => (
          <motion.div
            key={giftCard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={giftCard.image}
                alt={giftCard.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Gift className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{giftCard.name}</h3>
              <p className="text-gray-600 mb-4">{giftCard.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${giftCard.price}
                </span>
                <button
                  onClick={() => handleAddToCart(giftCard)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Catalog; 