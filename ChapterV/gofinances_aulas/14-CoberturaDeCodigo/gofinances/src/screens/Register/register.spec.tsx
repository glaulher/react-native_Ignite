import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import theme from '../../global/styles/theme';
import { Register } from '.';

// eslint-disable-next-line react/function-component-definition
const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
);

describe('Register Screen', () => {
  it('should be open category modal when user click on the category button', () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');

    fireEvent.press(buttonCategory);

    // waitFor aguarda os testes finalizarem.
    /*
    waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
     */
    expect(categoryModal.props.visible).toBeTruthy();
  });
});
