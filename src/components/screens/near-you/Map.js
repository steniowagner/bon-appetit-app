import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const CustomMarker = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.green,
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
  hasRetaurants: boolean,
  userLocation: Object,
};

class Map extends Component<Props, {}> {
  componentDidUpdate() {
    this.animateToLocation();
  }

  animateToLocation = (): void => {
    const { indexLocationSelected, restaurants, hasRetaurants } = this.props;

    if (!hasRetaurants) {
      return;
    }

    const { latitude, longitude } = restaurants[indexLocationSelected].location;

    this._mapRef.animateToCoordinate({
      latitude,
      longitude,
    }, 500);

    this._markersRefs[indexLocationSelected].showCallout();
  }

  render() {
    const {
      restaurants,
      hasRetaurants,
      onSelectMarker,
      userLocation,
    } = this.props;

    this._markersRefs = [restaurants.length];

    const markers = [...restaurants, {
      id: 'user-location',
      name: 'Your Position',
      description: 'You\'re here',
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    }];

    const initialRegion = {
      ...userLocation,
      latitudeDelta: 0.03152,
      longitudeDelta: 0.0100,
    };

    return (
      <MapContainer
        innerRef={(ref) => { this._mapRef = ref; }}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {
          hasRetaurants && markers.map((restaurant, index) => {
            const {
              name,
              description,
              location,
              id,
            } = restaurant;

            const iconName = (id === 'user-location' ? 'account-location' : 'map-marker-radius');

            return (
              <Marker
                ref={(marker) => { this._markersRefs[index] = marker; }}
                onPress={() => {
                  if (id !== 'user-location') {
                    onSelectMarker(index);
                  }
                }}
                key={id}
                title={name}
                description={description}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <CustomMarker
                  name={iconName}
                />
              </Marker>
            );
          })
        }
      </MapContainer>
    );
  }
}

export default Map;
