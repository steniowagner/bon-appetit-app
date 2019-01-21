import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import RestaurantAddressMap from '~/components/common/restaurant-detail/components/RestaurantAddressMap';
import RestaurantDetail from '~/components/common/restaurant-detail';
import YouMightLikeSeeAll from './components/you-might-like/see-all';
import DisheDetail from '~/components/common/dishe-detail';
import AllEvents from './components/in-your-city/see-all';
import PopularSeeAll from './components/popular/see-all';
import EventDetails from './components/event-details';
import Home from './index';

import CONSTANTS from '~/utils/CONSTANTS';

export const ROUTE_NAMES = {
  YOU_MIGHT_LIKE_SEE_ALL: 'YOU_MIGHT_LIKE_SEE_ALL',
  POPULAR_SEE_ALL: 'POPULAR_SEE_ALL',
  SEE_ALL_EVENTS: 'SEE_ALL_EVENTS',
  EVENT_DETAILS: 'EVENT_DETAILS',
  DISH_DETAIL: 'DISH_DETAIL',
  HOME: 'HOME',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: Home,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(
        navigation,
        'Bon Appetit!',
        'Modesta-Script',
        28,
      ),
    },

    [ROUTE_NAMES.SEE_ALL_EVENTS]: {
      screen: AllEvents,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'In Your City'),
    },

    [ROUTE_NAMES.YOU_MIGHT_LIKE_SEE_ALL]: {
      screen: YouMightLikeSeeAll,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'You Might Like'),
    },

    [ROUTE_NAMES.POPULAR_SEE_ALL]: {
      screen: PopularSeeAll,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'Popular'),
    },

    [ROUTE_NAMES.EVENT_DETAILS]: {
      screen: EventDetails,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },

    [ROUTE_NAMES.DISH_DETAIL]: {
      screen: DisheDetail,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },

    [CONSTANTS.ROUTE_RESTAURANT_DETAIL]: {
      screen: RestaurantDetail,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },

    [CONSTANTS.ROUTE_RESTAURANT_ADDRESS_MAP]: {
      screen: RestaurantAddressMap,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(
        navigation,
        navigation.state.params[CONSTANTS.NAVIGATION_PARAM_RESTAURANT_NAME],
      ),
    },

    [CONSTANTS.ROUTE_DISH_DETAIL_REVIEW]: {
      screen: DisheDetail,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
