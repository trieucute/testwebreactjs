import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosAdmin from "../pages/admin/axois-admin";

export  const fetchStation = createAsyncThunk("station/fecthStations", async () => {
    try {
        const station = await axiosAdmin.get("/station")
        return station.data
    } catch (error) {
        console.log(error);
    }
  })

export  const fetchStationPoint = createAsyncThunk("station/fecthStationsPoint", async (id) => {
  try {
      const station = await axiosAdmin.get(`/station/${id}/point`)
      return station.data
  } catch (error) {
      console.log(error);
  }
})
export  const deleteStationPoint = createAsyncThunk("station/fecthStationsPoint", async (id) => {
  try {
      const station = await axiosAdmin.delete(`/station/point/${id}`)
      return station.data
  } catch (error) {
      console.log(error);
  }
})

export  const AddStationPoint = createAsyncThunk("station/AddStationPoint", async(data)=>{
  try {
      const point = await axiosAdmin.post(`/station/point`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return  point.data
  } catch (error) {
      console.log(error);
  }
})

export  const AddStation = createAsyncThunk("station/AddStation", async(data)=>{
  try {
      const Station= await axiosAdmin.post(`/station`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return  Station.data
  } catch (error) {
      console.log(error);
  }
})

// export  const fetchAddPoint = createAsyncThunk("station/fecthAddPoint", async (data) => {
//   try {
//       const point = await axiosAdmin.post(`/timepoint`, data)
//       return point.data
//   } catch (error) {
//       console.log(error);
//   }
// })
export  const fetchAddPoint = createAsyncThunk("station/fecthAddPoint", async(data)=>{
  try {
      const point = await axiosAdmin.post(`/timepoint`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return  point.data
  } catch (error) {
      console.log(error);
  }
})

export  const updatePoint = createAsyncThunk("station/updatePoint", async (id,data) => {
  try {
      const Point  = await axiosAdmin.put(`/timepoint/${id}`,data,{
        headers: {
          'Content-Type': 'application/json',
  }
      })
      return Point.data
  } catch (error) {
      console.log(error);
  }
}) 
export  const deletePoint = createAsyncThunk("station/deletePoint", async (id) => {
  try {
      const Point  = await axiosAdmin.delete(`/timepoint/${id}`)
      return Point.data
  } catch (error) {
      console.log(error);
  }
})

export  const fetchStationDetail = createAsyncThunk("station/fecthStationsDetail", async (id) => {
  try {
      const station = await axiosAdmin.get(`/station/${id}`)
      return station.data
  } catch (error) {
      console.log(error);
  }
})

export  const deleteStation= createAsyncThunk("station/deleteStationsDetail", async (id) => {
  try {
      const station = await axiosAdmin.delete(`/station/${id}`)
      return station.data
  } catch (error) {
      console.log(error);
  }
})
const stationSlice=createSlice({
  name: "stationAdmin",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    delete:null,
    stationPoint:null,
    deleteStationPoint:null,
    dataadd:null,
    update:null,
    point:null,
    pointAdd:null,
    pointUpdate:null,
    pointDetele:null,
  },
  reducers:{

  },
    extraReducers: {
    [fetchStation.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchStation.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchStation.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [AddStation.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [AddStation.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataadd = action.payload;
    },
    [AddStation.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.dataadd = action.payload;
    },
    [fetchStationPoint.pending]: (state) => {
        // state.paymentStatus = 'loading';
        state.loading = true;
  
      },
      [fetchStationPoint.fulfilled]: (state, action) => {
        state.loading = false;
        state.point = action.payload;
      },
      [fetchStationPoint.rejected]: (state, action) => {
        state.error = 'lỗi';
        state.point = action.payload;
      },

      [deleteStationPoint.pending]: (state) => {
        // state.paymentStatus = 'loading';
        state.loading = true;
  
      },
      [deleteStationPoint.fulfilled]: (state, action) => {
        state.loading = false;
        state.deleteStationPoint = action.payload;
      },
      [ deleteStationPoint.rejected]: (state, action) => {
        state.error = 'lỗi';
        state.deleteStationPoint= action.payload;
      },

      [AddStationPoint.pending]: (state) => {
        // state.paymentStatus = 'loading';
        state.loading = true;
  
      },
      [AddStationPoint.fulfilled]: (state, action) => {
        state.loading = false;
        state.stationPoint = action.payload;
      },
      [AddStationPoint.rejected]: (state, action) => {
        state.error = 'lỗi';
        state.stationPoint = action.payload;
      },
    [fetchAddPoint.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchAddPoint.fulfilled]: (state, action) => {
      state.loading = false;
      state.pointAdd = action.payload;
    },
    [fetchAddPoint.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.pointAdd = action.payload;
    },
  [fetchStationDetail.pending]: (state) => {
    // state.paymentStatus = 'loading';
    state.loading = true;

  },
    [fetchStationDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.update = action.payload;
    },
    [deleteStation.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
    [deleteStation.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deleteStation.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },
    [deleteStation.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.delete = action.payload;
    },
    [deletePoint.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [deletePoint.fulfilled]: (state, action) => {
      state.loading = false;
      state.pointDetele = action.payload;
    },
    [deletePoint.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.pointDetele = action.payload;
    },

    [updatePoint.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [updatePoint.fulfilled]: (state, action) => {
      state.loading = false;
      state.pointUpdate = action.payload;
    },
    [updatePoint.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.pointUpdate = action.payload;
    },
  },
})
// export const { getAllstation,addstation, deleteStation, updatestation } =  stationSlice.actions;

export default  stationSlice.reducer;
