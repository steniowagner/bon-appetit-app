// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import InYourCitySectionListItem from './InYourCitySectionListItem';

const Container = styled(View)`
  justify-content: space-between;
  width: 100%;
`;

const ListWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

type Props = {
  events: Array<Object>,
};

const InYourCitySection = ({ events }: Props): Object => (
  <Container>
    <ListWrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <InYourCitySectionListItem
            restaurantsParticipating={item.restaurantsParticipating}
            dishesTypes={item.dishesTypes}
            description={item.description}
            imageURL={item.smallImageURL}
            isFirst={index === 0}
            title={item.title}
            id={item.id}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={events}
        horizontal
      />
    </ListWrapper>
  </Container>
);

export default InYourCitySection;
