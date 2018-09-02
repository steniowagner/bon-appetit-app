import { createStackNavigator } from 'react-navigation';
import RestaurantDetail from 'components/common/restaurant-detail';

import NearYou from './index';

export const ROUTE_NAMES = {
  NEAR_YOU: 'NEAR_YOU',
  RESTAURANT_DETAIL: 'RESTAURANT_DETAIL',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.NEAR_YOU]: {
    screen: NearYou,
  },

  [ROUTE_NAMES.RESTAURANT_DETAIL]: {
    screen: RestaurantDetail,
  },
});

export default ROUTES;
