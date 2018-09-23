// @flow

import React, { Component, Fragment } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  Animated,
  FlatList,
  Platform,
  Text,
  View,
} from 'react-native';

import { Creators as DishCreators } from 'store/ducks/dish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import FloatingActionButton from 'components/common/FloatingActionButton';
import CustomTab from 'components/common/CustomTab';
import Loading from 'components/common/Loading';

import IngredientsItemList from './components/IngredientsItemList';
import ReviewItemList from './components/ReviewItemList';
import Header from './components/Header';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const CardContentWrapper = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const CardContainer = styled(View)`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const VisitRestaurantButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('9%')}px;
  background-color: ${({ theme }) => theme.colors.red};
  align-items: center;
`;

const VisitRestaurantContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('52%')};
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VisitRestaurantText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '3%' : '2.5%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Black;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'arrow-right',
  size: 26,
})`
  width: 26px;
  height: 26px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  position: absolute;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('27%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
`;

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

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.7%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Book;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  getSingleDishRequest: Function,
  navigation: Function,
  dishRequestInfo: Object,
};

type State = {
  tabItemSelected: number,
};

class DisheDetail extends Component<Props, State> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  _animatedFlatlistPosition = new Animated.Value(0);
  _flatListHeight = 0;

  state = {
    tabItemSelected: 0,
  };

  componentDidMount() {
    const { getSingleDishRequest, navigation } = this.props;
    const { id } = navigation.getParam('payload', {});

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

  getListItems = (): Object => {
    const { dishRequestInfo } = this.props;
    const { requestSingleData } = dishRequestInfo;

    return {
      ingredients: requestSingleData.dishe.ingredients,
      reviews: requestSingleData.reviews,
    };
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 4);
    const { tabItemSelected } = this.state;

    const { ingredients, reviews } = this.getListItems();
    const dataset = (tabItemSelected === 0) ? ingredients : reviews;

    return (
      <CustomTabWrapper>
        <CustomTab
          theme="light"
          contentWidth={tabContentWidth}
          data={[{ id: '1', title: 'Ingredients' }, { id: '2', title: 'Reviews' }]}
          onChangeMenuIndex={this.onChangeMenuIndex}
        />
        <AnimatedFlatList
          style={[{
            flex: 1,
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
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => this.renderListItem(item, index)}
          showsVerticalScrollIndicator={false}
          onLayout={this.onFlatlistLayout}
          scrollEventThrottle={16}
          data={dataset}
        />
      </CustomTabWrapper>
    );
  }

  renderDisheImage = (): Object => {
    const { navigation } = this.props;
    const { imageURL } = navigation.getParam('payload', {});

    return (
      <ImageWrapper>
        <DisheImage
          imageURL={imageURL}
        />
        <SmokeShadow />
      </ImageWrapper>
    );
  }

  renderFloatingActionButton = (): Object => (
    <FloatingActionButtonWrapper>
      <FloatingActionButton
        name="silverware"
        color="red"
        action={() => {}}
      />
    </FloatingActionButtonWrapper>
  )

  renderVisitRestaurantButton = (): Object => {
    const { dishRequestInfo, navigation } = this.props;
    const { requestSingleData } = dishRequestInfo;

    const {
      imageURL,
      address,
      stars,
      name,
      id,
    } = requestSingleData.restaurant;

    const payload = {
      imageURL,
      address,
      stars,
      name,
      id,
    };

    return (
      <VisitRestaurantButton
        onPress={() => navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, { payload })}
      >
        <VisitRestaurantContentWrapper>
          <VisitRestaurantText>
            VISIT RESTAURANT
          </VisitRestaurantText>
          <ArrowIcon />
        </VisitRestaurantContentWrapper>
      </VisitRestaurantButton>
    );
  }

  renderCardContent = (): Object => {
    const { dishRequestInfo } = this.props;
    const { requestSingleData } = dishRequestInfo;

    const hasData = requestSingleData.dishe && Object.keys(requestSingleData.dishe).length > 0;

    if (!hasData) {
      return;
    }

    const {
      description,
      reviews,
      price,
      stars,
      title,
    } = requestSingleData.dishe;

    return (
      <CardContainer>
        <CardContentWrapper>
          <Header
            price={parseFloat(price).toFixed(2)}
            reviews={reviews}
            stars={stars}
            title={title}
          />
          <DisheDescription>
            {description}
          </DisheDescription>
          {this.renderListSection()}
        </CardContentWrapper>
        {this.renderVisitRestaurantButton()}
      </CardContainer>
    );
  }

  renderListItem = (item: Object, index: number): Object => {
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

  render() {
    const { dishRequestInfo } = this.props;
    const { requestSingleError, requestSingleLoading } = dishRequestInfo;

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          animated
          translucent
        />
        {this.renderDisheImage()}
        <Container>
          {(requestSingleError || requestSingleLoading)
            ? <Loading />
            : this.renderCardContent()}
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

const mapStateToProps = state => ({
  dishRequestInfo: state.dish,
});

export default connect(mapStateToProps, mapDispatchToProps)(DisheDetail);
