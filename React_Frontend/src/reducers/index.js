import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";
import productsReducer from "./productsReducer";
import inventoryReducer from "./inventoryReducer";
import transactionReducer from "./transactionReducer";
import transactionitemReducer from "./transaction_itemReducer";

const rootReducer = combineReducers({
	darkMode: darkModeReducer,
	products: productsReducer,
	inventory: inventoryReducer,
	transactions: transactionReducer,
	transactionitems: transactionitemReducer,
});

export default rootReducer;
