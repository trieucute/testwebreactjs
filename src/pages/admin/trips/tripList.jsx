import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import car from '../../../assets/images/bus1.jpg'
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteTripAdmin, fetchTripAdmin, fetchTripAdminDetail } from '../../../reduxTool/tripSlice';
import ReactPaginate from 'react-paginate';
import { formatDateTimeAdminTrip, formatTimeAdminTrip } from '../../../config';
import LoadingAd from '../../loadingAdmin';
import { deletePoint, fetchAddPoint, fetchStationPoint, updatePoint } from '../../../reduxTool/stationSlice';
import axiosAdmin from '../axois-admin';
const TripList = () => {
    const navigate = useNavigate();
    const handleAddTrip=()=>{
    navigate('/admin/trips/addnew')
    }
    const [showAddStart, setShowAddStart]= useState(false);
    const [showAddEnd, setShowAddEnd]= useState(false);

    const handleAddStart=()=>{
      setShowAddStart(!showAddStart)
      setEditPoint(false)
    }
    const handleAddEnd=()=>{
      setShowAddEnd(!showAddEnd)
      setEditPointEnd(false)
    }
    const dispatch= useDispatch();
    const tripData= useSelector(state=>state.tripAdmin)
    const [loading, setLoading]=useState(false)
    const trips= tripData?.data.data

    useEffect(()=>{

    setLoading(true)
    dispatch(fetchTripAdmin())
    .then(res=>{
      setLoading(false)
    })
    },[])

    // Tạo đối tượng Date hiện tại
const now= new Date();


// Tính toán số mili giây cần chờ để đến thời gian 18:15
const timeUntilDesiredTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 29, 0, 0) - now;

