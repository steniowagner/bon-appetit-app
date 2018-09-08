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
      foodImageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/acai-colares.jpg',
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
