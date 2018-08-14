// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import CreateNavigation from 'routes';
import AppTheme from 'styles';

import './config/ReactotronConfig';
import InYourCity from 'components/screens/InYourCity';

const Application = CreateNavigation();
// <StatusBar barStyle="light-content" />

const App = () => (
  <React.Fragment>
    <ThemeProvider theme={AppTheme}>
      <InYourCity
        eventImageURL="https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3bf6fd384a4045ad91b8f08279f02ab8&auto=format&fit=crop&w=985&q=80"
        eventTitle="Pasta Festival"
        eventDescription="An amazing event with most extensive variety of the best of Itaian cuisine!"
      />
    </ThemeProvider>
  </React.Fragment>
);

export default App;
