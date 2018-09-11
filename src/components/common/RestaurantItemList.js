// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import ReviewStars from 'components/common/ReviewStars';

const CardContainer = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
`;

const ContainerShimmer = styled(ShimmerPlaceholder)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DarkLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  height: 100%;
  width: 100%;
`;

const Content = styled(View)`
  padding: ${({ theme }) => `${theme.metrics.extraLargeSize}px ${theme.metrics.largeSize}px ${theme.metrics.largeSize}px ${theme.metrics.largeSize}px`};
`;

const RestaurantImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const RestaurantImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  resizeMode: cover;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const AddressWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}
  flex-direction: row;
  width: 70%;
`;

const AddressIconWrapper = styled(View)`
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px ${theme.metrics.smallSize}px 0 0`}
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  fontFamily: CircularStd-Medium;
`;

const AddressIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 20,
})``;

type Props = {
  imageURL: string,
  address: string,
  name: string,
  id: string,
  navigation: Function,
  stars: number,
};

type State = {
  isImageLoaded: boolean,
};

class RestaurantItemList extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  };

  onImageLoad = (): void => {
    this.setState({
      isImageLoaded: true,
    });
  }

  onItemPress = (): void => {
    const { navigation, id } = this.props;

    navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, { id });
  };

  renderRestaurantImage = (): Object => {
    const { imageURL } = this.props;

    return (
      <RestaurantImageWrapper>
        <RestaurantImage
          onLoad={() => this.onImageLoad()}
          imageURL={imageURL}
        />
      </RestaurantImageWrapper>
    );
  }

  renderBottomRow = (address: string): Object => (
    <Fragment>
      <AddressWrapper>
        <AddressIconWrapper>
          <AddressIcon />
        </AddressIconWrapper>
        <Address>
          {address}
        </Address>
      </AddressWrapper>
    </Fragment>
  );

  renderRestaurantInfo = (): Object => {
    const { name, stars, address } = this.props;

    return (
      <Content>
        <Name>
          {name}
        </Name>
        <ReviewStars
          stars={stars}
          textColor="white"
        />
        {this.renderBottomRow(address)}
      </Content>
    );
  }

  render() {
    const { isImageLoaded } = this.state;

    return (
      <CardContainer>
        <TouchableWithoutFeedback
          onPress={() => this.onItemPress()}
        >
          <ContentWrapper>
            {this.renderRestaurantImage()}
            <DarkLayer />
            {this.renderRestaurantInfo()}
          </ContentWrapper>
        </TouchableWithoutFeedback>
        {!isImageLoaded && <ContainerShimmer autoRun visible={false} />}
      </CardContainer>
    );
  }
}

export default withNavigation(RestaurantItemList);
