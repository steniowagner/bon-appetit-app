// @flow

import React from 'react';
import {
  StatusBar,
  Platform,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyle from 'styles';

import FloatinActionButton from 'components/common/FloatingActionButton';
import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  flex: 1;
`;

const MapContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('74%')};
`;

const FloatingActionButtonWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('74%') - 28}px;
  align-self: flex-end;
  position: absolute;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FooterContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.largeSize : theme.metrics.smallSize)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ResturantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('75%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '3%' : '2.7%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Black;
`;

const EstablishmentStatus = styled(Text)`
  color: ${({ theme, isOpen }) => (isOpen ? theme.colors.green : theme.colors.red)};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.2%')}px;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Medium;
`;

const MarkerIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.primaryColor,
  name: ({ name }) => name,
  size: 28,
})`
  width: 28px;
  height: 28px;
`;

type Props = {
  navigation: Function,
};

const ASPECT_RATIO = appStyle.metrics.width / appStyle.metrics.height;
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

let _mapRef;

const onFitMapCoordinates = (markers: Array<Object>): void => {
  _mapRef.fitToCoordinates(markers, {
    animated: true,
    edgePadding,
  });
};

const renderMap = (restaurantName: string, markers: Array<Object>): Object => (
  <MapContainer>
    <MapView
      ref={(ref) => { _mapRef = ref; }}
      initialRegion={{
        latitude: INITIAL_REGION.latitude,
        longitude: INITIAL_REGION.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={{ width: '100%', height: '100%' }}
      onMapReady={() => onFitMapCoordinates(markers)}
      showsPointsOfInterest={false}
      rotateEnabled={false}
      scrollEnabled={false}
      showBuildings={false}
      zoomEnabled={false}
    >
      {markers.map(marker => (
        <Marker
          title={marker.id === 'user_location' ? 'You\'re here' : restaurantName}
          key={marker.id}
          coordinate={marker}
        >
          <MarkerIcon
            name={marker.id === 'user_location' ? 'account-location' : 'map-marker-radius'}
          />
        </Marker>
      ))}
    </MapView>
  </MapContainer>
);

const renderFooter = (restaurantName: string, distance: number, isOpen: boolean, stars: number): Object => {
  const status = (isOpen ? 'Open' : 'Closed');

  return (
    <FooterContainer>
      <ResturantName>
        {restaurantName}
      </ResturantName>
      <ReviewStars
        stars={stars}
      />
      <EstablishmentStatus
        isOpen={isOpen}
      >
        {`${status} now - ${distance} km from you`}
      </EstablishmentStatus>
    </FooterContainer>
  );
};

const renderFloatingActionButton = (markers: Array<Object>): Object => (
  <FloatingActionButtonWrapper>
    <FloatinActionButton
      name="directions"
      color="blue"
      action={() => onFitMapCoordinates(markers)}
    />
  </FloatingActionButtonWrapper>
);

const RestaurantAddressMap = ({ navigation }: Props): Object => {
  const {
    restaurantLocation,
    userLocation,
    restaurantName,
    distance,
    isOpen,
    stars,
  } = navigation.getParam('payload', {});

  const markers = [restaurantLocation, userLocation];

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#009730"
        translucent={false}
      />
      {renderMap(restaurantName, markers)}
      {renderFooter(restaurantName, distance, isOpen, stars)}
      {renderFloatingActionButton(markers)}
    </Container>
  );
};

RestaurantAddressMap.navigationOptions = () => ({
  title: '',
  headerStyle: {
    backgroundColor: appStyle.colors.primaryColor,
  },
  headerTintColor: appStyle.colors.defaultWhite,
  headerTitleStyle: {
    color: appStyle.colors.defaultWhite,
    fontFamily: 'CircularStd-Black',
  },
});

export default RestaurantAddressMap;
