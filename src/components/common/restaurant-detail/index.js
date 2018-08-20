import React, { Component } from 'react';
import {
  View,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyle from 'styles';

import CustomTab from 'components/screens/home/components/common/CustomTab';
import HeaderSection from './components/HeaderSection';
import AboutRestaurantSection from './components/AboutRestaurantSection';
import MenuListItem from './components/MenuListItem';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Menu = styled(Animated.View)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  position: absolute;
`;

const AboutRestaurantWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MenuListContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: ${({ theme }) => `${theme.metrics.smallSize}px ${theme.metrics.smallSize}px`}
  margin-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('26%')}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  align-items: flex-end;
  position: absolute;
`;

const ButtonShape = styled(Animated.View)`
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.yellow};
  justify-content: center;
  align-items: center;
`;

const MapMarkerIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker-multiple',
  size: 25,
})`
  width: 25px;
  height: 25px;
`;

class RestaurantDetail extends Component {
  static navigationOptions = {
    headerTintColor: appStyle.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  state = {
    scrollOffset: new Animated.Value(0),
  };

  renderMenuSection = () => {
    const { scrollOffset } = this.state;

    const initialMarginTop = appStyle.metrics.getHeightFromDP('46.5%');
    const maxMarginTop = appStyle.metrics.getHeightFromDP('25%');

    return (
      <Menu
        style={{
          marginTop: scrollOffset.interpolate({
            inputRange: [0, 120],
            outputRange: [initialMarginTop, maxMarginTop],
            extrapolate: 'clamp',
          }),
        }}
      >
        <CustomTab />
        <MenuListContainer
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { y: scrollOffset },
            },
          }])}
          scrollEventThrottle={16}
          data={[{ id: '1' },{ id: '2' },{ id: '3' }, { id: '4' },{ id: '5' },{ id: '6' },{ id: '7' },{ id: '8' }]}
          keyExtractor={item => item.id}
          renderItem={() => <MenuListItem />}
        />
      </Menu>
    );
  }

  renderAboutRestaurantSection = () => {
    const maxMarginTop = appStyle.metrics.getHeightFromDP('25%');
    const { scrollOffset } = this.state;

    return (
      <AboutRestaurantWrapper>
        <Animated.View
          style={{
            opacity: scrollOffset.interpolate({
              inputRange: [0, maxMarginTop / 5, maxMarginTop],
              outputRange: [1, 1, 0],
            }),
          }}
        >
          <AboutRestaurantSection />
        </Animated.View>
      </AboutRestaurantWrapper>
    );
  }

  renderFloatingActionButton = () => {
    const AnimatedMapMarkerIcon = Animated.createAnimatedComponent(MapMarkerIcon);
    const { scrollOffset } = this.state;

    return (
      <FloatingActionButtonWrapper>
        <ButtonShape
          style={{
            width: scrollOffset.interpolate({
              inputRange: [0, 56],
              outputRange: [56, 0],
              extrapolate: 'clamp',
            }),
            height: scrollOffset.interpolate({
              inputRange: [0, 56],
              outputRange: [56, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <TouchableWithoutFeedback>
            <AnimatedMapMarkerIcon
              style={{
                width: scrollOffset.interpolate({
                  inputRange: [0, 25],
                  outputRange: [25, 0],
                  extrapolate: 'clamp',
                }),
                height: scrollOffset.interpolate({
                  inputRange: [0, 25],
                  outputRange: [25, 0],
                  extrapolate: 'clamp',
                }),
              }}
            />
          </TouchableWithoutFeedback>
        </ButtonShape>
      </FloatingActionButtonWrapper>
    );
  }

  render() {
    return (
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
    );
  }
}

export default RestaurantDetail;
