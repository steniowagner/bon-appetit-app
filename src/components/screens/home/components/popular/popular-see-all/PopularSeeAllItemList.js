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

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  flex-direction: row;
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
  align-items: center;
  justify-content: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px
`;

const CardContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  height: 80%;
  width: 60%;
`;

const ImageContentContainer = styled(View)`
  width: 30%;
  height: 100%;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImageURL }) => ({ uri: foodImageURL }),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;

const FoodImageShimmer = styled(ShimmerPlaceholder)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const AboutFoodWrapper = styled(View)``;

const TopRowWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
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
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.5%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  width: 85%;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
`;

const ArrowButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red};
  align-self: flex-end;
  margin-left: -24px;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'arrow-right',
  size: 28,
})`
  width: 28px;
  height: 28px;
`;

const TextShimmer = styled(ShimmerPlaceholder).attrs({
  autoRun: true,
  visible: false,
})`
  width: 120px;
  height: 50px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const shadowStyle = {
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
};

type Props = {
  navigation: Function,
  foodImageURL: string,
  description: string,
  foodTitle: string,
  stars: number,
  price: number,
};

type State = {
  isFoodImageLoaded: boolean,
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
      stars,
      foodTitle,
      description,
      foodImageURL,
      price,
    } = this.props;

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
      payload: {
        mode: 'detail',
        stars,
        foodTitle,
        description,
        foodImageURL,
        price,
      },
    });
  }

  parseFoodTitle = (foodTitle: string): string => {
    const firstBlankSpaceIndex = foodTitle.indexOf(' ');
    const title = `${foodTitle.substring(0, firstBlankSpaceIndex)}\n${foodTitle.substring(firstBlankSpaceIndex + 1, foodTitle.length)}`;

    return title;
  }

  renderFoodImage = () => {
    const { isFoodImageLoaded } = this.state;
    const { foodImageURL } = this.props;

    return (
      <ImageContentContainer
        style={{ ...shadowStyle }}
      >
        <FoodImage
          style={{ ...shadowStyle }}
          onLoad={() => this.onFoodImageLoaded()}
          foodImageURL={foodImageURL}
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

  renderAboutFood = () => {
    const { isFoodImageLoaded } = this.state;

    if (!isFoodImageLoaded) {
      return (
        <Fragment>
          <TextShimmer />
          <TextShimmer />
        </Fragment>
      );
    }

    const {
      foodTitle,
      stars,
      description,
      price,
    } = this.props;

    return (
      <AboutFoodWrapper>
        <TopRowWrapper>
          <FoodTitle>
            {this.parseFoodTitle(foodTitle)}
          </FoodTitle>
          <View>
            <FlagPrice
              price={price}
            />
          </View>
        </TopRowWrapper>
        <ReviewStars
          stars={stars}
        />
        <FoodDescription>
          {description}
        </FoodDescription>
      </AboutFoodWrapper>
    );
  }

  renderArrowButton = () => (
    <ArrowButton
      onPress={() => this.onPressArrowButton()}
      style={{ ...shadowStyle }}
    >
      <ArrowIcon />
    </ArrowButton>
  )

  render() {
    const { isFoodImageLoaded } = this.state;

    return (
      <Container>
        {this.renderFoodImage()}
        <CardContainer
          style={{ ...shadowStyle }}
        >
          {this.renderAboutFood()}
        </CardContainer>
        {isFoodImageLoaded && this.renderArrowButton()}
      </Container>
    );
  }
}

export default withNavigation(PopularSeeAllItemList);
