import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import RestaurantAddressMap from 'components/common/restaurant-detail/components/RestaurantAddressMap';
import RestaurantDetail from 'components/common/restaurant-detail';
import DisheDetail from 'components/common/dishe-detail';
import DisheDetailReview from 'components/common/restaurant-detail/components/DisheDetailReview';
import PopularSeeAll from 'components/screens/home/components/popular/popular-see-all';
import YMLSeeAll from 'components/screens/home/components/you-might-like/yml-see-all';

import EventDetails from './components/EventDetails';
import AllEvents from './components/in-your-city/iyc-see-all';

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
      ...Platform.select({
        android: {
          headerStyle: {
            marginTop: StatusBar.currentHeight,
          },
        },
      }),
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
      ...Platform.select({
        android: {
          headerStyle: {
            marginTop: StatusBar.currentHeight,
          },
        },
      }),
    }),
  },

  [ROUTE_NAMES.RESTAURANT_ADDRESS_MAP]: {
    screen: RestaurantAddressMap,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },

  [ROUTE_NAMES.FOOD_DETAIL]: {
    screen: DisheDetail,
    navigationOptions: () => ({
      headerBackTitle: null,
      ...Platform.select({
        android: {
          headerStyle: {
            marginTop: StatusBar.currentHeight,
          },
        },
      }),
    }),
  },

  [ROUTE_NAMES.FOOD_DETAIL_REVIEW]: {
    screen: DisheDetailReview,
    navigationOptions: () => ({
      headerBackTitle: null,
      ...Platform.select({
        android: {
          headerStyle: {
            marginTop: StatusBar.currentHeight,
          },
        },
      }),
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
