import React, { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AvatarImg } from './user-profile.styled';

export interface UserProfileProps {
  username: string;
  avatar: string;
  round?: boolean;
}

export function useMounted() {
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => mountedRef.current = false;
  }, []);
  return mountedRef;
}

export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {

  const [state, setState] = useState(initialState);

  const mountedRef = useMounted();
  const safeSetState: Dispatch<SetStateAction<S>> = useCallback((updater) => {
    if (mountedRef.current) {
      setState(updater);
    }
  }, [mountedRef])
  return [state, safeSetState];
}

export function UserProfile(props: UserProfileProps) {

  const [timer, setTimer] = useSafeState(10);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(123);
        setTimer(pre => {
          if (pre <= 0) {
            clearInterval(id);
            return 0;
          }
          return pre - 1;
        });

    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [setTimer]);
  return (
    <div>
      <h1>Welcome to user-profile! {timer}</h1>
      <h4>{props.username}</h4>
      <AvatarImg className={props.round ? 'round' : ''} src={props.avatar} alt="" />
    </div>
  );
}

export default UserProfile;
