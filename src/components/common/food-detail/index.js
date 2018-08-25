// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Animated,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import FlagPrice from 'components/common/FlagPrice';
import ReviewStars from 'components/common/ReviewStars';
import CustomTab from 'components/common/CustomTab';
import FloatingActionButton from 'components/common/FloatingActionButton';

import RestaurantInfo from './components/RestaurantInfo';
import IngredientsItemList from './components/IngredientsItemList';
import ReviewItemList from './components/ReviewItemList';

const Container = styled(View)`
  flex: 1;
`;

const Header = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  justify-content: flex-end;
  position: absolute;
`;

const HeaderShimmer = styled(ShimmerPlaceHolder)`
  width: 100%;
  height: 100%;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImage }) => ({ uri: foodImage }),
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
`;

const ContentContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('75%')}px;
`;

const ContentCard = styled(View)`
  height: 100%;
  padding: ${({ theme }) => `${theme.metrics.largeSize}px ${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px`};
  background-color: ${({ theme }) => theme.colors.white};
`;

const FoodName = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('65%')}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')};
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Black;
`;

const FoodDescriptionWrapper = styled(View)``;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')};
  font-family: CircularStd-Book;
`;

const FoodDescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Bold;
`;

const TextContentContainer = styled(View)`
  width: 100%;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
`;

const TopContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TopContentWrapper = styled(View)`
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FlagPriceWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  justify-content: center;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
  align-items: flex-end;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  position: absolute;
`;

const ingredients = [
  { id: '1', name: 'Ingrediente 1' },
  { id: '2', name: 'Ingrediente 2' },
  { id: '3', name: 'Ingrediente 3' },
  { id: '4', name: 'Ingrediente 4' },
  { id: '5', name: 'Ingrediente 5' },
  { id: '6', name: 'Ingrediente 6' },
  { id: '7', name: 'Ingrediente 7' },
  { id: '8', name: 'Ingrediente 8' },
];

const reviews = [
  {
    id: '1',
    reviewer: 'Stenio Wagner',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 3.5,
  }, {
    id: '2',
    reviewer: 'Ana Eridan',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 3.5,
  }, {
    id: '3',
    reviewer: 'Manoel Elisval',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 4.5,
  }, {
    id: '4',
    reviewer: 'Beatriz Eliana',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 6,
  },
];

type Props = {
  navigation: Function,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FoodDetail extends Component<Props, {}> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  _animatedFlatlistPosition = new Animated.Value(0);
  _flatListHeight = 0;

  state = {
    tabItemSelected: 0,
    isFoodImageLoaded: false,
  }

  onLoadFoodImage = () => {
    this.setState({
      isFoodImageLoaded: true,
    });
  }

  onChangeListIndex = (index: number): void => {
    const onAniamateListAppear = () => {
      Animated.spring(this._animatedFlatlistPosition, {
        toValue: 0,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    };

    Animated.timing(this._animatedFlatlistPosition, {
      toValue: this._flatListHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        tabItemSelected: index,
      }, () => onAniamateListAppear());
    });
  }

  onFlatlistLayout = (event: Object): void => {
    const { height } = event.nativeEvent.layout;
    this._flatListHeight = height;
  }

  renderTopContentWrapper = (): Object => {
    const { navigation } = this.props;

    const {
      foodTitle,
      price,
      stars,
      mode,
    } = navigation.getParam('payload', {});

    const shouldRenderFlagPrice = mode === 'detail';
    const renderFlagPrice = () => (
      shouldRenderFlagPrice && (
      <FlagPriceWrapper>
        <FlagPrice price={price} />
      </FlagPriceWrapper>)
    );

    return (
      <TopContentWrapper>
        <TopContent>
          <FoodName>
            {foodTitle}
          </FoodName>
          {renderFlagPrice()}
        </TopContent>
        <ReviewStars
          shouldShowReviewsText
          reviews={16}
          textColor="defaultWhite"
          stars={stars}
        />
      </TopContentWrapper>
    );
  }

  renderListItem = (item, index) => {
    const { tabItemSelected } = this.state;

    const IngredientComponent = (
      <IngredientsItemList
        ingredient={item.name}
        index={index}
      />
    );

    const ReviewComponent = (
      <ReviewItemList
        isFirst={index === 0}
        reviewer={item.reviewer}
        reviewerImage={item.reviewerImage}
        review={item.review}
        stars={item.stars}
      />
    );

    const ProperComponent = (tabItemSelected === 0 ? IngredientComponent : ReviewComponent);

    return ProperComponent;
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 2);
    const { tabItemSelected } = this.state;
    const dataset = (tabItemSelected === 0) ? ingredients : reviews;

    return (
      <CustomTabWrapper>
        <CustomTab
          contentWidth={tabContentWidth}
          data={[{ id: '1', item: 'Ingredients' }, { id: '2', item: 'Reviews' }]}
          onChangeListIndex={this.onChangeListIndex}
        />
        <AnimatedFlatList
          style={[{
            marginTop: this._animatedFlatlistPosition._value,
            transform: [
              {
                translateY: this._animatedFlatlistPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }]}
          scrollEventThrottle={16}
          onLayout={this.onFlatlistLayout}
          showsVerticalScrollIndicator={false}
          data={dataset}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => this.renderListItem(item, index)}
        />
      </CustomTabWrapper>
    );
  }

  renderTextContent = (): Object => {
    const { navigation } = this.props;
    const { foodDescription, mode } = navigation.getParam('payload', {});
    const { isFoodImageLoaded } = this.state;

    const shouldRenderRestaurantInfo = mode === 'detail';

    return (
      <TextContentContainer>
        {shouldRenderRestaurantInfo
          && (
          <RestaurantInfo
            restaurantName="Cabaña del Primo"
            status="open"
            distance={3}
            isVisible={isFoodImageLoaded}
          />)
        }
        <ShimmerPlaceHolder
          visible={isFoodImageLoaded}
          autoRun
        >
          <FoodDescriptionWrapper>
            <FoodDescriptionText>
              Description
            </FoodDescriptionText>
            <FoodDescription>
              {foodDescription}
            </FoodDescription>
          </FoodDescriptionWrapper>
        </ShimmerPlaceHolder>
      </TextContentContainer>
    );
  }

  renderFloatingActionButton = () => (
    <FloatingActionButtonWrapper>
      <FloatingActionButton
        name="star"
        color="yellow"
        action={() => {}}
      />
    </FloatingActionButtonWrapper>
  )

  render() {
    const { navigation } = this.props;
    const { mode, foodImage } = navigation.getParam('payload', {});

    const { isFoodImageLoaded } = this.state;

    return (
      <Container>
        <FoodImage
          onLoad={() => this.onLoadFoodImage()}
          foodImage={foodImage}
        />
        <Header>
          <HeaderShimmer
            autoRun
            visible={isFoodImageLoaded}
          >
            {this.renderTopContentWrapper()}
          </HeaderShimmer>
        </Header>
        <ContentContainer>
          <ContentCard>
            {this.renderTextContent()}
            {isFoodImageLoaded && this.renderListSection()}
          </ContentCard>
        </ContentContainer>
        {mode === 'review' && this.renderFloatingActionButton()}
      </Container>
    );
  }
}


export default FoodDetail;
