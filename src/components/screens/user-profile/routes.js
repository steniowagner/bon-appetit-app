import { createStackNavigator } from 'react-navigation';

import UserProfile from './index';

export const ROUTE_NAMES = {
  USER_PROFILE: 'USER_PROFILE',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.USER_PROFILE]: {
    screen: UserProfile,
  },
});

export default ROUTES;
