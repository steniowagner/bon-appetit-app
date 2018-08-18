import { createStackNavigator } from 'react-navigation';

import NearYou from './index';

export const ROUTE_NAMES = {
  NEAR_YOU: 'NEAR_YOU',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.NEAR_YOU]: {
    screen: NearYou,
  },
});

export default ROUTES;
