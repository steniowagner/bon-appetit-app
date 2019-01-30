// @flow

import React, { Component, Fragment } from 'react';
import {
  StatusBar, FlatList, Animated, View,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

import FloatinActionButton from '~/components/common/FloatingActionButton';
import { Alert, TYPES } from '~/components/common/alert';
import CustomTab from '~/components/common/CustomTab';
import Loading from '~/components/common/Loading';

import AboutRestaurant from './components/AboutRestaurant';
import MenuListItem from './components/MenuListItem';
import Header from './components/Header';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  flex: 1;
`;

const Menu = styled(View)`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  position: absolute;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  userLocation: Object,
  navigation: Function,
  loading: boolean,
  error: boolean,
  data: Object,
};

type State = {
  indexMenuSelected: number,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class RestaurantDetail extends Component<Props, State> {
  _animatedFlatlistPosition = new Animated.Value(0);
  _animatedFlatlistOpacity = new Animated.Value(1);
  _flatListWidth = 0;

  state = {
    indexMenuSelected: 0,
  };

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
      this.setState(
        {
          indexMenuSelected: indexSelected,
        },
        () => animationAppearCombo.start(),
      );
    });
  };

  renderHeaderSection = (
    imageURL: string,
    thumbnailImageURL: string,
  ): Object => (
    <Header
      thumbnailImageURL={thumbnailImageURL}
      imageURL={imageURL}
    />
  );

  renderAboutRestaurantSection = (restaurantInfo: Object) => (
    <AboutRestaurant
      {...restaurantInfo}
      address={restaurantInfo.location.address}
    />
  );

  renderFloatingActionButton = (restaurant: Object, userLocation: Object) => {
    const {
      distance, location, isOpen, name,
    } = restaurant;

    const { navigation } = this.props;

    const mapParams = {
      restaurantLocation: {
        id: 'restaurant_location',
        latitude: location.coordinates[0],
        longitude: location.coordinates[1],
      },
      userLocation: {
        ...userLocation,
        id: 'user_location',
      },
      status: isOpen,
      distance,
    };

    return (
      <FloatingActionButtonWrapper>
        <FloatinActionButton
          action={() => navigation.navigate(CONSTANTS.ROUTE_RESTAURANT_ADDRESS_MAP, {
            [CONSTANTS.NAVIGATION_PARAM_USER_LOCATION]: mapParams,
            [CONSTANTS.NAVIGATION_PARAM_RESTAURANT_NAME]: name,
          })
          }
          name="map-outline"
          color="primaryColor"
        />
      </FloatingActionButtonWrapper>
    );
  };

  renderMenuSection = (menu: Array<Object>): Object => {
    const { indexMenuSelected } = this.state;

    const tabMenu = menu.map(item => ({
      title: item.type,
      id: item.type,
    }));

    const menuData = menu.map(item => item.dishes);
    const contentWidth = appStyles.metrics.width - 2 * appStyles.metrics.largeSize;

    return (
      <Menu>
        <CustomTab
          onChangeMenuIndex={this.onChangeMenuIndex}
          contentWidth={contentWidth}
          data={tabMenu}
          theme="gray"
        />
        <AnimatedFlatList
          style={{
            transform: [
              {
                translateX: this._animatedFlatlistPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            marginLeft: this._animatedFlatlistPosition._value,
            paddingVertical: appStyles.metrics.smallSize,
            opacity: this._animatedFlatlistOpacity,
          }}
          renderItem={({ item }) => (
            <MenuListItem
              description={item.description}
              imageURL={item.imageURL}
              reviews={item.reviews}
              title={item.title}
              price={item.price}
              stars={item.stars}
              type={item.type}
              id={item.id}
            />
          )}
          showsHorizontalScrollIndicator={false}
          data={menuData[indexMenuSelected]}
          onLayout={(event: Object): void => {
            const { width } = event.nativeEvent.layout;
            this._flatListWidth = width;
          }}
          keyExtractor={item => item.id}
          horizontal
        />
      </Menu>
    );
  };

  render() {
    const {
      userLocation, loading, error, data,
    } = this.props;

    const shouldShowContent = !loading && !error && Object.keys(data).length === 2;

    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle={error || loading ? 'dark-content' : 'light-content'}
          translucent
          animated
        />
        {loading && <Loading />}
        {error && (
          <Alert
            type={TYPES.ERROR_SERVER_CONNECTION}
            withExtraTopPadding
          />
        )}
        {shouldShowContent && (
          <Fragment>
            {this.renderHeaderSection(
              data.restaurant.imageURL,
              data.restaurant.thumbnailImageURL,
            )}
            {this.renderAboutRestaurantSection(data.restaurant)}
            {this.renderFloatingActionButton(data.restaurant, userLocation)}
            {this.renderMenuSection(data.menu)}
          </Fragment>
        )}
      </Container>
    );
  }
}

export default withNavigation(RestaurantDetail);
