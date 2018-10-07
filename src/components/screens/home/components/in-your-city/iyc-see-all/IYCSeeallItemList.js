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
    restaurantsParticipating: Platform.OS === 'android' ? '5.2%' : '4.2%',
    description: Platform.OS === 'android' ? '4.8%' : '4%',
    title: Platform.OS === 'android' ? '6.5%' : '6%',
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const EventTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: ${() => getTextSize('title')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const EventDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
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
  dishesTypes: Array<Object>,
  navigation: Function,
};

const onPressItem = (navigation: Function, payload: Object): void => {
  navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, { payload });
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
  dishesTypes,
  description,
  navigation,
  imageURL,
  title,
  id,
}: Props): Object => {
  const payload = {
    restaurantsParticipating,
    dishesTypes,
    description,
    imageURL,
    title,
    id,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onPressItem(navigation, payload)}
    >
      <Container>
        <EventImage
          imageURL={imageURL}
        />
        {renderTextContent(title, description, restaurantsParticipating)}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default withNavigation(AllEventsListItem);
