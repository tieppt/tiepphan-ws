import React from 'react';
import { render } from '@testing-library/react';

import UserProfile from './user-profile';

describe('UserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfile />);
    expect(baseElement).toBeTruthy();
  });
});
