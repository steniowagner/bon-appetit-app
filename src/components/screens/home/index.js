import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import NavigationHeader from 'components/common/NavigationHeader';
import InYourCitySection from './components/in-your-city/InYourCitySection';

const Container = styled(View)`
  flex: 1;
`;

const Home = () => (
  <Container>
    <NavigationHeader isHome title="Bon Appetit" />
    <InYourCitySection />
  </Container>
);

export default Home;
