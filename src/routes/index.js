// @flow

import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeRouter from 'components/screens/home/routes';

import Search from 'components/screens/search';
import NearYou from 'components/screens/near-you';
import UserProfile from 'components/screens/user-profile';
import Settings from 'components/screens/settings';

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
    screen: Search,
    navigationOptions: {
      tabBarIcon: getTabIcon('magnify'),
    },
  },

  NearYou: {
    screen: NearYou,
    navigationOptions: {
      tabBarIcon: getTabIcon('map-outline'),
    },
  },

  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      tabBarIcon: getTabIcon('account-outline'),
    },
  },

  Settings: {
    screen: Settings,
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
    inactiveTintColor: appStyles.colors.lightGray,
    activeTintColor: appStyles.colors.red,
  },
});

export default ApplicationTabs;
