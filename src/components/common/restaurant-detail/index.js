import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import HeaderSection from './components/HeaderSection';
import AboutRestaurantSection from './components/AboutRestaurantSection';
import RestaurantMenuSection from './components/restaurant-menu-section';
import MapFloatingActionButton from './components/MapFloatingActionButton';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('22%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-items: flex-end;
  position: absolute;
`;

const RestaurantDetail = () => (
  <Container>
    <HeaderSection
      restaurantImage="https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7579a77bc83515a0b75cf26c479e019f&auto=format&fit=crop&w=1950&q=80"
      restaurantName="Cabãna del Primo"
      reviews={18}
      stars={4.5}
    />
    <AboutRestaurantSection />
    <RestaurantMenuSection />
    <FloatingActionButtonWrapper>
      <MapFloatingActionButton />
    </FloatingActionButtonWrapper>
  </Container>
);

RestaurantDetail.navigationOptions = {
  headerTransparent: true,
  headerBackTitle: null,
  headerTintColor: appStyle.colors.defaultWhite,
};

export default RestaurantDetail;
