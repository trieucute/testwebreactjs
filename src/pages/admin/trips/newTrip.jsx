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
import Notification from '../../NotificationTrip';

const AddNewTrip = () => {
    const [loading, setLoading]= useState(true)
 
    const [divs, setDivs] = useState([{ id: 0 }]); // Mảng chứa các div, mỗi div có một id để xác định

    // Hàm thêm một div mới
    const handleAddDiv = () => {
      const newDivId = divs.length; // Tạo id mới cho div
      const newDivs = [...divs, { id: newDivId }]; // Thêm div mới vào mảng divs
      setDivs(newDivs);
    };
  
    // Hàm xóa một div dựa trên id
    const handleRemoveDiv = (id) => {
      if (id === 0) {
        // Nếu id là 0 (div đầu tiên), không thực hiện việc xóa
        return;
      }
  
      const updatedDivs = divs.filter((div) => div.id !== id); // Loại bỏ div có id tương ứng
      setDivs(updatedDivs);
    };

    const [idStationStart, setIdStationStart]= useState('')
    const [idStationEnd, setIdStationEnd]= useState('')

    const [stationStart, setStationStart]= useState([])
    const [stationEnd, setStationEnd]= useState([])

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
     console.log('carData:', carData);
    
    useEffect(() => {
      console.log('idStationStart:', idStationStart);
      console.log('idStationEnd:', idStationEnd);
      dispatch(fetchStationPoint(idStationStart))
      .then(res=>{
        // console.log(res.payload.data);
        setStationStart(res.payload.data)
      })
      .catch(err=>{
        console.error(err);
      })
      dispatch(fetchStationPoint(idStationEnd))
      .then(res=>{
        // console.log(res.payload.data);
        setStationEnd(res.payload.data)
      })
      .catch(err=>{
        console.error(err);
      })
      if( idStationEnd !=='' &&  idStationStart !=='' ){
        if(idStationEnd === idStationStart ){
          // alert('Vui lòng chọn khác nơi đến và nơi đi!')
          setNotificationMessage('Vui lòng chọn khác nơi đến và nơi đi!');
          setShowNotifi(true);
        
          // Hide the notification after 3 seconds
          setTimeout(() => {
            setShowNotifi(false);
          }, 3000);
        return
        }
        
      }
    }, [idStationEnd,idStationStart]);

    // const [pickupValue, setPickupValue] = useState('');
    // const [pickupTime, setPickupTime] = useState('');
    // const [selectedPickup, setSelectedPickup] = useState(null);
    // const [dropoffValue, setDropoffValue] = useState('');
    // const [dropoffTime, setDropoffTime] = useState('');
    // const [selectedDropoff, setSelectedDropoff] = useState(null);
    // const [pickups, setPickups] = useState([]);
    // const [dropoff, setDropoff] = useState([]);

    const [status, setStatus] = useState('');
    const handleActiveChange = (e) => {
      setStatus(e.target.value); // Lưu giá trị đã chọn vào state
    };
    const setDivValue = (index, key, value, id) => {
      const updatedDivs = divs.map((div, i) => {
        if (i === index) {
          let updatedValue = value;
          let updatedId = id; // Lưu ID vào một trường khác, ví dụ: pickupId và dropoffId
          // ... (các điều kiện và xử lý khác nếu cần)
          return { ...div, [key]: updatedValue, [`${key}Id`]: updatedId }; // Lưu ID tương ứng
        }
        return div;
      });
      setDivs(updatedDivs);
    };
    
    const handleSelectPickup = (value, item, divId) => {
      const index = divs.findIndex((div) => div.id === divId);
      if (index !== -1) {
        setDivValue(index, 'pickupValue', item.name, item.value); // Lưu name và ID của stationStart
      }
    };
    
    const handleSelectDropoff = (value, item, divId) => {
      const index = divs.findIndex((div) => div.id === divId);
      if (index !== -1) {
        setDivValue(index, 'dropoffValue', item.name, item.value); // Lưu name và ID của stationEnd
      }
    };
    const [idCar, setIdCar]= useState('')
    const [idDriver, setIdDriver]= useState('')
    const [departure, setDeparture]= useState('')
    const [arrival, setArrival]= useState('')


    const [messageDeparture, setMessageDeparture]= useState('')
    const [messageArrival, setMessageArrival]= useState('')
    const [messageSuccess, setMessageSuccess]= useState('')

    const [showNotifi, setShowNotifi] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');



    const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true)
   
      
  // Lấy các thông tin cần thiết từ pickups và dropoff
  // Lấy thông tin của pickups từ mỗi phần tử trong mảng divs
  const pickupData = divs.map((div) => ({
    time: div.pickupTime, // Sử dụng thuộc tính pickupTime của mỗi phần tử
    pointId: div.pickupValueId, // Sử dụng thuộc tính pickupValue của mỗi phần tử
  }));

  // Lấy thông tin của dropoff từ mỗi phần tử trong mảng divs
  const dropoffData = divs.map((div) => ({
    time: div.dropoffTime, // Sử dụng thuộc tính dropoffTime của mỗi phần tử
    pointId: div.dropoffValueId, // Sử dụng thuộc tính dropoffValue của mỗi phần tử
  }));
