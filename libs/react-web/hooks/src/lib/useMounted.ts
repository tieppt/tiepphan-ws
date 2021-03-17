import { useLayoutEffect, useRef } from 'react';

export function useMounted() {
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  return mountedRef;
}
