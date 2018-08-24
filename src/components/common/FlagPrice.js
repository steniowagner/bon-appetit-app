import React from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components';

const Wrapper = styled(View)`
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const Price = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Black;
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px ${theme.metrics.smallSize}px`};
`;

type Props = {
  price: number,
}

const PriceFlag = ({ price }: Props) => (
  <Wrapper>
    <Price>
      {`$ ${price}`}
    </Price>
  </Wrapper>
);

export default PriceFlag;
