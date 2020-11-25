import React from 'react';
import { RoundButton } from '../components/round-button/RoundButton.styled';

/* eslint-disable-next-line */
export interface AboutProps {}

export function About(props: AboutProps) {
  return (
    <div>
      <h1>Welcome to about!</h1>
      <div>
        <RoundButton className="btn-blue">A round button</RoundButton>
      </div>
    </div>
  );
}

export default About;
