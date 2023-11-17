import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';
export const postPayment = createAsyncThunk(
  'payment/post',
  async (data, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(data).toString();
      const response = await axiosClient.post(`/vnpay-payment?${queryParams}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const dataTicketSlice = createSlice({
  name: 'dataTicket',
  initialState: {
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    // formData: {},
    // userData: {},
  },
  reducers: {
    // setFormData: (state, action) => {
    //   state.formData = action.payload;
    // },
    // setUserData: (state, action) => {
    //   state.userData = action.payload;
    // },
    // clearForm: (state) => {
    //   state.formData = {};
    //   state.userData = {};

    // },
  },
  extraReducers: {
    [postPayment.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [postPayment.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [postPayment.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
  },
});

// export const { } = dataTicketSlice.actions;
export default dataTicketSlice.reducer;
