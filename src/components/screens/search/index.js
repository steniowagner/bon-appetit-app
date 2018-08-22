// @flow

import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Search = () => (
  <Container />
);

Search.navigationOptions = {
  title: 'Search',
  headerStyle: {
    backgroundColor: appStyle.colors.primaryColor,
  },
  headerTintColor: appStyle.colors.defaultWhite,
  headerTitleStyle: {
    color: appStyle.colors.defaultWhite,
    fontFamily: 'CircularStd-Bold',
    fontWeight: '900',
    fontSize: appStyle.metrics.navigationHeaderFontSize,
  },
};

export default Search;
