// @flow

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

import { ROUTE_NAMES } from '~/routes/index';

const ButtonWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = styled(TouchableOpacity)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('6%')}px;
  justify-content: center;
  align-items;
  padding-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('3%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: ${({ theme }) => theme.metrics.getHeightFromDP('6%') / 2}px;
`;

const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  navigation: Object,
};

const GetStartedButton = ({ navigation }: Props): Object => (
  <ButtonWrapper>
    <Button
      onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN)}
    >
      <ButtonText>GET STARTED</ButtonText>
    </Button>
  </ButtonWrapper>
);

export default withNavigation(GetStartedButton);
