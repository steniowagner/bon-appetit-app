// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import RecommendedSectionListItem from './RecommendedSectionListItem';

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

const YMLHomeSection = ({ dishes }: Props): Object => (
  <Container>
    <ListWrapper>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dishes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <RecommendedSectionListItem
            isFirst={index === 0}
            distance={parseFloat(item.reviews / item.stars).toFixed(1)}
            imageURL={item.imageURL}
            reviews={item.reviews}
            price={item.price}
            stars={item.stars}
            title={item.title}
            id={item.id}
          />
        )}
      />
    </ListWrapper>
  </Container>
);

export default YMLHomeSection;
