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
  background-color: #F00;
`;

const App = () => (
  <ThemeProvider theme={AppTheme}>
    <Container>
      <RestaurantItemList />
    </Container>
  </ThemeProvider>
);

export default App;
