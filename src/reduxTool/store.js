import { configureStore } from "@reduxjs/toolkit";
// import bankReducer from "./bankSlice";
import newsReducer from "./newsSlice";
import tripReducer from './routesBookingSlice'
import authReducer from './authSlice'
import dataTicketReducer from './dataTicketSlice'
import commentsReducer from './commentSlice'
import jobReducer from './jobSlide'
// import routesBookingReducer from './formdata'
export const store=configureStore({
    reducer:{
        news:newsReducer,
        tripReducer,
        authAdmin: authReducer,
        dataTicket:dataTicketReducer,
        job:jobReducer,
        comment:commentsReducer
        // routesBookingReducer ,

    }
})