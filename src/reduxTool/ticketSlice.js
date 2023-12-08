import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosAdmin from "../pages/admin/axois-admin";
export  const fetchticketAdmin = createAsyncThunk("ticket/fecthTicket", async () => {
  try {
      const  ticket= await axiosAdmin.get("/ticket")
      return ticket.data
  } catch (error) {
      console.log(error);
  }
})
export  const fetchticketdetail= createAsyncThunk("ticket/fecthticketdetail", async (id) => {
  try {
      const ticket = await axiosAdmin.get(`/ticket/${id}`)
      return ticket.data
  } catch (error) {
      console.log(error);
  }
})

const ticketAdminSlice=createSlice({
  name: "ticketAdminSlice",
  initialState:{
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    detail:null
  },
  reducers:{
   
  },
  extraReducers: {
    [fetchticketAdmin.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchticketAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchticketAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [fetchticketdetail.pending]: (state) => {
        // state.paymentStatus = 'loading';
        state.loading = true;
  
      },
      [fetchticketdetail.fulfilled]: (state, action) => {
        state.loading = false;
        state.detail= action.payload;
      },
      [fetchticketdetail.rejected]: (state, action) => {
        state.error = 'lỗi';
        state.detail = action.payload;
      },
}
})


export default  ticketAdminSlice.reducer;
