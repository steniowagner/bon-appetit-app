// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import YouMightLikeSectionListItem from './YouMightLikeSectionListItem';

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

const RecommendedHomeSection = ({ dishes }: Props): Object => (
  <Container>
    <ListWrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <YouMightLikeSectionListItem
            distance={parseFloat(item.reviews / item.stars).toFixed(1)}
            imageURL={item.imageURL}
            reviews={item.reviews}
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

export default RecommendedHomeSection;
