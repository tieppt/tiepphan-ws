import { useCallback, useEffect } from 'react';
import { useSafeState } from './useSafeState';

/**
 * Hook for calling Async Function
 * Usage:
 *
 * function Comp() {
 *   const { execute, status, value, error } = useAsync<string>(myFunction, false);
 *
 *   return (
 *     <div>
 *       {status === 'idle' && <div>Start your journey by clicking a button</div>}
 *       {status === 'success' && <div>{value}</div>}
 *       {status === 'error' && <div>{error}</div>}
 *       <button onClick={execute} disabled={status === 'pending'}>
 *         {status !== 'pending' ? 'Click me' : 'Loading...'}
 *       </button>
 *     </div>
 *   );
 * }
 */

export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useSafeState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [value, setValue] = useSafeState<T | null>(null);
  const [error, setError] = useSafeState<E | null>(null);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response: T) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: E) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction, setError, setStatus, setValue]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}
