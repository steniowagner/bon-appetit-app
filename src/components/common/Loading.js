import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import styled from 'styled-components';

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicator = styled(ActivityIndicator).attrs({
  size: Platform.OS === 'ios' ? 'small' : 'large',
  color: ({ theme }) => theme.colors.primaryColor,
})``;

const Loading = (): Object => (
  <LoadingWrapper>
    <LoadingIndicator />
  </LoadingWrapper>
);

export default Loading;
