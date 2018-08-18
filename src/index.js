// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import CreateNavigation from 'routes';
import AppTheme from 'styles';

import './config/ReactotronConfig';

const ApplicationNavigator = CreateNavigation();

const App = () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <ThemeProvider theme={AppTheme}>
      <ApplicationNavigator />
    </ThemeProvider>
  </React.Fragment>
);

export default App;
