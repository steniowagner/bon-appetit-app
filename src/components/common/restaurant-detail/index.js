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

const data = [
  {
    id: '1',
    foodImage: 'https://images.unsplash.com/photo-1532597311687-5c2dc87fff52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f766ceea9ba1bd2750910e70a94f91e&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '2',
    foodImage: 'https://images.unsplash.com/photo-1495749388945-9d6e4e5b67b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7bd4e6cff0515627ad85ae08f5a5c0ee&auto=format&fit=crop&w=1489&q=80',
    foodTitle: 'Bife del Primo',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 15.99,
    stars: 4.5,
  },
  {
    id: '3',
    foodImage: 'https://images.unsplash.com/photo-1449453791997-5c0240b106e5?ixlib=rb-0.3.5&s=9dcc2dba375d2725f878ad4ff5992392&auto=format&fit=crop&w=1347&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '4',
    foodImage: 'https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ec77eae2b7b81c8beab9e87bbd3a01&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '5',
    foodImage: 'https://images.unsplash.com/photo-1532597311687-5c2dc87fff52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f766ceea9ba1bd2750910e70a94f91e&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '6',
    foodImage: 'https://images.unsplash.com/photo-1532597311687-5c2dc87fff52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f766ceea9ba1bd2750910e70a94f91e&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '7',
    foodImage: 'https://images.unsplash.com/photo-1532597311687-5c2dc87fff52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f766ceea9ba1bd2750910e70a94f91e&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },
  {
    id: '8',
    foodImage: 'https://images.unsplash.com/photo-1532597311687-5c2dc87fff52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f766ceea9ba1bd2750910e70a94f91e&auto=format&fit=crop&w=1350&q=80',
    foodTitle: 'Bife de Tira',
    foodDescription: 'Corte longitudinal da picanha, de textura mais macia',
    price: 25.99,
    stars: 3.5,
  },

]

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
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MenuListItem
              foodImage={item.foodImage}
              foodTitle={item.foodTitle}
              foodDescription={item.foodDescription}
              price={item.price}
              stars={item.stars}
            />)
          }
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
