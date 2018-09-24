import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const CustomMarker = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.primaryColor,
  name: ({ name }) => name,
  size: 30,
})`
  width: 30px;
  height: 30px;
`;

type Props = {
  indexLocationSelected: number,
  restaurants: Array<Object>,
  onSelectMarker: Function,
  userLocation: Object,
};

class Map extends Component<Props, {}> {
  componentDidUpdate() {
    const { indexLocationSelected, restaurants } = this.props;

    this.animateToLocation(indexLocationSelected, restaurants);
  }

  animateToLocation = (indexLocationSelected: number, restaurants: Array<Object>): void => {
    if (restaurants.length === 0) {
      return;
    }

    const { latitude, longitude } = restaurants[indexLocationSelected].location;

    this._mapRef.animateToCoordinate({
      latitude,
      longitude,
    }, 500);

    setTimeout(() => {
      const isMarkerSet = this._markersRefs[indexLocationSelected];
      if (isMarkerSet) {
        this._markersRefs[indexLocationSelected].showCallout();
      }
    }, 1000);
  };

  renderMarkers = (markers: Array<Object>, onSelectMarker: Function): Object => (
    <Fragment>
      {
        markers.map((marker, index) => {
          const {
            description,
            location,
            name,
            id,
          } = marker;

          const iconName = (id === 'user-location' ? 'account-location' : 'map-marker-radius');

          return (
            <Marker
              ref={(markerRef) => { this._markersRefs[index] = markerRef; }}
              onPress={() => {
                if (id !== 'user-location') {
                  onSelectMarker(index);
                }
              }}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              description={description}
              title={name}
              key={id}
            >
              <CustomMarker
                name={iconName}
              />
            </Marker>
          );
        })
      }
    </Fragment>
  );

  render() {
    const {
      indexLocationSelected,
      onSelectMarker,
      userLocation,
      restaurants,
    } = this.props;

    const userLocationMarker = {
      description: 'You\'re here',
      name: 'Your Position',
      id: 'user-location',
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    };

    const markers = [...restaurants, userLocationMarker];

    this._markersRefs = [markers.length];

    const initialRegion = {
      ...userLocation,
      latitudeDelta: 0.01152,
      longitudeDelta: 0.0100,
    };

    return (
      <MapContainer
        onMapReady={() => this.animateToLocation(indexLocationSelected, restaurants)}
        innerRef={(ref) => { this._mapRef = ref; }}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {(markers.length > 1) && this.renderMarkers(markers, onSelectMarker)}
      </MapContainer>
    );
  }
}

export default Map;
