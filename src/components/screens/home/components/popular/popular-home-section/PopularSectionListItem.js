// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('28%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  margin-left: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContainerShimmer = styled(ShimmerPlaceholder)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('28%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 70%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImageURL }) => ({ uri: foodImageURL }),
})`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const BottomWrapper = styled(View)`
  width: 100%;
  height: 30%;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')}px;
  fontFamily: CircularStd-Bold;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FlagPriceWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  foodTitle: string,
  foodImageURL: string,
  stars: number,
  price: number,
  navigation: Function,
  isFirst: boolean,
};

type State = {
  isFoodImageLoaded: boolean,
};

class PopularSectionListItem extends Component<Props, State> {
  state = {
    isFoodImageLoaded: false,
  };

  onPressItem = () => {
    const {
      navigation,
      foodTitle,
      foodImageURL,
      price,
      stars,
    } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        mode: 'detail',
        foodTitle,
        foodImageURL,
        price,
        stars,
      },
    });
  }

  onFoodImageLoaded = () => {
    this.setState({
      isFoodImageLoaded: true,
    });
  }

  renderBottomContent = () => {
    const {
      foodTitle,
      stars,
      price,
    } = this.props;

    return (
      <Fragment>
        <DarkLayer>
          <FlagPriceWrapper>
            <FlagPrice price={price} />
          </FlagPriceWrapper>
        </DarkLayer>
        <BottomWrapper>
          <FoodTitle>
            {foodTitle}
          </FoodTitle>
          <ReviewStars
            stars={stars}
            shouldShowReviewsText={false}
          />
        </BottomWrapper>
      </Fragment>
    );
  }

  render() {
    const { isFoodImageLoaded } = this.state;
    const { foodImageURL, isFirst } = this.props;

    return (
      <Fragment>
        <Container isFirst={isFirst}>
          <TouchableWithoutFeedback
            onPress={() => this.onPressItem()}
          >
            <View>
              <FoodImage
                foodImageURL={foodImageURL}
              />
              {this.renderBottomContent()}
            </View>
          </TouchableWithoutFeedback>
        </Container>
        <ContainerShimmer
          visible={!isFoodImageLoaded}
          autoRun
        />
      </Fragment>
    );
  }
}

export default withNavigation(PopularSectionListItem);
