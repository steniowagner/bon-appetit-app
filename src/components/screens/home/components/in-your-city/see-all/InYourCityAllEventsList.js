// @flow

import React from 'react';

import { FlatList, View } from 'react-native';

import styled from 'styled-components';

import AllEventsListItem from './AllEventsListItem';

import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const renderList = (events: Array<Object>): Object => (
  <FlatList
    renderItem={({ item }) => <AllEventsListItem
      {...item}
    />}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => item.id}
    data={events}
  />
);

type Props = {
  events: Array<Object>,
  loading: boolean,
  error: boolean,
};

const InYourCityAllEventsList = ({ loading, events, error }: Props): Object => {
  const hasEvents = events.length > 0;
  const shouldShowList = hasEvents && !loading && !error;

  return (
    <Container>
      {loading && <Loading />}
      {!hasEvents && !loading && <Alert
        type={TYPES.BORING_CITY}
      />}
      {error && <Alert
        type={TYPES.ERROR_SERVER_CONNECTION}
      />}
      {shouldShowList && renderList(events)}
    </Container>
  );
};

export default InYourCityAllEventsList;
