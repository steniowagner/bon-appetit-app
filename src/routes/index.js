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
    size={26}
  />
);

const ApplicationTabs = () => createMaterialTopTabNavigator({
  Home: {
    screen: HomeRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('home'),
    },
  },

  Search: {
    screen: SearchRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('magnify'),
    },
  },

  NearYou: {
    screen: NearYouRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('map'),
    },
  },

  UserProfile: {
    screen: UserProfileRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('account'),
    },
  },

  Settings: {
    screen: SettingsRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('settings'),
    },
  },
}, {
  initialRouteName: 'NearYou',
  tabBarPosition: 'bottom',
  optimizationsEnabled: true,
  animationEnabled: true,
  swipeEnabled: false,
  lazy: false,
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
