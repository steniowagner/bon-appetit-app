// @flow

import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NearbyRestaurantsActions } from 'store/ducks/nearby-restaurants';

import { getItemFromStorage } from 'components/utils/AsyncStoarageManager';
import AppKeys from 'components/utils/Keys';
import Messages from 'components/utils/Messages';

import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/common/CustomTab';
import Map from './Map';
import RestaurantsList from './restaurants-list';

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

class NearYou extends Component<Props, {}> {
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
    }, () => this.onRequestNearbyRestaurants());
  }

  onSelectMarker = (indexRestaurantSelected: number): void => {
    this.setState({
      indexRestaurantSelected,
    });
  }

  getRestaurantsList = (): Array<any> => {
    const { restaurantsFromRequest } = this.props;
    const { loading, data } = restaurantsFromRequest;

    const canShowRestaurants = (!loading && !!data.restaurants);

    const restaurants = (canShowRestaurants ? data.restaurants : []);

    return restaurants;
  }

  renderMap = (): Object => {
    const { indexRestaurantSelected, userLocation } = this.state;
    const restaurants = this.getRestaurantsList();
    const hasRetaurants = restaurants.length > 0;

    return (
      <Map
        userLocation={userLocation}
        onSelectMarker={index => this.onSelectMarker(index)}
        indexLocationSelected={indexRestaurantSelected}
        restaurants={restaurants}
        hasRetaurants={hasRetaurants}
      />
    );
  }

  renderRestaurantsList = (): any => {
    const { indexRestaurantSelected } = this.state;
    const restaurants = this.getRestaurantsList();
    const hasRetaurants = restaurants.length > 0;

    return hasRetaurants && (
      <RestaurantsList
        onSelectMarker={index => this.onSelectMarker(index)}
        indexRestaurantSelected={indexRestaurantSelected}
        restaurants={restaurants}
      />
    );
  }

  renderContent = (): Object => (
    <Fragment>
      <ContentContainer>
        {this.renderMap()}
        {this.renderRestaurantsList()}
      </ContentContainer>
      <CustomTabWrapper>
        <CustomTab
          onChangeMenuIndex={index => this.onDishesTypeChange(index)}
          contentWidth={appStyle.metrics.width}
          data={customTabData}
          theme="dark"
        />
      </CustomTabWrapper>
    </Fragment>
  );

  render() {
    const { restaurantsFromRequest } = this.props;
    const { error, loading } = restaurantsFromRequest;

    return (
      <Container>
        {error ? alert(Messages.ERROR_MESSAGE) : this.renderContent(loading)}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(NearbyRestaurantsActions, dispatch);

const mapStateToProps = state => ({
  restaurantsFromRequest: state.nearbyRestaurants,
});

export default connect(mapStateToProps, mapDispatchToProps)(NearYou);
