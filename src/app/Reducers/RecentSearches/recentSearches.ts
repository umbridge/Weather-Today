import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../../store'

// Define a type for the slice state
interface RecentLocations {
  city: string;
}

// Define the initial state using that type
const initialState: RecentLocations = {
  city: ""
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state;
    },
    decrement: (state) => {
      state;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state;
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer