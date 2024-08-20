import axios from 'axios';

// Action Types
const FETCH_TRANSACTIONITEMS_BEGIN   = 'FETCH_TRANSACTIONITEMS_BEGIN';
const FETCH_TRANSACTIONITEMS_SUCCESS = 'FETCH_TRANSACTIONITEMS_SUCCESS';
const FETCH_TRANSACTIONITEMS_FAILURE = 'FETCH_TRANSACTIONITEMS_FAILURE';

const FETCH_TRANSACTIONITEMS_BY_ID_BEGIN = 'FETCH_TRANSACTIONITEMS_BY_ID_BEGIN';
const FETCH_TRANSACTIONITEMS_BY_ID_SUCCESS = 'FETCH_TRANSACTIONITEMS_BY_ID_SUCCESS';
const FETCH_TRANSACTIONITEMS_BY_ID_FAILURE = 'FETCH_TRANSACTIONITEMS_BY_ID_FAILURE';

const ADD_TRANSACTIONITEM_BEGIN   = 'ADD_TRANSACTIONITEM_BEGIN';
const ADD_TRANSACTIONITEM_SUCCESS = 'ADD_TRANSACTIONITEM_SUCCESS';
const ADD_TRANSACTIONITEM_FAILURE = 'ADD_TRANSACTIONITEM_FAILURE';

const DELETE_TRANSACTIONITEM_BEGIN   = 'DELETE_TRANSACTIONITEM_BEGIN';
const DELETE_TRANSACTIONITEM_SUCCESS = 'DELETE_TRANSACTIONITEM_SUCCESS';
const DELETE_TRANSACTIONITEM_FAILURE = 'DELETE_TRANSACTIONITEM_FAILURE';

const UPDATE_TRANSACTIONITEM_BEGIN   = 'UPDATE_TRANSACTIONITEM_BEGIN';
const UPDATE_TRANSACTIONITEM_SUCCESS = 'UPDATE_TRANSACTIONITEM_SUCCESS';
const UPDATE_TRANSACTIONITEM_FAILURE = 'UPDATE_TRANSACTIONITEM_FAILURE';

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
export const fetchTransactionItems = () => async dispatch => {
  dispatch({ type: FETCH_TRANSACTIONITEMS_BEGIN });
  try {
    const { data } = await apiCall('get', 'transactionItems'); 
    dispatch({ type: FETCH_TRANSACTIONITEMS_SUCCESS, payload: { transactionitems: data } });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTIONITEMS_FAILURE, payload: { error } });
  }
};

export const addTransactionItem = (transactionitemData) => async dispatch => {
  dispatch({ type: ADD_TRANSACTIONITEM_BEGIN });
  try {
    const { data } = await apiCall('post', 'transactionItems', transactionitemData);
    dispatch({ type: ADD_TRANSACTIONITEM_SUCCESS, payload: { transactionitem: data } });
    dispatch(fetchTransactionItems());
  } catch (error) {
    dispatch({ type: ADD_TRANSACTIONITEM_FAILURE, payload: { error } });
  }
};

export const deleteTransactionItem = (transactionitemId) => async dispatch => {
  dispatch({ type: DELETE_TRANSACTIONITEM_BEGIN });
  try {
    await apiCall('delete', `transactionItems/${transactionitemId}`);
    dispatch({ type: DELETE_TRANSACTIONITEM_SUCCESS, payload: { transactionitemId } });
    dispatch(fetchTransactionItems());
  } catch (error) {
    dispatch({ type: DELETE_TRANSACTIONITEM_FAILURE, payload: { error } });
  }
};

export const updateTransactionItem = (transactionitemId, transactionitemData) => async dispatch => {
  dispatch({ type: UPDATE_TRANSACTIONITEM_BEGIN });
  try {
    const { data } = await apiCall('put', `transactionItems/${transactionitemId}`, transactionitemData);
    dispatch({ type: UPDATE_TRANSACTIONITEM_SUCCESS, payload: { transactionitem: data } });
    dispatch(fetchTransactionItems());
  } catch (error) {
    dispatch({ type: UPDATE_TRANSACTIONITEM_FAILURE, payload: { error } });
  }
};

// Export Action Types
export {
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
};