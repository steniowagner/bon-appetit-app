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
  <Icon name={icon} size={28} color={tintColor} />
);

const ApplicationTabs = () => createMaterialTopTabNavigator({
  Home: {
    screen: HomeRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('home-outline'),
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
      tabBarIcon: getTabIcon('map-outline'),
    },
  },

  UserProfile: {
    screen: UserProfileRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('account-outline'),
    },
  },

  Settings: {
    screen: SettingsRoutes,
    navigationOptions: {
      tabBarIcon: getTabIcon('settings-outline'),
    },
  },
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  optimizationsEnabled: true,
  animationEnabled: true,
  swipeEnabled: false,
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
    inactiveTintColor: appStyles.colors.lightGray,
    activeTintColor: appStyles.colors.red,
  },
});

export default ApplicationTabs;
