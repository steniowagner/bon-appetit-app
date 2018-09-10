// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import styled from 'styled-components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import ReviewStars from 'components/common/ReviewStars';
import appStyles from 'styles';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from './routes';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.width - theme.metrics.getWidthFromDP('24%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
`;

const Card = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  border-radius: 4px;
`;

const RestaurantImageWrapper = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('12.5%')}px;
  border-radius: 4px;
  overflow: hidden;
`;

const RestaurantImageShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('12.5%')}px;
  border-radius: 4px;
`;

const RestaurantImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const TextShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const TopRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const BottomRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: 70%;
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2%' : '2.5%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Bold;
`;

const DistanceWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Medium;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantStatus = styled(Text)`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  font-family: CircularStd-Medium;
`;

const Icon = styled(Icons).attrs({
  color: ({ theme, color }) => theme.colors[color],
  name: ({ name }) => name,
  size: ({ size }) => size,
})`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

type Props = {
  navigation: Function,
  id: string,
  name: string,
  imageURL: string,
  distance: number,
  stars: number,
  isOpen: boolean,
  isFirst: boolean,
  isLast: boolean,
};

type State = {
  isImageLoaded: boolean,
};

class RestaurantItemList extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  };

  onImageLoaded = () => {
    this.setState({
      isImageLoaded: true,
    });
  }

  onPressArrowButton = (): void => {
    const { id, navigation } = this.props;

    navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, { payload: { id } });
  };

  renderRestaurantImage = (): Object => {
    const { isImageLoaded } = this.state;
    const { imageURL } = this.props;

    return (
      <RestaurantImageWrapper>
        <RestaurantImage
          imageURL={imageURL}
          onLoad={() => this.onImageLoaded()}
        />
        {!isImageLoaded && <RestaurantImageShimmer />}
      </RestaurantImageWrapper>
    );
  }

  renderRestaurantStatus = (): Object => {
    const { isOpen } = this.props;

    const restaurantStatus = {
      open: {
        color: appStyles.colors.green,
        text: 'Open now',
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

  renderDistanceContent = (): Object => {
    const { distance } = this.props;

    return (
      <DistanceWrapper>
        <Icon
          color="green"
          name="directions"
          size={22}
        />
        <DistanceText>
          {`${distance} km`}
        </DistanceText>
      </DistanceWrapper>
    );
  }

  renderTopRowContent = (): Object => {
    const { isImageLoaded } = this.state;

    if (!isImageLoaded) {
      return (
        <TextShimmer />
      );
    }

    const { name, stars } = this.props;

    return (
      <Fragment>
        <TopRowContentWrapper>
          <RestaurantName>
            {name}
          </RestaurantName>
          {this.renderDistanceContent()}
        </TopRowContentWrapper>
        <ReviewStars
          textColor="darkText"
          stars={stars}
        />
      </Fragment>
    );
  }

  renderBottomRowContent = (): Object => {
    const { isImageLoaded } = this.state;

    if (!isImageLoaded) {
      return (
        <TextShimmer />
      );
    }

    return (
      <BottomRowContentWrapper>
        {this.renderRestaurantStatus()}
        <TouchableOpacity
          onPress={() => this.onPressArrowButton()}
        >
          <Icon
            color="darkText"
            name="arrow-right"
            size={28}
          />
        </TouchableOpacity>
      </BottomRowContentWrapper>
    );
  }

  render() {
    const { isFirst, isLast } = this.props;

    return (
      <Container
        isFirst={isFirst}
        isLast={isLast}
      >
        <Card
          style={{
            ...Platform.select({
              ios: {
                elevation: 1,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 3,
                shadowOpacity: 0.35,
              },
              android: {
                elevation: 4,
                shadowOffset: {
                  width: 1,
                  height: -3,
                },
                shadowRadius: 2,
                shadowOpacity: 5.0,
              },
            }),
          }}
        >
          <Fragment>
            {this.renderRestaurantImage()}
            {this.renderTopRowContent()}
            {this.renderBottomRowContent()}
          </Fragment>
        </Card>
      </Container>
    );
  }
}

export default withNavigation(RestaurantItemList);
