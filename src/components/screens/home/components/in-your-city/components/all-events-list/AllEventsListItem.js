import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
`;

const EventImage = styled(Image).attrs({
  source: ({ eventImage }) => ({ uri: eventImage }),
})`
  padding: ${({ theme }) => `${theme.metrics.smallSize}px ${theme.metrics.largeSize}px`};
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('22%')}px;
  border-radius: 8px;
  resizeMode: cover;
  position: absolute;
`;

const TextContentWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  justify-content: center;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('60%')}px;
  height: 100%;
`;

const EventTitle = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.7%')}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Bold;
`;

const RestaurantsParticipatingWrapper = styled(View)`
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const RestaurantParticipatingText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.65%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Medium;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')};
  font-family: CircularStd-Black;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.red,
  name: 'chevron-right',
  size: 28,
})`
  margin-left: -5px;
  width: 28px;
  height: 28px;
`;

const RestaurantIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'silverware-variant',
  size: 18,
})`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}
  width: 18px;
  height: 18px;
`;

const renderRestaurantParticipating = (restaurantsParticipating: number): Object => (
  <RestaurantsParticipatingWrapper>
    <RestaurantIcon />
    <RestaurantParticipatingText>
      {`${restaurantsParticipating} Restaurants participating`}
    </RestaurantParticipatingText>
  </RestaurantsParticipatingWrapper>
);

const onPressSeeAllRestaurants = (
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  navigation: Function,
): Object => {
  navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, {
    eventTitle,
    eventDescription,
    eventImage,
  });
};

const renderSeeAllRestaurantsButton = (
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  navigation: Function,
): Object => (
  <ButtonWrapper
    onPress={() => onPressSeeAllRestaurants(eventTitle, eventDescription, eventImage, navigation)}
  >
    <ButtonTitle>
      See Restaurants
    </ButtonTitle>
    <ArrowIcon />
  </ButtonWrapper>
);

type Props = {
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  restaurantsParticipating: number,
  navigation: Function,
};

const AllEventsListItem = ({
  eventTitle,
  eventDescription,
  restaurantsParticipating,
  eventImage,
  navigation,
}: Props) => (
  <Wrapper>
    <EventImage eventImage={eventImage} />
    <TextContentWrapper>
      <EventTitle>
        {eventTitle}
      </EventTitle>
      <EventDescription>
        {eventDescription}
      </EventDescription>
      {renderRestaurantParticipating(restaurantsParticipating)}
      {renderSeeAllRestaurantsButton(eventTitle, eventDescription, eventImage, navigation)}
    </TextContentWrapper>
  </Wrapper>
);

export default withNavigation(AllEventsListItem);
