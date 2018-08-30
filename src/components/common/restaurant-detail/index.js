// @flow

import React, { Component } from 'react';
import { View, FlatList, Animated } from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';

import CustomTab from 'components/common/CustomTab';
import FloatinActionButton from 'components/common/FloatingActionButton';
import HeaderSection from './components/HeaderSection';
import AboutRestaurantSection from './components/AboutRestaurantSection';
import MenuListItem from './components/MenuListItem';

import data from './test-data';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Menu = styled(View)`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const AboutRestaurantWrapper = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('20%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-items: flex-end;
  position: absolute;
`;

type Props = {
  navigation: Function,
};

type State = {
  indexMenuSelected: number,
  isDataFetched: boolean,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const menu = [{
  id: '1',
  title: 'Pizzas',
}, {
  id: '2',
  title: 'Churrascos',
}, {
  id: '3',
  title: 'Saladas',
}, {
  id: '4',
  title: 'Oriental',
}];

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
    isDataFetched: true,
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
        bounciness: 8,
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

  renderMenuSection = () => {
    const { indexMenuSelected, isDataFetched } = this.state;

    return (
      <Menu>
        {isDataFetched && (
          <CustomTab
            data={menu}
            theme="light"
            contentWidth={appStyles.metrics.width}
            onChangeMenuIndex={this.onChangeMenuIndex}
          />
        )}
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
          data={data[indexMenuSelected]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MenuListItem
              isDataFetched={isDataFetched}
              foodImageURL={item.foodImageURL}
              foodTitle={item.foodTitle}
              foodDescription={item.foodDescription}
              price={item.price}
              stars={item.stars}
            />
          )}
        />
      </Menu>
    );
  }

  renderAboutRestaurantSection = () => {
    const { isDataFetched } = this.state;
    const { navigation } = this.props;
    const { address } = navigation.getParam('payload', {});

    return (
      <AboutRestaurantWrapper>
        <AboutRestaurantSection
          address={address}
          status="Aberto agora (até às 23:30)"
          about="Gastronomia requintada de carnes nobres argentinas, ambiente chique e intimista convidativo a longas estadias."
          isDataFetched={isDataFetched}
        />
      </AboutRestaurantWrapper>
    );
  }

  renderFloatingActionButton = () => {
    const { navigation } = this.props;
    const { isDataFetched } = this.state;

    return isDataFetched
    && (
      <FloatingActionButtonWrapper>
        <FloatinActionButton
          name="map-marker-multiple"
          color="yellow"
          action={() => navigation.navigate(ROUTE_NAMES.RESTAURANT_ADDRESS_MAP, {
            payload: {
              restaurantName: 'Cabãna del Primo',
              userLocation: {
                id: 'user_location',
                latitude: -3.7195263,
                longitude: -38.589332,
              },
              restaurantLocation: {
                id: 'restaurant_location',
                latitude: -3.7138213,
                longitude: -38.5886952,
              },
              distance: 4,
              status: 'open',
            },
          })}
        />
      </FloatingActionButtonWrapper>
    );
  }

  render() {
    const { navigation } = this.props;
    const {
      name,
      stars,
      picURL,
    } = navigation.getParam('payload', {});

    return (
      <Container>
        <HeaderSection
          restaurantImage={picURL}
          restaurantName={name}
          reviews={18}
          stars={stars}
        />
        {this.renderAboutRestaurantSection()}
        {this.renderFloatingActionButton()}
        {this.renderMenuSection()}
      </Container>
    );
  }
}

export default RestaurantDetail;
