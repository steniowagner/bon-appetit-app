import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import RestaurantAddressMap from 'components/common/restaurant-detail/components/RestaurantAddressMap';
import RestaurantDetail from 'components/common/restaurant-detail';
import DisheDetail from 'components/common/dishe-detail';
import DisheDetailReview from 'components/common/restaurant-detail/components/DisheDetailReview';
import PopularSeeAll from 'components/screens/home/components/popular/popular-see-all';
import YMLSeeAll from 'components/screens/home/components/recommended/recommended-see-all';

import appStyles from 'styles';

import EventDetails from './components/EventDetails';
import AllEvents from './components/in-your-city/iyc-see-all';

import Home from './index';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  EVENT_DETAILS: 'EVENT_DETAILS',
  ALL_EVENTS: 'ALL_EVENTS',
  RESTAURANT_DETAIL: 'RESTAURANT_DETAIL',
  RESTAURANT_ADDRESS_MAP: 'RESTAURANT_ADDRESS_MAP',
  DISHE_DETAIL: 'DISHE_DETAIL',
  ALL_POPULAR: 'ALL_POPULAR',
  ALL_RECOMMENDED: 'ALL_RECOMMENDED',
  DISHE_DETAIL_REVIEW: 'DISHE_DETAIL_REVIEW',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.HOME]: {
    screen: Home,
    navigationOptions: () => ({
      title: 'Bon Appetit',
      headerStyle: {
        backgroundColor: appStyles.colors.red,
        borderBottomWidth: 0,
      },
      headerTintColor: appStyles.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyles.colors.defaultWhite,
        fontFamily: 'Modesta-Script',
        fontWeight: '200',
        fontSize: 28,
      },
      headerBackTitle: null,
      borderBottomWidth: 0,
    }),
  },

  [ROUTE_NAMES.EVENT_DETAILS]: {
    screen: EventDetails,
    navigationOptions: () => ({
      headerTintColor: appStyles.colors.defaultWhite,
      headerTransparent: true,
      headerBackTitle: null,
      borderBottomWidth: 0,
      ...Platform.select({
        android: {
          headerStyle: {
            marginTop: StatusBar.currentHeight,
          },
        },
      }),
    }),
  },

  [ROUTE_NAMES.ALL_EVENTS]: {
    screen: AllEvents,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title || '',
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        borderBottomWidth: 0,
      },
      headerTintColor: appStyles.colors.defaultWhite,
      headerTitleStyle: {
        fontSize: appStyles.metrics.navigationHeaderFontSize,
        fontFamily: 'CircularStd-Medium',
        color: appStyles.colors.defaultWhite,
      },
    }),
  },

  [ROUTE_NAMES.RESTAURANT_DETAIL]: {
    screen: RestaurantDetail,
    navigationOptions: () => ({
      headerTintColor: appStyles.colors.defaultWhite,
      headerTransparent: true,
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
      title: 'Location',
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        borderBottomWidth: 0,
      },
      headerTintColor: appStyles.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyles.colors.defaultWhite,
        fontFamily: 'CircularStd-Medium',
      },
    }),
  },

  [ROUTE_NAMES.DISHE_DETAIL]: {
    screen: DisheDetail,
    navigationOptions: () => ({
      headerTintColor: appStyles.colors.defaultWhite,
      headerTransparent: true,
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

  [ROUTE_NAMES.DISHE_DETAIL_REVIEW]: {
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
      title: 'Popular',
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        borderBottomWidth: 0,
      },
      headerTintColor: appStyles.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyles.colors.defaultWhite,
        fontFamily: 'CircularStd-Medium',
      },
    }),
  },

  [ROUTE_NAMES.ALL_RECOMMENDED]: {
    screen: YMLSeeAll,
    navigationOptions: () => ({
      headerBackTitle: null,
      title: 'Recommended',
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        borderBottomWidth: 0,
      },
      headerTintColor: appStyles.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyles.colors.defaultWhite,
        fontFamily: 'CircularStd-Medium',
      },
    }),
  },
},
{
  initialRouteName: ROUTE_NAMES.HOME,
  mode: Platform.OS === 'ios' ? 'card' : 'modal',
  headerMode: 'screen',
});

ROUTES.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default ROUTES;
