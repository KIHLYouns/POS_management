import axios from 'axios';

// Action Types
const FETCH_INVENTORY_BEGIN = 'FETCH_INVENTORY_BEGIN';
const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';

const ADD_INVENTORY_ITEM_BEGIN = 'ADD_INVENTORY_ITEM_BEGIN';
const ADD_INVENTORY_ITEM_SUCCESS = 'ADD_INVENTORY_ITEM_SUCCESS';
const ADD_INVENTORY_ITEM_FAILURE = 'ADD_INVENTORY_ITEM_FAILURE';

const DELETE_INVENTORY_ITEM_BEGIN = 'DELETE_INVENTORY_ITEM_BEGIN';
const DELETE_INVENTORY_ITEM_SUCCESS = 'DELETE_INVENTORY_ITEM_SUCCESS';
const DELETE_INVENTORY_ITEM_FAILURE = 'DELETE_INVENTORY_ITEM_FAILURE';

const UPDATE_INVENTORY_ITEM_BEGIN = 'UPDATE_INVENTORY_ITEM_BEGIN';
const UPDATE_INVENTORY_ITEM_SUCCESS = 'UPDATE_INVENTORY_ITEM_SUCCESS';
const UPDATE_INVENTORY_ITEM_FAILURE = 'UPDATE_INVENTORY_ITEM_FAILURE';

// API Endpoint
const API_ENDPOINT = 'http://localhost:8088/api';

// Enhanced Helper function for making API calls with better error handling
const apiCall = async (method, path, data) => {
  try {
    const response = await axios[method](`${API_ENDPOINT}/${path}`, data);
    return { data: response.data };
  } catch (error) {
    console.error("API call error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('An unknown error occurred');
  }
};

// Action Creators
export const fetchInventoryItems = () => async dispatch => {
  dispatch({ type: FETCH_INVENTORY_BEGIN });
  try {
    const { data } = await apiCall('get', 'inventory');
    dispatch({ type: FETCH_INVENTORY_SUCCESS, payload: { inventory: data } });
  } catch (error) {
    dispatch({ type: FETCH_INVENTORY_FAILURE, payload: { error } });
  }
};

export const addInventoryItem = (inventoryData) => async dispatch => {
  dispatch({ type: ADD_INVENTORY_ITEM_BEGIN });
  try {
    const { data } = await apiCall('post', 'inventory', inventoryData);
    dispatch({ type: ADD_INVENTORY_ITEM_SUCCESS, payload: { inventoryItem: data } });
    dispatch(fetchInventoryItems());
  } catch (error) {
    dispatch({ type: ADD_INVENTORY_ITEM_FAILURE, payload: { error } });
  }
};

export const deleteInventoryItem = (itemId) => async dispatch => {
  dispatch({ type: DELETE_INVENTORY_ITEM_BEGIN });
  try {
    await apiCall('delete', `inventory/${itemId}`);
    dispatch({ type: DELETE_INVENTORY_ITEM_SUCCESS, payload: { itemId } });
    dispatch(fetchInventoryItems());
  } catch (error) {
    dispatch({ type: DELETE_INVENTORY_ITEM_FAILURE, payload: { error } });
  }
};

export const updateInventoryItem = (id, inventoryData) => async dispatch => {
  dispatch({ type: UPDATE_INVENTORY_ITEM_BEGIN });
  try {
    const { data } = await apiCall('put', `inventory/${id}`, inventoryData);
    dispatch({ type: UPDATE_INVENTORY_ITEM_SUCCESS, payload: { inventoryItem: data } });
    dispatch(fetchInventoryItems());
  } catch (error) {
    dispatch({ type: UPDATE_INVENTORY_ITEM_FAILURE, payload: { error } });
  }
};

// Export Action Types
export {
  FETCH_INVENTORY_BEGIN,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_FAILURE,
  ADD_INVENTORY_ITEM_BEGIN,
  ADD_INVENTORY_ITEM_SUCCESS,
  ADD_INVENTORY_ITEM_FAILURE,
  DELETE_INVENTORY_ITEM_BEGIN,
  DELETE_INVENTORY_ITEM_SUCCESS,
  DELETE_INVENTORY_ITEM_FAILURE,
  UPDATE_INVENTORY_ITEM_BEGIN,
  UPDATE_INVENTORY_ITEM_SUCCESS,
  UPDATE_INVENTORY_ITEM_FAILURE
};