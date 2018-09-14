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

const DarkLayer = styled(View)`
  width: 100%;
  height: 70%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheImageShimmer = styled(ShimmerPlaceholder).attrs({
  autoRun: true,
  visible: true,
})`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const ContentWrapper = styled(View)``;

const BottomWrapper = styled(View)`
  width: 100%;
  height: 30%;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const DisheTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')}px;
  fontFamily: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.darkText};
`;

const FlagPriceWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  disheTitle: string,
  imageURL: string,
  id: string,
  stars: number,
  price: number,
  navigation: Function,
  isFirst: boolean,
};

type State = {
  isDisheImageLoaded: boolean,
};

class PopularSectionListItem extends Component<Props, State> {
  state = {
    isDisheImageLoaded: false,
  };

  onPressItem = () => {
    const { navigation, id } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        mode: 'detail',
        id,
      },
    });
  }

  onDisheImageLoaded = () => {
    this.setState({
      isDisheImageLoaded: true,
    });
  }

  renderDisheImage = (): Object => {
    const { isDisheImageLoaded } = this.state;
    const { imageURL } = this.props;

    return (
      <Fragment>
        <DisheImage
          onLoad={() => this.onDisheImageLoaded()}
          imageURL={imageURL}
        />
        {!isDisheImageLoaded && <DisheImageShimmer />}
      </Fragment>
    );
  }

  renderBottomContent = () => {
    const {
      disheTitle,
      stars,
      price,
    } = this.props;

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
          <DisheTitle>
            {disheTitle}
          </DisheTitle>
          <ReviewStars
            stars={stars}
            shouldShowReviewsText={false}
          />
        </BottomWrapper>
      </Fragment>
    );
  }

  render() {
    const { isFirst } = this.props;

    return (
      <Fragment>
        <Container
          isFirst={isFirst}
        >
          <TouchableWithoutFeedback
            onPress={() => this.onPressItem()}
          >
            <ContentWrapper>
              {this.renderDisheImage()}
              {this.renderBottomContent()}
            </ContentWrapper>
          </TouchableWithoutFeedback>
        </Container>
      </Fragment>
    );
  }
}

export default withNavigation(PopularSectionListItem);
