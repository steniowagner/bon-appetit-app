import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import InYourCitySection from './components/in-your-city/InYourCitySection';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HomeMainContent = () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <Container>
      <InYourCitySection />
    </Container>
  </React.Fragment>
);

HomeMainContent.navigationOptions = {
  title: 'Bon Appetit',
  headerStyle: {
    backgroundColor: appStyle.colors.primaryColor,
  },
  headerTintColor: appStyle.colors.defaultWhite,
  headerTitleStyle: {
    color: appStyle.colors.defaultWhite,
    fontFamily: 'Modesta-Script',
    fontWeight: '200',
    fontSize: Platform.OS === 'ios' ? 26 : 30,
  },
};

export default HomeMainContent;
