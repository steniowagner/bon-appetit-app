// @flow

import React from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components';

const Wrapper = styled(View)`
  background-color: ${({ theme }) => theme.colors.red};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

const Price = styled(Text)`
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px ${theme.metrics.smallSize}px`};
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  font-family: CircularStd-Black;
`;

type Props = {
  price: number,
};

const PriceFlag = ({ price }: Props): Object => (
  <Wrapper>
    <Price>{`$ ${parseFloat(price).toFixed(2)}`}</Price>
  </Wrapper>
);

export default PriceFlag;
