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
  dishes: Array<Object>,
};

const PopularSection = ({ dishes }: Props): Object => (
  <Container>
    <ListWrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <PopularSectionListItem
            imageURL={item.mediumImageURL}
            isFirst={index === 0}
            price={item.price}
            stars={item.stars}
            title={item.title}
            id={item.id}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={dishes}
        horizontal
      />
    </ListWrapper>
  </Container>
);

export default PopularSection;
