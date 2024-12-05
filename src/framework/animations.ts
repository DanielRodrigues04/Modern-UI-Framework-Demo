import { useEffect, useRef } from 'react';

type AnimationOptions = {
  duration?: number;
  easing?: string;
  delay?: number;
};

export const useAnimatedMount = (options: AnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { duration = 300, easing = 'cubic-bezier(0.4, 0, 0.2, 1)', delay = 0 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

    const timeoutId = setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [duration, easing, delay]);

  return elementRef;
};