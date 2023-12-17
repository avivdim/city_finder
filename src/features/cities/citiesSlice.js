import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filteredCitiesList: [],
  citiesList: [],
  temperatureUnit: 'celsius',
};

export const counterSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setFilteredCitiesList: (state, action) => {
      state.filteredCitiesList = action.payload;
    },
    setCitiesList: (state, action) => {
      state.citiesList = action.payload;
    },
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const {setFilteredCitiesList, setCitiesList, setTemperatureUnit} =
  counterSlice.actions;

export default counterSlice.reducer;
