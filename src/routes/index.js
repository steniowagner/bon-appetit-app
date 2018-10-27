// @flow

import React from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeRoutes from 'components/screens/home/routes';
import SearchRoutes from 'components/screens/search/routes';
import NearYouRoutes from 'components/screens/near-you/routes';
import UserProfileRoutes from 'components/screens/user-profile/routes';
import SettingsRoutes from 'components/screens/settings/routes';

import appStyles from 'styles';

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

export const ROUTE_NAMES = {
  HOME: 'HOME',
  SEARCH: 'SEARCH',
  NEAR_YOU: 'NEAR_YOU',
  USER_PROFILE: 'USER_PROFILE',
  SETTINGS: 'SETTINGS',
};

const ApplicationTabs = () => createMaterialTopTabNavigator({
  [ROUTE_NAMES.HOME]: {
    screen: HomeRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('home'),
    },
  },

  [ROUTE_NAMES.SEARCH]: {
    screen: SearchRoutes,
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

  [ROUTE_NAMES.USER_PROFILE]: {
    screen: UserProfileRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('account'),
    },
  },

  [ROUTE_NAMES.SETTINGS]: {
    screen: SettingsRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('settings'),
    },
  },
}, {
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
});

export default ApplicationTabs;
