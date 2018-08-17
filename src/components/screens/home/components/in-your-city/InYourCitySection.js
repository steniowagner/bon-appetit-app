import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import HomeRouter from 'components/screens/home/routes';
import InYourCityListItem from './InYourCityListItem';
import SectionHeader from '../common/SectionHeader';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('33%')};
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
    <SectionHeader
      title="In Your City"
      nextRoute={HomeRouter.routeNames.ALL_EVENTS}
    />
    <ListWrapper>
      {renderList()}
    </ListWrapper>
  </Container>
);

export default InYourCitySection;
