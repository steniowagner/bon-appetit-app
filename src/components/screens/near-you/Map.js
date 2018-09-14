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
  userLocation: Object,
};

class Map extends Component<Props, {}> {
  componentDidMount() {
    this.animateToLocation();
  }

  componentDidUpdate() {
    this.animateToLocation();
  }

  animateToLocation = (): void => {
    const { indexLocationSelected, restaurants } = this.props;
    const hasRestaurants = restaurants.length > 0;

    if (!hasRestaurants) {
      return;
    }

    const { latitude, longitude } = restaurants[indexLocationSelected].location;

    this._mapRef.animateToCoordinate({
      latitude,
      longitude,
    }, 500);

    const isMarkerLoaded = !!this._markersRefs[indexLocationSelected].props;

    if (isMarkerLoaded) {
      setTimeout(() => {
        this._markersRefs[indexLocationSelected].showCallout();
      }, 1000);
    }
  }

  render() {
    const {
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
        innerRef={(ref) => { this._mapRef = ref; }}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {
          markers.map((marker, index) => {
            const {
              name,
              description,
              location,
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
