// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_DIRECTIONS_API_KEY } from 'react-native-dotenv';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyle from 'styles';

import FloatinActionButton from './FloatingActionButton';
import ReviewStars from './ReviewStars';

const Container = styled(View)`
  flex: 1;
`;

const MapContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('75%')};
`;

const FloatingActionButtonWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('75%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-self: flex-end;
  position: absolute;
`;

const FooterContainer = styled(View)`
  width: 100%;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('18%')};
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
  color: ${({ theme, status }) => (status === 'open' ? theme.colors.green : theme.colors.red)};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Medium;
`;

const MarkerIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: ({ name }) => name,
  size: 25,
})`
  width: 25px;
  height: 25px;
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
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.payload.restaurantName || '',
    headerStyle: {
      backgroundColor: appStyle.colors.primaryColor,
    },
    headerTintColor: appStyle.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyle.colors.defaultWhite,
      fontFamily: 'CircularStd-Black',
      fontSize: appStyle.metrics.navigationHeaderFontSize,
    },
  });

  state = {
    markers: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { userLocation, restaurantLocation } = navigation.getParam('payload', '');

    this.setState({
      markers: [userLocation, restaurantLocation],
    });
  }

  getStatusText = (distance: string, status: string): string => {
    const statusText = (status === 'open' ? 'Open' : 'Closed');

    return `${statusText} now. ${distance}km from you`;
  }

  fitMarkersOnScreen = () => {
    const edgePadding = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    };

    const { markers } = this.state;

    this.mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding,
    });
  }

  renderMap = () => {
    const { navigation } = this.props;
    const { restaurantName } = navigation.getParam('payload', '');

    const { markers } = this.state;

    return (
      <MapContainer>
        <MapView
          style={{ width: '100%', height: '100%' }}
          ref={(ref) => { this.mapRef = ref; }}
          onLayout={() => this.fitMarkersOnScreen()}
          initialRegion={{
            latitude: INITIAL_REGION.latitude,
            longitude: INITIAL_REGION.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {markers.map(marker => (
            <Marker
              title={marker.id === 'user_location' ? 'You\'re here' : restaurantName}
              key={marker.id}
              coordinate={marker}
            >
              <MarkerIcon
                name={marker.id === 'user_location' ? 'emoticon' : 'food-fork-drink'}
              />
            </Marker>
          ))}
          <MapViewDirections
            origin={markers[0]}
            destination={markers[1]}
            apikey={GOOGLE_DIRECTIONS_API_KEY}
            strokeWidth={3}
            strokeColor={appStyle.colors.red}
          />
        </MapView>
      </MapContainer>
    );
  }

  renderFooter = () => {
    const { navigation } = this.props;
    const { restaurantName, distance, status } = navigation.getParam('payload', '');

    return (
      <FooterContainer>
        <ResturantName>
          {restaurantName}
        </ResturantName>
        <ReviewStars
          shouldShowReviewsText
          reviews={18}
          stars={4.5}
          textColor="darkText"
        />
        <EstablishmentStatus status={status}>
          {this.getStatusText(distance, status)}
        </EstablishmentStatus>
      </FooterContainer>
    );
  }

  renderFloatingActionButton = () => (
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
