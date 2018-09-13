// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import PopularSectionListItem from './PopularSectionListItem';

const Container = styled(View)`
  justify-content: space-between;
  width: 100%;
`;

const ListWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

type Props = {
  dishes: any,
};

const YouMightLikeSection = ({ dishes }: Props): Object => (
  <Container>
    <ListWrapper>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dishes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <PopularSectionListItem
            isFirst={index === 0}
            imageURL={item.imageURL}
            disheTitle={item.title}
            stars={item.stars}
            price={item.price}
            id={item.id}
          />
        )}
      />
    </ListWrapper>
  </Container>
);

export default YouMightLikeSection;
