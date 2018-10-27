import { createStackNavigator } from 'react-navigation';

import appStyle from 'styles';

import Settings from './index';

export const ROUTE_NAMES = {
  SETTINGS: 'SETTINGS',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.SETTINGS]: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings',
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
