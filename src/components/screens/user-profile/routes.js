import { createStackNavigator } from 'react-navigation';

import appStyle from 'styles';

import UserProfile from './index';

export const ROUTE_NAMES = {
  USER_PROFILE: 'USER_PROFILE',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.USER_PROFILE]: {
    screen: UserProfile,
    navigationOptions: () => ({
      title: 'Profile',
      headerStyle: {
        backgroundColor: appStyle.colors.primaryColor,
      },
      headerTintColor: appStyle.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyle.colors.defaultWhite,
        fontFamily: 'CircularStd-Medium',
      },
    }),
  },
});

export default ROUTES;
