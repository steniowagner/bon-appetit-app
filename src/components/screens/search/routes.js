import { createStackNavigator } from 'react-navigation';

import Search from './index';

export const ROUTES_NAMES = {
  SEARCH: 'SEARCH',
};

const ROUTES = createStackNavigator({
  [ROUTES_NAMES.SEARCH]: {
    screen: Search,
  },
});

export default ROUTES;
