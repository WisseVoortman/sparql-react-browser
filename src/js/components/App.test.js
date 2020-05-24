import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

jest.mock('./DataSourceDropdown', () => 'p');
jest.mock('./SearchComponent', () => 'p');

describe('App component', () => {
  it('should render component', ()=> {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
