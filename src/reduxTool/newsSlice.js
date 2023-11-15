

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

export const fetchNews = createAsyncThunk('news/fetchNews ', async () => {
  const response = await axiosClient.get('/news');
  return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers:  {

      [fetchNews.pending]:( state) => {
        state.loading = true;
        state.error = null;
      },
      [fetchNews.fulfilled]:(state,{payload})=>{
        state.data = payload.data.data;
        state.loading = false;
      },
      [fetchNews.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
  },
});

export default newsSlice.reducer;
