import Immutable from 'seamless-immutable';

export const Types = {
  GET_SINGLE_REQUEST: 'dish/GET_SINGLE_REQUEST',
  GET_SINGLE_SUCCESS: 'dish/GET_SINGLE_SUCCESS',
  GET_SINGLE_FAILURE: 'dish/GET_SINGLE_FAILURE',
  GET_ALL_REQUEST: 'dish/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'dish/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'dish/GET_ALL_FAILURE',
};

const initialState = Immutable({
  requestSingleLoading: false,
  requestSingleError: null,
  requestSingleData: {},
  requestAllLoading: false,
  requestAllError: null,
  requestAllData: [],
});

export default function dish(state = initialState, action) {
  switch (action.type) {
    case Types.GET_SINGLE_REQUEST:
      return {
        ...state,
        requestSingleLoading: true,
      };

    case Types.GET_SINGLE_SUCCESS:
      return {
        ...state,
        requestSingleData: action.payload.data,
        requestSingleLoading: false,
        requestSingleError: null,
      };

    case Types.GET_SINGLE_FAILURE:
      return {
        ...state,
        requestSingleLoading: false,
        requestSingleError: action.payload.error,
      };

    case Types.GET_ALL_REQUEST:
      return {
        ...state,
        requestAllLoading: true,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        ...state,
        requestAllData: action.payload.data,
        requestAllLoading: false,
        requestAllError: null,
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        requestAllLoading: false,
        requestAllError: action.payload.error,
      };

    default:
      return state;
  }
}

export const Creators = {
  getSingleDishRequest: id => ({
    type: Types.GET_SINGLE_REQUEST,
    id,
  }),

  getSingleDishSuccess: data => ({
    type: Types.GET_SINGLE_SUCCESS,
    payload: { data },
  }),

  getSingleDishFailure: error => ({
    type: Types.GET_SINGLE_FAILURE,
    payload: { error },
  }),

  getAllDishesRequest: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllDishesSuccess: data => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { data },
  }),

  getAllDishesFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),
};
