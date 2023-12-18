import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosAdmin from "../pages/admin/axois-admin";
import axiosDriver from "../pages/driver/axois-driver";

export  const fetchTripDriver = createAsyncThunk("Trip/fecthTripsDriver", async (id) => {
  try {
      const Trip = await axiosDriver.get(`/driver/${id}/trip`)
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})

export  const fetchTripDriverDetail = createAsyncThunk("Trip/fecthTripsDriverDetail", async (id) => {
  try {
      const Trip = await axiosDriver.get(`/trip/${id}`)
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})
export  const changeStatusDriver = createAsyncThunk("Trip/changeStatusDriver ", async(data)=>{
  try {
      const changeStatus = await axiosDriver.post(`/trip/change-status`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return  changeStatus.data
  } catch (error) {
      console.log(error);
  }
})

export  const deleteTripDriver= createAsyncThunk("Trip/deleteTripsDriverDetail", async (id) => {
  try {
      const Trip = await axiosAdmin.delete(`/trip/${id}`)
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})
const TripDriverSlice=createSlice({
  name: "TripDriver",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    delete:null,
    update:null,
    changeStatus:null
  },
  reducers:{

  },
    extraReducers: {
    [fetchTripDriver.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchTripDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchTripDriver.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [fetchTripDriverDetail.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.update = action.payload;
    },
    [fetchTripDriverDetail.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchTripDriverDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.update = action.payload;
    },
    [changeStatusDriver.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.changeStatus = action.payload;
    },
    [changeStatusDriver.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [changeStatusDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.changeStatus = action.payload;
    },
    [deleteTripDriver.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
    [deleteTripDriver.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deleteTripDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },

  },
})
// export const { getAllTrip,addTrip, deleteTrip, updateTrip } =  TripDriverSlice.actions;

export default  TripDriverSlice.reducer;
