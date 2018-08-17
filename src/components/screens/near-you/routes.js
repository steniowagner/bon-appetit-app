import { createStackNavigator } from 'react-navigation';

import NearYou from './index';

const routeNames = {
  NEAR_YOU: 'NearYou',
};

const routes = createStackNavigator({
  NearYou: {
    screen: NearYou,
  },
});

export default {
  routeNames,
  routes,
};
