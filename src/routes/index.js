import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from '~/components/screens/login';
import MainStack from './mainStack';

export const ROUTE_NAMES = {
  LOGIN: 'LOGIN',
  MAIN_STACK: 'MAIN_STACK',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.LOGIN]: {
      screen: Login,
    },
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.LOGIN,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
