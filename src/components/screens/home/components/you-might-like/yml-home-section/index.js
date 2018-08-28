import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import YMLSectionListItem from './YMLSectionListItem';

const Container = styled(View)`
  justify-content: space-between;
  width: 100%;
`;

const ListWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const getTestData = () => {
  const data = [];

  for (let i = 0; i < 12; i++) {
    data.push({
      id: `${i}`,
      foodTitle: 'Nissim Miojo',
      foodImageURL: 'https://images.unsplash.com/photo-1533854964478-588049c5084e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a3f43bf5f66dc44d7780904913a7fb3&auto=format&fit=crop&w=967&q=80',
      stars: 4.5,
      price: 10.90 + i,
      reviews: 5 + i,
      distance: i + 1,
    });
  }

  return data;
};

const YMLHomeSection = () => (
  <Container>
    <ListWrapper>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={getTestData()}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <YMLSectionListItem
            isFirst={index === 0}
            price={item.price}
            distance={item.distance}
            reviews={item.reviews}
            stars={item.stars}
            foodTitle={item.foodTitle}
            foodImageURL={item.foodImageURL}
          />
        )}
      />
    </ListWrapper>
  </Container>
);

export default YMLHomeSection;
