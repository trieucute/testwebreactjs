import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStation, fetchStationPoint } from '../../../reduxTool/stationSlice';
import { data, error } from 'jquery';
import { fetchcarAdmin } from '../../../reduxTool/carSlice';
import { fetchDriverAdmin } from '../../../reduxTool/userSlice';
import Loading from '../../loadingTrip';
import Autocomplete from 'react-autocomplete';
import axiosAdmin from '../axois-admin';
import { fetchTripAdminDetail } from '../../../reduxTool/tripSlice';
import { useParams } from 'react-router-dom';

const UpdateTrip = () => {
    const [loading, setLoading]= useState(true)

    // const [data, setData]= useState({})
    
    const { id } = useParams();
    const tripDetail=useSelector(state=>state.tripAdmin)
    const loadingtrip=useSelector(state=>state.tripAdmin.loading)

    const dataTrip= tripDetail?.update?.data;
    
    const [idCar, setIdCar]= useState('')
    const [idDriver, setIdDriver]= useState('')
    const [departure, setDeparture]= useState('')
    const [arrival, setArrival]= useState('')
    const [status, setStatus] = useState('');
    const [idStationStart, setIdStationStart]= useState('')
    const [idStationEnd, setIdStationEnd]= useState('')
useEffect(()=>{
  // setLoading(true)
  dispatch(fetchTripAdminDetail(id))
  // setData(dataTrip)
  setIdCar(dataTrip?.car.id)
  setDeparture(dataTrip?.departure_time)
  setArrival(dataTrip?.arrival_time);
  setIdDriver(dataTrip?.driver.id);
  setStatus(dataTrip?.status)
  setIdStationStart(dataTrip?.start_station.id)
  setIdStationEnd(dataTrip?.end_station.id)
  // setLoading(false)
},[])
useEffect(()=>{
  setIdCar(dataTrip?.car.id)
  setDeparture(dataTrip?.departure_time)
  setArrival(dataTrip?.arrival_time);
  setIdDriver(dataTrip?.driver.id);
  setStatus(dataTrip?.status)
  setIdStationStart(dataTrip?.start_station.id)
  setIdStationEnd(dataTrip?.end_station.id)
  // setData(dataTrip)
},[dataTrip])
console.log(dataTrip);
// console.log(data, 'update');


const handleActiveChange = (e) => {
  setStatus(e.target.value); // Lưu giá trị đã chọn vào state
};
    const dispatch= useDispatch()
    const station= useSelector(state=>state.stationAdmin)
    const car= useSelector(state=>state.carAdmin)

    const [driver, setDriver]=useState([])
    useEffect(()=>{
      dispatch(fetchStation())
      dispatch(fetchcarAdmin())
      dispatch(fetchDriverAdmin())
      .then(res=>{
        // console.log('driver', res);
        setDriver(res.payload.data)
        setLoading(false)
      })
    },[])
    const stationData= station?.data.data;
    const carData= car?.data.data;



    const [messageDeparture, setMessageDeparture]= useState('')
    const [messageArrival, setMessageArrival]= useState('')
    const [messageSuccess, setMessageSuccess]= useState('')


    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   // let updatedValue = value;
    
    //   // // Kiểm tra và chuyển đổi định dạng thời gian nếu hợp lệ
    //   // if ((name === 'start_station' || name === 'end_station') && value === data[name]?.id) {
    //   //   // Chỉ lấy giá trị id nếu không có thay đổi
    //   //   setData(prevData => ({
    //   //     ...prevData,
    //   //     [name]: { id: value }
    //   //   }));
    //   // } 
    //   // if (name === 'departure_time' ||name === 'arrival_time' ) {
    //   //   const isValidFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.test(value);
    //   //   if (isValidFormat) {
    //   //     updatedValue = value.replace('T', ' ').concat(':00');
    //   //     console.log(updatedValue); // Kết quả: 2023-12-06 19:36:00
    //   //   } else {
    //   //     console.log('Định dạng thời gian không hợp lệ.');
    //   //     return; // Thoát khỏi hàm nếu định dạng không hợp lệ
    //   //   }
    //   // }
    
    //   setData(prevData => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };
    const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true)
 
      if(departure==='' || idCar===''|| idDriver===''|| arrival===''||  idStationStart==='' || idStationEnd===''|| status==='' ){
  setLoading(false);
  alert('Vui lòng nhập đầy đủ thông tin!')
  return
}



      const data={
        departure_time: departure,
        car_id:idCar,
        driver_id:idDriver,
        arrival_time: arrival,
        start_station:idStationStart,
        end_station:idStationEnd,
        status:status,

      }

      console.log(data );

      axiosAdmin.put(`/trip/${id}`, data,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      .then(res=>{
     
        setLoading(false);
        setMessageSuccess('Cập nhật chuyến xe thành công')
        console.log(res);
      })
      .catch(err=>{
        setLoading(false)
        console.error(err)
        const response= err.response

      })
    }
 
    return (
        <div className='addNew-container'>
          {loadingtrip ? (
            <Loading/>
          ):(
            <>
            <h3 className='h3-admin mb-4 text-center'> Cập nhật chuyến xe</h3>
       <form onSubmit={handleSubmit}  className='addNew-contents'>
         <div className='row m-0 justify-content-between'> 
           <div className='form-group'>
           <label htmlFor="">Nơi bắt đầu</label>
           <select id=""     className='form-select' name="start_station" value={idStationStart} onChange={e=>setIdStationStart(e.target.value)}>
           <option value="">Chọn nơi đi</option>
             {stationData && stationData.map(i=>(
               <option value={i.id}>{i.name} ( {i.province} )</option>

             ))}
         

           </select>
           </div>
           <div className='form-group'>
           <label htmlFor="">Nơi đến</label>
           <select  id=""     className='form-select' name="end_station"value={idStationEnd}  onChange={e=>setIdStationEnd(e.target.value)}>
            <option value="">Chọn nơi đến</option>
           {stationData && stationData.map(i=>(
               <option value={i.id}>{i.name} ( {i.province} )</option>

             ))}

           </select>
           </div>
           <div className='form-group'>
           <label htmlFor="">Xe</label>
           <select  id=""     className='form-select' name="car_id"  value={idCar} onChange={e=>setIdCar(e.target.value)}>
           <option value="">Chọn xe</option>
           {carData && carData
           .filter(i=>i.status===1)
           .map(i=>(
               <option value={i.id}>{i.name} ({i.license_plate})</option>

             ))}
             

           </select>
           </div>
           <div className='form-group'>
           <label htmlFor="">Tài xế</label>
           <select id=""     className='form-select' name="driver_id" value={idDriver} onChange={e=>setIdDriver(e.target.value)}>
            <option value="">Chọn tài xế</option>
             {driver && driver.map(i=>(
               <option value={i.id}>{i.name}</option>

             ))}
        

           </select>
           </div>
           <div className='form-group'>
             <label htmlFor="">Thời gian khởi hành</label>
           <input type="datetime-local" name="departure_time"   className='form-control' value={departure}  onChange={e=>setDeparture(e.target.value)}/>
           {messageDeparture && <>
                                <div   style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {messageDeparture}
                                </div>
                            </>}
           </div>
           <div className='form-group'>
             <label htmlFor="">Thời gian đến</label>
           <input type="datetime-local" name="arrival_time"   className='form-control' value={arrival} onChange={e=>setArrival(e.target.value)}/>
           {messageArrival && <>
                                <div style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {messageArrival}
                                </div>
                            </>}
           </div>
           <div className='form-group w-100'>
             <label htmlFor="">Trạng thái</label>
             <div className='form-control'>
             <input type="radio" name='status' id='active1' value='Chờ khởi hành' placeholder='active'  checked={status === 'Chờ khởi hành'} onChange={handleActiveChange}/><label htmlFor="active1 m-0" onClick={handleActiveChange}  style={{fontSize:"16px"}} >Chờ khởi hành</label>
             <input type="radio" name='status' id='active0' value='Đang khởi hành' placeholder='active'   checked={status === 'Đang khởi hành'}  onChange={handleActiveChange}  /> <label htmlFor="active0 m-0" onClick={handleActiveChange}   style={{fontSize:"16px"}} >Đang khởi hành</label>
             <input type="radio" name='status' id='active0' value='Đã đến' placeholder='active'   checked={status === 'Đã đến'}onChange={handleActiveChange} /> <label htmlFor="active0 m-0" onClick={handleActiveChange}  style={{fontSize:"16px"}} >Đã đến</label>

             </div>
             
           </div>
    

 
        
        <div className='form-group mt-3'><button className='btn-add' type="submit">Cập nhật</button></div>
        {messageSuccess && <>
                                <div style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.9em",
                                                textAlign: "left",
                                            }}>
                                    {messageSuccess}
                                </div>
                            </>}
        </div>
       </form>
         </>
          )}
       
   
     
  
      </div>
    );
};

export default UpdateTrip;