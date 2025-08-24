import { useEffect, useState } from 'react';

/**
 * Hook to safely detect client-side rendering and prevent hydration mismatches
 */
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const useSSRSafeId = (prefix: string = 'id') => {
  const [id, setId] = useState<string>('');
  
  useEffect(() => {
    // Use crypto.randomUUID if available, fallback to timestamp-based ID
    const randomId = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID().slice(0, 9)
      : Date.now().toString(36) + performance.now().toString(36).slice(2, 5);
    setId(`${prefix}-${randomId}`);
  }, [prefix]);
  
  return id;
};
