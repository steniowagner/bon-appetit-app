import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  height: ${({ theme }) => 54 + theme.metrics.statusBarHeight};
  padding-top: ${({ theme }) => theme.metrics.statusBarHeight};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: ${({ isHome }) => (isHome ? 'Modesta-Script' : 'CircularStd-Bold')};
  font-size: ${({ isHome }) => (isHome ? 26 : 18)};
`;

type Props = {
  isHome: boolean,
  title: string,
}

const NavigationHeader = ({ isHome, title }: Props) => (
  <Wrapper>
    <Title isHome={isHome}>
      {title}
    </Title>
  </Wrapper>
);

export default NavigationHeader;
