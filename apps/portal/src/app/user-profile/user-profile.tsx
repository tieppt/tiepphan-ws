import React, { useEffect } from "react";
import { useSafeState } from "@tpws/react-web/hooks";
import { AvatarImg } from "./user-profile.styled";

export interface UserProfileProps {
  username: string;
  avatar: string;
  round?: boolean;
}

export function UserProfile(props: UserProfileProps) {
  const [timer, setTimer] = useSafeState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((pre) => {
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
      <AvatarImg
        className={props.round ? 'round' : ''}
        src={props.avatar}
        alt=""
      />
    </div>
  );
}

export default UserProfile;
