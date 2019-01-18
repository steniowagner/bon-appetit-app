// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as NearbyRestaurantsActions } from '~/store/ducks/nearby-restaurants';

import { getItemFromStorage } from '~/utils/AsyncStoarageManager';
import dishesTypesItems from './dishesTypesItems';
import CONSTANTS from '~/utils/CONSTANTS';

import NearYouComponent from './components/NearYou';

type Props = {
  requestNearbyRestaurants: Function,
  nearbyRestaurants: Object,
};

type State = {
  restaurantsCached: Array<Object>,
  indexDishesTypeSelected: number,
  indexRestaurantSelected: number,
  userLocation: Object,
};

class NearYouContainer extends Component<Props, State> {
  state = {
    userLocation: {
      latitude: CONSTANTS.FORTALEZA_CITY_LOCATION.latitude,
      longitude: CONSTANTS.FORTALEZA_CITY_LOCATION.longitude,
    },
    indexDishesTypeSelected: 0,
    indexRestaurantSelected: 0,
    restaurantsCached: [],
  };

  async componentDidMount() {
    const { userLocation } = this.state;

    const persistedUserLocation = await getItemFromStorage(
      CONSTANTS.USER_LOCATION,
      [userLocation.latitude, userLocation.longitude],
    );

    const { latitude, longitude } = JSON.parse(persistedUserLocation);

    this.setState(
      {
        userLocation: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      },
      () => this.onRequestNearbyRestaurants(),
    );
  }

  componentWillReceiveProps(nextProps) {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;
    const { nearbyRestaurants } = nextProps;
    const { restaurants } = nearbyRestaurants.data;

    const cached = Object.assign([], restaurantsCached, {
      [indexDishesTypeSelected]: restaurants,
    });

    this.setState({
      restaurantsCached: cached,
    });
  }

  onRequestNearbyRestaurants = (): void => {
    const { indexDishesTypeSelected, userLocation } = this.state;
    const { requestNearbyRestaurants } = this.props;

    const dishSelected = dishesTypesItems[indexDishesTypeSelected].id;

    requestNearbyRestaurants(dishSelected, userLocation);
  };

  onDishesTypeChange = (indexDishesTypeSelected: number): void => {
    const handleRestaurantsSelection = () => {
      const isRestaurantsCached = this.isRestaurantsCached();

      if (!isRestaurantsCached) {
        this.onRequestNearbyRestaurants();
      }
    };

    this.setState(
      {
        indexDishesTypeSelected,
        indexRestaurantSelected: 0,
      },
      () => handleRestaurantsSelection(),
    );
  };

  onSelectMarker = (indexRestaurantSelected: number): void => {
    this.setState({
      indexRestaurantSelected,
    });
  };

  getnearbyRestaurants = (): Array<Object> => {
    const { nearbyRestaurants } = this.props;
    const { loading, data } = nearbyRestaurants;

    const canShowRestaurants = !loading && !!data.restaurants;

    const restaurants = canShowRestaurants ? data.restaurants : [];

    return restaurants;
  };

  getRestaurantsFromCache = (): Object => {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;

    return restaurantsCached[indexDishesTypeSelected];
  };

  getRestaurantsList = (): mixed => {
    const isRestaurantsCached = this.isRestaurantsCached();

    const restaurants = isRestaurantsCached
      ? this.getRestaurantsFromCache()
      : this.getnearbyRestaurants();

    return restaurants;
  };

  isRestaurantsCached = (): boolean => {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;

    const isCached = restaurantsCached[indexDishesTypeSelected];

    return !!isCached;
  };

  render() {
    const { indexRestaurantSelected, userLocation } = this.state;

    const restaurants = this.getRestaurantsList();

    return (
      <NearYouComponent
        indexRestaurantSelected={indexRestaurantSelected}
        onDishesTypeChange={this.onDishesTypeChange}
        onSelectMarker={this.onSelectMarker}
        dishesTypesItems={dishesTypesItems}
        userLocation={userLocation}
        restaurants={restaurants}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(NearbyRestaurantsActions, dispatch);

const mapStateToProps = state => ({
  nearbyRestaurants: state.nearbyRestaurants,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearYouContainer);
