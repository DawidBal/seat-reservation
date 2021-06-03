import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from './seatsSlice';

export default configureStore({
  reducer: {
    seats: seatsReducer,
  },
});
