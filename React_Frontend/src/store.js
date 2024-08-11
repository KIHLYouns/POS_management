import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk'; // Adjusted import statement

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Automatically use Redux DevTools if not in production
});

export default store;