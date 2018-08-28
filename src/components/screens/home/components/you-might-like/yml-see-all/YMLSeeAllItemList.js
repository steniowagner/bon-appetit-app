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
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const ContentWrapper = styled(View)``;

const FoodImageShimmer = styled(ShimmerPlaceholder).attrs({
  autoRun: true,
  visible: false,
})`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const FoodImageWrapper = styled(View)`
  width: 30%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
  position: absolute;
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

const TextContentContainer = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  justify-content: space-between;
  height: 100%;
`;

const TopRowContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
  width: 75%;
`;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 4,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  fontFamily: CircularStd-Book;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const BottomRowContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  color: ({ theme }) => theme.colors.darkText,
  name: 'arrow-right',
  size: 25,
})`
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
  reviews: number,
  isDataFetched: boolean,
  isOpen: boolean,
  navigation: Function,
};

type State = {
  isFoodImageLoaded: boolean,
};

class YMLSeeAllItemList extends Component<Props, State> {
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
        mode: 'detail',
        foodDescription,
        foodImage,
        foodTitle,
        distance,
        price,
        stars,
      },
    });
  }

  renderFoodImage = () => {
    const { isFoodImageLoaded } = this.state;
    const { foodImage } = this.props;

    const FoodImageComponents = (
      <Fragment>
        <FoodImageWrapper>
          <FoodImage
            foodImage={foodImage}
            onLoad={() => this.onFoodImageLoaded()}
          />
          {!isFoodImageLoaded && <FoodImageShimmer />}
        </FoodImageWrapper>
      </Fragment>
    );

    return FoodImageComponents;
  }

  renderTopRowContent = () => {
    const {
      foodTitle,
      price,
    stars,
  reviews} = this.props;

    return (
      <View>
        <TopRowContent>
          <FoodTitle>
            {foodTitle}
          </FoodTitle>
          <FlagPrice
            price={price}
          />
        </TopRowContent>
        <ReviewStars
          shouldShowReviewsText
          stars={stars}
          reviews={reviews}
          textColor="darkText"
        />
      </View>
    );
  }

  renderBottomRowContent = () => {
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
      <BottomRowContent>
        <RestaurantStatus
          color={restaurantStatus[status].color}
        >
          {restaurantStatus[status].text}
        </RestaurantStatus>
        <ArrowIconWrapper>
          <TouchableOpacity
            onPress={() => this.onPressItem()}
          >
            <ArrowIcon />
          </TouchableOpacity>
        </ArrowIconWrapper>
      </BottomRowContent>
    );
  }

  renderTextContent = () => {
    const {
      stars,
      reviews,
      foodDescription,
    } = this.props;

    return (
      <Fragment>
        {this.renderTopRowContent()}
        <FoodDescription>
          {foodDescription}
        </FoodDescription>
        {this.renderBottomRowContent()}
      </Fragment>
    );
  }

  renderTextContentShimmer = () => (
    <ShimmerContainer>
      <ShimmerPlaceholder
        visible={false}
        autoRun
      />
      <ShimmerPlaceholder
        style={{
          height: 50,
          marginVertical: 15,
        }}
        visible={false}
        autoRun
      />
      <ShimmerPlaceholder
        visible={false}
        autoRun
      />
    </ShimmerContainer>
  );

  render() {
    const { isDataFetched } = this.props;

    const TextContentShimmer = this.renderTextContentShimmer();
    const TextContentComponent = this.renderTextContent();

    return (
      <Container
        style={{
          ...Platform.select({
            ios: {
              elevation: 1,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 3,
              shadowOpacity: 0.35,
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
        <ContentWrapper>
          {this.renderFoodImage()}
          <TextContentContainer>
            {isDataFetched ? TextContentComponent : TextContentShimmer}
          </TextContentContainer>
        </ContentWrapper>
      </Container>
    );
  }
}

export default withNavigation(YMLSeeAllItemList);
