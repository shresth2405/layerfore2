'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import DotGrid with no SSR
const DotGrid = dynamic(() => import('./DotGrid'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%' }} />
});

const DotGridWrapper = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ width: '100%', height: '100%' }} />;
  }

  return <DotGrid {...props} />;
};

export default DotGridWrapper;
