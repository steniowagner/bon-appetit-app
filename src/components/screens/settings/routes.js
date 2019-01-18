import { createStackNavigator } from 'react-navigation';

import { setDefaultHeaderLayout } from '~/routes/headerUtils';

import Settings from './index';

export const ROUTE_NAMES = {
  SETTINGS: 'SETTINGS',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.SETTINGS]: {
    screen: Settings,
    navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'Settings'),
  },
});

export default ROUTES;
