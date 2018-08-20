import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  padding-bottom: ${({ theme }) => `${theme.metrics.smallSize}px`}
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #F00;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const MenuListItem = () => (
  <Container>
    <ContentWrapper />
  </Container>
);

export default MenuListItem;
