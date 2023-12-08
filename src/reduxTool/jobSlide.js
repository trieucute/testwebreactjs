import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosClient from "../axios-client";

const jobSlice = createSlice({
    name: "job",
    initialState:{
        job: [],
        isLoading: false,
        jobDetail: [],
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchjob.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchjob.fulfilled, (state, action)=>{
            state.isLoading = false
            console.log(action.payload);
            state.job = action.payload.data
        })
        .addCase(fetchjobDetail.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchjobDetail.fulfilled, (state, action)=>{
            state.isLoading = false
            state.jobDetail = action.payload.data
        })
    }
})

export  const fetchjob = createAsyncThunk("job/fecthjob", async () => {
    try {
        const job = await axiosClient.get("/job")
        console.log(job);
        return job.data
    } catch (error) {
        console.log(error);
    }
})

export const fetchjobDetail = createAsyncThunk("job/fetchjobDetail", async (id) =>{
    try{
        const job = await axiosClient.get(`/job/${id}`)
        return job.data
    }catch (error){
        console.log(error);
    }
})

export default jobSlice.reducer
