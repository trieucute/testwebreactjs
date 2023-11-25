import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

export  const fetchCommentDetail = createAsyncThunk("comment/fetchCommentDetail", async(id)=>{
  try {
      const commentCar= await axiosClient.get(`/car/${id}/comment`)
      return commentCar.data
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
  },
});

// export const { } = commentsSlice.actions;
export default commentsSlice.reducer;
