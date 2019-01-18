// @flow

import React, { Component } from 'react';
import {
  TouchableWithoutFeedback, Image, Text, View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { withNavigation } from 'react-navigation';

import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';
import ReviewStars from '~/components/common/ReviewStars';
import FlagPrice from '~/components/common/FlagPrice';
import CONSTANTS from '~/utils/CONSTANTS';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  margin-left: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ImageShimmerOverlay = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  position: absolute;
`;

const ContentContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const DisheImage = styled(Image).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  position: absolute;
`;

const PriceWrapper = styled(View)`
  width: 100%;
  height: 30%;
  align-items: flex-end;
`;

const BottomContentWrapper = styled(View)`
  width: 100%;
  height: 70%;
  justify-content: flex-end;
`;

const DisheTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Black;
`;

const DistanceWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('3%')};
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  align-items: center;
`;

const DistanceText = styled(Text)`
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Bold;
`;

const DistanceIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.defaultWhite,
  name: 'map-marker',
  size: 16,
}))``;

type Props = {
  navigation: Function,
  imageURL: string,
  isFirst: boolean,
  reviews: number,
  price: number,
  stars: number,
  title: string,
  id: string,
};

type State = {
  isDisheImageLoaded: boolean,
};

class YouMightLikeSectionListItem extends Component<Props, State> {
  state = {
    isDisheImageLoaded: false,
  };

  onDisheImageLoaded = () => {
    this.setState({
      isDisheImageLoaded: true,
    });
  };

  renderFoodPrice = () => {
    const { price } = this.props;

    return (
      <PriceWrapper>
        <FlagPrice
          price={price}
        />
      </PriceWrapper>
    );
  };

  renderBottomContent = () => {
    const { reviews, title, stars } = this.props;

    return (
      <BottomContentWrapper>
        <DisheTitle>{title}</DisheTitle>
        <ReviewStars
          textColor="defaultWhite"
          shouldShowReviewsText
          reviews={reviews}
          stars={stars}
          isSmall
        />
        <DistanceWrapper>
          <DistanceIcon />
          <DistanceText>
            {`${parseFloat(reviews / stars).toFixed(1)} km from you`}
          </DistanceText>
        </DistanceWrapper>
      </BottomContentWrapper>
    );
  };

  render() {
    const { isDisheImageLoaded } = this.state;
    const {
      navigation, imageURL, isFirst, id,
    } = this.props;

    return (
      <Container
        isFirst={isFirst}
      >
        <DisheImage
          onLoad={() => this.onDisheImageLoaded()}
          imageURL={imageURL}
        />
        <ContentContainer>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(ROUTE_NAMES.DISH_DETAIL, {
                [CONSTANTS.NAVIGATION_PARAM_IS_DISH_DETAIL_REVIEW_MODE]: true,
                [CONSTANTS.NAVIGATION_PARAM_ID]: id,
              });
            }}
          >
            <View>
              {this.renderFoodPrice()}
              {this.renderBottomContent()}
            </View>
          </TouchableWithoutFeedback>
        </ContentContainer>
        {!isDisheImageLoaded && <ImageShimmerOverlay />}
      </Container>
    );
  }
}

export default withNavigation(YouMightLikeSectionListItem);
