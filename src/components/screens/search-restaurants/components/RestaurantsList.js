// @flow

import React, { Component } from 'react';
import {
  Animated, FlatList, Text, View,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

import RestaurantListItem from '~/components/common/RestaurantListItem';

const ListWrapper = styled(View)`
  width: 100%;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const NumberRestaurantsFound = styled(Text)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Bold;
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  onSearchRestaurants: Function,
  restaurants: Array<Object>,
};

class RestaurantList extends Component<Props, {}> {
  _restaurantListMarginTop = new Animated.Value(0);
  _restaurantListHeight = 0;

  componentDidMount() {
    this.handleListAnimation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleListAnimation(nextProps);
  }

  handleListAnimation = ({
    isRequestingNewData,
    dishesTypes,
    maxDistance,
  }: Props): void => {
    if (isRequestingNewData) {
      this.hideRestaurantsList(dishesTypes, maxDistance);
    } else {
      this.showRestaurantList();
    }
  };

  hideRestaurantsList = (
    dishesTypes: Array<string>,
    maxDistance: number,
  ): void => {
    const { onSearchRestaurants } = this.props;

    Animated.timing(this._restaurantListMarginTop, {
      toValue: this._restaurantListHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => onSearchRestaurants(dishesTypes, maxDistance));
  };

  showRestaurantList = (): void => {
    Animated.timing(this._restaurantListMarginTop, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { restaurants } = this.props;

    return (
      <ListWrapper>
        <AnimatedFlatList
          style={{
            marginTop: this._restaurantListMarginTop._value,
            transform: [
              {
                translateY: this._restaurantListMarginTop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
          onLayout={(event: Object): void => {
            const { height } = event.nativeEvent.layout;
            this._restaurantListHeight = height;
          }}
          ListHeaderComponent={() => !!restaurants
            && restaurants.length > 0 && (
              <NumberRestaurantsFound>
                {`${restaurants.length} ${
                  restaurants.length > 1
                    ? 'Restaurants found'
                    : 'Restaurant found'
                }`}
              </NumberRestaurantsFound>
          )
          }
          renderItem={({ item }) => (
            <RestaurantListItem
              address={item.location.address}
              imageURL={item.mediumImageURL}
              stars={item.stars}
              name={item.name}
              id={item.id}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={restaurants}
        />
      </ListWrapper>
    );
  }
}

export default withNavigation(RestaurantList);
