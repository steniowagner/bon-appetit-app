// @flow

import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import IYCSectionListItem from './IYCSectionListItem';

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
        horizontal
        showsHorizontalScrollIndicator={false}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <IYCSectionListItem
            description={item.description}
            imageURL={item.imageURL}
            title={item.title}
            id={item.id}
            index={index}
          />
        )}
      />
    </ListWrapper>
  </Container>
);

export default InYourCitySection;
