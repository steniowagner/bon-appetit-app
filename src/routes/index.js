// @flow

import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import Home from 'components/screens/home';
import Search from 'components/screens/search';
import NearYou from 'components/screens/near-you';
import UserProfile from 'components/screens/user-profile';
import Settings from 'components/screens/settings';

import styles from 'styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({
  tabBarIcon: ({ tintColor }: Props) => (
    <Icon name={icon} size={28} color={tintColor} />
  ),
  swipeEnabled: true,
});

const { colors } = styles;

const RootNavigator = () => createMaterialTopTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: getTabIcon('home-outline'),
  },

  Search: {
    screen: Search,
    navigationOptions: getTabIcon('magnify'),
  },

  NearYou: {
    screen: NearYou,
    navigationOptions: getTabIcon('map-outline'),
  },

  UserProfile: {
    screen: UserProfile,
    navigationOptions: getTabIcon('account-outline'),
  },

  Settings: {
    screen: Settings,
    navigationOptions: getTabIcon('settings-outline'),
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: colors.white,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
    inactiveTintColor: colors.lightGray,
    activeTintColor: colors.red,
  },
});

export default RootNavigator;
