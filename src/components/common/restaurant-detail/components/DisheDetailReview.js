// @flow

import React, { Component, Fragment } from 'react';
import {
  StatusBar,
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

import CustomTab from 'components/common/CustomTab';
import Loading from 'components/common/Loading';

import IngredientsItemList from 'components/common/dishe-detail/components/IngredientsItemList';
import ReviewItemList from 'components/common/dishe-detail/components/ReviewItemList';
import Header from 'components/common/dishe-detail/components/Header';

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('27%')};
`;

const SmokeShadow = styled(LinearGradient).attrs({
  colors: ['transparent', appStyles.colors.dark, appStyles.colors.dark],
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('28%')};
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('12%')};
`;

const DisheImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentContainer = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
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

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.7%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Book;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
`;

type Props = {
  getSingleDishRequest: Function,
  navigation: Object,
  dishInfo: Object,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class DisheDetailReview extends Component<Props, {}> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  _animatedFlatlistPosition = new Animated.Value(0);
  _flatListHeight = 0;

  state = {
    tabItemSelected: 0,
  }

  componentDidMount() {
    const { id } = this.getPropsFromNavigation();
    const { getSingleDishRequest } = this.props;

    getSingleDishRequest(id);
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

  getProperListDataset = (tabItemSelected: number): Array<Object> => {
    const { ingredients, reviews } = this.getListItems();

    const dataset = (tabItemSelected === 0 ? ingredients : reviews);

    return dataset;
  }

  getListItems = (): Object => {
    const { dishInfo } = this.props;
    const hasData = Object.keys(dishInfo).length > 0;

    let defaultIngredients = [];
    let defaultReviews = [];

    if (hasData) {
      const { dishe, reviews } = dishInfo;
      defaultIngredients = dishe.ingredients;
      defaultReviews = reviews;
    }

    return {
      ingredients: defaultIngredients,
      reviews: defaultReviews,
    };
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
        profileImageURL={item.profileImageURL}
        name={item.name}
        isFirst={index === 0}
        review={item.review}
        stars={item.stars}
      />
    );

    const ProperComponent = (tabItemSelected === 0 ? IngredientComponent : ReviewComponent);

    return ProperComponent;
  }

  renderDisheDescription = () => {
    const { description } = this.getPropsFromNavigation();

    return (
      <DisheDescription>
        {description}
      </DisheDescription>
    );
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 4);
    const { tabItemSelected } = this.state;
    const dataset = this.getProperListDataset(tabItemSelected);

    return (
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

  renderFoodImage = (imageURL: string): Object => (
    <ImageWrapper>
      <DisheImage
        imageURL={imageURL}
      />
      <SmokeShadow />
    </ImageWrapper>
  );

  renderContent = (): Object => {
    const {
      reviews,
      title,
      price,
      stars,
    } = this.getPropsFromNavigation();

    return (
      <Fragment>
        <Header
          price={parseFloat(price).toFixed(2)}
          reviews={reviews}
          stars={stars}
          title={title}
        />
        {this.renderDisheDescription()}
        {this.renderListSection()}
      </Fragment>
    );
  }

  render() {
    const { imageURL } = this.getPropsFromNavigation();

    const { dishInfo } = this.props;
    const { requestSingleLoading, requestSingleError } = dishInfo;
    const hasData = Object.keys(dishInfo).length > 0;
    const isLoading = (requestSingleLoading || requestSingleError || !hasData);

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          animated
          translucent
        />
        {this.renderFoodImage(imageURL)}
        <ContentContainer>
          <CardContainer>
            {isLoading ? <Loading /> : this.renderContent()}
          </CardContainer>
        </ContentContainer>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

const mapStateToProps = state => ({
  dishInfo: state.dish.requestSingleData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DisheDetailReview);
