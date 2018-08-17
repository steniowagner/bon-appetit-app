import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import EventInfo from './components/in-your-city/EventInfo';
import Home from './index';

const routeNames = {
  EVENT_INFO: 'EventInfo',
  HOME: 'Home',
};

const routes = createStackNavigator({
  Home: {
    screen: Home,
  },

  EventInfo: {
    screen: EventInfo,
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
