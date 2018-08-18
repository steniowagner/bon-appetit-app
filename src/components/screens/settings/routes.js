import { createStackNavigator } from 'react-navigation';
import Settings from './index';

export const ROUTE_NAMES = {
  SETTINGS: 'SETTINGS',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.SETTINGS]: {
    screen: Settings,
  },
});

export default ROUTES;
