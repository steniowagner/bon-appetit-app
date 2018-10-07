// @flow

import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from 'store';

import CreateNavigation from 'routes';
import AppTheme from 'styles';

import './config/ReactotronConfig';

const ApplicationNavigator = CreateNavigation();

console.disableYellowBox = true;

const App = () => (
  <Fragment>
    <StatusBar
      backgroundColor={AppTheme.colors.androidToolbarColor}
      barStyle="light-content"
      animated
    />
    <ThemeProvider theme={AppTheme}>
      <Provider store={store}>
        <ApplicationNavigator />
      </Provider>
    </ThemeProvider>
  </Fragment>
);

export default App;
