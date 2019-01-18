import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';

import PopularSeeAllItemList from './PopularSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  dishes: Array<Object>,
};

const AllYouMightLike = ({ dishes }: Props): Object => (
  <List
    showsVerticalScrollIndicator={false}
    data={dishes}
    keyExtractor={item => item._id}
    renderItem={({ item }) => (
      <PopularSeeAllItemList
        price={parseFloat(item.price).toFixed(2)}
        description={item.description}
        imageURL={item.imageURL}
        title={item.title}
        stars={item.stars}
        id={item._id}
      />
    )}
  />
);

export default AllYouMightLike;
