// @flow

import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeRouter from 'components/screens/home/routes';
import NearYouRouter from 'components/screens/near-you/routes';
import UserProfileRouter from 'components/screens/user-profile/routes';
import SettingsRouter from 'components/screens/settings/routes';

import SearchRouter from 'components/screens/search/routes';

import appStyles from 'styles';

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({ tintColor }: Props) => (
  <Icon name={icon} size={28} color={tintColor} />
);

const ApplicationTabs = () => createMaterialTopTabNavigator({
  Home: {
    screen: HomeRouter.routes,
    navigationOptions: {
      tabBarIcon: getTabIcon('home-outline'),
    },
  },

  Search: {
    screen: SearchRouter.routes,
    navigationOptions: {
      tabBarIcon: getTabIcon('magnify'),
    },
  },

  NearYou: {
    screen: NearYouRouter.routes,
    navigationOptions: {
      tabBarIcon: getTabIcon('map-outline'),
    },
  },

  UserProfile: {
    screen: UserProfileRouter.routes,
    navigationOptions: {
      tabBarIcon: getTabIcon('account-outline'),
    },
  },

  Settings: {
    screen: SettingsRouter.routes,
    navigationOptions: {
      tabBarIcon: getTabIcon('settings-outline'),
    },
  },
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  optimizationsEnabled: true,
  animationEnabled: true,
  swipeEnabled: true,
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
