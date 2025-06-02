import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  fullScreen = false 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 'h-8 w-8';
      case 'large': return 'h-16 w-16';
      default: return 'h-12 w-12';
    }
  };

  const getColor = () => {
    switch (color) {
      case 'secondary': return 'border-secondary-500';
      case 'accent': return 'border-accent-500';
      default: return 'border-primary-500';
    }
  };

  const spinnerSize = getSize();
  const spinnerColor = getColor();

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <motion.div
          className={`rounded-full border-4 border-t-transparent ${spinnerSize} ${spinnerColor}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className={`rounded-full border-4 border-t-transparent ${spinnerSize} ${spinnerColor}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;