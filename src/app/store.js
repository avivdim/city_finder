import {configureStore} from '@reduxjs/toolkit';
import CitiesReducer from '../features/cities/citiesSlice';
export const store = configureStore({
  reducer: {cities: CitiesReducer},
});
