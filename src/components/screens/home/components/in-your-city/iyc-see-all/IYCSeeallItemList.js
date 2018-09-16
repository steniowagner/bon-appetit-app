// @flow

import React from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import FastImage from 'react-native-fast-image';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
`;

const DarkWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer}
`;

const EventImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const getTextSize = (type: string): number => {
  const types = {
    restaurantsParticipating: Platform.OS === 'android' ? '2.6%' : '2.2%',
    description: Platform.OS === 'android' ? '2.8%' : '2.4%',
    title: Platform.OS === 'android' ? '3.8%' : '3.5%',
  };

  return appStyles.metrics.getHeightFromDP(types[type]);
};

const EventTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: ${() => getTextSize('title')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const EventDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${() => getTextSize('description')}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const RestaurantParticipatingText = styled(Text)`
  font-size: ${() => getTextSize('restaurantsParticipating')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

type Props = {
  description: string,
  imageURL: string,
  title: string,
  id: string,
  restaurantsParticipating: number,
  navigation: Function,
};

const onPressItem = (navigation: Function, id: string): void => {
  navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, { id });
};

const renderTextContent = (title: string, description: string, restaurantsParticipating: number): Object => (
  <DarkWrapper>
    <EventTitle>
      {title}
    </EventTitle>
    <EventDescription>
      {description}
    </EventDescription>
    <RestaurantParticipatingText>
      {`${restaurantsParticipating} Restaurants participating`}
    </RestaurantParticipatingText>
  </DarkWrapper>
);

const AllEventsListItem = ({
  restaurantsParticipating,
  description,
  navigation,
  imageURL,
  title,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => onPressItem(navigation, id)}
  >
    <Container>
      <EventImage
        imageURL={imageURL}
      />
      {renderTextContent(title, description, restaurantsParticipating)}
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(AllEventsListItem);
