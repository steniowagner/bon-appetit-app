// @flow

import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import ApplicationNavigator from './routes';
import AppTheme from './styles';
import store from './store';

const App = (): Object => (
  <Fragment>
    <StatusBar
      backgroundColor={AppTheme.colors.androidToolbarColor}
      barStyle="light-content"
      animated
    />
    <ThemeProvider
      theme={AppTheme}
    >
      <Provider
        store={store}
      >
        <ApplicationNavigator />
      </Provider>
    </ThemeProvider>
  </Fragment>
);

export default App;
