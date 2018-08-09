// @flow

import React from 'react';
import { View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';

import RestaurantItemList from 'components/common/restaurant-item-list';
import AppTheme from 'styles';

import './config/ReactotronConfig';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const App = () => (
  <ThemeProvider theme={AppTheme}>
    <Container>
      <RestaurantItemList
        name="Cabaña del Primo"
        address="Maria Tomásia st., 503 - Aldeota, Fortaleza"
        foodTypes={['Churrascaria', 'Sobremesas', 'Massas', 'Frutos do Mar', 'Pastelaria', 'Pizzas']}
        picURL="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=719292378935d0f9168f11f9ad00558d&auto=format&fit=crop&w=967&q=80"
        stars={4.5}
      />
    </Container>
  </ThemeProvider>
);

export default App;
