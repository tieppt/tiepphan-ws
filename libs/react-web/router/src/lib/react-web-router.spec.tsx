import React from 'react';
import { render } from '@testing-library/react';

import ReactWebRouter from './react-web-router';

describe('ReactWebRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactWebRouter routesConfig={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
