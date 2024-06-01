import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [loadingText, setLoadingText] = useState('Loading');
  const [dotCount, setDotCount] = useState(1);
  const maxDots = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prevDotCount => {
        const newDotCount = prevDotCount < maxDots ? prevDotCount + 1 : 1;
        return newDotCount;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let dots = '.'.repeat(dotCount);
    setLoadingText(`Loading${dots}`);
  }, [dotCount]);

  return <h2>{loadingText}</h2>;
};

export default Loading;