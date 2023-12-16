import { configureStore } from "@reduxjs/toolkit";
// import bankReducer from "./bankSlice";
import newsReducer from "./newsSlice";
import tripReducer from './routesBookingSlice'
import authReducer from './authSlice'
import dataTicketReducer from './dataTicketSlice'
import commentsReducer from './commentSlice'
import jobReducer from './jobSlide'
import carAdminReducer from './carSlice'
import seatReducer from './seatSlice'
import TripAdminReducer from './tripSlice'
import stationAdminReducer from './stationSlice'
import ticketAdminReducer from './ticketSlice'
import historyTicketReducer from './historyTicketSlice'

// import routesBookingReducer from './formdata'
export const store=configureStore({
    reducer:{
        news:newsReducer,
        tripReducer,
        authAdmin: authReducer,
        dataTicket:dataTicketReducer,
        job:jobReducer,
        comment:commentsReducer,
        carAdmin:carAdminReducer,
        seatAdmin:seatReducer,
        tripAdmin:TripAdminReducer,
        stationAdmin:stationAdminReducer,
        ticketAdmin: ticketAdminReducer,
        historyTicket:historyTicketReducer,
        // routesBookingReducer ,

    }
})