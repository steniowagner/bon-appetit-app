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
    <ThemeProvider isHome theme={AppTheme}>
      <Application />
    </ThemeProvider>
  </React.Fragment>
);

export default App;
