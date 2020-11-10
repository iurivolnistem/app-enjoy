import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';
import CartContextProvider from './src/contexts/CartContext';
import MainStack from './src/stacks/MainStack';

export default () => {
  return (

    <CartContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UserContextProvider>
    </CartContextProvider>
  );
}