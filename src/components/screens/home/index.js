import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import appStyle from 'styles';
import InYourCitySection from './components/in-your-city/InYourCitySection';

const Container = styled(View)`
  flex: 1;
`;

const HomeMainContent = () => (
  <Container>
    <InYourCitySection />
  </Container>
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
    fontSize: 28,
  },
};

export default HomeMainContent;
