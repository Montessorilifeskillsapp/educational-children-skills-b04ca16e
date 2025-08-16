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

  return <AppLayout />;
};

export default Index;