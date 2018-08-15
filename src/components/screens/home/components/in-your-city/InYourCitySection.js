import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styled from 'styled-components';

import InYourCityListItem from './InYourCityListItem';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('33%')};
  justify-content: space-between;
  width: 100%;
`;

const SectionTitle = styled(Text)`
  padding: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.smallSize}px ${theme.metrics.largeSize}px`}
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.5%')};
  font-family: CircularStd-Black;
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
      eventTitle: 'Pasta Festival',
      eventDescription: 'An amazing event with most extensive variety of the best of Italian cuisine!',
      eventImage: 'https://images.unsplash.com/photo-1533854964478-588049c5084e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a3f43bf5f66dc44d7780904913a7fb3&auto=format&fit=crop&w=967&q=80',
    });
  }

  return data;
};

const renderList = () => (
  <ListWrapper>
    <FlatList
      horizontal
      data={getTestData()}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <InYourCityListItem
          index={index}
          eventTitle={item.eventTitle}
          eventDescription={item.eventDescription}
          eventImage={item.eventImage}
        />
      )}
    />
  </ListWrapper>
);

const InYourCitySection = () => (
  <Container>
    <SectionTitle>
      In Your City
    </SectionTitle>
    <ListWrapper>
      {renderList()}
    </ListWrapper>
  </Container>
);

export default InYourCitySection;
