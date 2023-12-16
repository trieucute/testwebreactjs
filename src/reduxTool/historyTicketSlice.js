import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../axios-client";

const historyTicketSlice = createSlice({
    name: "historyTicket",
    initialState:{
        historyTicket: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchhistoryTicket.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchhistoryTicket.fulfilled, (state, action)=>{
            state.isLoading = false
            state.historyTicket = action.payload
        })
    }
})

export const fetchhistoryTicket = createAsyncThunk("historyTicket/fetchhistoryTicket", async (token) =>{
    try{
        const historyTicket = await axiosClient.get("/ticket/history", {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        console.log(historyTicket);
        return historyTicket.data
    } catch (error){
        console.log(error);
    }
})

export default historyTicketSlice.reducer