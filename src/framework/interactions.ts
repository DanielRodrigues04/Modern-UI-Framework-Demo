import { useState, useCallback } from 'react';

type FeedbackState = {
  isActive: boolean;
  intensity: number;
};

export const useFeedback = (initialIntensity = 1) => {
  const [state, setState] = useState<FeedbackState>({
    isActive: false,
    intensity: initialIntensity,
  });

  const trigger = useCallback(() => {
    setState(prev => ({ ...prev, isActive: true }));
    setTimeout(() => {
      setState(prev => ({ ...prev, isActive: false }));
    }, 150);
  }, []);

  return { state, trigger };
};