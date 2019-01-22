// @flow

import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import SearchRestaurantsRoutes from '~/components/screens/search-restaurants/routes';
import NearYouRoutes from '~/components/screens/near-you/routes';
import Settings from '~/components/screens/settings/routes';
import ProfileRoutes from '~/components/screens/profile/routes';
import HomeRoutes from '~/components/screens/home/routes';

import appStyles from '~/styles';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  SEARCH_RESTAURANTS: 'SEARCH_RESTAURANTS',
  NEAR_YOU: 'NEAR_YOU',
  PROFILE: 'PROFILE',
  SETTINGS: 'SETTINGS',
};

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({ tintColor }: Props) => (
  <Icon
    color={tintColor}
    name={icon}
    size={25}
  />
);

const ApplicationTabs = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: HomeRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('home'),
      },
    },
    [ROUTE_NAMES.SEARCH_RESTAURANTS]: {
      screen: SearchRestaurantsRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('magnify'),
      },
    },
    [ROUTE_NAMES.NEAR_YOU]: {
      screen: NearYouRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('map'),
      },
    },
    [ROUTE_NAMES.PROFILE]: {
      screen: ProfileRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('account'),
      },
    },
    [ROUTE_NAMES.SETTINGS]: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: getTabIcon('settings'),
      },
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    tabBarPosition: 'bottom',
    optimizationsEnabled: true,
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: appStyles.colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      inactiveTintColor: appStyles.colors.gray,
      activeTintColor: appStyles.colors.primaryColor,
    },
  },
);

const AppContainer = createAppContainer(ApplicationTabs);

export default AppContainer;
