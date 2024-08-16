import axios from 'axios';

// Action Types
const FETCH_TRANSACTIONS_BEGIN   = 'FETCH_TRANSACTIONS_BEGIN';
const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';

const ADD_TRANSACTION_BEGIN   = 'ADD_TRANSACTION_BEGIN';
const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
const ADD_TRANSACTION_FAILURE = 'ADD_TRANSACTION_FAILURE';

const DELETE_TRANSACTION_BEGIN   = 'DELETE_TRANSACTION_BEGIN';
const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';

const UPDATE_TRANSACTION_BEGIN   = 'UPDATE_TRANSACTION_BEGIN';
const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE';

// API Endpoint
const API_ENDPOINT = 'http://localhost:8088/api';

// Helper function for making API calls
const apiCall = async (method, path, data) => {
  try {
    const response = await axios[method](`${API_ENDPOINT}/${path}`, data);
    return { data: response.data };
  } catch (error) {
    throw error.response ? error.response.data : new Error('An unknown error occurred');
  }
};

// Action Creators
export const fetchTransactions = () => async dispatch => {
  dispatch({ type: FETCH_TRANSACTIONS_BEGIN });
  try {
    const { data } = await apiCall('get', 'transactions'); 
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: { transactions: data } });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTIONS_FAILURE, payload: { error } });
  }
};

export const addTransaction = (transactionData) => async dispatch => {
  dispatch({ type: ADD_TRANSACTION_BEGIN });
  try {
    const { data } = await apiCall('post', 'transactions', transactionData);
    dispatch({ type: ADD_TRANSACTION_SUCCESS, payload: { transaction: data } });
    dispatch(fetchTransactions());
  } catch (error) {
    dispatch({ type: ADD_TRANSACTION_FAILURE, payload: { error } });
  }
};

export const deleteTransaction = (transactionId) => async dispatch => {
  dispatch({ type: DELETE_TRANSACTION_BEGIN });
  try {
    await apiCall('delete', `transactions/${transactionId}`);
    dispatch({ type: DELETE_TRANSACTION_SUCCESS, payload: { transactionId } });
    dispatch(fetchTransactions());
  } catch (error) {
    dispatch({ type: DELETE_TRANSACTION_FAILURE, payload: { error } });
  }
};

export const updateTransaction = (transactionId, transactionData) => async dispatch => {
  dispatch({ type: UPDATE_TRANSACTION_BEGIN });
  try {
    const { data } = await apiCall('put', `transactions/${transactionId}`, transactionData);
    dispatch({ type: UPDATE_TRANSACTION_SUCCESS, payload: { transaction: data } });
    dispatch(fetchTransactions());
  } catch (error) {
    dispatch({ type: UPDATE_TRANSACTION_FAILURE, payload: { error } });
  }
};

// Export Action Types
export {
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
};