// @flow

import React from 'react';
import {
  StatusBar, Platform, Text, View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components';

import FloatinActionButton from '~/components/common/FloatingActionButton';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const mapHeight = appStyles.metrics.getHeightFromDP('75%');

const Container = styled(View)`
  flex: 1;
`;

const MapContainer = styled(View)`
  width: 100%;
  height: ${mapHeight};
`;

const FloatingActionButtonWrapper = styled(View)`
  align-self: flex-end;
  position: absolute;
  margin-top: ${mapHeight - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FooterContainer = styled(View)`
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: ${appStyles.metrics.mediumSize}px;
  padding-left: ${appStyles.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StatusText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '5%' : '4.5%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
  font-family: CircularStd-Black;
`;

const EstablishmentStatus = styled(Text)`
  color: ${({ theme }) => theme.colors.darkLayer};
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  font-family: CircularStd-Medium;
`;

const MarkerIcon = styled(Icon).attrs(({ name }) => ({
  size: 28,
  name,
}))`
  color: ${({ theme }) => theme.colors.primaryColor};
`;

const ASPECT_RATIO = appStyles.metrics.width / appStyles.metrics.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
  latitude: -3.7900894,
  longitude: -38.6590335,
};

const edgePadding = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};

let _restaurantMarkerRef: Object;
let _userMarkerRef: Object;
let _mapRef: Object;

const onFitMapCoordinates = (markers: Array<Object>): void => {
  _mapRef.fitToCoordinates(markers, {
    animated: true,
    edgePadding,
  });
};

const renderMap = (restaurantName: string, markers: Array<Object>): Object => (
  <MapContainer>
    <MapView
      onMapReady={() => onFitMapCoordinates(markers)}
      style={{ width: '100%', height: '100%' }}
      initialRegion={{
        latitude: INITIAL_REGION.latitude,
        longitude: INITIAL_REGION.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      ref={(ref) => {
        _mapRef = ref;
      }}
      showsPointsOfInterest={false}
      rotateEnabled={false}
      scrollEnabled={false}
      showBuildings={false}
      zoomEnabled={false}
    >
      {markers.map(marker => (
        <Marker
          title={marker.id === 'user_location' ? "You're here" : restaurantName}
          ref={(markerRef) => {
            if (marker.id === 'user_location') {
              _userMarkerRef = markerRef;
            } else {
              _restaurantMarkerRef = markerRef;
            }
          }}
          onPress={() => {
            const ref = marker.id === 'user_location'
              ? _userMarkerRef
              : _restaurantMarkerRef;

            ref.showCallout();
          }}
          coordinate={marker}
          key={marker.id}
        >
          <MarkerIcon
            name={
              marker.id === 'user_location'
                ? 'account-location'
                : 'map-marker-radius'
            }
          />
        </Marker>
      ))}
    </MapView>
  </MapContainer>
);

const renderFooter = (distance: number, isOpen: boolean): Object => {
  const status = `${isOpen ? 'Open' : 'Closed'} now`;

  return (
    <FooterContainer>
      <View>
        <StatusText>{status}</StatusText>
        <EstablishmentStatus>{`${distance} km from you`}</EstablishmentStatus>
      </View>
    </FooterContainer>
  );
};

const renderFloatingActionButton = (markers: Array<Object>): Object => (
  <FloatingActionButtonWrapper>
    <FloatinActionButton
      action={() => onFitMapCoordinates(markers)}
      name="directions"
      color="blue"
    />
  </FloatingActionButtonWrapper>
);

type Props = {
  navigation: Function,
};

const RestaurantAddressMap = ({ navigation }: Props): Object => {
  const {
    restaurantLocation,
    userLocation,
    distance,
    isOpen,
  } = navigation.getParam(CONSTANTS.NAVIGATION_PARAM_USER_LOCATION, {});

  const restaurantName = navigation.getParam(
    CONSTANTS.NAVIGATION_PARAM_RESTAURANT_NAME,
    '',
  );

  const markers = [restaurantLocation, userLocation];

  return (
    <Container>
      <StatusBar
        backgroundColor={appStyles.colors.androidToolbarColor}
        barStyle="light-content"
        translucent
        animated
      />
      {renderMap(restaurantName, markers)}
      {renderFooter(distance, isOpen)}
      {renderFloatingActionButton(markers)}
    </Container>
  );
};

export default RestaurantAddressMap;
