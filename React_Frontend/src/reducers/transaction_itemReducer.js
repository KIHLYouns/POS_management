import {
  FETCH_TRANSACTIONITEMS_BEGIN,
  FETCH_TRANSACTIONITEMS_SUCCESS,
  FETCH_TRANSACTIONITEMS_FAILURE,
  FETCH_TRANSACTIONITEMS_BY_ID_BEGIN,
  FETCH_TRANSACTIONITEMS_BY_ID_SUCCESS,
  FETCH_TRANSACTIONITEMS_BY_ID_FAILURE,
  ADD_TRANSACTIONITEM_BEGIN,
  ADD_TRANSACTIONITEM_SUCCESS,
  ADD_TRANSACTIONITEM_FAILURE,
  DELETE_TRANSACTIONITEM_BEGIN,
  DELETE_TRANSACTIONITEM_SUCCESS,
  DELETE_TRANSACTIONITEM_FAILURE,
  UPDATE_TRANSACTIONITEM_BEGIN,
  UPDATE_TRANSACTIONITEM_SUCCESS,
  UPDATE_TRANSACTIONITEM_FAILURE
} from '../actions/transaction_itemActions';

const initialState = {
  transactionitems: [],
  loading: false,
  error: null
};

function transactionitemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONITEMS_BEGIN:
    case FETCH_TRANSACTIONITEMS_BY_ID_BEGIN:
    case ADD_TRANSACTIONITEM_BEGIN:
    case DELETE_TRANSACTIONITEM_BEGIN:
    case UPDATE_TRANSACTIONITEM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANSACTIONITEMS_SUCCESS:
    case FETCH_TRANSACTIONITEMS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionitems: action.payload.transactionitems
      };
    case ADD_TRANSACTIONITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionitems: [...state.transactionitems, action.payload.transactionitem]
      };
    case DELETE_TRANSACTIONITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionitems: state.transactionitems.filter(transactionitem => transactionitem.id !== action.payload.transactionitemId)
      };
    case UPDATE_TRANSACTIONITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionitems: state.transactionitems.map(transactionitem =>
          transactionitem.id === action.payload.transactionitem.id ? action.payload.transactionitem : transactionitem
        )
      };
    case FETCH_TRANSACTIONITEMS_FAILURE:
    case FETCH_TRANSACTIONITEMS_BY_ID_FAILURE:
    case ADD_TRANSACTIONITEM_FAILURE:
    case DELETE_TRANSACTIONITEM_FAILURE:
    case UPDATE_TRANSACTIONITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactionitems: []
      };
    default:
      return state;
  }
}

export default transactionitemReducer;