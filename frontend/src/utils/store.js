// store.js
import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer, 
});

const store = createStore(rootReducer);

export default store;
