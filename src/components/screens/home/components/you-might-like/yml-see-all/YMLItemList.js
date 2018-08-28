import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import appStyle from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import FlagPrice from 'components/common/FlagPrice';
import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('40%')};
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.white};
  shadowColor: ${({ theme }) => theme.colors.darkLayer},
`;

const FoodImageWrapper = styled(View)`
  width: 100%;
  height: 40%;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImage }) => ({ uri: foodImage }),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;

  padding: ${({ theme }) => theme.metrics.largeSize}px;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.lightDarkLayer};
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const MainContentWrapper = styled(View)`
  height: 60%;
`;

const StarsWrapper = styled(View)`
  align-items: center;
  width: 100%;
`;

const TextContentWrapper = styled(View)`
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const FoodTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
  text-align: center;
`;

const FoodDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Book;
  margin: ${({ theme }) => `${theme.metrics.mediumSize}px ${theme.metrics.getWidthFromDP('10%')}px`};
  text-align: center;
`;

const RestaurantStatus = styled(Text)`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')}px;
  fontFamily: CircularStd-Bold;
  text-align: center;
`;

const ArrowIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.red,
  name: 'arrow-right',
  size: 25,
})`
  margin-right: 12px;
  width: 25px;
  height: 25px;
`;

const GapComponent = styled(View)`
  width: 25px;
  height: 25px;
`;

const ShimmerContainer = styled(View).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: 60%;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  foodDescription: string,
  foodImage: string,
  foodTitle: string,
  distance: number,
  price: number,
  stars: number,
  isDataFetched: boolean,
  isOpen: boolean,
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
      foodDescription,
      foodImage,
      foodTitle,
      distance,
      price,
      stars,
      navigation,
    } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        foodDescription,
        foodImage,
        foodTitle,
        distance,
        price,
        stars,
        mode: 'detail',
      },
    });
  }

  renderTopContent = () => {
    const { isFoodImageLoaded } = this.state;
    const { price, foodImage } = this.props;

    const ContentComponents = (
      <DarkLayer>
        <FlagPrice price={price} />
      </DarkLayer>
    );

    const Shimmer = (
      <ShimmerPlaceholder
        style={{
          width: '100%',
          height: '100%',
          borderTopRightRadius: appStyle.metrics.borderRadius,
          borderTopLeftRadius: appStyle.metrics.borderRadius,
        }}
        visible={false}
        autoRun
      />
    );

    const ProperComponent = (isFoodImageLoaded ? ContentComponents : Shimmer);

    return (
      <Fragment>
        <FoodImageWrapper>
          <FoodImage
            onLoad={() => this.onFoodImageLoaded()}
            foodImage={foodImage}
          />
          {ProperComponent}
        </FoodImageWrapper>
      </Fragment>
    );
  }

  renderFoodInfo = () => {
    const {
      foodTitle,
      stars,
      foodDescription,
    } = this.props;

    return (
      <TextContentWrapper>
        <FoodTitle>
          {foodTitle}
        </FoodTitle>
        <StarsWrapper>
          <ReviewStars
            stars={stars}
            shouldShowReviewsText={false}
          />
        </StarsWrapper>
        <FoodDescription>
          {foodDescription}
        </FoodDescription>
      </TextContentWrapper>
    );
  }

  renderBottomRowComponents = () => {
    const { isOpen, distance } = this.props;

    const restaurantStatus = {
      open: {
        color: appStyle.colors.green,
        text: `Open now. ${distance}km from you`,
      },
      closed: {
        color: appStyle.colors.red,
        text: 'Closed now',
      },
    };

    const status = (isOpen ? 'open' : 'closed');

    return (
      <ArrowIconWrapper>
        <GapComponent />
        <RestaurantStatus
          color={restaurantStatus[status].color}
        >
          {restaurantStatus[status].text}
        </RestaurantStatus>
        <TouchableOpacity
          onPress={() => this.onPressItem()}
        >
          <ArrowIcon />
        </TouchableOpacity>
      </ArrowIconWrapper>
    );
  }

  render() {
    const { isDataFetched } = this.props;

    const Shimmer = (
      <ShimmerContainer>
        <ShimmerPlaceholder
          visible={false}
          autoRun
        />
        <ShimmerPlaceholder
          visible={false}
          autoRun
        />
        <ShimmerPlaceholder
          visible={false}
          autoRun
        />
      </ShimmerContainer>
    );

    return (
      <Container
        style={{
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
        }}
      >
        {this.renderTopContent()}
        <MainContentWrapper>
          {isDataFetched && this.renderFoodInfo()}
          {isDataFetched && this.renderBottomRowComponents()}
          {!isDataFetched && Shimmer}

        </MainContentWrapper>
      </Container>
    );
  }
}

export default withNavigation(YMLSectionList);
