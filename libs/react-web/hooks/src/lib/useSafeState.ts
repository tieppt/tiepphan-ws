import React, {
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from 'react';
export function useMounted() {
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  return mountedRef;
}

export function useSafeState<S = undefined>(
  initialState: S | undefined = undefined
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const mountedRef = useMounted();
  const [state, setState] = useState(initialState);
  const setSafeState: React.Dispatch<React.SetStateAction<S>> = useCallback(
    function setSafeState(state: React.SetStateAction<S>) {
      if (mountedRef.current) {
        setState(state);
      }
    },
    [setState, mountedRef]
  );

  return [state, setSafeState];
}
