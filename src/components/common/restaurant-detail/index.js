// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';

import CustomTab from 'components/screens/home/components/common/CustomTab';
import FloatinActionButton from 'components/common/FloatingActionButton';
import HeaderSection from './components/HeaderSection';
import AboutRestaurantSection from './components/AboutRestaurantSection';
import MenuList from './components/menu-list';

import Context from './components/Context';

import data from './test-data';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Menu = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const AboutRestaurantWrapper = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('20%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-items: flex-end;
  position: absolute;
`;

type Props = {
  navigation: Function,
};

type State = {
  indexMenuSelected: number,
  isDataFetched: boolean,
};

class RestaurantDetail extends Component<Props, State> {
  static navigationOptions = {
    headerTintColor: appStyle.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  state = {
    indexMenuSelected: 0,
    isDataFetched: true,
  };

  onSelectMenu = (indexMenuSelected: number): void => {
    this.setState({
      indexMenuSelected,
    });
  }

  renderMenuSection = () => {
    const { indexMenuSelected, isDataFetched } = this.state;

    return (
      <Menu>
        {isDataFetched && <CustomTab />}
        <MenuList
          data={data[indexMenuSelected]}
          isDataFetched={isDataFetched}
        />
      </Menu>
    );
  }

  renderAboutRestaurantSection = () => {
    const { isDataFetched } = this.state;
    const { navigation } = this.props;
    const { address } = navigation.getParam('payload', {});

    return (
      <AboutRestaurantWrapper>
        <AboutRestaurantSection
          address={address}
          status="Aberto agora (até às 23:30)"
          about="Gastronomia requintada de carnes nobres argentinas, ambiente chique e intimista convidativo a longas estadias."
          isDataFetched={isDataFetched}
        />
      </AboutRestaurantWrapper>
    );
  }

  renderFloatingActionButton = () => {
    const { navigation } = this.props;
    const { isDataFetched } = this.state;

    return isDataFetched
    && (
      <FloatingActionButtonWrapper>
        <FloatinActionButton
          name="map-marker-multiple"
          color="yellow"
          action={() => navigation.navigate(ROUTE_NAMES.RESTAURANT_ADDRESS_MAP, {
            payload: {
              restaurantName: 'Cabãna del Primo',
              userLocation: {
                id: 'user_location',
                latitude: -3.7195263,
                longitude: -38.589332,
              },
              restaurantLocation: {
                id: 'restaurant_location',
                latitude: -3.7138213,
                longitude: -38.5886952,
              },
              distance: 4,
              status: 'open',
            },
          })}
        />
      </FloatingActionButtonWrapper>
    );
  }

  render() {
    const { navigation } = this.props;
    const {
      name,
      stars,
      picURL,
    } = navigation.getParam('payload', {});

    return (
      <Context.Provider
        value={{
          onSelectMenu: this.onSelectMenu,
        }}
      >
        <Container>
          <HeaderSection
            restaurantImage={picURL}
            restaurantName={name}
            reviews={18}
            stars={stars}
          />
          {this.renderAboutRestaurantSection()}
          {this.renderFloatingActionButton()}
          {this.renderMenuSection()}
        </Container>
      </Context.Provider>
    );
  }
}

export default RestaurantDetail;
