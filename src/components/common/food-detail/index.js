// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Animated,
} from 'react-native';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';
import appStyles from 'styles';

import CustomTab from 'components/common/CustomTab';

import FloatingActionButton from 'components/common/FloatingActionButton';
import IngredientsItemList from './components/IngredientsItemList';
import ReviewItemList from './components/ReviewItemList';
import FoodStatus from './components/FoodStatus';
import RestaurantInfo from './components/RestaurantInfo';

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('27%')};
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('27%') - 28}px;
  align-items: flex-end;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
  position: absolute;
`;

const SmokeShadowImage = styled(Image).attrs({
  source: require('../../../styles/img/shadow-smoke.png'),
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('28%')};
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('15%')};
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImageURL }) => ({ uri: foodImageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const CardContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: 0px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')};
  font-family: CircularStd-Book;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
`;

const FoodDescriptionShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
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

const revs = [
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
    id: '421',
    reviewer: 'Beatriz Eliana',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 6,
  },
  {
    id: '12',
    reviewer: 'Stenio Wagner',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 3.5,
  }, {
    id: '22',
    reviewer: 'Ana Eridan',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 3.5,
  }, {
    id: '32',
    reviewer: 'Manoel Elisval',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 4.5,
  }, {
    id: '42',
    reviewer: 'Beatriz Eliana',
    reviewerImage: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/15780909_1234950926552253_8691155177917421498_n.jpg?_nc_cat=0&oh=5696f0dcb226744fbc44d2e97698ce07&oe=5BFB442D',
    review: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI',
    stars: 6,
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FoodDetail extends Component {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  _animatedFlatlistPosition = new Animated.Value(0);
  _flatListHeight = 0;

  state = {
    tabItemSelected: 0,
    isDataFetched: true,
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

  renderFoodDescription = () => {
    const { isDataFetched } = this.state;
    const { navigation } = this.props;
    const { foodDescription } = navigation.getParam('payload', {});

    const FoodDescriptionComponents = (
      <FoodDescription>
        {foodDescription || 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI'}
      </FoodDescription>
    );

    const ProperComponent = (isDataFetched ? FoodDescriptionComponents : <FoodDescriptionShimmer />);

    return ProperComponent;
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 4);
    const { tabItemSelected, isDataFetched } = this.state;
    const dataset = (tabItemSelected === 0) ? ingredients : revs;

    return isDataFetched && (
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

  renderFloatingActionButton = () => (
    <FloatingActionButtonWrapper>
      <FloatingActionButton
        name="star"
        color="yellow"
        action={() => {}}
      />
    </FloatingActionButtonWrapper>
  )

  renderFoodImage = () => {
    const { navigation } = this.props;
    const { foodImageURL } = navigation.getParam('payload', {});

    return (
      <ImageWrapper>
        <FoodImage
          foodImageURL={foodImageURL}
        />
        <SmokeShadowImage />
      </ImageWrapper>
    );
  }

  render() {
    const { isDataFetched } = this.state;
    const { navigation } = this.props;

    const {
      mode,
      foodTitle,
      price,
      reviews,
      stars,
      isOpen,
      distance,
    } = navigation.getParam('payload', {});

    const isReviewMode = mode === 'review';

    return (
      <Fragment>
        {this.renderFoodImage()}
        <ContentContainer>
          <CardContainer>
            <FoodStatus
              isReviewMode={isReviewMode}
              isDataFetched={isDataFetched}
              foodTitle={foodTitle}
              price={price}
              reviews={reviews || 15}
              stars={stars}
            />
            {!isReviewMode && (
              <RestaurantInfo
                isOpen={isOpen}
                restaurantName="Cabaña del Primo"
                distance={distance || 4}
                isDataFetched={isDataFetched}
              />
            )}
            {this.renderFoodDescription()}
            {this.renderListSection()}
          </CardContainer>
        </ContentContainer>
        {isReviewMode && this.renderFloatingActionButton()}
      </Fragment>
    );
  }
}

export default FoodDetail;
