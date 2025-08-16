import React, { useState } from 'react';
import BuilderAccess from '@/components/BuilderAccess';
import AppLayout from '@/components/AppLayout';

const Index: React.FC = () => {
  const [showBuilderAccess, setShowBuilderAccess] = useState(true);

  if (showBuilderAccess) {
    return (
      <BuilderAccess 
        onEnterApp={() => setShowBuilderAccess(false)}
      />
    );
  }

  // Temporarily bypass AppLayout to test basic functionality
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌱 Montessori Life Skills App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to your Montessori learning journey!
        </p>
        <button
          onClick={() => setShowBuilderAccess(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Builder Access
        </button>
      </div>
    </div>
  );
};

export default Index;