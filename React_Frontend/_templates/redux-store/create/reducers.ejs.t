---
to: src/reducers/<%= h.inflection.underscore(entityName) %>Reducer.js
---
import {
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
} from '../actions/<%= h.inflection.underscore(entityName) %>Actions';

const initialState = {
  <%= entityName.toLowerCase() %>s: [],
  loading: false,
  error: null
};

function <%= entityName.toLowerCase() %>Reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_<%= entityName.toUpperCase() %>S_BEGIN:
    case ADD_<%= entityName.toUpperCase() %>_BEGIN:
    case DELETE_<%= entityName.toUpperCase() %>_BEGIN:
    case UPDATE_<%= entityName.toUpperCase() %>_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_<%= entityName.toUpperCase() %>S_SUCCESS:
      return {
        ...state,
        loading: false,
        <%= entityName.toLowerCase() %>s: action.payload.<%= entityName.toLowerCase() %>s
      };
    case ADD_<%= entityName.toUpperCase() %>_SUCCESS:
      return {
        ...state,
        loading: false,
        <%= entityName.toLowerCase() %>s: [...state.<%= entityName.toLowerCase() %>s, action.payload.<%= entityName.toLowerCase() %>]
      };
    case DELETE_<%= entityName.toUpperCase() %>_SUCCESS:
      return {
        ...state,
        loading: false,
        <%= entityName.toLowerCase() %>s: state.<%= entityName.toLowerCase() %>s.filter(<%= entityName.toLowerCase() %> => <%= entityName.toLowerCase() %>.id !== action.payload.<%= entityName.toLowerCase() %>Id)
      };
    case UPDATE_<%= entityName.toUpperCase() %>_SUCCESS:
      return {
        ...state,
        loading: false,
        <%= entityName.toLowerCase() %>s: state.<%= entityName.toLowerCase() %>s.map(<%= entityName.toLowerCase() %> =>
          <%= entityName.toLowerCase() %>.id === action.payload.<%= entityName.toLowerCase() %>.id ? action.payload.<%= entityName.toLowerCase() %> : <%= entityName.toLowerCase() %>
        )
      };
    case FETCH_<%= entityName.toUpperCase() %>S_FAILURE:
    case ADD_<%= entityName.toUpperCase() %>_FAILURE:
    case DELETE_<%= entityName.toUpperCase() %>_FAILURE:
    case UPDATE_<%= entityName.toUpperCase() %>_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        <%= entityName.toLowerCase() %>s: []
      };
    default:
      return state;
  }
}

export default <%= entityName.toLowerCase() %>Reducer;