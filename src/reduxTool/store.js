import { configureStore } from "@reduxjs/toolkit";
// import bankReducer from "./bankSlice";
import newsReducer from "./newsSlice";
import tripReducer from './routesBookingSlice'
import authReducer from './authSlice'
import dataTicketReducer from './dataTicketSlice'
import jobReducer from './jobSlide'
// import routesBookingReducer from './formdata'
export const store=configureStore({
    reducer:{
        newsReducer,
        tripReducer,
        authAdmin: authReducer,
        dataTicket:dataTicketReducer,
        job:jobReducer,
        // routesBookingReducer ,

    }
})