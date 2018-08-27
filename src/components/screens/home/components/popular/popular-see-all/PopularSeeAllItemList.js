import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';
import appStyle from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
  justify-content: flex-end;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
`;

const CardContainer = styled(View)`
  height: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px
  position: absolute;
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImageContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  height: 100%;
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px
  z-index: 1;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImage }) => ({ uri: foodImage }),
})`
  width: 100%;
  height: 100%;
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const FoodImageShimmer = styled(ShimmerPlaceholder)`
  width: 100%;
  height: 100%;
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
  position: absolute;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: 75%;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '3%' : '2.6%';

    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Black;
`;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.5%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Medium;
  width: 85%;
  height: 100%;
`;

const MainContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('60%')}px;
  height: 100%;
  margin-left:  ${({ theme }) => theme.metrics.getWidthFromDP('29%')}px;
`;

const LocationIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'map-marker',
  size: 16,
})`
  width: 16px;
  height: 16px;
`;

const DistanceWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.8%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Black;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ArrowButton = styled(TouchableOpacity)`
  width: 15%;
  height: 80%;
  justify-content: center;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.red,
  name: 'arrow-right',
  size: 28,
})`
  align-self: flex-end;
  width: 28px;
  height: 28px;
`;

type Props = {
  navigation: Function,
  reviews: number,
  stars: number,
  price: number,
  distance: number,
  foodTitle: string,
  description: string,
  foodImage: string,
  isDataFetched: boolean
};

type State = {
  isFoodImageLoaded: boolean,
};

const shadowStyle = {
  shadowColor: appStyle.colors.darkLayer,
  ...Platform.select({
    ios: {
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
      shadowOpacity: 5.0,
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
};

class PopularSeeAllItemList extends Component<Props, State> {
  state = {
    isFoodImageLoaded: false,
  };

  onFoodImageLoaded = () => {
    this.setState({
      isFoodImageLoaded: true,
    });
  }

  onPressArrowButton = () => {
    const {
      navigation,
      reviews,
      stars,
      foodTitle,
      distance,
      description,
      foodImage,
      price,
    } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        mode: 'detail',
        reviews,
        stars,
        foodTitle,
        distance,
        description,
        foodImage,
        price,
      },
    });
  }

  renderTopRowComponents = () => {
    const {
      foodTitle,
      price,
      reviews,
      stars,
      isDataFetched,
    } = this.props;

    const TopRowShimmer = (
      <ShimmerPlaceholder
        visible={false}
        autoRun
        style={{
          height: '20%',
        }}
      />
    );

    const TopRowComponents = (
      <Fragment>
        <ContentWrapper>
          <FoodTitle>
            {foodTitle}
          </FoodTitle>
          <FlagPrice price={price} />
        </ContentWrapper>
        <ReviewStars
          smallSize
          shouldShowReviewsText
          reviews={reviews}
          textColor="lightGray"
          stars={stars}
        />
      </Fragment>
    );

    const ProperComponent = (isDataFetched ? TopRowComponents : TopRowShimmer);

    return ProperComponent;
  }

  renderDistance = () => {
    const { isDataFetched, distance } = this.props;

    const DistanceShimmer = (
      <ShimmerPlaceholder
        visible={false}
        autoRun
        style={{
          marginTop: 5,
        }}
      />
    );

    const DistanceComponent = (
      <Fragment>
        {isDataFetched && (
          <DistanceWrapper>
            <LocationIcon />
            <DistanceText>
              {`${distance} km from you`}
            </DistanceText>
          </DistanceWrapper>
        )}
      </Fragment>
    );

    const ProperComponent = (isDataFetched ? DistanceComponent : DistanceShimmer);

    return ProperComponent;
  }

  renderBottomRowComponents = () => {
    const { isDataFetched, description } = this.props;

    const BottomRowShimmer = (
      <ShimmerPlaceholder
        visible={false}
        autoRun
        style={{
          marginTop: 8,
          height: '30%',
        }}
      />
    );

    const BottomRowComponent = (
      <ContentWrapper>
        <FoodDescription>
          {description}
        </FoodDescription>
        <ArrowButton
          onPress={() => this.onPressArrowButton()}
        >
          <ArrowIcon />
        </ArrowButton>
      </ContentWrapper>
    );

    const ProperCompoent = (isDataFetched ? BottomRowComponent : BottomRowShimmer);

    return ProperCompoent;
  }

  renderFoodImage = () => {
    const { isFoodImageLoaded } = this.state;
    const { foodImage } = this.props;

    return (
      <ImageContentContainer
        style={{ ...shadowStyle }}
      >
        <FoodImage
          onLoad={() => this.onFoodImageLoaded()}
          foodImage={foodImage}
        />
        {!isFoodImageLoaded
          && (
          <FoodImageShimmer
            visible={false}
            autoRun
          />)
        }
      </ImageContentContainer>
    );
  }

  render() {
    return (
      <Container>
        {this.renderFoodImage()}
        <CardContainer style={{ ...shadowStyle }}>
          <MainContent>
            {this.renderTopRowComponents()}
            {this.renderDistance()}
            {this.renderBottomRowComponents()}
          </MainContent>
        </CardContainer>
      </Container>
    );
  }
}

export default withNavigation(PopularSeeAllItemList);
