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

const carAdminSlice=createSlice({
  name: "carAdmin",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
  },
  reducers:{
    getAllCar:(state,action)=>{
     return state = action.payload;
    },
   
    addCar: (state, action) => {
      state.data.push(action.payload);
    },
    deleteCar: (state, action) => {
      // const proId = action.payload;
      return state.filter((p) => p.id !== action.payload);
    },
    updateCar: (state, action) => {
      const updatedCar = action.payload;
      const CarId = updatedCar.id;

      return state.map((Car) => {
        if (Car.id === CarId) {
          return { ...Car, ...updatedCar };
        }
        return Car;
      });
    }
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

  },
})
export const { getAllCar,addCar, deleteCar, updateCar } =  carAdminSlice.actions;

export default  carAdminSlice.reducer;
