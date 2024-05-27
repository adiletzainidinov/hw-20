import { applyMiddleware, combineReducers, createStore } from 'redux';
import { basketReducer } from './reducers/basketReducer';
import {thunk} from "redux-thunk"

const rootReducer = combineReducers({
  basket: basketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
