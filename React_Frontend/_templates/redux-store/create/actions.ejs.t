---
to: src/actions/<%= h.inflection.underscore(entityName) %>Actions.js
---
import axios from 'axios';

// Action Types
const FETCH_<%= entityName.toUpperCase() %>S_BEGIN   = 'FETCH_<%= entityName.toUpperCase() %>S_BEGIN';
const FETCH_<%= entityName.toUpperCase() %>S_SUCCESS = 'FETCH_<%= entityName.toUpperCase() %>S_SUCCESS';
const FETCH_<%= entityName.toUpperCase() %>S_FAILURE = 'FETCH_<%= entityName.toUpperCase() %>S_FAILURE';

const ADD_<%= entityName.toUpperCase() %>_BEGIN   = 'ADD_<%= entityName.toUpperCase() %>_BEGIN';
const ADD_<%= entityName.toUpperCase() %>_SUCCESS = 'ADD_<%= entityName.toUpperCase() %>_SUCCESS';
const ADD_<%= entityName.toUpperCase() %>_FAILURE = 'ADD_<%= entityName.toUpperCase() %>_FAILURE';

const DELETE_<%= entityName.toUpperCase() %>_BEGIN   = 'DELETE_<%= entityName.toUpperCase() %>_BEGIN';
const DELETE_<%= entityName.toUpperCase() %>_SUCCESS = 'DELETE_<%= entityName.toUpperCase() %>_SUCCESS';
const DELETE_<%= entityName.toUpperCase() %>_FAILURE = 'DELETE_<%= entityName.toUpperCase() %>_FAILURE';

const UPDATE_<%= entityName.toUpperCase() %>_BEGIN   = 'UPDATE_<%= entityName.toUpperCase() %>_BEGIN';
const UPDATE_<%= entityName.toUpperCase() %>_SUCCESS = 'UPDATE_<%= entityName.toUpperCase() %>_SUCCESS';
const UPDATE_<%= entityName.toUpperCase() %>_FAILURE = 'UPDATE_<%= entityName.toUpperCase() %>_FAILURE';

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
export const fetch<%= entityName %>s = () => async dispatch => {
  dispatch({ type: FETCH_<%= entityName.toUpperCase() %>S_BEGIN });
  try {
    const { data } = await apiCall('get', '<%= entityName.toLowerCase() %>s'); 
    dispatch({ type: FETCH_<%= entityName.toUpperCase() %>S_SUCCESS, payload: { <%= entityName.toLowerCase() %>s: data } });
  } catch (error) {
    dispatch({ type: FETCH_<%= entityName.toUpperCase() %>S_FAILURE, payload: { error } });
  }
};

export const add<%= entityName %> = (<%= entityName.toLowerCase() %>Data) => async dispatch => {
  dispatch({ type: ADD_<%= entityName.toUpperCase() %>_BEGIN });
  try {
    const { data } = await apiCall('post', '<%= entityName.toLowerCase() %>s', <%= entityName.toLowerCase() %>Data);
    dispatch({ type: ADD_<%= entityName.toUpperCase() %>_SUCCESS, payload: { <%= entityName.toLowerCase() %>: data } });
    dispatch(fetch<%= entityName %>s());
  } catch (error) {
    dispatch({ type: ADD_<%= entityName.toUpperCase() %>_FAILURE, payload: { error } });
  }
};

export const delete<%= entityName %> = (<%= entityName.toLowerCase() %>Id) => async dispatch => {
  dispatch({ type: DELETE_<%= entityName.toUpperCase() %>_BEGIN });
  try {
    await apiCall('delete', `<%= entityName.toLowerCase() %>s/${<%= entityName.toLowerCase() %>Id}`);
    dispatch({ type: DELETE_<%= entityName.toUpperCase() %>_SUCCESS, payload: { <%= entityName.toLowerCase() %>Id } });
    dispatch(fetch<%= entityName %>s());
  } catch (error) {
    dispatch({ type: DELETE_<%= entityName.toUpperCase() %>_FAILURE, payload: { error } });
  }
};

export const update<%= entityName %> = (<%= entityName.toLowerCase() %>Id, <%= entityName.toLowerCase() %>Data) => async dispatch => {
  dispatch({ type: UPDATE_<%= entityName.toUpperCase() %>_BEGIN });
  try {
    const { data } = await apiCall('put', `<%= entityName.toLowerCase() %>s/${<%= entityName.toLowerCase() %>Id}`, <%= entityName.toLowerCase() %>Data);
    dispatch({ type: UPDATE_<%= entityName.toUpperCase() %>_SUCCESS, payload: { <%= entityName.toLowerCase() %>: data } });
    dispatch(fetch<%= entityName %>s());
  } catch (error) {
    dispatch({ type: UPDATE_<%= entityName.toUpperCase() %>_FAILURE, payload: { error } });
  }
};

// Export Action Types
export {
  FETCH_<%= entityName.toUpperCase() %>S_BEGIN,
  FETCH_<%= entityName.toUpperCase() %>S_SUCCESS,
  FETCH_<%= entityName.toUpperCase() %>S_FAILURE,
  ADD_<%= entityName.toUpperCase() %>_BEGIN,
  ADD_<%= entityName.toUpperCase() %>_SUCCESS,
  ADD_<%= entityName.toUpperCase() %>_FAILURE,
  DELETE_<%= entityName.toUpperCase() %>_BEGIN,
  DELETE_<%= entityName.toUpperCase() %>_SUCCESS,
  DELETE_<%= entityName.toUpperCase() %>_FAILURE,
  UPDATE_<%= entityName.toUpperCase() %>_BEGIN,
  UPDATE_<%= entityName.toUpperCase() %>_SUCCESS,
  UPDATE_<%= entityName.toUpperCase() %>_FAILURE
};