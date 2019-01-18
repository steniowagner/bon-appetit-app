import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';

import YouMightLikeSeeAllItemList from './YouMightLikeSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  dishes: Array<Object>,
};

const AllYouMightLike = ({ dishes }: Props): Object => (
  <List
    renderItem={({ item, index }) => (
      <YouMightLikeSeeAllItemList
        hasBottomMargin={index >= 0 && index < dishes.length - 1}
        price={parseFloat(item.price).toFixed(2)}
        description={item.description}
        imageURL={item.imageURL}
        distance={item.distance}
        reviews={item.reviews}
        title={item.title}
        stars={item.stars}
        id={item._id}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => item._id}
    data={dishes}
  />
);

export default AllYouMightLike;
