// @flow

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

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

const RootNavigator = () => createBottomTabNavigator({
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
  swipeEnabled: true,
  tabBarOptions: {
    style: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    tabStyle: {
      backgroundColor: styles.colors.white,
    },
    inactiveTintColor: styles.colors.lightGray,
    activeTintColor: styles.colors.red,
    showLabel: false,
    showIcon: true,
  },
});

export default RootNavigator;
