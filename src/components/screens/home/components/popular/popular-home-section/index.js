// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import PopularSectionListItem from './PopularSectionListItem';

const getTestData = () => {
  const data = [];

  for (let i = 0; i < 12; i++) {
    data.push({
      id: `${i}`,
      foodTitle: 'Nissim Miojo',
      foodImageURL: 'https://images.unsplash.com/photo-1533854964478-588049c5084e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a3f43bf5f66dc44d7780904913a7fb3&auto=format&fit=crop&w=967&q=80',
      stars: 4.5,
      price: 29.90,
    });
  }

  return data;
};

const Container = styled(View)`
  justify-content: space-between;
  width: 100%;
`;

const ListWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const YouMightLikeSection = () => (
  <Container>
    <ListWrapper>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={getTestData()}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <PopularSectionListItem
            isFirst={index === 0}
            foodTitle={item.foodTitle}
            foodImageURL={item.foodImageURL}
            stars={item.stars}
            price={item.price}
          />
        )}
      />
    </ListWrapper>
  </Container>
);

export default YouMightLikeSection;
