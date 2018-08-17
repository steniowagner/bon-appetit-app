import { createStackNavigator } from 'react-navigation';

import UserProfile from './index';

const routeNames = {
  USER_PROFILE: 'UserProfile',
};

const routes = createStackNavigator({
  UserProfile: {
    screen: UserProfile,
  },
});

export default {
  routeNames,
  routes,
};
