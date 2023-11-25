

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosClient from '../axios-client';

// export const fetchNews = createAsyncThunk('news/fetchNews ', async () => {
//   const response = await axiosClient.get('/news');
//   return response.data;
// });

// const newsSlice = createSlice({
//   name: 'news',
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers:  {

//       [fetchNews.pending]:( state) => {
//         state.loading = true;
//         state.error = null;
//       },
//       [fetchNews.fulfilled]:(state,{payload})=>{
//         state.data = payload.data.data;
//         state.loading = false;
//       },
//       [fetchNews.rejected]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       }
//   },
// });

// export default newsSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosClient from "../axios-client";
const newsSlice = createSlice({
    name: "news",
    initialState: {
        news: [],
        isLoading: false,
        popularNews:[],
        lastestNews:[],
        postDetail:[]

    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchnews.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(fetchnews.fulfilled, (state, action)=>{
            state.isLoading = false
            state.news = action.payload.data
        })

        .addCase(fetchpopular.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(fetchpopular.fulfilled, (state, action)=>{
            state.isLoading = false
            state.popularNews = action.payload.data
        })

        .addCase(fetchlastest.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(fetchlastest.fulfilled, (state, action)=>{
            state.isLoading = false
            state.lastestNews = action.payload.data
        })

        .addCase(fetchPostDetail.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(fetchPostDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.postDetail = action.payload.data
        })

    }
})


export const fetchnews = createAsyncThunk("news/fetchnews", async () =>{
    try {
        const news = await axiosClient.get("/news")
        // console.log(news);
        return news.data
    } catch (error) {
        console.log(error);
    }
})

export const fetchpopular = createAsyncThunk("news/fecthpopular", async()=>{
    try {
        const news = await axiosClient.get("/news/popular")
        return news.data
    } catch (error) {
        console.log(error);
    }
})

export const fetchlastest = createAsyncThunk("news/fecthlastest", async()=>{
    try {
        const news = await axiosClient.get("/news/lastest")
        return news.data
    } catch (error) {
        console.log(error);
    }
})

export  const fetchPostDetail = createAsyncThunk("news/fetchPostDetail", async(idNews)=>{
    try {
        const news = await axiosClient.get(`/news/${idNews}`)
        return news.data
    } catch (error) {
        console.log(error);
    }
})

export default newsSlice.reducer
// {fetchnews, fetchpopular, fetchlastest, fetchPostDetail}
