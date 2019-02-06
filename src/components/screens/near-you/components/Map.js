// @flow

import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const CustomMarker = styled(Icon).attrs(({ name }) => ({
  size: 30,
  name,
}))`
  color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  indexLocationSelected: number,
  restaurants: Array<Object>,
  onSelectMarker: Function,
  userLocation: Object,
};

class Map extends Component<Props, {}> {
  _markersRefs: any = [];
  _mapRef: any = null;

  componentDidUpdate() {
    const { indexLocationSelected, restaurants } = this.props;

    this.animateToLocation(indexLocationSelected, restaurants);
  }

  getUserLocationMarker = (userLocation: Object): Object => ({
    description: "You're here",
    name: 'Your Position',
    id: 'user-location',
    location: {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    },
  });

  getInitialRegion = (userLocation: Object): Object => ({
    ...userLocation,
    latitudeDelta: 0.01152,
    longitudeDelta: 0.01,
  });

  animateToLocation = (
    indexLocationSelected: number,
    restaurants: Array<Object>,
  ): void => {
    if (!restaurants[indexLocationSelected] || restaurants.length === 0) {
      return;
    }

    const { latitude, longitude } = restaurants[indexLocationSelected].location;

    this._mapRef.animateToCoordinate(
      {
        latitude,
        longitude,
      },
      500,
    );

    setTimeout(() => {
      const isMarkerSet = typeof this._markersRefs[indexLocationSelected].showCallout
        === 'function';

      if (isMarkerSet) {
        this._markersRefs[indexLocationSelected].showCallout();
      }
    }, 1000);
  };

  renderMarkers = (
    markers: Array<Object>,
    onSelectMarker: Function,
  ): Object => (
    <Fragment>
      {markers.map((marker, index) => {
        const { location, name, id } = marker;

        const iconName = id === 'user-location' ? 'account-location' : 'map-marker-radius';

        return (
          <Marker
            ref={(markerRef) => {
              this._markersRefs[index] = markerRef;
            }}
            onPress={() => id !== 'user-location' && onSelectMarker(index)}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={name}
            key={id}
          >
            <CustomMarker
              name={iconName}
            />
          </Marker>
        );
      })}
    </Fragment>
  );

  render() {
    const {
      indexLocationSelected,
      onSelectMarker,
      userLocation,
      restaurants,
    } = this.props;

    const userLocationMarker = this.getUserLocationMarker(userLocation);
    const initialRegion = this.getInitialRegion(userLocation);

    const markers = [...restaurants, userLocationMarker];
    this._markersRefs = [markers.length];

    return (
      <MapContainer
        onMapReady={() => this.animateToLocation(indexLocationSelected, restaurants)
        }
        ref={(ref) => {
          this._mapRef = ref;
        }}
        showsPointsOfInterest={false}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {markers.length > 0 && this.renderMarkers(markers, onSelectMarker)}
      </MapContainer>
    );
  }
}

export default Map;
