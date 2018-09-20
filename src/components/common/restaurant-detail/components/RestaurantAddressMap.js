// @flow

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
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
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.largeSize : theme.metrics.mediumSize)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ResturantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('75%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  fontFamily: CircularStd-Black;
`;

const EstablishmentStatus = styled(Text)`
  color: ${({ theme, isOpen }) => (isOpen ? theme.colors.green : theme.colors.red)};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
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

type State = {
  markers: Array<Object>,
};

const ASPECT_RATIO = appStyle.metrics.width / appStyle.metrics.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
  latitude: -3.7900894,
  longitude: -38.6590335,
};

class RestaurantAddressMap extends Component<Props, State> {
  static navigationOptions = () => ({
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

  state = {
    markers: [],
  };

  componentDidMount() {
    const { userLocation, restaurantLocation } = this.getPropsFromNavigation();

    this.setState({
      markers: [userLocation, restaurantLocation],
    });
  }

  getStatusText = (distance: string, isOpen: boolean): string => {
    const statusText = (isOpen ? 'Open' : 'Closed');

    return `${statusText} now. ${distance} km from you`;
  }

  getPropsFromNavigation = (): Object => {
    const { navigation } = this.props;
    const payload = navigation.getParam('payload', '');

    return {
      ...payload,
    };
  }

  fitMarkersOnScreen = (): void => {
    const edgePadding = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };

    const { markers } = this.state;

    this.mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding,
    });
  }

  renderMap = (): Object => {
    const { restaurantName } = this.getPropsFromNavigation();
    const { markers } = this.state;

    return (
      <MapContainer>
        <MapView
          ref={(ref) => { this.mapRef = ref; }}
          onLayout={() => this.fitMarkersOnScreen()}
          initialRegion={{
            latitude: INITIAL_REGION.latitude,
            longitude: INITIAL_REGION.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={{ width: '100%', height: '100%' }}
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
  }

  renderFooter = (): Object => {
    const {
      restaurantName,
      distance,
      isOpen,
      stars,
    } = this.getPropsFromNavigation();

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
          {this.getStatusText(distance, isOpen)}
        </EstablishmentStatus>
      </FooterContainer>
    );
  }

  renderFloatingActionButton = (): Object => (
    <FloatingActionButtonWrapper>
      <FloatinActionButton
        name="directions"
        color="blue"
        action={() => this.fitMarkersOnScreen()}
      />
    </FloatingActionButtonWrapper>
  )

  render() {
    return (
      <Container>
        {this.renderMap()}
        {this.renderFooter()}
        {this.renderFloatingActionButton()}
      </Container>
    );
  }
}

export default RestaurantAddressMap;
