
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

const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';

// Initial State
const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

// Reducer
function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
    case FETCH_CATEGORIES_BEGIN:
    case ADD_PRODUCT_BEGIN:
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload.product],
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.productId),
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.product.id ? action.payload.product : product
        ),
      };
    case FETCH_PRODUCTS_FAILURE:
    case FETCH_CATEGORIES_FAILURE:
    case ADD_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default productsReducer;