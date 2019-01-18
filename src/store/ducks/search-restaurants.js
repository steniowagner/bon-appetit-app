import Immutable from 'seamless-immutable';

export const Types = {
  SEARCH_RESTAURANTS_REQUEST: 'search-restaurants/SEARCH_RESTAURANTS_REQUEST',
  SEARCH_RESTAURANTS_SUCCESS: 'search-restaurants/SEARCH_RESTAURANTS_SUCCESS',
  SEARCH_RESTAURANTS_FAILURE: 'search-restaurants/SEARCH_RESTAURANTS_FAILURE',
};

const INITIAL_STATE = Immutable({
  notFound: false,
  loading: false,
  error: false,
  data: [],
});

export const Creators = {
  requestSearchRestaurants: (dishesTypes, maxDistance, userLocation) => ({
    type: Types.SEARCH_RESTAURANTS_REQUEST,
    payload: {
      userLocation,
      dishesTypes,
      maxDistance,
    },
  }),

  requestSearchRestaurantsSuccess: data => ({
    type: Types.SEARCH_RESTAURANTS_SUCCESS,
    payload: { data },
  }),

  requestSearchRestaurantsFailure: () => ({
    type: Types.SEARCH_RESTAURANTS_FAILURE,
  }),
};

const searchRestaurants = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.SEARCH_RESTAURANTS_REQUEST:
      return {
        ...INITIAL_STATE,
        loading: true,
      };

    case Types.SEARCH_RESTAURANTS_SUCCESS:
      return {
        notFound: payload.data.restaurants.length === 0,
        data: payload.data,
        loading: false,
        error: false,
      };

    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default searchRestaurants;
