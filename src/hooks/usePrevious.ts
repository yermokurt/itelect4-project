import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const previousValueRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  // This hook intentionally exposes the value committed by the previous render.
  // eslint-disable-next-line react-hooks/refs
  return previousValueRef.current;
}

export default usePrevious;
