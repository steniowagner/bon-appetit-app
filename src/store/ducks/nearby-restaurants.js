import Immutable from 'seamless-immutable';

export const Types = {
  GET_NEAR_BY_RESTAURANTS_REQUEST:
    'nearby-restaurants/GET_NEAR_BY_RESTAURANTS_REQUEST',
  GET_NEAR_BY_RESTAURANTS_SUCCESS:
    'nearby-restaurants/GET_NEAR_BY_RESTAURANTS_SUCCESS',
  GET_NEAR_BY_RESTAURANTS_FAILURE:
    'nearby-restaurants/GET_NEAR_BY_RESTAURANTS_FAILURE',
};

const INITIAL_STATE = Immutable({
  loading: false,
  error: false,
  data: [],
});

export const Creators = {
  requestNearbyRestaurants: (dishesType, userLocation) => ({
    type: Types.GET_NEAR_BY_RESTAURANTS_REQUEST,
    payload: {
      dishesType,
      userLocation,
    },
  }),

  requestNearbyRestaurantsSuccess: data => ({
    type: Types.GET_NEAR_BY_RESTAURANTS_SUCCESS,
    payload: { data },
  }),

  requestNearbyRestaurantsFailure: error => ({
    type: Types.GET_NEAR_BY_RESTAURANTS_FAILURE,
    payload: { error },
  }),
};

const nearbyRestaurants = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_NEAR_BY_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_NEAR_BY_RESTAURANTS_SUCCESS:
      return {
        data: payload.data,
        loading: false,
        error: true,
      };

    case Types.GET_NEAR_BY_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default nearbyRestaurants;
