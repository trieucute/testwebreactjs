import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosAdmin from "../pages/admin/axois-admin";

export  const fetchTripAdmin = createAsyncThunk("Trip/fecthTrips", async () => {
  try {
      const Trip = await axiosAdmin.get("/trip")
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})

export  const fetchTripAdminDetail = createAsyncThunk("Trip/fecthTripsDetail", async (id) => {
  try {
      const Trip = await axiosAdmin.get(`/trip/${id}`)
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})
export  const changeStatus = createAsyncThunk("Trip/changeStatus ", async(data)=>{
  try {
      const changeStatus = await axiosAdmin.post(`/trip/change-status`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return  changeStatus.data
  } catch (error) {
      console.log(error);
  }
})

export  const deleteTripAdmin= createAsyncThunk("Trip/deleteTripsDetail", async (id) => {
  try {
      const Trip = await axiosAdmin.delete(`/trip/${id}`)
      return Trip.data
  } catch (error) {
      console.log(error);
  }
})
const TripAdminSlice=createSlice({
  name: "TripAdmin",
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
    [fetchTripAdmin.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchTripAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchTripAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [fetchTripAdminDetail.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.update = action.payload;
    },
    [fetchTripAdminDetail.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchTripAdminDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.update = action.payload;
    },
    [changeStatus.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.changeStatus = action.payload;
    },
    [changeStatus.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [changeStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.changeStatus = action.payload;
    },
    [deleteTripAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
    [deleteTripAdmin.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deleteTripAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },

  },
})
// export const { getAllTrip,addTrip, deleteTrip, updateTrip } =  TripAdminSlice.actions;

export default  TripAdminSlice.reducer;
