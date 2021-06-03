import { createSlice } from '@reduxjs/toolkit';

export const seatsSlice = createSlice({
  name: 'seats',
  initialState: {
    seats: null,
    reserveNumber: 0,
    adjacent: false,
    proposedSeats: [],
  },
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },

    setProposedSeats: (state) => {
      state.proposedSeats = state.seats.filter((seat) => seat.proposed);
    },

    setReserveNumber: (state, action) => {
      state.reserveNumber = action.payload;
    },

    toggleProposed: (state, { payload: id }) => {
      const index = state.seats.findIndex((seat) => seat.id === id);
      state.seats[index].proposed = !state.seats[index].proposed;
    },

    toggleAdjacent: (state) => {
      state.adjacent = !state.adjacent;
    },

    clearData: (state) => {
      state.seats = null;
      state.reserveNumber = 0;
      state.adjacent = false;
      state.proposedSeats = [];
    },
  },
});

export const {
  setSeats,
  setReserveNumber,
  toggleAdjacent,
  toggleProposed,
  setProposedSeats,
  clearData,
} = seatsSlice.actions;

export const selectReserveNumber = (state) => state.seats.reserveNumber;
export const selectAdjacent = (state) => state.seats.adjacent;
export const selectSeats = (state) => state.seats.seats;
export const selectProposedSeats = (state) => state.seats.proposedSeats;

export default seatsSlice.reducer;
