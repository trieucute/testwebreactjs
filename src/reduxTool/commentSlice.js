import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';
import axiosAdmin from '../pages/admin/axois-admin';

export  const fetchCommentDetail = createAsyncThunk("comment/fetchCommentDetail", async(id)=>{
  try {
      const commentCar= await axiosClient.get(`/car/${id}/comments`)
      return commentCar.data
  } catch (error) {
      console.log(error);
  }
})
export  const fetchCommentAdmin  = createAsyncThunk("comment/fetchCommentAdmin", async()=>{
  try {
      const commentCar= await axiosAdmin.get(`/comment`)
      return commentCar.data
  } catch (error) {
      console.log(error);
  }
})
export  const putStatusCmt = createAsyncThunk("station/fecthAddPoint", async(id,data)=>{
  try {
      const StatusCmt= await axiosAdmin.put(`/comment/${id}`, data,{
               headers: {
                'Content-Type': 'application/json',
        }
      })
      return  StatusCmt.data
  } catch (error) {
      console.log(error);
  }
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    data: [], // Trạng thái ban đầu của action
    error: null, // Lưu trữ lỗi nếu có
    loading: false, // Lưu trữ kết quả từ server nếu thành công
    StatusCmt:null
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
    // ADMIN
    [fetchCommentAdmin.pending]: (state) =>{
      state.loading = true
    },
    [fetchCommentAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchCommentAdmin.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },
    [fetchCommentDetail.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [fetchCommentDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchCommentDetail.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.data = action.payload;
    },

    [putStatusCmt.pending]: (state) => {
      // state.paymentStatus = 'loading';
      state.loading = true;

    },
    [putStatusCmt.fulfilled]: (state, action) => {
      state.loading = false;
      state.StatusCmt = action.payload;
    },
    [putStatusCmt.rejected]: (state, action) => {
      state.error = 'lỗi';
      state.StatusCmt = action.payload;
    },
  },
});

// export const { } = commentsSlice.actions;
export default commentsSlice.reducer;
