import { createStackNavigator } from 'react-navigation';

import Search from './index';

const routeNames = {
  SEARCH: 'Search',
};

const routes = createStackNavigator({
  Search: {
    screen: Search,
  },
});

export default {
  routeNames,
  routes,
};
