import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import RestaurantAddressMap from '~/components/common/restaurant-detail/components/RestaurantAddressMap';
import RestaurantDetail from '~/components/common/restaurant-detail';
import DishDetail from '~/components/common/dishe-detail';

import CONSTANTS from '~/utils/CONSTANTS';
import NearYou from './index';

export const ROUTE_NAMES = {
  NEAR_YOU: 'NEAR_YOU',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.NEAR_YOU]: {
      screen: NearYou,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'Near You'),
    },

    [CONSTANTS.ROUTE_RESTAURANT_ADDRESS_MAP]: {
      screen: RestaurantAddressMap,
      navigationOptions: ({ navigation }) => setDefaultHeaderLayout(
        navigation,
        navigation.state.params[CONSTANTS.NAVIGATION_PARAM_RESTAURANT_NAME],
      ),
    },

    [CONSTANTS.ROUTE_DISH_DETAIL_REVIEW]: {
      screen: DishDetail,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },

    [CONSTANTS.ROUTE_RESTAURANT_DETAIL]: {
      screen: RestaurantDetail,
      navigationOptions: ({ navigation }) => setHiddenHeaderLayout(navigation),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.SEARCH,
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
