import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{t('email')}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        {/* More profile information will be added here */}
      </div>
    </div>
  );
};

export default Profile; 