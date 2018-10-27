import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import appStyle from 'styles';

import RestaurantAddressMap from 'components/common/restaurant-detail/components/RestaurantAddressMap';
import DisheDetailReview from 'components/common/restaurant-detail/components/DisheDetailReview';
import RestaurantDetail from 'components/common/restaurant-detail';

import NearYou from './index';

export const ROUTE_NAMES = {
  RESTAURANT_ADDRESS_MAP: 'RESTAURANT_ADDRESS_MAP',
  RESTAURANT_DETAIL: 'RESTAURANT_DETAIL',
  DISHE_DETAIL_REVIEW: 'DISHE_DETAIL_REVIEW',
  NEAR_YOU: 'NEAR_YOU',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.NEAR_YOU]: {
    screen: NearYou,
    navigationOptions: () => ({
      title: 'Near You',
      headerStyle: {
        backgroundColor: appStyle.colors.primaryColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerBackTitle: null,
      headerTintColor: appStyle.colors.defaultWhite,
      headerTitleStyle: {
        color: appStyle.colors.defaultWhite,
        fontFamily: 'CircularStd-Medium',
      },
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

  [ROUTE_NAMES.RESTAURANT_ADDRESS_MAP]: {
    screen: RestaurantAddressMap,
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  },
});

ROUTES.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default ROUTES;
