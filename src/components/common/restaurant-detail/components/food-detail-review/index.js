// @flow

import React, { Component, Fragment } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  View,
  Text,
} from 'react-native';

import { Creators as DishCreators } from 'store/ducks/dish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import appStyles from 'styles';

import FloatingActionButton from 'components/common/FloatingActionButton';
import CustomTab from 'components/common/CustomTab';

import IngredientsItemList from './components/IngredientsItemList';
import ReviewItemList from './components/ReviewItemList';
import FoodStatus from './components/FoodStatus';

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('27%')};
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  position: absolute;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('27%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
`;

const SmokeShadow = styled(LinearGradient).attrs({
  colors: ['transparent', appStyles.colors.primaryColor, appStyles.colors.primaryColor],
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('28%')};
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('12%')};
`;

const DishImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentContainer = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const CardContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.largeSize}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.7%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Medium;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
`;

type Props = {
  getDishRequest: Function,
  navigation: Object,
  dishInfo: Object,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FoodDetailReview extends Component<Props, {}> {
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

  componentDidMount() {
    const { id } = this.getPropsFromNavigation();
    const { getDishRequest } = this.props;

    getDishRequest(id);
  }

  onChangeMenuIndex = (index: number): void => {
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

  getPropsFromNavigation = (): Object => {
    const { navigation } = this.props;
    const props = navigation.getParam('payload', {});

    return {
      ...props,
    };
  }

  getReviews = (): Array<Object> => {
    const { dishInfo } = this.props;
    const { reviews } = dishInfo;
    if (!reviews) {
      return [];
    }

    return reviews;
  }

  getProperListDataset = (tabItemSelected: number): Array<any> => {
    const { dishInfo } = this.props;
    const { dish } = dishInfo;

    if (!dish) {
      return;
    }

    const { ingredients } = dishInfo.dish;
    const reviews = this.getReviews();
    const dataset = (tabItemSelected === 0 ? ingredients : reviews);

    return dataset;
  }

  renderListItem = (item, index) => {
    const { tabItemSelected } = this.state;

    const IngredientComponent = (
      <IngredientsItemList
        ingredient={item}
        isFirst={index === 0}
      />
    );

    const ReviewComponent = (
      <ReviewItemList
        isFirst={index === 0}
        reviewerImage={item.profileImageURL}
        reviewer={item.name}
        review={item.review}
        stars={item.stars}
      />
    );

    const ProperComponent = (tabItemSelected === 0 ? IngredientComponent : ReviewComponent);

    return ProperComponent;
  }

  renderFoodDescription = () => {
    const { dishDescription } = this.getPropsFromNavigation();

    return (
      <FoodDescription>
        {dishDescription}
      </FoodDescription>
    );
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 4);
    const { tabItemSelected, isDataFetched } = this.state;
    const dataset = this.getProperListDataset(tabItemSelected);

    return isDataFetched && (
      <CustomTabWrapper>
        <CustomTab
          data={[{ id: '1', title: 'Ingredients' }, { id: '2', title: 'Reviews' }]}
          onChangeMenuIndex={this.onChangeMenuIndex}
          contentWidth={tabContentWidth}
          theme="light"
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

  renderFoodImage = (imageURL: string): Object => (
    <ImageWrapper>
      <DishImage
        imageURL={imageURL}
      />
      <SmokeShadow />
    </ImageWrapper>
  );

  render() {
    const {
      dishTitle,
      imageURL,
      reviews,
      price,
      stars,
    } = this.getPropsFromNavigation();

    const { dishInfo } = this.props;
    const { loading, error } = dishInfo;

    return (
      <Fragment>
        {this.renderFoodImage(imageURL)}
        {(!loading && !error) && (
          <ContentContainer>
            <CardContainer>
              <FoodStatus
                dishTitle={dishTitle}
                reviews={reviews}
                price={price}
                stars={stars}
              />
              {this.renderFoodDescription()}
              {this.renderListSection()}
            </CardContainer>
          </ContentContainer>
        )}
        {this.renderFloatingActionButton()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

const mapStateToProps = state => ({
  dishInfo: state.dish.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailReview);
