import { createSlice } from '@reduxjs/toolkit';

const dataTicketSlice = createSlice({
  name: 'dataTicket',
  initialState: {
    formData: {},
    userData: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearForm: (state) => {
      state.formData = {};
      state.userData = {};

    },
  },
});

export const { setFormData, setUserData,  clearForm } = dataTicketSlice.actions;
export default dataTicketSlice.reducer;
