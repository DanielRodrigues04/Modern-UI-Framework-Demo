import { useState, useCallback, useRef, useEffect } from 'react';

type BatchUpdate<T> = {
  data: T;
  timestamp: number;
};

export const useBatchedState = <T>(
  initialState: T,
  batchTimeMs: number = 16 // Roughly 1 frame at 60fps
) => {
  const [state, setState] = useState<T>(initialState);
  const batchQueue = useRef<BatchUpdate<T>[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const processBatch = useCallback(() => {
    if (batchQueue.current.length === 0) return;
    
    const latestUpdate = batchQueue.current[batchQueue.current.length - 1];
    setState(latestUpdate.data);
    batchQueue.current = [];
  }, []);

  const queueUpdate = useCallback((newData: T) => {
    batchQueue.current.push({
      data: newData,
      timestamp: Date.now(),
    });

    if (timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout(() => {
        processBatch();
        timeoutRef.current = null;
      }, batchTimeMs);
    }
  }, [batchTimeMs, processBatch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [state, queueUpdate] as const;
};