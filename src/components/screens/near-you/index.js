// @flow

import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NearbyRestaurantsActions } from 'store/ducks/nearby-restaurants';

import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/common/CustomTab';
import Map from './Map';
import RestaurantList from './restaurant-list';

const ERROR_MESSAGE = 'Something gets wrong. Please, check your connection with the server.';

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
  title: 'Pizza',
}, {
  title: 'Salad',
}, {
  title: 'Dessert',
}, {
  title: 'Japanese',
}];

const USER_LOCATION = {
  latitude: -3.7193101,
  longitude: -38.5892672,
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
    indexDishesTypeSelected: 0,
    indexRestaurantSelected: 0,
  };

  componentDidMount() {
    this.onRequestNearbyRestaurants();
  }

  onRequestNearbyRestaurants = (): void => {
    const { getNearbyRestaurantsRequest } = this.props;

    const { indexDishesTypeSelected } = this.state;
    const dishesSelected = customTabData[indexDishesTypeSelected].title;

    getNearbyRestaurantsRequest(dishesSelected, USER_LOCATION);
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

  getRestaurantList = (): Array<any> => {
    const { restaurantsFromRequest } = this.props;
    const { loading, data } = restaurantsFromRequest;

    const canShowRestaurants = (!loading && !!data.restaurants);

    const restaurants = (canShowRestaurants ? data.restaurants : []);

    return restaurants;
  }

  renderMap = (): Object => {
    const { indexRestaurantSelected } = this.state;
    const restaurants = this.getRestaurantList();
    const hasRetaurants = restaurants.length > 0;

    return (
      <Map
        userLocation={USER_LOCATION}
        onSelectMarker={index => this.onSelectMarker(index)}
        indexLocationSelected={indexRestaurantSelected}
        restaurants={restaurants}
        hasRetaurants={hasRetaurants}
      />
    );
  }

  renderRestaurantsList = (): any => {
    const { indexRestaurantSelected } = this.state;
    const restaurants = this.getRestaurantList();
    const hasRetaurants = restaurants.length > 0;

    return hasRetaurants && (
      <RestaurantList
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
    const { error } = restaurantsFromRequest;

    return (
      <Container>
        {error ? alert(ERROR_MESSAGE) : this.renderContent()}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(NearbyRestaurantsActions, dispatch);

const mapStateToProps = state => ({
  restaurantsFromRequest: state.nearbyRestaurants,
});

export default connect(mapStateToProps, mapDispatchToProps)(NearYou);
