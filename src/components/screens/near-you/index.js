// @flow

/*
  QUANDO ESCOLHER UM TIPO DIFERENTE DE COMIDA, VOLTAR O ZOOM E SÓ DEPOIS DE CARREGADO DAR O ZOOM
*/

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/common/CustomTab';
import PlaceItemList from './PlaceItemList';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PlacesListWrapper = styled(View)`
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

const INITIAL_REGION = {
  latitude: -3.7166596,
  longitude:-38.5914,
};

const customTabData = [{
  title: 'Pizzas',
}, {
  title: 'Salads',
}, {
  title: 'Disserts',
}, {
  title: 'Japanese',
}];

const datasetLocations = [
  {
    id: '1',
    name: 'Academia Medida Certa',
    description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XV',
    location: {
      latitude: -3.7191621,
      longitude: -38.5935437,
    },
  },
  {
    id: '2',
    name: 'Açaí do Colares',
    description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XV',
    location: {
      latitude: -3.7252453,
      longitude: -38.5885034,
    },
  },
  {
    id: '3',
    name: 'Cores da Impressão',
    description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XV',
    location: {
      latitude: -3.721466,
      longitude: -38.5986327,
    },
  },
  {
    id: '4',
    name: 'Random',
    description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XV',
    location: {
      latitude: -3.776349,
      longitude: -38.556757,
    },
  },
];

const restaurantList = [{
  id: '1',
  name: 'Academia Medida Certa',
  distance: 1.7,
  reviews: 13,
  stars: 3.5,
  isOpen: true,
}, {
  id: '2',
  name: 'Açaí do Colares',
  distance: 1.7,
  reviews: 13,
  stars: 3.5,
  isOpen: false,
}, {
  id: '3',
  name: 'Cores da Impressão',
  distance: 1.7,
  reviews: 13,
  stars: 3.5,
  isOpen: true,
}, {
  id: '4',
  name: 'Random',
  distance: 1.7,
  reviews: 13,
  stars: 3.5,
  isOpen: true,
}];

const FORTAL_CITY_LATLNG = {
  latitude: -3.731862,
  longitude: -38.526669,
};

const USER_LOCATION = {
  latitude: -3.7193101,
  longitude: -38.5892672,
};

class NearYou extends Component {
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
      fontWeight: '900',
      fontSize: appStyle.metrics.navigationHeaderFontSize,
    },
  };

  state = {
    dataset: datasetLocations,
  };

  onFoodTypeChange = (): void => {
    this.onAnimateToCityView();

    setTimeout(() => this.onAnimateToFirstRestaurantLocation(), 2000);
  }

  onAnimateToFirstRestaurantLocation = (): void => {
    const { dataset } = this.state;
    const { latitude, longitude } = dataset[0].location;

    this.mapRef.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.03152,
      longitudeDelta: 0.0100,
    }, 500);
  }

  onAnimateToCityView = (): void => {
    this.mapRef.animateToRegion({
      ...FORTAL_CITY_LATLNG,
      latitudeDelta: 0.21,
      longitudeDelta: 0.21,
    }, 500);
  }

  onMapReady = (): void => {
    const { dataset } = this.state;

    dataset[0].marker.showCallout();
  };

  onSelectMarker = (markerIndex: number): void => {
    this.flatListRef.scrollToIndex({ animated: true, index: markerIndex });
  }

  onMomentumScrollEnd = (event: Object): void => {
    const { contentOffset } = event.nativeEvent;
    const { dataset } = this.state;

    const isHorizontalSwipeMovement = contentOffset.x > 0;
    const indexItemSelected = (isHorizontalSwipeMovement ? (Math.ceil(contentOffset.x / appStyle.metrics.width)) : 0);
    const { marker, location } = dataset[indexItemSelected];

    this.animateMapToCoordinates(location.latitude, location.longitude, marker);
  }

  animateMapToCoordinates = (latitude: number, longitude: number, marker: Object): void => {
    this.mapRef.animateToCoordinate({
      latitude,
      longitude,
    }, 500);

    setTimeout(() => {
      marker.showCallout();
    }, 500);
  }

  renderMap = (): void => {
    const { dataset } = this.state;

    return (
      <MapContainer
        innerRef={(ref) => { this.mapRef = ref; }}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        onMapReady={this.onMapReady}
        initialRegion={{
          latitude: INITIAL_REGION.latitude,
          longitude: INITIAL_REGION.longitude,
          latitudeDelta: 0.03152,
          longitudeDelta: 0.0100,
        }}
      >
        {dataset.map((restaurant, index) => {
          const {
            name,
            description,
            location,
            id,
          } = restaurant;

          return (
            <Marker
              ref={(marker) => { restaurant.marker = marker; }}
              onPress={() => this.onSelectMarker(index)}
              title={name}
              description={description}
              key={id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          );
        })}
      </MapContainer>
    );
  }

  renderRestaurantsList = (): void => (
    <PlacesListWrapper>
      <FlatList
        ref={(ref) => { this.flatListRef = ref; }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => this.onMomentumScrollEnd(event)}
        data={restaurantList}
        keyExtractor={item => item.id}
        extraData={this.state}
        pagingEnabled
        renderItem={({ item, index }) => (
          <PlaceItemList
            isFirst={index === 0}
            name={item.name}
            distance={item.distance}
            reviews={item.reviews}
            stars={item.stars}
            isOpen={item.isOpen}
          />
        )}
      />
    </PlacesListWrapper>
  )

  render() {
    return (
      <Container>
        <ContentContainer>
          {this.renderMap()}
          {this.renderRestaurantsList()}
        </ContentContainer>
        <CustomTabWrapper>
          <CustomTab
            contentWidth={appStyle.metrics.width}
            onChangeMenuIndex={index => this.onFoodTypeChange(index)}
            data={customTabData}
            theme="dark"
          />
        </CustomTabWrapper>
      </Container>
    );
  }
}

export default NearYou;
