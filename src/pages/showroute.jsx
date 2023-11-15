import React, { useEffect, useState } from 'react';
import TestRoute from './testRoute';
import { useDispatch, useSelector } from 'react-redux';
import { searchTrip, updateSearchData } from '../reduxTool/routesBookingSlice';
import Loading from './loadingTrip';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Showroute = () => {
        const dispatch = useDispatch();
        const [selectedDate, setSelectedDate] = useState(null); // Thêm selectedDate
        
    const routeData = useSelector((state) => state.tripReducer.data);
    const loading = useSelector((state) => state.tripReducer.loading);
    const error = useSelector((state) => state.tripReducer.error);
    const formData = useSelector((state) => state.tripReducer.formData)
    const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const startLocation = urlParams.get('start_location');
const endLocation = urlParams.get('end_location');
const time = format(new Date( urlParams.get('time')), 'dd/MM/yyyy');
// const timedate=  format(new Date( time), 'dd/MM/yyyy');
useEffect(() => {
  dispatch(updateSearchData({
    start_location: startLocation,
    end_location: endLocation,
    time: time
  }));
  // console.log('formdata show:',formData.time);
  // const formattedDate = format(new Date( time), 'dd/MM/yyyy');
  // setSelectedDate(new Date(time)); // Cập nhật selectedDate
  // dispatch(searchTrip({ startLocation, endLocation, time }));

}, [dispatch, startLocation, endLocation, time]);

if (loading) {
    return <Loading/>;
  }
    
  if (error) {
    return <div>Không có chuyến đi nào</div>;
  }
    return (
        <div>
     <TestRoute formData={formData}
      />
            <div>
        { routeData  && routeData.map((news,index) => (
          <div key={index}>
            <h2>{news.departure_time}</h2>
            <p>{news.price}</p>
          </div>
        ))}
      </div>
        </div>
    );
};

export default Showroute;