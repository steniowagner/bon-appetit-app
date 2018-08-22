// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styled from 'styled-components';
import appStyle from 'styles';

import FloatinActionButton from './FloatingActionButton';
import ReviewStars from './ReviewStars';

const Container = styled(View)`
  flex: 1;
`;

const MapContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('76.5%')};
`;

const FloatingActionButtonWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('76.5%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-self: flex-end;
  position: absolute;
`;

const FooterContainer = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')};
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

type Props = {
  navigation: Function,
}

class RestaurantAddressMap extends Component<Props, {}> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.restaurantName,
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

  constructor() {
    super();
    this.mapRef = null;
  }

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

  render() {
    const { navigation } = this.props;

    const { restaurantName, distance, status } = navigation.getParam('payload', '');

    const { markers } = this.state;

    return (
      <Container>
        <MapContainer>
          <MapView
            style={{ width: '100%', height: '100%' }}
            ref={(ref) => { this.mapRef = ref; }}
            onLayout={() => this.fitMarkersOnScreen()}
            initialRegion={{
              latitude: -3.7195263,
              longitude: -38.589332,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
              />
            ))}
          </MapView>
        </MapContainer>
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
        <FloatingActionButtonWrapper>
          <FloatinActionButton
            name="directions"
            color="blue"
            action={() => this.fitMarkersOnScreen()}
          />
        </FloatingActionButtonWrapper>
      </Container>
    );
  }
}

export default RestaurantAddressMap;
