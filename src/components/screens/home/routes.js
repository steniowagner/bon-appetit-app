import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import RestaurantAddressMap from 'components/common/RestaurantAddressMap';
import RestaurantDetail from 'components/common/restaurant-detail';
import FoodDetail from 'components/common/food-detail';
import FoodDetailReview from 'components/common/restaurant-detail/components/food-detail-review';
import PopularSeeAll from 'components/screens/home/components/popular/popular-see-all';
import YMLSeeAll from 'components/screens/home/components/you-might-like/yml-see-all';

import EventDetails from './components/in-your-city/components/EventDetails';
import AllEvents from './components/in-your-city/components/all-events-list';

import Home from './index';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  EVENT_DETAILS: 'EVENT_DETAILS',
  ALL_EVENTS: 'ALL_EVENTS',
  RESTAURANT_DETAIL: 'RESTAURANT_DETAIL',
  RESTAURANT_ADDRESS_MAP: 'RESTAURANT_ADDRESS_MAP',
  FOOD_DETAIL: 'FOOD_DETAIL',
  ALL_POPULAR: 'ALL_POPULAR',
  ALL_YOU_MIGHT_LIKE: 'ALL_YOU_MIGHT_LIKE',
  FOOD_DETAIL_REVIEW: 'FOOD_DETAIL_REVIEW',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.HOME]: {
    screen: Home,
    navigationOptions: () => ({
      headerBackTitle: null,
      borderBottomWidth: 0,
    }),
  },

  [ROUTE_NAMES.EVENT_DETAILS]: {
    screen: EventDetails,
    navigationOptions: () => ({
      headerBackTitle: null,
      borderBottomWidth: 0,
    }),
  },

  [ROUTE_NAMES.ALL_EVENTS]: {
    screen: AllEvents,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.RESTAURANT_DETAIL]: {
    screen: RestaurantDetail,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.RESTAURANT_ADDRESS_MAP]: {
    screen: RestaurantAddressMap,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.FOOD_DETAIL]: {
    screen: FoodDetail,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.FOOD_DETAIL_REVIEW]: {
    screen: FoodDetailReview,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.ALL_POPULAR]: {
    screen: PopularSeeAll,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.ALL_YOU_MIGHT_LIKE]: {
    screen: YMLSeeAll,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },
},
{
  initialRouteName: ROUTE_NAMES.HOME,
  mode: Platform.OS === 'ios' ? 'card' : 'modal',
  headerMode: 'screen',
});

ROUTES.navigationOptions = ({ navigation }) => {
  const isTabView = navigation.state.index <= 0;
  const tabBarVisible = isTabView;

  return {
    tabBarVisible,
  };
};

export default ROUTES;
