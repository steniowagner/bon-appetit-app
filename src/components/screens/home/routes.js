import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import EventInfo from './components/in-your-city/EventInfo';
import AllEvents from './components/all-events';
import Home from './index';

const routeNames = {
  HOME: 'Home',
  EVENT_INFO: 'EventInfo',
  ALL_EVENTS: 'AllEvents',
};

const routes = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  EventInfo: {
    screen: EventInfo,
  },

  AllEvents: {
    screen: AllEvents,
    navigationOptions: () => ({
      gesturesEnabled: false,
    }),
  },
},
{
  mode: Platform.OS === 'ios' ? 'card' : 'modal',
  headerMode: 'screen',
});

routes.navigationOptions = ({ navigation }) => {
  const isTabView = navigation.state.index <= 0;
  const tabBarVisible = isTabView;

  return {
    tabBarVisible,
  };
};

export default {
  routeNames,
  routes,
};
