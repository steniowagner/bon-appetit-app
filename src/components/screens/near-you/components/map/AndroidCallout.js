// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

const RestaurantName = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Bold;
  text-align: center;
`;

type Props = {
  restaurantName: string,
};

const AndroidCallout = ({ restaurantName }: Props): Object => (
  <Wrapper>
    <RestaurantName>{restaurantName}</RestaurantName>
  </Wrapper>
);

export default AndroidCallout;
