import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAdmin from "../pages/admin/axois-admin";


export  const fetchCarSeat = createAsyncThunk("seat/fetchcarSeat", async(id)=>{
  try {
      const seat = await axiosAdmin.get(`/car/${id}/seat`)
      return seat.data
  } catch (error) {
      console.log(error);
  }
})
const seatSlice=createSlice({
  name: "seat",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
  },
  reducers:{
    getAllSeat:(state,action)=>{
     return state = action.payload;
    },
   
    addSeat: (state, action) => {
      state.data.push(action.payload);
    },
    deleteSeat: (state, action) => {
      // const proId = action.payload;
      return state.filter((p) => p.id !== action.payload);
    },
    updateSeat: (state, action) => {
      const updatedSeat = action.payload;
      const SeatId = updatedSeat.id;

      return state.map((Seat) => {
        if (Seat.id === SeatId) {
          return { ...Seat, ...updatedSeat };
        }
        return Seat;
      });
    }
  },
    extraReducers: {

    [fetchCarSeat.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchCarSeat.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchCarSeat.rejected]: (state, action) => {
      // state.error = 'lỗi';
      state.data = action.payload;
    },
  },
})
export const { getAllSeat,addSeat, deleteSeat, updateSeat } =  seatSlice.actions;

export default  seatSlice.reducer;
