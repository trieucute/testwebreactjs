

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';
import { format } from 'date-fns'; 
// Tạo action creator sử dụng createAsyncThunk để gửi yêu cầu API
export const searchTrip = createAsyncThunk('trip/search', async ({ startLocation, endLocation, date,amount }) => {
  // const dateFormat = format(new Date(date), 'yyyy-MM-dd');
  const response = await axiosClient.get(`/trip/search?start_location=${encodeURIComponent(startLocation)}&end_location=${encodeURIComponent(endLocation)}&date=${date}&amount=${amount}`);
  console.log(response.data);
  return response.data;
});
// Tạo slice
const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    trips: null,
    loading: false,
    error: null,
    formData: {
      start_location: '',
      end_location: '',
      date: ''
    },
    selectedTrip: null,
  },
  reducers: {
    tripsdata: (state, action) => {
      // Lưu thông tin các chuyến đi 
      // return action.payload;
      state.loading = false;
      
      state.trips = action.payload;

    },
    updateSearchData: (state, action) => {
      // Cập nhật dữ liệu form trong Redux store dựa trên thông tin được truyền qua action
      state.formData = action.payload;
    },
    setSelectedTrip: (state, action) => {
      // Lưu thông tin chi tiết của chuyến đi được chọn
      // return action.payload;
      state.selectedTrip = action.payload;
    },
    clearSelectedTrip: (state) => {
      // Xóa thông tin chi tiết của chuyến đi đã chọn
      
      state.selectedTrip =null
    },
  },

  extraReducers:  {
    [searchTrip.pending]:( state) => {
      state.loading = true;
      state.error = null;
    },
    [searchTrip.fulfilled]:(state,{payload})=>{
      state.data = payload.data;
      state.loading = false;
    },
    [searchTrip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

},
});

export const { updateSearchData,setSelectedTrip, clearSelectedTrip ,tripsdata } = tripSlice.actions;
export default tripSlice.reducer;
