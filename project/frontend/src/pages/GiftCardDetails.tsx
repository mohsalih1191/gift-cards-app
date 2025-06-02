import React from 'react';
import { useParams } from 'react-router-dom';

const GiftCardDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gift Card Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Gift Card ID: {id}</p>
        {/* More details will be added here */}
      </div>
    </div>
  );
};

export default GiftCardDetails; 