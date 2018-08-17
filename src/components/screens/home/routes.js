import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import EventInfo from './components/in-your-city/EventInfo';
import Home from './index';

const routesNames = {
  EVENT_INFO: 'EventInfo',
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
});

routes.navigationOptions = ({ navigation }) => {
  const isTabView = navigation.state.index <= 0;
  const tabBarVisible = isTabView;

  return {
    tabBarVisible,
  };
};

export default {
  routesNames,
  routes,
};
