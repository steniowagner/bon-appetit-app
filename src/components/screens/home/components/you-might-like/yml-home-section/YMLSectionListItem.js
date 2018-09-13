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
  distance: number,
  reviews: number,
  price: number,
  stars: number,
  imageURL: string,
  title: string,
  id: string,
  navigation: Function,
  isFirst: boolean,
};

type State = {
  isDisheImageLoaded: boolean,
};

class YMLSectionList extends Component<Props, State> {
  state = {
    isDisheImageLoaded: false,
  };

  onDisheImageLoaded = () => {
    this.setState({
      isDisheImageLoaded: true,
    });
  }

  onPressItem = () => {
    const { navigation, id } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        mode: 'detail',
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
      distance,
    } = this.props;

    return (
      <BottomContentWrapper>
        <DisheTitle>
          {title}
        </DisheTitle>
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

export default withNavigation(YMLSectionList);