// Kiểm tra nếu pickupData hoặc dropoffData có giá trị undefined
if(departure==='' || idCar===''|| idDriver===''|| arrival===''||  idStationStart==='' || idStationEnd===''|| status==='' ){
  setLoading(false);
  setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
  setShowNotifi(true);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    setShowNotifi(false);
  }, 3000);
  return
}else if (pickupData.some((data) => data.time === undefined || data.pointId === undefined) || dropoffData.some((data) => data.time === undefined || data.pointId === undefined)) {
  setLoading(false);
  // alert('Vui lòng chọn điểm đón và điểm trả!');
  setNotificationMessage('Vui lòng chọn điểm đón và điểm trả!');
  setShowNotifi(true);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    setShowNotifi(false);
  }, 3000);
  return;
}else  if(idStationEnd === idStationStart ){
  setLoading(false);
  // alert('Vui lòng chọn khác nơi đến và nơi đi!')
  setNotificationMessage('Vui lòng chọn khác nơi đến và nơi đi!');
  setShowNotifi(true);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    setShowNotifi(false);
  }, 3000);
return
}
      const postData={
        departure_time: departure.replace('T', ' ').concat(':00'), 
        car_id:idCar,
        driver_id:idDriver,
        arrival_time: arrival.replace('T', ' ').concat(':00'),
      start_station:idStationStart,
        end_station:idStationEnd,
        status:status,
        pickups: pickupData, // Thêm thông tin pickups vào dữ liệu postData
        dropoff: dropoffData,
      }

      console.log(postData );
      axiosAdmin.post('/trip', postData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }}
        )
      .then(res=>{
        clearDivs()
        setDeparture('');
        setArrival('');
        setIdCar('');
        setIdDriver('')
        setIdStationEnd('')
        setIdStationStart('')
        setStatus('')
        setLoading(false);
        setMessageArrival('')
        setMessageDeparture('')
        setMessageSuccess('Thêm chuyến xe thành công')
        console.log(res);
      })
      .catch(err=>{
        setLoading(false)
        console.error(err)
        const response= err.response
        if(response){
          if(response.data.errors.arrival_time ){
            setMessageArrival(response.data.errors.arrival_time)
            setMessageDeparture('')
          }else  if(response.data.errors.departure_time ){
            setMessageDeparture(response.data.errors.departure_time)
            setMessageArrival('')
          }else  if(response.data.errors.departure_time && response.data.errors.arrival_time ){
            setMessageArrival(response.data.errors.arrival_time)
            setMessageDeparture(response.data.errors.departure_time)

          }
          else{
            // alert(response.data.errors)
            setMessageArrival('')
            setMessageDeparture('')
            setMessageSuccess(response.data.errors)
          }
        }
      })
    }
    const clearDivs = () => {
      const clearedDivs = divs.map(div => {
        return {
          ...div,
          // Set default or empty values for each property you want to clear
          pickupTime: '',
          pickupValueId: '',
          pickupValue: '',
          dropoffTime: '',
          dropoffValueId: '',
          dropoffValue:''
          // Add more properties here if needed
        };
      });
    
      setDivs(clearedDivs); // Gán mảng đã xử lý trở lại cho divs
    };
    return (
        <div className='addNew-container'>
          {loading ? (
            <Loading/>
          ):(
            <>
                  {showNotifi &&  <Notification message={notificationMessage} />}
            <h3 className='h3-admin mb-4 text-center'> Thêm chuyến xe</h3>
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
           <select  id=""     className='form-select' name="end_station" value={idStationEnd}  onChange={e=>setIdStationEnd(e.target.value)}>
            <option value="">Chọn nơi đến</option>
           {stationData && stationData.map(i=>(
               <option value={i.id}>{i.name} ( {i.province} )</option>

             ))}

           </select>
           </div>
           <div className='form-group'>
           <label htmlFor="">Xe</label>
           <select  id=""     className='form-select' name="car_id" value={idCar} onChange={e=>setIdCar(e.target.value)}>
           <option value="">Chọn xe</option>
           {carData && carData
           .filter(i=>parseInt(i.status)===1)
           .map(i=>(
               <option value={i.id}>{i.name} ({i.license_plate}) - {i.type}</option>

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
             <input type="radio" name='status' id='active1' value='Chờ khởi hành' placeholder='active'  checked={status === 'Chờ khởi hành'}  onChange={handleActiveChange} /><label htmlFor="active1 m-0" onClick={handleActiveChange}  style={{fontSize:"16px"}} >Chờ khởi hành</label>
             <input type="radio" name='status' id='active0' value='Đang khởi hành' placeholder='active'   checked={status === 'Đang khởi hành'}  onChange={handleActiveChange}   /> <label htmlFor="active0 m-0" onClick={handleActiveChange}   style={{fontSize:"16px"}} >Đang khởi hành</label>
             <input type="radio" name='status' id='active0' value='Đã đến' placeholder='active'   checked={status === 'Đã đến'}  onChange={handleActiveChange}   /> <label htmlFor="active0 m-0" onClick={handleActiveChange}  style={{fontSize:"16px"}} >Đã đến</label>

             </div>
             
           </div>
    

           <div className=''>
     {divs.map((div, index) => (
       <div key={div.id} className='row m-0 justify-content-between stations'>
           <div  className='form-group ps-0 form-group-station'>
         <label htmlFor={`diemDon${div.id}`}>Điểm đón</label>
         <Autocomplete id={`diemDon${div.id}`}  
                inputProps={{
                  className: 'form-control',
                  name: 'pointId_pickup',
                  placeholder: 'Điểm đến',
                  autoComplete: 'off',

                }}
                  getItemValue={(item) => `${item.name}`}
                  items=  {stationStart &&stationStart.map((schedule, index) => ({
                    name: `${schedule.name}`,
                    address: ` ${schedule.address}`,
                    value: `${schedule.id}`,
                  }))}
                  renderItem={(item, isHighlighted) => (
                    <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      <div className='row mx-0 py-2'>
                        <div className='col pe-0'>
                          <span className='medium-name'>{item.name}</span><br />
                          <span className='small-address'> {item.address}</span>
                        </div>
                        {/* <div className='col-3 text-end'><span className='medium-name text-end'>{TimeHM( item.time)}</span></div> */}
                      </div>
      
                    </div>
                  )}
                  value={div.pickupValue} // Sử dụng giá trị từ state của div
                  onChange={(e) => setDivValue(index, 'pickupValue', e.target.value )} // Cập nhật giá trị của div khi thay đổi
                  onSelect={(value, item) => handleSelectPickup(value, item, div.id)} // Thêm ID của div
                />

         </div>
         <div  className='form-group pe-0'>
         <label htmlFor={`diemTra${div.id}`}>Thời gian đón</label>
         <input type="time" className='form-control'  name='pickupTime ' value={div.pickupTime}     onChange={(e) => setDivValue(index, 'pickupTime', e.target.value)} />
         </div>
         <div  className='form-group ps-0  form-group-station'>
         <label htmlFor={`diemTra${div.id}`}>Điểm trả</label>
         <Autocomplete id={`diemTra${div.id}`}  
                inputProps={{
                  className: 'form-control',
                  name: 'pointId_dropoff',
                  placeholder: 'Điểm trả',
                  autoComplete: 'off',

                }}
                  getItemValue={(item) => `${item.name}`}
                  items=  {stationEnd &&stationEnd.map((schedule, index) => ({
                    name: `${schedule.name}`,
                    address: ` ${schedule.address}`,
                    value: `${schedule.id}`,
                  }))}
                  renderItem={(item, isHighlighted) => (
                    <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      <div className='row mx-0 py-2'>
                        <div className='col pe-0'>
                          <span className='medium-name'>{item.name}</span><br />
                          <span className='small-address'> {item.address}</span>
                        </div>
                     
                      </div>
      
                    </div>
                  )}

                  value={div.dropoffValue} // Sử dụng giá trị từ state của div
                  onChange={(e) => setDivValue(index, 'dropoffValue', e.target.value )} // Cập nhật giá trị của div khi thay đổi
                  onSelect={(value, item) => handleSelectDropoff(value, item,div.id)}
                />

         </div>
        
         <div  className='form-group pe-0'>
         <label htmlFor={`diemTra${div.id}`}>Thời gian trả</label>
        <input type="time" className='form-control' name='dropoffTime '   value={div.dropoffTime}  onChange={(e) => setDivValue(index, 'dropoffTime', e.target.value)} />
         </div>
           {/* Nút xóa chỉ hiển thị cho các div không phải div đầu tiên */}
           {div.id !== 0 && (
           <button type='button' className='but-closeX' onClick={() => handleRemoveDiv(div.id)}>
           <i class="fas fa-x"></i>
           </button>
         )}
    

       </div>
     ))}
     <div className='but-addStation'><button type='button'  onClick={handleAddDiv}>Thêm điểm đón / trả</button></div>
   </div>
 
        
        <div className='form-group mt-3'><button className='btn-add' type="submit">Thêm mới</button></div>
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

export default AddNewTrip;
