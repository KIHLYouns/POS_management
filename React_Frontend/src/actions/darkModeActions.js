// React_Frontend/src/actions/darkModeActions.js
export const SET_DARK_MODE_FROM_LOCAL_STORAGE = 'SET_DARK_MODE_FROM_LOCAL_STORAGE';

export const setDarkModeFromLocalStorage = (isDarkMode) => ({
  type: SET_DARK_MODE_FROM_LOCAL_STORAGE,
  payload: isDarkMode,
});

// Add TOGGLE_DARK_MODE action type
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// Add action creator for toggling dark mode
export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE
});