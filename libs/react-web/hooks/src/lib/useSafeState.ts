import React, {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useMounted } from './useMounted';

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
