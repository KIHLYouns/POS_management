import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  ADD_TRANSACTION_BEGIN,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_BEGIN,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  UPDATE_TRANSACTION_BEGIN,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE
} from '../actions/transactionActions';

const initialState = {
  transactions: [],
  loading: false,
  error: null
};

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_BEGIN:
    case ADD_TRANSACTION_BEGIN:
    case DELETE_TRANSACTION_BEGIN:
    case UPDATE_TRANSACTION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload.transaction]
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload.transactionId)
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.transaction.id ? action.payload.transaction : transaction
        )
      };
    case FETCH_TRANSACTIONS_FAILURE:
    case ADD_TRANSACTION_FAILURE:
    case DELETE_TRANSACTION_FAILURE:
    case UPDATE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactions: []
      };
    default:
      return state;
  }
}

export default transactionReducer;