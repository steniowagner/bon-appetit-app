// @flow

import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import MenuListItem from './MenuListItem';

const MenuListContainer = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  margin: ${({ theme }) => theme.metrics.smallSize}px;
`;

const MenuList = ({ data }) => (
  <MenuListContainer
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <MenuListItem
        foodImage={item.foodImage}
        foodTitle={item.foodTitle}
        foodDescription={item.foodDescription}
        price={item.price}
        stars={item.stars}
      />)
    }
  />
);

export default MenuList;
