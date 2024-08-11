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

const UPDATE_INVENTORY_ITEM_BEGIN = 'UPDATE_INVENTORY_ITEM_BEGIN'; // Added missing action type
const UPDATE_INVENTORY_ITEM_SUCCESS = 'UPDATE_INVENTORY_ITEM_SUCCESS';
const UPDATE_INVENTORY_ITEM_FAILURE = 'UPDATE_INVENTORY_ITEM_FAILURE'; // Added missing action type

// Initial State
const initialState = {
  inventory: [],
  loading: false,
  error: null,
};

// Reducer
function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INVENTORY_BEGIN:
    case ADD_INVENTORY_ITEM_BEGIN:
    case DELETE_INVENTORY_ITEM_BEGIN:
    case UPDATE_INVENTORY_ITEM_BEGIN: // Handle begin update
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload.inventory,
      };
    case ADD_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: [...state.inventory, action.payload.inventoryItem],
      };
    case DELETE_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload.itemId),
      };
    case UPDATE_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        inventory: state.inventory.map(item =>
          item.id === action.payload.inventoryItem.id ? action.payload.inventoryItem : item
        ),
      };
    case FETCH_INVENTORY_FAILURE:
    case ADD_INVENTORY_ITEM_FAILURE:
    case DELETE_INVENTORY_ITEM_FAILURE:
    case UPDATE_INVENTORY_ITEM_FAILURE: // Handle failure update
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default inventoryReducer;