// React_Frontend/src/reducers/darkModeReducer.js
import { TOGGLE_DARK_MODE, SET_DARK_MODE_FROM_LOCAL_STORAGE } from '../actions/darkModeActions';

const initialState = {
  isDarkMode: false, // Default state
};

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case SET_DARK_MODE_FROM_LOCAL_STORAGE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;