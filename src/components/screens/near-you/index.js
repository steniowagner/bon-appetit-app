// @flow

import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import { Creators as NearbyRestaurantsActions } from 'store/ducks/nearby-restaurants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getItemFromStorage } from 'components/utils/AsyncStoarageManager';
import AppKeys from 'components/utils/Keys';
import Messages from 'components/utils/Messages';

import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/common/CustomTab';
import RestaurantsList from './restaurants-list';
import Map from './Map';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const CustomTabWrapper = styled(View)`
  position: absolute;
`;

const customTabData = [{
  title: 'Pizzas',
  id: 'Pizza',
}, {
  title: 'Barbecue',
  id: 'Barbecue',
}, {
  title: 'Desserts',
  id: 'Dessert',
}, {
  title: 'Pasta',
  id: 'Pasta',
}, {
  title: 'Fast-Food',
  id: 'Fast-Food',
}, {
  title: 'Homemade',
  id: 'Homemade',
}, {
  title: 'Japanese',
  id: 'Japanese',
}, {
  title: 'Salads',
  id: 'Salad',
}, {
  title: 'Seafood',
  id: 'Seafood',
}];

const FORTALEZA_CITY_LOCATION = {
  latitude: -3.7899266,
  longitude: -38.588988,
};

type Props = {
  getNearbyRestaurantsRequest: Function,
  restaurantsFromRequest: Object,
};

type State = {
  indexDishesTypeSelected: number,
  indexRestaurantSelected: number,
  restaurantsCached: Array<any>,
  userLocation: Object,
};

class NearYou extends Component<Props, State> {
  static navigationOptions = {
    title: 'Near You',
    headerStyle: {
      backgroundColor: appStyle.colors.primaryColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerBackTitle: null,
    headerTintColor: appStyle.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyle.colors.defaultWhite,
      fontFamily: 'CircularStd-Bold',
    },
  };

  state = {
    userLocation: {
      latitude: FORTALEZA_CITY_LOCATION.latitude,
      longitude: FORTALEZA_CITY_LOCATION.longitude,
    },
    indexDishesTypeSelected: 0,
    indexRestaurantSelected: 0,
    restaurantsCached: [],
  };

  async componentDidMount() {
    const { userLocation } = this.state;
    const persistedUserLocation = await getItemFromStorage(AppKeys.USER_LOCATION, [userLocation.latitude, userLocation.longitude]);
    const { latitude, longitude } = JSON.parse(persistedUserLocation);

    this.setState({
      userLocation: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    }, () => this.onRequestNearbyRestaurants());
  }

  componentWillReceiveProps(nextProps) {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;
    const { restaurantsFromRequest } = nextProps;
    const { restaurants } = restaurantsFromRequest.data;

    const cached = Object.assign([], restaurantsCached, { [indexDishesTypeSelected]: restaurants });

    this.setState({
      restaurantsCached: cached,
    });
  }

  onRequestNearbyRestaurants = (): void => {
    const { getNearbyRestaurantsRequest } = this.props;

    const { indexDishesTypeSelected } = this.state;
    const dishesSelected = customTabData[indexDishesTypeSelected].id;

    const { userLocation } = this.state;

    getNearbyRestaurantsRequest(dishesSelected, userLocation);
  }

  onDishesTypeChange = (indexDishesTypeSelected: number): void => {
    this.setState({
      indexDishesTypeSelected,
      indexRestaurantSelected: 0,
    }, () => {
      const isRestaurantsCached = this.isRestaurantsCached();

      if (!isRestaurantsCached) {
        this.onRequestNearbyRestaurants();
      }
    });
  }

  onSelectMarker = (indexRestaurantSelected: number): void => {
    this.setState({
      indexRestaurantSelected,
    });
  }

  getRestaurantsFromRequest = (): Array<any> => {
    const { restaurantsFromRequest } = this.props;
    const { loading, data } = restaurantsFromRequest;

    const canShowRestaurants = (!loading && !!data.restaurants);

    const restaurants = (canShowRestaurants ? data.restaurants : []);

    return restaurants;
  }

  getRestaurantsFromCache = (): Array<any> => {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;

    return restaurantsCached[indexDishesTypeSelected];
  }

  getRestaurantsList = (): Array<any> => {
    const isRestaurantsCached = this.isRestaurantsCached();

    const restaurants = isRestaurantsCached ? this.getRestaurantsFromCache() : this.getRestaurantsFromRequest();

    return restaurants;
  }

  isRestaurantsCached = () => {
    const { indexDishesTypeSelected, restaurantsCached } = this.state;

    const isCached = restaurantsCached[indexDishesTypeSelected];

    return !!isCached;
  }

  renderMap = (restaurants: Array<Object>, indexRestaurantSelected: number): Object => {
    const { userLocation } = this.state;

    return (
      <Map
        onSelectMarker={index => this.onSelectMarker(index)}
        indexLocationSelected={indexRestaurantSelected}
        userLocation={userLocation}
        restaurants={restaurants}
      />
    );
  }

  renderRestaurantsList = (restaurants: Array<Object>, indexRestaurantSelected: number): Object => (
    <RestaurantsList
      onSelectMarker={index => this.onSelectMarker(index)}
      indexRestaurantSelected={indexRestaurantSelected}
      restaurants={restaurants}
    />
  );

  renderContent = (): Object => {
    const restaurants = this.getRestaurantsList();
    const hasRetaurants = restaurants.length > 0;

    const { indexRestaurantSelected } = this.state;

    return (
      <Fragment>
        <ContentContainer>
          {this.renderMap(restaurants, indexRestaurantSelected)}
          {hasRetaurants && this.renderRestaurantsList(restaurants, indexRestaurantSelected)}
        </ContentContainer>
        <CustomTabWrapper>
          <CustomTab
            onChangeMenuIndex={index => this.onDishesTypeChange(index)}
            contentWidth={appStyle.metrics.width}
            data={customTabData}
            theme="red"
          />
        </CustomTabWrapper>
      </Fragment>
    );
  }

  render() {
    const { restaurantsFromRequest } = this.props;
    const { error } = restaurantsFromRequest;

    return (
      <Container>
        {error ? alert(Messages.ERROR_MESSAGE) : this.renderContent()}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(NearbyRestaurantsActions, dispatch);

const mapStateToProps = state => ({
  restaurantsFromRequest: state.nearbyRestaurants,
});

export default connect(mapStateToProps, mapDispatchToProps)(NearYou);
