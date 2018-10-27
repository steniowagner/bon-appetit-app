import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  Image,
  Text,
  View,
} from 'react-native';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

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

const DisheImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
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

const DisheTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  fontFamily: CircularStd-Black;
`;

const DistanceWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('3%')};
  flex-direction: row;
  align-items: center;
`;

const DistanceText = styled(Text)`
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Bold;
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
  imageURL: string,
  title: string,
  id: string,
  reviews: number,
  price: number,
  stars: number,
  navigation: Function,
  isFirst: boolean,
};

type State = {
  isDisheImageLoaded: boolean,
};

class RecommendedSectionListItem extends Component<Props, State> {
  state = {
    isDisheImageLoaded: false,
  };

  onDisheImageLoaded = () => {
    this.setState({
      isDisheImageLoaded: true,
    });
  }

  onPressItem = () => {
    const { navigation, id, imageURL } = this.props;

    navigation.navigate(ROUTE_NAMES.DISHE_DETAIL, {
      payload: {
        imageURL,
        id,
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
      title,
      stars,
      reviews,
    } = this.props;

    return (
      <BottomContentWrapper>
        <DisheTitle>
          {title}
        </DisheTitle>
        <ReviewStars
          textColor="defaultWhite"
          shouldShowReviewsText
          reviews={reviews}
          stars={stars}
          small
        />
        <DistanceWrapper>
          <DistanceIcon />
          <DistanceText>
            {`${parseFloat(reviews / stars).toFixed(1)} km from you`}
          </DistanceText>
        </DistanceWrapper>
      </BottomContentWrapper>
    );
  }

  render() {
    const { isDisheImageLoaded } = this.state;
    const { imageURL, isFirst } = this.props;

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

    const ProperComponent = (isDisheImageLoaded ? ContentComponent : ContentShimmerComponent);

    return (
      <Container isFirst={isFirst}>
        <DisheImage
          onLoad={() => this.onDisheImageLoaded()}
          imageURL={imageURL}
        />
        {ProperComponent}
      </Container>
    );
  }
}

export default withNavigation(RecommendedSectionListItem);
