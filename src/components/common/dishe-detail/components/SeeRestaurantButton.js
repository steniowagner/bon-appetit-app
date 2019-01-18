// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';

const Container = styled(View)`
  width: 100%;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Wrapper = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const SeeText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '4%' : '3.8%';
    return theme.metrics.getWidthFromDP(percentage);
  }};
  font-family: CircularStd-Black;
`;

type Props = {
  restaurantId: string,
  navigation: Object,
};

const SeeRestaurantButton = ({ restaurantId, navigation }: Props): Object => (
  <Container>
    <Wrapper
      onPress={() => navigation.navigate(CONSTANTS.ROUTE_RESTAURANT_DETAIL, {
        [CONSTANTS.NAVIGATION_PARAM_ID]: restaurantId,
      })
      }
    >
      <SeeText>SEE RESTAURANT</SeeText>
    </Wrapper>
  </Container>
);

export default withNavigation(SeeRestaurantButton);
