import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosAdmin from "../pages/admin/axois-admin";

export  const fetchcarAdmin = createAsyncThunk("Car/fecthCars", async () => {
  try {
      const Car = await axiosAdmin.get("/car")
      return Car.data
  } catch (error) {
      console.log(error);
  }
})

export  const fetchcarAdminDetail = createAsyncThunk("Car/fecthCarsDetail", async (id) => {
  try {
      const Car = await axiosAdmin.get(`/car/${id}`)
      return Car.data
  } catch (error) {
      console.log(error);
  }
})

export  const deletecarAdmin= createAsyncThunk("Car/deleteCarsDetail", async (id) => {
  try {
      const Car = await axiosAdmin.delete(`/car/${id}`)
      return Car.data
  } catch (error) {
      console.log(error);
  }
})
const carAdminSlice=createSlice({
  name: "carAdmin",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    delete:null,
    update:null
  },
  reducers:{

  },
    extraReducers: {
    [fetchcarAdmin.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchcarAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchcarAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [fetchcarAdminDetail.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchcarAdminDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.update = action.payload;
    },
    [deletecarAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
    [deletecarAdmin.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deletecarAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },
    [deletecarAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
  },
})
// export const { getAllCar,addCar, deleteCar, updateCar } =  carAdminSlice.actions;

export default  carAdminSlice.reducer;
