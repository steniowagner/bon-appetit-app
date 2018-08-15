// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import CreateNavigation from 'routes';
import AppTheme from 'styles';
import InYourCity from 'components/screens/InYourCity';

import './config/ReactotronConfig';

const Application = CreateNavigation();
// <InYourCity eventDescription="An amazing event with most extensive variety of the best of Itaian cuisine!" eventTitle="Title of Event" eventImageURL="https://cdn-images-1.medium.com/max/1000/1*-mATSPFuFKGCf9DdOZrD2g.jpeg" />
 
const App = () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <ThemeProvider isHome theme={AppTheme}>
      <Application />
    </ThemeProvider>
  </React.Fragment>
);

export default App;
