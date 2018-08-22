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

class RestaurantDetail extends Component {
  static navigationOptions = {
    headerTintColor: appStyle.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  state = {
    indexMenuSelected: 0,
  };

  onSelectMenu = (indexMenuSelected: number): void => {
    this.setState({
      indexMenuSelected,
    });
  }

  renderMenuSection = () => {
    const { indexMenuSelected } = this.state;

    return (
      <Menu>
        <CustomTab />
        <MenuList data={data[indexMenuSelected]} />
      </Menu>
    );
  }

  renderAboutRestaurantSection = () => (
    <AboutRestaurantWrapper>
      <AboutRestaurantSection />
    </AboutRestaurantWrapper>
  );

  renderFloatingActionButton = () => {
    const { navigation } = this.props;

    return (
      <FloatingActionButtonWrapper>
        <FloatinActionButton
          name="map-marker-multiple"
          color="yellow"
          action={() => navigation.navigate(ROUTE_NAMES.RESTAURANT_ADDRESS_MAP, {
            payload: {
              restaurantName: 'Cabãna del Primo',
              userLocation: {
                latitude: -3.7195263,
                longitude: -38.589332,
              },
              restaurantLocation: {
                latitude: -3.7191621,
                longitude: -38.5935437,
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
    return (
      <Context.Provider
        value={{
          onSelectMenu: this.onSelectMenu,
        }}
      >
        <Container>
          <HeaderSection
            restaurantImage="https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7579a77bc83515a0b75cf26c479e019f&auto=format&fit=crop&w=1950&q=80"
            restaurantName="Cabãna del Primo"
            reviews={18}
            stars={4.5}
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
