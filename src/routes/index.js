// @flow

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from 'components/screens/home';
import Search from 'components/screens/search';
import NearYou from 'components/screens/near-you';
import UserProfile from 'components/screens/user-profile';
import Settings from 'components/screens/settings';

import styles from 'styles';

import { Image } from 'react-native';
import styled from 'styled-components';

const Icon = styled(Image).attrs({
  source: ({ theme, icon }) => theme.images[icon],
})`
  tint-color: ${({ tintColor }) => tintColor};
  width: 18;
  height: 18;
`;

type Props = {
  tintColor: string,
};

const getStackNavigatorConfig = (headerTitle: string, fontFamily: string = 'CircularStd-Bold', fontSize: number = 16): Object => {
  const { primaryColor, defaultWhite } = styles.colors;

  return {
    headerTitle,
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTintColor: defaultWhite,
    headerTitleStyle: {
      fontFamily,
      fontSize,
    },
  };
};

const getTabIcon = (icon: string): Object => ({
  tabBarIcon: ({ tintColor }: Props) => (
    <Icon tintColor={tintColor} icon={icon} />
  ),
});

const RootNavigator = () => createBottomTabNavigator({
  Home: {
    screen: createStackNavigator({
      screen: Home,
    }, {
      navigationOptions: getStackNavigatorConfig('Bon Appetit', 'Modesta-Script', 22),
    }),
    navigationOptions: getTabIcon('home'),
  },

  Search: {
    screen: createStackNavigator({
      screen: Search,
    }, {
      navigationOptions: getStackNavigatorConfig('Search'),
    }),
    navigationOptions: getTabIcon('search'),
  },

  NearYou: {
    screen: createStackNavigator({
      screen: NearYou,
    }, {
      navigationOptions: getStackNavigatorConfig('Near You'),
    }),
    navigationOptions: getTabIcon('map'),
  },

  UserProfile: {
    screen: createStackNavigator({
      screen: UserProfile,
    }, {
      navigationOptions: getStackNavigatorConfig('Profile'),
    }),
    navigationOptions: getTabIcon('user_profile'),
  },

  Settings: {
    screen: createStackNavigator({
      screen: Settings,
    }, {
      navigationOptions: getStackNavigatorConfig('Settings'),
    }),
    navigationOptions: getTabIcon('settings'),
  },
},
{
  swipeEnabled: true,
  tabBarOptions: {
    style: {
      elevation: 4,
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
