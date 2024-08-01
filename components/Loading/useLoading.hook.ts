import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [loadingText, setLoadingText] = useState('Loading');
  const [dotCount, setDotCount] = useState(1);
  const maxDots = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevDotCount) => (prevDotCount < maxDots ? prevDotCount + 1 : 1));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dots = '.'.repeat(dotCount);
    setLoadingText(`Loading${dots}`);
  }, [dotCount]);

  return { loadingText };
};