// Nếu thời gian đã vượt qua thời gian mong muốn, không gửi request
if (timeUntilDesiredTime > 0) {
  setTimeout(() => {
    // Thời gian đã đạt đến 18:15, gửi dữ liệu lên server
    const postDatas = {
      departure_time: '2023-12-14 18:00:00', // Format lại thời gian thành ISO string (vd: "2023-12-13 18:00:00")
      car_id: 1,
      driver_id: 9,
      arrival_time: '2023-12-14 23:00:00', // Thời gian đến sau 9 tiếng
      start_station: 1,
      end_station: 3,
      status: 'Chờ khởi hành',
      pickups: [
        {
          time: '19:00',
          pointId: 1,
        }
      ],
      dropoff: [
        {
          time: '20:00', // Thời gian sau 9 tiếng
          pointId: 7,
        }
      ],
      // Các thông tin khác của postData
    };
    console.log('postDatas',postDatas);

    axiosAdmin.post('/trip', postDatas, {
      headers: {
        'Content-Type': 'application/json',
 
      }
    })
    .then(res => {
      console.log(res,'postne'); 
    })
    .catch(e => {
      console.error(e);
    });
  }, timeUntilDesiredTime);
} else {
  console.log('Đã vượt qua thời gian 18:18 ngày hôm nay.');
}

    // console.log(trips);
        // tìm kiếm
        const [searchTerm, setSearchTerm] = useState('');
         const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
         const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
         const [pageCount, setPageCount] = useState(0); // Initialize pageCount state
         const offset = pageNumber * perPage;
       
         const handlePageClick = ({ selected }) => {
           setPageNumber(selected);
         };
         const handleSearch = (e) => {
          const value = e.target.value;
          setSearchTerm(value);
          setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
        };
        const [sortedTripsByDepartureTime, setSortedTripsByDepartureTime] = useState([]);
        const [sortByDepartureTime, setSortByDepartureTime] = useState(false);
        const [paginatedTrips, setPaginatedTrips]= useState([])


        // ... (existing code remains the same)
      
        useEffect(() => {
          // Sắp xếp từ mới nhất đến cũ nhất dựa trên departure_time
          const sortedTrips = sortByDepartureTime
            ? trips?.slice().sort((a, b) => new Date(b.departure_time) - new Date(a.departure_time))
            : trips?.slice().sort((a, b) => b.id - a.id);
            const currentTrips = searchTerm
            ? sortedTrips?.filter((trip) =>
                trip.start_station.province.toLowerCase().includes(searchTerm.toLowerCase()) || trip.end_station.province.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : sortedTrips  ;
          setSortedTripsByDepartureTime(currentTrips);
        }, [sortByDepartureTime, trips, searchTerm]);

        const handleFilterClick = () => {
          setSortByDepartureTime(!sortByDepartureTime);
          setPageNumber(0); // Reset page number on filter change
        };
        useEffect(() => {
          const paginated = sortedTripsByDepartureTime?.slice(offset, offset + perPage);
          setPaginatedTrips(paginated);
           // Calculate pageCount based on paginatedTrips length
          const count = Math.ceil(sortedTripsByDepartureTime?.length / perPage);
          setPageCount(count);
        }, [offset, perPage, sortedTripsByDepartureTime]);



        // xem chi tiết

        const dataDetail= tripData.update?.data;
        // const stationPoint= useSelector(state=>state.stationAdmin);
        const [nameStart, setNameStart]= useState([]);
        const [nameEnd, setNameEnd]= useState([]);

        const [tripId, setTripId]= useState(null)

        const handleTripdetail= (id, id_start, id_end)=>{
          dispatch(fetchTripAdminDetail(id))
          setTripId(id)
          dispatch(fetchStationPoint(id_start))
          .then(res=>{
            console.log('start', res.payload.data);
            setNameStart(res.payload.data)
          })
          .catch(err=>{
            console.error(err);
     
          })
          dispatch(fetchStationPoint(id_end))
          .then(res=>{
            // console.log('end', res.payload.data);
            setNameEnd(res.payload.data) 
          })
          .catch(err=>{
            console.error(err);
     
          })

        }
        const loadingDetail=tripData?.loading;
        // console.log(stationPoint?.point);
        // console.log(dataDetail,'detail');

    // const [loading, setLoading]=useState(false)
        // thêm sửa xoá point
        const [pointStart, setPointStart]= useState({
          time:'',
          point_id:'',
  
        })
        const [pointEnd, setPointEnd]= useState({
          time:'',
          point_id:'',
  
        })

        const [showNotifi, setShowNotifi] = useState(false);
        const [notificationMessage, setNotificationMessage] = useState('');

        const handleAddTimePointStart=(e)=>{
      
          e.preventDefault()
          if(pointStart.point_id==='' || pointStart.time===''){
            
            setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
            setShowNotifi(true);
        
            // Hide the notification after 3 seconds
            setTimeout(() => {
              setShowNotifi(false);
            }, 3000);
            return
          }
          const pointPost={
            time:`${pointStart.time}:00`,
            point_id:pointStart.point_id,
            trip_id:tripId,
            type:'pickup',
          }
          dispatch(fetchAddPoint(pointPost))
          .then(res=>{
            console.log(res);
            
            setPointStart({
              time:"",
              point_id:'',
            })

            dispatch(fetchTripAdminDetail(tripId))
          })
          .catch(err=>{
            console.error(err);
          })
        
        }
       
        const handleAddTimePointEnd=(e)=>{
          e.preventDefault()
          if(pointEnd.point_id==='' || pointEnd.time===''){
          
            setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
            setShowNotifi(true);
        
            // Hide the notification after 3 seconds
            setTimeout(() => {
              setShowNotifi(false);
            }, 3000);
            return
          }
          const pointPost={
            time:`${pointEnd.time}:00`,
            point_id:pointEnd.point_id,
            trip_id:tripId,
            type:'dropoff',
          }
          dispatch(fetchAddPoint(pointPost))
          .then(res=>{
            console.log(res);
            
            setPointEnd({
              time:"",
              point_id:'',
            })

            dispatch(fetchTripAdminDetail(tripId))
          })
          .catch(err=>{
            console.error(err);
          })
        }
        const handleDeletePoint=(id)=>{
          const confirmDeletion = window.confirm("Bạn có chắc muốn xoá điểm đón / trả này?");
          if (confirmDeletion) {
            dispatch(deletePoint(id))
              .then((res) => {
                console.log(res);
                dispatch(fetchTripAdminDetail(tripId))// Gọi lại action fetchCarSeat để load lại dữ liệu
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
        const handleDeleteTrip=(id)=>{

          const confirmDeletion = window.confirm("Bạn có chắc muốn xoá chuyến xe này?");
       
          if (confirmDeletion) {
            dispatch(deleteTripAdmin(id))
              .then((res) => {
                console.log(res);
                dispatch(fetchTripAdmin())// Gọi lại action fetchCarSeat để load lại dữ liệu
                .then(res=>{
           

                })

              })
              .catch((err) => {
                console.error(err);


              });
          }
        }
      const handleChangeStatus =(id, value)=>{
        // setLoadingDelete(true)
        const post={
          id: id,
          status:value
        }
        // dispatch(changeStatus(post))
        // dispatch(fetchTripAdmin())
        // setLoadingDelete(false)
        const confirmDeletion = window.confirm("Bạn có chắc muốn cập nhật trạng thái chuyến xe này?");
        setLoading(true)
        if (confirmDeletion) {
          dispatch(changeStatus(post))
            .then((res) => {
              console.log(res);
              dispatch(fetchTripAdmin())// Gọi lại action fetchCarSeat để load lại dữ liệu
              .then(res=>{
              setLoading(false)

              })

            })
            .catch((err) => {
              console.error(err);
              setLoading(false)

            });
        }else{
          setLoading(false)
        }
      }
      const [pointStartEdit, setPointStartEdit] = useState({
        point_id:null,
          time:null
      });
      const [pointEndEdit, setPointEndEdit] = useState({
        point_id:null,
          time:null
      });
      const [editPoint,setEditPoint ]= useState(false)
      const [editPointEnd,setEditPointEnd ]= useState(false)

      const [editIdStart,setEditIdStart ]= useState('')
      const [editIdEnd,setEditIdEnd ]= useState('')

      const handleChangeinputedit=(e)=>{
        setPointStartEdit((prevPointStartEdit) => ({
          ...prevPointStartEdit,
          [e.target.name]: e.target.value,
        }));
      
      }
      
      const handleChangeinputeditEnd=(e)=>{
        setPointEndEdit((prevPointEndEdit) => ({
          ...prevPointEndEdit,
          [e.target.name]: e.target.value,
        }));
      
      }
      const handleUpdatePoint=(id, value, time, idtrip,idpoint)=>{
        setEditPoint(!editPoint)
        setShowAddStart(false)

        // console.log(id, value, time, idtrip, idpoint);
        setPointStartEdit({
          point_id:idpoint,
          time:time
        })
       setEditIdStart(id)
      }
      const handleUpdatePointEnd=(id, value, time, idtrip,idpoint)=>{
        setEditPointEnd(!editPointEnd)
        setShowAddEnd(false)

        console.log(id, value, time, idtrip,idpoint);
        setPointEndEdit({
          point_id:idpoint,
          time:time
        })
        setEditIdEnd(id)

      }
      console.log('editPoint',pointStartEdit);    
 
      const handleSubmitUpdatePointStart=(e)=>{
        e.preventDefault()
        // const data={
        //   point_id:parseInt(pointStartEdit.id, 10),
        //   time:pointStartEdit.time
        // }
        // dispatch(updatePoint({id,data}))
        axiosAdmin.put(`/timepoint/${editIdStart}`,pointStartEdit,{
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
        })
        .then((res) => {
          console.log(res);
          dispatch(fetchTripAdminDetail(tripId))// Gọi lại action fetchCarSeat để load lại dữ liệu
        })
        .catch((err) => {
          console.error(err);
        });
      }

      
      const handleSubmitUpdatePointEnd=(e)=>{
        e.preventDefault()
        // const data={
        //   point_id:parseInt(pointStartEdit.id, 10),
        //   time:pointStartEdit.time
        // }
        // dispatch(updatePoint({id,data}))
        axiosAdmin.put(`/timepoint/${editIdEnd}`,pointEndEdit,{
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
        })
        .then((res) => {
          console.log(res);
          dispatch(fetchTripAdminDetail(tripId))// Gọi lại action fetchCarSeat để load lại dữ liệu
        })
        .catch((err) => {
          console.error(err);
        });
      }
    return (
        <div>
          {loading ? (
            <LoadingAd/>
          ):(
            <>
            
        <div className='tripAdmin-container'>
          <h3 className='h3-admin'>Quản lý chuyến xe</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              <button className='btn-add' onClick={handleAddTrip}> <i class="fas fa-bus"></i> Thêm chuyến xe</button>
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm chuyến xe' className='form-control w-75' style={{marginLeft:"auto"}} value={searchTerm}
      onChange={handleSearch}/><button type='button'><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
          </div>
        
          <div className='table-dataUser mt-4'>
              <table className='table'>
                <thead>
                <tr>
                  <th></th>
                  <th>Nơi bắt đầu</th>
                  <th>Nơi đến</th>    
                    <th>Xe</th>
                    <th>Tài xế</th>
                    <th>Ngày khởi hành <i className="fas fa-filter" onClick={ handleFilterClick}></i></th>

                    {/* <th>Chỗ còn trống</th> */}
                  <th>Trạng thái</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedTrips &&
          paginatedTrips.map((item, index) => (
            <tr key={item.id}>
                <td>{index + offset + 1}</td>
                <td>{item.start_station.name} ( {item.start_station.province} )</td>
                <td>{item.end_station.name} ( {item.end_station.province} )</td>
                <td>{item.car}</td>
                <td>{item.driver}</td>
                <td>{formatDateTimeAdminTrip( item.departure_time)}</td>
                {/* <a id="clickable">◕‿‿◕</a>
              <Tooltip anchorSelect="#clickable" clickable>
                <button>You can click me!</button>
              </Tooltip> */}
                <td>
                
                  <Tooltip  style={{width:"400px"}} title={
                                                          <div ><h6 className='text-center' style={{fontSize:"15px", marginBottom:"10px",paddingTop:"5px"}}>Cập nhật trạng thái xe</h6>                                              
                                                            <button type='button' style={{fontSize:"13px", marginRight:"5px", padding:"5px 4px"}} className={`btn ${item.status==='Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={()=>handleChangeStatus(item.id,'Chờ khởi hành')}>Chờ khởi hành</button>
                                                            <button type='button' style={{fontSize:"13px",marginRight:"5px",padding:"5px 4px"}}  className={`btn ${item.status==='Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={()=>handleChangeStatus(item.id,'Đang khởi hành')}>Đang khởi hành</button>
                                                            <button type='button' style={{fontSize:"13px",padding:"5px 4px"}}  className={`btn ${item.status==='Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={()=>handleChangeStatus(item.id,'Đã hoàn thành')}>Đã hoàn thành</button>    
                                                       </div>}
                                                     anchorSelect="#clickable" clickable>{item.status} <i class="far fa-hand"></i></Tooltip>
                                                        
                </td>
                <td>
                  <button  className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem chi tiết</button>
                  </td>
                <td >
                   <Link  to={`/admin/trips/update/${item.id}`}> <i class="fas fa-pen-to-square"></i></Link>
                    <i class="fas fa-trash" onClick={()=>handleDeleteTrip(item.id)}></i>
                    </td>
              </tr>
            ))}
                  
         

                
                </tbody>
              </table>
          </div>
          <div className="pagination-contents">
          {pageCount > 1 && (           <ReactPaginate
        previousLabel={<i className="fas fa-caret-left"></i>}
        nextLabel={<i className="fas fa-caret-right"></i>}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
          )}
          </div>
        </div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:"850px"}}>

    <div class="modal-content">
    { loadingDetail ? (
                        <><LoadingAd/></>
                      ):(
                        <>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Xe { dataDetail && dataDetail.car.name} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='row m-0'>
          <div className='col-3'>
            <img src={dataDetail && dataDetail.car.primary_img} alt="" className='img-fluid' />
          </div>
          <div className='col'>
            <div className='row m-0'>
              <div className='col text-start'>Biển số</div>
              <div className='col text-end'>{dataDetail && dataDetail.car.license_plate}</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Số ghế</div>
              <div className='col text-end'>{dataDetail && dataDetail.car.number_seat}</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Loại xe</div>
              <div className='col text-end'>{dataDetail && dataDetail.car.type}</div>
            </div>
          </div>
        </div>
        <div className="row px-4 py-3  tab-contents-car">
      
                           {dataDetail && dataDetail.car.type==='Giường nằm'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}




{dataDetail && dataDetail.car.type==='Giường nằm'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Trên</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}


                                                         {dataDetail && dataDetail.car.type==='Limousine'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row items-content-floor-double  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}




{dataDetail && dataDetail.car.type==='Limousine'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Trên</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row items-content-floor-double  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}
                                                  

                                                  {dataDetail && dataDetail.car.type==='Ghế'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row items-content-floor-chair  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}




{dataDetail && dataDetail.car.type==='Ghế'&& dataDetail.seats && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Trên</h5> */}
                                          <div className='row px-3  items-content-floor'>
                     
                                          {dataDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className={`items-content-floor-row items-content-floor-chair  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                <Tooltip title={
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {seat.price}  </span>
                                                             {/* <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i> */}
                                                       </div>}
                                                        placement="top" arrow>
                                                       
                                                <div
                                                    className=" position-relative"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <svg
                                                      width={43}
                                                      height={33}
                                                      viewBox="0 0 43 33"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                       fill="#A1CCD1"
                                                      />
                                                    </svg>
                                                    <span
                                                      className="name-chair position-absolute"
                                                      style={{
                                                        fontSize: "0.6em",
                                                        top: 3,
                                                        // color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                                      )}

                             {/* {/*-------------------- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                             <div className="items-Floor-des col-sm-4">
                        <div className="row mt-4 flex-column">
                          <div className="item-des row mx-0 my-2 ">
                            <span className='col-2 p-0'>
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r="7.5"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                       
                          <div className='col text-start ps-0'>Đã bán</div>
                          <div className='col text-end'>{dataDetail && dataDetail.seats.filter(i=>( i.status==='booked' || i.status==='pending')).length } ghế</div>
                     
                          </div>
                          <div className="item-des row  my-2 mx-0">
                          <span className='col-2 p-0'>
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r="7.5"
                                 fill="#A1CCD1"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
         
                    
                            <div className='col text-start ps-0'>Còn trống</div>
                          <div className='col text-end'>{dataDetail && dataDetail.seats.filter(i=>( i.status==='Available')).length } ghế</div>
                       
                          </div>
                   
                        </div>
                      </div>
                      {/* {/*------------------END --- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                      </div>
                      <div className='row mt-3 mx-0'>
                        <h6  style={{fontWeight:"700"}} className='mb-2'>Các điểm đón </h6>
                        <div className='col'>
                          <table className='table'>
                            <thead> 
                              <tr>        
                            <th></th>
                            <th>Điểm đón</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian</th>
                            <th></th>
                            </tr>  
                            </thead>
             {/* {loadPoint ? (
                          <LoadingAd/>
                        ):( */}
                            <tbody>
                    
                          {dataDetail && dataDetail.schedule &&dataDetail.schedule
                            .filter(item => item.type === 'pickup')
                            .sort((a, b) => {
                              // Chuyển đổi chuỗi thời gian sang đối tượng Date để so sánh thời gian
                              const timeA = new Date(`2000-01-01T${a.time}`);
                              const timeB = new Date(`2000-01-01T${b.time}`);
                              return timeA - timeB; // Sắp xếp từ sớm đến muộn
                            })
                            .map((item, index) => {
                     
                              return (
                                <tr key={item.id}> {/* Use a unique identifier as the key */}
                                  <td>{index + 1}</td> {/* Increment the index to display the row number */}
                                  <td style={{maxWidth:"200px"}}>{item.name}</td>
                                  <td  style={{maxWidth:"400px"}}>{item.address}</td>
                                  <td> { formatTimeAdminTrip( item.time)}</td>
                                  <td>
                                  <i class="fas fa-pen-to-square"  onClick={()=> handleUpdatePoint(item.id,'pickup', item.time,tripId, item.point_id)}></i>
                                  <i class="fas fa-trash" onClick={()=> handleDeletePoint(item.id)}></i>
                                  </td>
                                </tr>
                              );
                          })}
                     
                       
  
                            </tbody>   
                            {/* )}    */}
                          </table>
                          {dataDetail && dataDetail.schedule && !dataDetail.schedule.find(item => item.type === 'pickup') &&  <div className='text-center'>Ko có điểm đón </div> }
                          <button className='btn btn-primary' onClick={handleAddStart}>Thêm điểm đón</button>
                          {showAddStart && 
                        <div className='form-add-start-end'>
                          <form action="" className='row m-0 ' onSubmit={handleAddTimePointStart}>
                            <div className='form-group w-50'>
                              <label htmlFor="">Điểm đón</label>
                              <select id="" className='form-select' name="point_id" value={pointStart.point_id} onChange={(e)=> setPointStart({ ...pointStart, point_id: e.target.value })} >
                              <option value=''>Chọn điểm đón</option>
                                {dataDetail && nameStart&& nameStart.map(i=>(
                                  <option value={i.id}>{i.name}</option>
                                ))}
                        
                              </select>
                            </div>
                            {/* <input type="text" name='type' value='pickup'   onChange={(e)=> setPointStart({ ...pointStart, type: e.target.value })}/>
                            <input type="number" name='trip_id'  value={tripId}  onChange={(e)=> setPointStart({ ...pointStart, trip_id: e.target.value })}/> */}
                            <div className='form-group w-50'>
                              <label htmlFor="">Thời gian đón</label>
                             <input type="time" className='form-control' name='time' value={pointStart.time} onChange={(e)=> setPointStart({ ...pointStart, time: e.target.value })}/>
                            </div>
                            <div className='form-group text-center mt-3'>
                            <button className='btn-add' type='submit'>Thêm</button>
                            </div>
                          </form>
                        </div>
                          }
                             {editPoint&& 
                        <div className='form-add-start-end'>
                          <form action="" className='row m-0 ' onSubmit={ handleSubmitUpdatePointStart}>
                            <div className='form-group w-50'>
                              <label htmlFor="">Điểm đón</label>
                              <input type="text"  value={pointStartEdit.point_id}/>
                              <select id="" className='form-select' name="point_id" value={pointStartEdit.point_id} onChange={handleChangeinputedit} >
                              <option value=''>Chọn điểm đón</option>
                                {dataDetail && nameStart&& nameStart.map(i=>(
                               
                               <option key={i.id} value={i.id}>
                               {i.name} 
                             </option>
                                  // </>
                                ))}
                        
                              </select>
                            </div>
     
                            <div className='form-group w-50'>
                              <label htmlFor="">Thời gian đón</label>
                             <input type="time" className='form-control' name='time' value={pointStartEdit.time} onChange={handleChangeinputedit}/>
                            </div>
                            <div className='form-group text-center mt-3'>
                            <button className='btn-add' type='submit'>Cập nhật</button>
                            </div>
                          </form>
                        </div>
                          }
                        </div>
                      </div>
                      <div className='row mt-3 mx-0'>
                        <h6 style={{fontWeight:"700"}} className='mb-2'>Các điểm trả </h6>
                        <div className='col'>
                          <table className='table'>
                            <thead> 
                              <tr>        
                            <th></th>
                            <th>Điểm trả</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian</th>
                            <th></th>
                            </tr>  
                            </thead>
                            <tbody>
                            {dataDetail && dataDetail.schedule &&dataDetail.schedule
                              .filter(item => item.type === 'dropoff')
                              .sort((a, b) => {
                                // Chuyển đổi chuỗi thời gian sang đối tượng Date để so sánh thời gian
                                const timeA = new Date(`2000-01-01T${a.time}`);
                                const timeB = new Date(`2000-01-01T${b.time}`);
                                return timeA - timeB; // Sắp xếp từ sớm đến muộn
                              })
                              .map((item, index) => {
                       
                                return (
                                  <tr key={index}> {/* Use a unique identifier as the key */}
                                    <td>{index + 1}</td> {/* Increment the index to display the row number */}
                                    <td  style={{maxWidth:"200px"}}>{item.name}</td>
                                    <td  style={{maxWidth:"400px"}}>{item.address}</td>
                                    <td> { formatTimeAdminTrip( item.time)}</td>
                                    <td>
                                    <i class="fas fa-pen-to-square" onClick={()=>handleUpdatePointEnd(item.id,'dropoff', item.time,tripId, item.point_id)}></i>
                                    <i class="fas fa-trash"  onClick={()=> handleDeletePoint(item.id)}></i>
                                    </td>
                                  </tr>
                                );
                            })}
                    
                            </tbody>
                          </table>
                          {dataDetail && dataDetail.schedule && !dataDetail.schedule.find(item => item.type === 'dropoff') &&  <div className='text-center'>Ko có điểm trả </div> }
                          <button className='btn btn-primary' onClick={handleAddEnd}>Thêm điểm trả</button>
                          {showAddEnd && 
                        <div className='form-add-start-end'>
                          <form action="" className='row m-0 ' onSubmit={handleAddTimePointEnd}>
                            <div className='form-group w-50'>
                              <label htmlFor="">Điểm trả</label>
                              <select  id="" className='form-select'  name="point_id" value={pointEnd.point_id} onChange={(e)=> setPointEnd({ ...pointEnd, point_id: e.target.value })}>
                              <option value=''>Chọn điểm trả</option>

                              {dataDetail && nameEnd&& nameEnd.map(i=>(
                                   <option value={i.id}>{i.name}</option>
                
                                ))}
                              </select>
                            </div>
                           
                            <div className='form-group w-50'>
                              <label htmlFor="">Thời gian trả</label>
                             <input type="time" className='form-control'  name='time' value={pointEnd.time} onChange={(e)=> setPointEnd({ ...pointEnd, time: e.target.value })}/>
                            </div>
                            <div className='form-group text-center mt-3'>
                            <button className='btn-add' type='submit'>Thêm</button>
                            </div>
                          </form>
                        </div>
                          }
                                      {editPointEnd&& 
                        <div className='form-add-start-end'>
                          <form action="" className='row m-0 '  onSubmit={ handleSubmitUpdatePointEnd}>
                            <div className='form-group w-50'>
                              <label htmlFor="">Điểm đón</label>
                              <input type="text"  value={pointEndEdit.point_id}/>
                              <select id="" className='form-select' name="point_id" value={pointEndEdit.point_id} onChange={handleChangeinputeditEnd} >
                              <option value=''>Chọn điểm đón</option>
                                {dataDetail &&  nameEnd&&  nameEnd.map(i=>(
                                  // <>
                                  //  <option value={pointStartEdit.point_id===i.id ? 'selected':''}>{i.name}</option>
                                  // <option value={i.id}>{i.name}</option>
                                  <option key={i.id} value={i.id}>
                                  {i.name}
                                </option>
                                  // </>
                                ))}
                        
                        </select>
                            </div>
     
                            <div className='form-group w-50'>
                              <label htmlFor="">Thời gian đón</label>
                             <input type="time" className='form-control' name='time' value={pointEndEdit.time} onChange={handleChangeinputeditEnd}/>
                            </div>
                            <div className='form-group text-center mt-3'>
                            <button className='btn-add' type='submit'>Cập nhật</button>
                            </div>
                          </form>
                        </div>
                          }
                        </div>
                      </div>
      </div>
      </>
     )}
    </div>

  </div>
</div>

            </>
          )}

    </div>
    );
};

export default TripList;