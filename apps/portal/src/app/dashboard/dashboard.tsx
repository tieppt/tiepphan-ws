import React from 'react';
import { Button } from 'antd';
import './dashboard.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div>
      <h1>Welcome to dashboard!</h1>
      <div>
        <Button>Button from antd</Button>
      </div>
      <br/>
    </div>
  );
}

export default Dashboard;
