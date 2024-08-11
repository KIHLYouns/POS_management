import axios from 'axios';

// Action Types
const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const ADD_PRODUCT_BEGIN = 'ADD_PRODUCT_BEGIN';
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

const DELETE_PRODUCT_BEGIN = 'DELETE_PRODUCT_BEGIN';
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const UPDATE_PRODUCT_BEGIN = 'UPDATE_PRODUCT_BEGIN';
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

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
export const fetchProducts = () => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_BEGIN });
  try {
    const { data } = await apiCall('get', 'products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: { products: data } });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: { error } });
  }
};

export const fetchCategories = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORIES_BEGIN });
  try {
    const { data } = await apiCall('get', 'categories');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: { categories: data } });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: { error } });
  }
};

export const addProduct = (productData) => async dispatch => {
  dispatch({ type: ADD_PRODUCT_BEGIN });
  try {
    const { data } = await apiCall('post', 'products', productData);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: { product: data } });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILURE, payload: { error } });
  }
};

export const deleteProduct = (productId) => async dispatch => {
  dispatch({ type: DELETE_PRODUCT_BEGIN });
  try {
    await apiCall('delete', `products/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: { productId } });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: { error } });
  }
};

export const updateProduct = (id, productData) => async dispatch => {
  dispatch({ type: UPDATE_PRODUCT_BEGIN });
  try {
    const { data } = await apiCall('put', `products/${id}`, productData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: { product: data } });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: { error } });
  }
};

// Export Action Types
export {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE
};