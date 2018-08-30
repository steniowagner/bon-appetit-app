// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import RestaurantItemList from 'components/common/restaurant-item-list';
import FloatingActionButton from 'components/common/FloatingActionButton'

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

class Search extends Component {
  static navigationOptions = {
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

  render() {
    return (
      <Container>

      </Container>
    );
  }
}

export default Search;
