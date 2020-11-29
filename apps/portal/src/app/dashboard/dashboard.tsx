import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import './dashboard.scss';
import UserProfile from '../user-profile/user-profile';

const MemoButton = React.memo(Button);

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [userInfo, setUserInfo] = useState({
    avatar: `https://avatars3.githubusercontent.com/u/7151365?s=460&u=0a48546e378d66728d308c5616a2d2519e792e3d&v=4`,
    username: 'Tiep Phan',
    round: true,
  });

  const toggleRound = useCallback(() => setUserInfo(prevState => {
    return {
      ...prevState,
      round: !prevState.round,
    }
  }), [setUserInfo]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h1>Welcome to dashboard!</h1>
      <div>
        <Button type="primary" onClick={() => setShowUserInfo(pre => !pre)}>Show/Hide</Button>
        <MemoButton onClick={toggleRound}>Button from antd</MemoButton>
      </div>
      <br/>

      {showUserInfo ? <UserProfile
        avatar={userInfo.avatar}
        username={userInfo.username}
        round={userInfo.round}
      /> : null}
    </div>
  );
}

export default Dashboard;
