import { View, Text } from 'react-native';

import styled from 'styled-components';

export const DefaultText = styled(Text)`
  color: ${({ theme, color }) => color || theme.colors.defaultWhite};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const ContentContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('7%')}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;
