import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosClient from "../axios-client";

const jobSlice = createSlice({
    name: "job",
    initialState:{
        job: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchjob.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchjob.fulfilled, (state, action)=>{
            state.isLoading = false
            state.job = action.payload.data
        })
    }
})

export  const fetchjob = createAsyncThunk("job/fecthjob", async () => {
    try {
        const job = await axiosClient.get("/job")
        return job.data
    } catch (error) {
        console.log(error);
    }
})

export default jobSlice.reducer
