
import { weatherInfo, GraphData } from './../../type';
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export interface WeatherState {
  currWeather: weatherInfo;
  isSearch: boolean;
  cityWeatherList: string[];
  list: GraphData["list"];
}


const initialState: WeatherState = {
  currWeather: {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [
      {
        description: "",
        icon: "",
        id: 0,
        main: "",
      },
    ],
    base: "",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0
    },
    clouds: {
      all: 0
    },
    rain: {
      "1h": 0,
      "3h": 0
    },
    snow: {
      "1h": 0,
      "3h": 0
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "",
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0
  },
  isSearch: false,
  cityWeatherList: [],
  list: [
    {
      dt: 0,
      main: {
        temp: 0,
      },
      dt_txt: "",
    }
  ],
};


export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    LocationSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    addToWishlist: (state, action) => {
      state.cityWeatherList.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.cityWeatherList.filter((cityName) => cityName !== action.payload);
      state.cityWeatherList = updatedWishlist;
    },
    setGraphData: (state, action) => {
      state.list = action.payload;
    }
  },
})
export const selectCityList = (state: RootState) => state.wishlistSlice.cityWeatherList;

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist, LocationSearch, setGraphData } = wishlistSlice.actions

export default wishlistSlice.reducer