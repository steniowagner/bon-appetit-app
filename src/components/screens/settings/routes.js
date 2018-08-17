import { createStackNavigator } from 'react-navigation';
import Settings from './index';

const routeNames = {
  SETTINGS: 'Settings',
};

const routes = createStackNavigator({
  Settings: {
    screen: Settings,
  },
});

export default {
  routeNames,
  routes,
};
