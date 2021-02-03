import React from 'react';

import './App.scss';

import { IRoute, Routes } from '@tpws/react-web/router';
import { Link } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./dashboard/dashboard'));
const About = React.lazy(() => import('./about/about'));

const routesConfig: IRoute[] = [
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/',
    component: Dashboard,
    exact: true,
  },
];

export function App() {
  return (
    <div className="page">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes routesConfig={routesConfig} />
    </div>
  );
}

export default App;
