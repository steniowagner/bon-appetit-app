// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import CreateNavigation from 'routes';
import AppTheme from 'styles';

import './config/ReactotronConfig';

const Application = CreateNavigation();

const App = () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <ThemeProvider theme={AppTheme}>
      <Application />
    </ThemeProvider>
  </React.Fragment>
);

export default App;

/*
  <RestaurantItemList
    name="Cabaña del Primo"
    address="Maria Tomásia st., 503 - Aldeota, Fortaleza"
    foodTypes={['Churrascaria', 'Sobremesas', 'Massas', 'Frutos do Mar', 'Pastelaria', 'Pizzas']}
    picURL="https://images.unsplash.com/photo-1533854964478-588049c5084e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a3f43bf5f66dc44d7780904913a7fb3&auto=format&fit=crop&w=967&q=80"
    stars={4.5}
  />
*/
