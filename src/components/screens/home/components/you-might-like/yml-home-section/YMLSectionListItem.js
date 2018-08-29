import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import FlagPrice from 'components/common/FlagPrice';
import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  margin-left: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentShimmer = styled(ShimmerPlaceholder)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const ContentContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImageURL }) => ({ uri: foodImageURL }),
})`
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

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')}px;
  fontFamily: CircularStd-Black;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DistanceWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-content: center;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.5%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Bold;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DistanceIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 16,
})`
  width: 16px;
  height: 16px;
`;

type Props = {
  price: number,
  distance: number,
  reviews: number,
  stars: number,
  foodTitle: string,
  foodImageURL: string,
  isFirst: boolean,
  navigation: Function,
};

type State = {
  isFoodImageLoaded: boolean,
};

class YMLSectionList extends Component<Props, State> {
  state = {
    isFoodImageLoaded: false,
  };

  onFoodImageLoaded = () => {
    this.setState({
      isFoodImageLoaded: true,
    });
  }

  onPressItem = () => {
    const {
      price,
      distance,
      reviews,
      stars,
      foodTitle,
      navigation,
      foodImageURL,
    } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        price,
        distance,
        reviews,
        stars,
        foodTitle,
        foodImageURL,
        mode: 'detail',
      },
    });
  }

  renderFoodPrice = () => {
    const { price } = this.props;

    return (
      <PriceWrapper>
        <FlagPrice price={price} />
      </PriceWrapper>
    );
  }

  renderBottomContent = () => {
    const {
      foodTitle,
      stars,
      reviews,
      distance,
    } = this.props;

    return (
      <BottomContentWrapper>
        <FoodTitle>
          {foodTitle}
        </FoodTitle>
        <ReviewStars
          shouldShowReviewsText
          stars={stars}
          reviews={reviews}
          small
          textColor="defaultWhite"
        />
        <DistanceWrapper>
          <DistanceIcon />
          <DistanceText>
            {`${distance} km from you`}
          </DistanceText>
        </DistanceWrapper>
      </BottomContentWrapper>
    );
  }

  render() {
    const { isFoodImageLoaded } = this.state;
    const { foodImageURL, isFirst } = this.props;

    const ContentShimmerComponent = (
      <ContentShimmer
        visible={false}
        autoRun
      />
    );

    const ContentComponent = (
      <ContentContainer>
        <TouchableWithoutFeedback
          onPress={() => this.onPressItem()}
        >
          <View>
            {this.renderFoodPrice()}
            {this.renderBottomContent()}
          </View>
        </TouchableWithoutFeedback>
      </ContentContainer>
    );

    const ProperComponent = (isFoodImageLoaded ? ContentComponent : ContentShimmerComponent);

    return (
      <Container isFirst={isFirst}>
        <FoodImage
          onLoad={() => this.onFoodImageLoaded()}
          foodImageURL={foodImageURL}
        />
        {ProperComponent}
      </Container>
    );
  }
}

export default withNavigation(YMLSectionList);
