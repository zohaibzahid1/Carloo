import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // You'll add other reducers here later as you refactor more modules
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;