// @flow

import React, { Component, Fragment } from 'react';
import {
  FlatList,
  Animated,
  View,
} from 'react-native';

import { Creators as RestaurantCreators } from 'store/ducks/restaurant';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import appStyles from 'styles';

import { getItemFromStorage } from 'components/utils/AsyncStoarageManager';
import { ROUTE_NAMES } from 'components/screens/home/routes';
import AppKeys from 'components/utils/Keys';

import FloatinActionButton from 'components/common/FloatingActionButton';
import CustomTab from 'components/common/CustomTab';
import Loading from 'components/common/Loading';

import AboutRestaurantSection from './components/AboutRestaurantSection';
import HeaderSection from './components/HeaderSection';
import MenuListItem from './components/MenuListItem';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Menu = styled(View)`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const AboutRestaurantWrapper = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  position: absolute;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  getRestaurantRequest: Function,
  resetState: Function,
  navigation: Function,
  restaurantInfo: Object,
};

type State = {
  indexMenuSelected: number,
};

const FORTALEZA_CITY_LOCATION = {
  latitude: -3.7899266,
  longitude: -38.588988,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class RestaurantDetail extends Component<Props, State> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  _animatedFlatlistPosition = new Animated.Value(0);
  _animatedFlatlistOpacity = new Animated.Value(1);
  _flatListWidth = 0;

  state = {
    indexMenuSelected: 0,
    userLocation: {
      latitude: FORTALEZA_CITY_LOCATION.latitude,
      longitude: FORTALEZA_CITY_LOCATION.longitude,
    },
  };

  async componentDidMount() {
    const persistedUserLocation = await getItemFromStorage(AppKeys.USER_LOCATION, [0, 0]);
    const { latitude, longitude } = JSON.parse(persistedUserLocation);

    this.requestRestaurantInfo({ latitude, longitude });

    this.setState({
      userLocation: {
        latitude,
        longitude,
      },
    });
  }

  async componentWillUnmount() {
    const { resetState } = this.props;

    await resetState();
  }

  onChangeMenuIndex = (indexSelected: number): void => {
    const { indexMenuSelected } = this.state;

    if (indexMenuSelected === indexSelected) {
      return;
    }

    const animationAppearCombo = Animated.sequence([
      Animated.timing(this._animatedFlatlistPosition, {
        toValue: this._flatListWidth,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(this._animatedFlatlistOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.spring(this._animatedFlatlistPosition, {
        toValue: 0,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]);

    Animated.timing(this._animatedFlatlistOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        indexMenuSelected: indexSelected,
      }, () => animationAppearCombo.start());
    });
  }

  onFlatlistLayout = (event: Object): void => {
    const { width } = event.nativeEvent.layout;
    this._flatListWidth = width;
  }

  getPropsFromNavigation = (): Object => {
    const { navigation } = this.props;
    const params = navigation.getParam('payload', {});

    return {
      ...params,
    };
  }

  getPropsFromRequest = (): Object => {
    const { restaurantInfo } = this.props;
    const { data } = restaurantInfo;

    return {
      ...data,
    };
  }

  requestRestaurantInfo = (userLocation: Object): void => {
    const { getRestaurantRequest } = this.props;
    const { id } = this.getPropsFromNavigation();

    getRestaurantRequest(userLocation, id);
  }

  renderHeaderSection = (): Object => {
    const {
      imageURL,
      name,
      stars,
    } = this.getPropsFromNavigation();

    return (
      <HeaderSection
        restaurantImage={imageURL}
        restaurantName={name}
        stars={stars}
      />
    );
  }

  renderAboutRestaurantSection = () => {
    const { restaurant } = this.getPropsFromRequest();

    if (!restaurant) {
      return;
    }

    const {
      operatingHours,
      description,
      location,
      isOpen,
    } = restaurant;

    return (
      <AboutRestaurantWrapper>
        <AboutRestaurantSection
          operatingHours={operatingHours}
          address={location.address}
          about={description}
          isOpen={isOpen}
        />
      </AboutRestaurantWrapper>
    );
  }

  renderFloatingActionButton = () => {
    const { restaurant } = this.getPropsFromRequest();

    if (!restaurant) {
      return;
    }

    const {
      distance,
      location,
      isOpen,
      stars,
      name,
    } = restaurant;

    const { userLocation } = this.state;
    const { navigation } = this.props;

    const payload = {
      restaurantLocation: {
        id: 'restaurant_location',
        latitude: location.coordinates[0],
        longitude: location.coordinates[1],
      },
      userLocation: {
        ...userLocation,
        id: 'user_location',
      },
      restaurantName: name,
      status: isOpen,
      distance,
      stars,
    };

    return (
      <FloatingActionButtonWrapper>
        <FloatinActionButton
          action={() => navigation.navigate(ROUTE_NAMES.RESTAURANT_ADDRESS_MAP, { payload })}
          name="map-marker-multiple"
          color="yellow"
        />
      </FloatingActionButtonWrapper>
    );
  }

  renderMenuSection = () => {
    const { indexMenuSelected } = this.state;
    const { menu } = this.getPropsFromRequest();

    if (!menu) {
      return;
    }

    const customTabMenu = menu.map(item => ({
      title: item.type[0],
      id: item.type[0],
    }));

    const menuData = menu.map(item => item.dishes);

    return (
      <Menu>
        <CustomTab
          onChangeMenuIndex={this.onChangeMenuIndex}
          contentWidth={appStyles.metrics.width}
          theme="light"
          data={customTabMenu}
        />
        <AnimatedFlatList
          style={{
            padding: appStyles.metrics.smallSize,
            opacity: this._animatedFlatlistOpacity,
            marginLeft: this._animatedFlatlistPosition._value,
            transform: [
              {
                translateX: this._animatedFlatlistPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onLayout={this.onFlatlistLayout}
          data={menuData[indexMenuSelected]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MenuListItem
              description={item.description}
              imageURL={item.imageURL}
              title={item.title}
              reviews={item.reviews}
              price={item.price}
              stars={item.stars}
              type={item.type}
              id={item.id}
            />
          )}
        />
      </Menu>
    );
  }

  render() {
    const { restaurantInfo } = this.props;
    const { loading } = restaurantInfo;

    const Content = (
      <Fragment>
        {this.renderAboutRestaurantSection()}
        {this.renderFloatingActionButton()}
        {this.renderMenuSection()}
      </Fragment>
    );

    return (
      <Container>
        {this.renderHeaderSection()}
        {loading ? <Loading /> : Content}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(RestaurantCreators, dispatch);

const mapStateToProps = state => ({
  restaurantInfo: state.restaurant,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
