// @flow

import React from 'react';
import {
  TouchableWithoutFeedback, Platform, Text, View,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  margin-top: ${({ theme, isFirst }) => (isFirst ? 0 : theme.metrics.extraSmallSize)}px;
`;

const DarkWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const EventImage = styled(FastImage).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const getTextSize = (type: string): number => {
  const types = {
    restaurantsParticipating: Platform.OS === 'android' ? '5%' : '4.2%',
    title: Platform.OS === 'android' ? '5.5%' : '6%',
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
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.3%')}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const RestaurantParticipatingText = styled(Text)`
  font-size: ${() => getTextSize('restaurantsParticipating')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const renderTextContent = (
  title: string,
  description: string,
  restaurantsParticipating: number,
): Object => (
  <DarkWrapper>
    <EventTitle>{title}</EventTitle>
    <EventDescription>{description}</EventDescription>
    <RestaurantParticipatingText>
      {`${restaurantsParticipating} Restaurants participating`}
    </RestaurantParticipatingText>
  </DarkWrapper>
);

type Props = {
  restaurantsParticipating: number,
  mediumImageURL: string,
  navigation: Function,
  description: string,
  isFirst: boolean,
  title: string,
  id: string,
};

const AllEventsListItem = ({
  restaurantsParticipating,
  mediumImageURL,
  description,
  navigation,
  isFirst,
  title,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, {
      [CONSTANTS.NAVIGATION_PARAM_ID]: id,
    })
    }
  >
    <Container
      isFirst={isFirst}
    >
      <EventImage
        imageURL={mediumImageURL}
      />
      {renderTextContent(title, description, restaurantsParticipating)}
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(AllEventsListItem);
