// @flow

import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { withNavigation } from 'react-navigation';

import { ROUTE_NAMES } from 'components/screens/home/routes';

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
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  resizeMode: cover;
`;

const EventImageShimmer = styled(ShimmerPlaceHolder)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('22%')}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  position: absolute;
`;

const TextContentWrapper = styled(View)`
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

type Props = {
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  restaurantsParticipating: number,
  navigation: Function,
  isDataFetched: boolean,
};

type State = {
  isEventImageLoaded: boolean,
};

class AllEventsListItem extends Component<Props, State> {
  state = {
    isEventImageLoaded: false,
  };

  onLoadEventImage = () => {
    this.setState({
      isEventImageLoaded: true,
    });
  }

  renderRestaurantParticipating = (): Object => {
    const { isDataFetched, restaurantsParticipating } = this.props;

    return (
      <ShimmerPlaceHolder
        visible={isDataFetched}
        autoRun
      >
        <RestaurantsParticipatingWrapper>
          <RestaurantIcon />
          <RestaurantParticipatingText>
            {`${restaurantsParticipating} Restaurants participating`}
          </RestaurantParticipatingText>
        </RestaurantsParticipatingWrapper>
      </ShimmerPlaceHolder>
    );
  }

  renderSeeAllRestaurantsButton = (): Object => {
    const {
      eventTitle,
      eventDescription,
      eventImage,
      navigation,
      isDataFetched,
    } = this.props;

    const { isEventImageLoaded } = this.state;
    const enableButton = isEventImageLoaded && isDataFetched;

    const onSeeRestaurantButtonPress = () => {
      navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, {
        eventTitle,
        eventDescription,
        eventImage,
      });
    };

    return enableButton
      && (
        <ButtonWrapper
          onPress={() => onSeeRestaurantButtonPress()}
        >
          <ButtonTitle>
            See Restaurants
          </ButtonTitle>
          <ArrowIcon />
        </ButtonWrapper>
      );
  }

  render() {
    const {
      eventTitle,
      eventDescription,
      eventImage,
      isDataFetched,
    } = this.props;

    const { isEventImageLoaded } = this.state;

    return (
      <Wrapper>
        <EventImage
          eventImage={eventImage}
          onLoad={() => this.onLoadEventImage()}
        />
        <EventImageShimmer
          autoRun
          visible={isEventImageLoaded}
        />
        <TextContentWrapper>
          <ShimmerPlaceHolder
            visible={isDataFetched}
            autoRun
          >
            <EventTitle>
              {eventTitle}
            </EventTitle>
          </ShimmerPlaceHolder>
          <ShimmerPlaceHolder
            visible={isDataFetched}
            autoRun
          >
            <EventDescription>
              {eventDescription}
            </EventDescription>
          </ShimmerPlaceHolder>
          {this.renderRestaurantParticipating()}
          {this.renderSeeAllRestaurantsButton()}
        </TextContentWrapper>
      </Wrapper>
    );
  }
}

export default withNavigation(AllEventsListItem);
