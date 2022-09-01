import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders weather app', () => {
  
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByTestId("app-container")).toBeInTheDocument();
});
