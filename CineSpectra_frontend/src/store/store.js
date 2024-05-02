import { configureStore } from '@reduxjs/toolkit'
// import { applyMiddleware, createStore } from 'redux';
// import { thunk } from 'redux-thunk';
import authReducer from '../reducers'
import homeSlice from './homeSlice'
import { combineReducers } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    home: combineReducers({ homeSlice, authReducer})
  },
});