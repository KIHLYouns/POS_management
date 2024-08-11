import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import productsReducer from './productsReducer';
import inventoryReducer from './inventoryreducer';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  products: productsReducer,
  inventory: inventoryReducer,
});

export default rootReducer;