import Immutable from 'seamless-immutable';

export const Types = {
  GET_DISH_DETAIL_REQUEST: 'dish/GET_DISH_DETAIL_REQUEST',
  GET_DISH_DETAIL_SUCCESS: 'dish/GET_DISH_DETAIL_SUCCESS',
  GET_DISH_DETAIL_FAILURE: 'dish/GET_DISH_DETAIL_FAILURE',
  GET_ALL_DISHES_REQUEST: 'dish/GET_ALL_DISHES_REQUEST',
  GET_ALL_DISHES_SUCCESS: 'dish/GET_ALL_DISHES_SUCCESS',
  GET_ALL_DISHES_FAILURE: 'dish/GET_ALL_DISHES_FAILURE',
};

const initialState = Immutable({
  isDishesEmpty: false,
  loading: false,
  dishDetail: {},
  error: false,
  dishes: [],
});

export const Creators = {
  requestAllDishes: () => ({
    type: Types.GET_ALL_DISHES_REQUEST,
  }),

  requestAllDishesSuccess: data => ({
    type: Types.GET_ALL_DISHES_SUCCESS,
    payload: { data },
  }),

  requestAllDishesFailure: () => ({
    type: Types.GET_ALL_DISHES_FAILURE,
  }),

  requestDishDetail: id => ({
    type: Types.GET_DISH_DETAIL_REQUEST,
    payload: { id },
  }),

  requestDishDetailSuccess: data => ({
    type: Types.GET_DISH_DETAIL_SUCCESS,
    payload: { data },
  }),

  requestDishDetailFailure: () => ({
    type: Types.GET_DISH_DETAIL_FAILURE,
  }),
};

const dish = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_ALL_DISHES_REQUEST:
      return {
        ...state,
        isDishesEmpty: false,
        loading: true,
        error: false,
      };

    case Types.GET_ALL_DISHES_SUCCESS:
      return {
        ...state,
        isDishesEmpty: payload.data.length === 0,
        dishes: payload.data,
        loading: false,
      };

    case Types.GET_ALL_DISHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case Types.GET_DISH_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case Types.GET_DISH_DETAIL_SUCCESS:
      return {
        ...state,
        dishDetail: payload.data,
        loading: false,
        error: false,
      };

    case Types.GET_DISH_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default dish;
