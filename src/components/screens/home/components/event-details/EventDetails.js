// @flow

import React from 'react';
import {
  StatusBar, FlatList, Platform, Text, View,
} from 'react-native';

import styled from 'styled-components';

import RestaurantItemList from '~/components/common/RestaurantListItem';
import ProgressiveImage from '~/components/common/ProgressiveImage';
import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';
import appStyles from '~/styles';

const getTextSize = (type: string): number => {
  const types = {
    restaurantsParticipating: Platform.OS === 'android' ? '5%' : '4.2%',
    title: Platform.OS === 'android' ? '5.5%' : '6%',
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const ListWrapper = styled(View)`
  flex: 1;
  padding: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const HeaderCotainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '33%' : '30%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  justify-content: flex-end;
`;

const DarkWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const EventTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${() => getTextSize('title')}px;
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.3%')}px;
  font-family: CircularStd-Medium;
`;

const RestaurantParticipatingText = styled(Text)`
  font-size: ${() => getTextSize('restaurantsParticipating')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

type Props = {
  eventDetails: Object,
  loading: boolean,
  error: boolean,
};

const renderHeader = (
  eventDetails: Object,
  numberRestaurantsParticipating: number,
): Object => (
  <HeaderCotainer>
    <ImageWrapper>
      <ProgressiveImage
        thumbnailImageURL={eventDetails.thumbnailImageURL}
        imageURL={eventDetails.imageURL}
      />
    </ImageWrapper>
    <DarkWrapper>
      <EventTitle>{eventDetails.title}</EventTitle>
      <EventDescription>{eventDetails.description}</EventDescription>
      <RestaurantParticipatingText>
        {`${numberRestaurantsParticipating} Restaurants participating`}
      </RestaurantParticipatingText>
    </DarkWrapper>
  </HeaderCotainer>
);

const renderRestaurantList = (
  restaurantsParticipating: Array<Object>,
): Object => (
  <ListWrapper>
    <FlatList
      renderItem={({ item }) => (
        <RestaurantItemList
          thumbnailImageURL={item.thumbnailImageURL}
          address={item.location.address}
          imageURL={item.imageURL}
          stars={item.stars}
          name={item.name}
          id={item.id}
        />
      )}
      showsVerticalScrollIndicator={false}
      data={restaurantsParticipating}
      keyExtractor={item => item.id}
    />
  </ListWrapper>
);

const EventDetailsContainer = ({
  loading,
  error,
  eventDetails,
}: Props): Object => {
  const shouldShowContent = !loading && !error && Object.keys(eventDetails).length > 0;

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle={error || loading ? 'dark-content' : 'light-content'}
        translucent
        animated
      />
      {loading && <Loading />}
      {error && (
        <Alert
          type={TYPES.ERROR_SERVER_CONNECTION}
          withExtraTopPadding
        />
      )}
      {shouldShowContent
        && renderHeader(eventDetails.details, eventDetails.restaurants.length)}
      {shouldShowContent && renderRestaurantList(eventDetails.restaurants)}
    </Container>
  );
};

export default EventDetailsContainer;
