import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import OnboardingIntro from '~/components/screens/onboarding-intro';
import Login from '~/components/screens/login';
import MainStack from './mainStack';

export const ROUTE_NAMES = {
  ONBOARDING_INTRO: 'ONBOARDING_INTRO',
  LOGIN: 'LOGIN',
  MAIN_STACK: 'MAIN_STACK',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.ONBOARDING_INTRO]: {
      screen: OnboardingIntro,
    },
    [ROUTE_NAMES.LOGIN]: {
      screen: Login,
    },
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.ONBOARDING_INTRO,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
