// @flow

import React, { Component, Fragment } from 'react';
import { View, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NearbyRestaurantsActions } from 'store/ducks/nearby-restaurants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/common/CustomTab';
import RestaurantItemList from './RestaurantItemList';

const ERROR_MESSAGE = 'Something gets wrong. Please, check your connection with the server.';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const RestaurantsListWrapper = styled(View)`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  position: absolute;
`;

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
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

const INITIAL_REGION = {
  latitude: -3.7166596,
  longitude: -38.5914,
  latitudeDelta: 0.03152,
  longitudeDelta: 0.0100,
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
    dishesTypeSelectedIndex: 0,
  };

  componentDidMount() {
    this.requestNearbyRestaurants();
  }

  componentDidUpdate() {
    this.focusOnFirstRestaurant();
  }

  onDishesTypeChange = (dishesTypeSelectedIndex: number): void => {
    this.setState({
      dishesTypeSelectedIndex,
    }, () => this.requestNearbyRestaurants());
  }

  onSelectMarker = (markerIndex: number): void => {
    this._flatListRef.scrollToIndex({ animated: true, index: markerIndex });
  }

  onMomentumScrollEnd = (event: Object): void => {
    const { contentOffset } = event.nativeEvent;

    const { restaurantsFromRequest } = this.props;
    const { data } = restaurantsFromRequest;

    const isHorizontalSwipeMovement = contentOffset.x > 0;
    const indexItemSelected = (isHorizontalSwipeMovement ? (Math.ceil(contentOffset.x / appStyle.metrics.width)) : 0);

    const { location } = data.restaurants[indexItemSelected];
    const marker = this._markersRefs[indexItemSelected];

    this.animateMapToCoordinates(location.latitude, location.longitude, marker);
  }

  getRestaurantList = (): Array<any> => {
    const { restaurantsFromRequest } = this.props;
    const { loading, data } = restaurantsFromRequest;

    const canShowRestaurants = (!loading && !!data.restaurants);

    const restaurants = (canShowRestaurants ? data.restaurants : []);

    return restaurants;
  }

  requestNearbyRestaurants = (): void => {
    const { getNearbyRestaurantsRequest } = this.props;

    const { dishesTypeSelectedIndex } = this.state;
    const dishesSelected = customTabData[dishesTypeSelectedIndex].title;

    getNearbyRestaurantsRequest(dishesSelected, USER_LOCATION);
  }

  focusOnFirstRestaurant = (): void => {
    const restaurants = this.getRestaurantList();
    const hasRetaurants = restaurants.length > 0;

    if (hasRetaurants) {
      const { latitude, longitude } = restaurants[0].location;

      this._mapRef.animateToCoordinate({
        latitude,
        longitude,
      }, 500);

      this._markersRefs[0].showCallout();
    }
  }

  animateMapToCoordinates = (latitude: number, longitude: number, marker: Object): void => {
    this._mapRef.animateToCoordinate({
      latitude,
      longitude,
    }, 500);

    setTimeout(() => {
      marker.showCallout();
    }, 500);
  }

  renderMap = (): Object => {
    const restaurants = this.getRestaurantList();
    const hasRetaurants = restaurants.length > 0;

    if (hasRetaurants) {
      this._markersRefs = [restaurants.length];
    }

    return (
      <MapContainer
        innerRef={(ref) => { this._mapRef = ref; }}
        initialRegion={{ ...INITIAL_REGION }}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        {
          hasRetaurants && restaurants.map((restaurant, index) => {
            const {
              name,
              description,
              location,
              id,
            } = restaurant;

            return (
              <Marker
                ref={(marker) => { this._markersRefs[index] = marker; }}
                onPress={() => this.onSelectMarker(index)}
                title={name}
                description={description}
                key={id}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <Icon
                  name="map-marker-radius"
                  size={30}
                  width={30}
                  height={30}
                  color={appStyle.colors.green}
                />
              </Marker>
            );
          })
         }
      </MapContainer>
    );
  }

  renderRestaurantsList = (): void => {
    const restaurants = this.getRestaurantList();
    const hasRetaurants = restaurants.length > 0;

    return hasRetaurants && (
      <RestaurantsListWrapper>
        <FlatList
          ref={(ref) => { this._flatListRef = ref; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => this.onMomentumScrollEnd(event)}
          data={restaurants}
          keyExtractor={item => item.id}
          extraData={this.state}
          pagingEnabled
          renderItem={({ item, index }) => (
            <RestaurantItemList
              isFirst={index === 0}
              isLast={index === restaurants.length - 1}
              id={item.id}
              name={item.name}
              distance={item.distance}
              imageURL={item.imageURL}
              stars={item.stars}
              isOpen={item.isOpen}
            />
          )}
        />
      </RestaurantsListWrapper>
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
          contentWidth={appStyle.metrics.width}
          onChangeMenuIndex={index => this.onDishesTypeChange(index)}
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
