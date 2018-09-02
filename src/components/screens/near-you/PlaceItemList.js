// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import ReviewStars from 'components/common/ReviewStars';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from './routes';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.width - theme.metrics.getWidthFromDP('24%')}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')};
`;

const RestaurantImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
`;

const RestaurantImageShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const TextShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const RestaurantImage = styled(Image).attrs({
  source: { uri: 'https://pbs.twimg.com/profile_images/1096993812/OQAAAF8W_RZOspqAn4vcYhJ5fuFmiypZjs--e3lijMOxFmmiz9iw-Jgj_P4HjrAQ6R5w3o-OxST9aNfNKXTTLP01k7wAm1T1UCPxZxfRzR8IBLGLH8PExMI7Du4n_400x400.jpg' },
})`
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const RestaurantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2%' : '2.5%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Bold;
`;

const RestaurantStatus = styled(Text)`
  width: 100%;
  color: ${({ color }) => color};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Medium;
`;

const AboutRestaurantWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  navigation: Function,
  name: string,
  distance: number,
  reviews: number,
  stars: number,
  isOpen: boolean,
  isFirst: boolean,
};

type State = {
  isImageLoaded: boolean,
};

class PlaceItemList extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  };

  onImageLoaded = () => {
    this.setState({
      isImageLoaded: true,
    });
  }

  onPressItem = (navigation: Function): void => {
    navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL);
  };

  renderRestaurantImage = () => {
    const { isImageLoaded } = this.state;

    return (
      <RestaurantImageWrapper>
        <RestaurantImage
          onLoad={() => this.onImageLoaded()}
        />
        {!isImageLoaded && <RestaurantImageShimmer />}
      </RestaurantImageWrapper>
    );
  }

  renderRestaurantStatus = (): Object => {
    const { isImageLoaded } = this.state;

    if (!isImageLoaded) {
      return (
        <TextShimmer />
      );
    }

    const { distance, isOpen } = this.props;

    const restaurantStatus = {
      open: {
        color: appStyles.colors.green,
        text: `Open now, ${distance}km from you`,
      },
      closed: {
        color: appStyles.colors.red,
        text: 'Closed now',
      },
    };

    const status = (isOpen ? 'open' : 'closed');

    return (
      <RestaurantStatus
        color={restaurantStatus[status].color}
      >
        {restaurantStatus[status].text}
      </RestaurantStatus>
    );
  }

  renderAboutRestaurantContent = () => {
    const { name, reviews, stars } = this.props;
    const { isImageLoaded } = this.state;

    const AboutRestaurantContent = (
      <Fragment>
        <RestaurantName>
          {name}
        </RestaurantName>
        <ReviewStars
          shouldShowReviewsText
          reviews={reviews}
          textColor="darkText"
          stars={stars}
        />
      </Fragment>
    );

    const ProperComponent = (isImageLoaded ? AboutRestaurantContent : <TextShimmer />);

    return (
      <AboutRestaurantWrapper>
        {ProperComponent}
      </AboutRestaurantWrapper>
    );
  }

  render() {
    const { navigation, isFirst } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressItem(navigation)}
      >
        <Container
          isFirst={isFirst}
        >
          {this.renderRestaurantImage()}
          {this.renderAboutRestaurantContent()}
          {this.renderRestaurantStatus()}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(PlaceItemList);
