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
export  const postCarSeat = createAsyncThunk("seat/postcarSeat", async(data)=>{
  try {
    const { id, payload } = data;
      const seat = await axiosAdmin.post(`/car/${id}/seat`, payload,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return seat.data
  } catch (error) {
      console.log(error);
  }
})
export  const deleteCarSeat = createAsyncThunk("seat/deletecarSeat", async(id,idcar)=>{
  try {
      const seat = await axiosAdmin.delete(`/car/${idcar}/seat/${id}`)
      return seat.data
  } catch (err) {
    const res = err.response;
    if (res.status === 500 ) {
      alert('Không xoá được vì có hoá đơn liên kết với ghế!');
    } else {
      console.error(err);
    }
  }
})
export const updateCarSeat = createAsyncThunk("seat/updatecarSeat", async (data, thunkAPI) => {
  try {
    const { id, payload } = data; // Lấy id và dữ liệu từ payload
    const seat = await axiosAdmin.put(`/car/seat/${id}`, payload);
    return seat.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const seatSlice=createSlice({
  name: "seat",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    dataadd:null,
    delete:null,
    update:null
  },
  reducers:{

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
    
    [postCarSeat.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [postCarSeat.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataadd = action.payload;
    },
    [postCarSeat.rejected]: (state, action) => {
      // state.error = 'lỗi';
      state.dataadd  = action.payload;
    },
       
    [deleteCarSeat.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deleteCarSeat.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },
    [deleteCarSeat.rejected]: (state, action) => {
      // state.error = 'lỗi';
      state.delete = action.payload;
    },
    [updateCarSeat.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [updateCarSeat.fulfilled]: (state, action) => {
      state.loading = false;
      state.update = action.payload;
    },
    [updateCarSeat.rejected]: (state, action) => {
      // state.error = 'lỗi';
      state.update = action.payload;
    },
  },
})


export default  seatSlice.reducer;
