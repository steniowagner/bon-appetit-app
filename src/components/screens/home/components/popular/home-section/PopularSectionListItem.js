// @flow

import React, { Component, Fragment } from 'react';
import {
  TouchableWithoutFeedback, Image, Text, View,
} from 'react-native';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { withNavigation } from 'react-navigation';

import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';
import ReviewStars from '~/components/common/ReviewStars';
import FlagPrice from '~/components/common/FlagPrice';
import CONSTANTS from '~/utils/CONSTANTS';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('28%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
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

const DarkLayer = styled(View)`
  width: 100%;
  height: 70%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheImage = styled(Image).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
}))`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const BottomWrapper = styled(View)`
  width: 100%;
  height: 30%;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const DisheTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  font-family: CircularStd-Bold;
`;

const FlagPriceWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  navigation: Function,
  isFirst: boolean,
  imageURL: string,
  title: string,
  stars: number,
  price: number,
  id: string,
};

type State = {
  isDisheImageLoaded: boolean,
};

class PopularSectionListItem extends Component<Props, State> {
  state = {
    isDisheImageLoaded: false,
  };

  onDisheImageLoaded = () => {
    this.setState({
      isDisheImageLoaded: true,
    });
  };

  renderDisheImage = (): Object => {
    const { imageURL } = this.props;

    return (
      <Fragment>
        <DisheImage
          onLoad={() => this.onDisheImageLoaded()}
          imageURL={imageURL}
        />
      </Fragment>
    );
  };

  renderBottomContent = () => {
    const { title, stars, price } = this.props;

    return (
      <Fragment>
        <DarkLayer>
          <FlagPriceWrapper>
            <FlagPrice
              price={price}
            />
          </FlagPriceWrapper>
        </DarkLayer>
        <BottomWrapper>
          <DisheTitle>{title}</DisheTitle>
          <ReviewStars
            shouldShowReviewsText={false}
            textColor="white"
            isSmall={false}
            stars={stars}
            reviews={0}
          />
        </BottomWrapper>
      </Fragment>
    );
  };

  render() {
    const { navigation, isFirst, id } = this.props;
    const { isDisheImageLoaded } = this.state;

    return (
      <Fragment>
        <Container
          isFirst={isFirst}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(ROUTE_NAMES.DISH_DETAIL, {
                [CONSTANTS.NAVIGATION_PARAM_IS_DISH_DETAIL_REVIEW_MODE]: true,
                [CONSTANTS.NAVIGATION_PARAM_ID]: id,
              });
            }}
            disabled={!isDisheImageLoaded}
          >
            <View>
              {this.renderDisheImage()}
              {this.renderBottomContent()}
            </View>
          </TouchableWithoutFeedback>
          {!isDisheImageLoaded && <ImageShimmerOverlay />}
        </Container>
      </Fragment>
    );
  }
}

export default withNavigation(PopularSectionListItem);
