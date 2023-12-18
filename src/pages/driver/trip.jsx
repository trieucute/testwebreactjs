import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import car from '../../assets/images/bus1.jpg'
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteTripAdmin, fetchTripAdmin, fetchTripAdminDetail } from '../../reduxTool/tripSlice';
import ReactPaginate from 'react-paginate';
import { formatDateTimeAdminTrip, formatTimeAdminTrip } from '../../config';
import LoadingAd from '../loadingAdmin';
import { deletePoint, fetchAddPoint, fetchStationPoint, updatePoint } from '../../reduxTool/stationSlice';
import axiosAdmin from '../admin/axois-admin';
import { useStateContext } from '../../context/ContextProvider';
import { changeStatusDriver, fetchTripDriver, fetchTripDriverDetail } from '../../reduxTool/tripDriverSlice';
import Notification from '../NotificationTrip';
const TripOfDriver = () => {
  const navigate = useNavigate();
  // const handleAddTrip=()=>{
  // navigate('/admin/trips/addnew')
  // }
  const { driver } = useStateContext()
  const [showAddStart, setShowAddStart] = useState(false);
  const [showAddEnd, setShowAddEnd] = useState(false);
  const idDriver = driver?.id

  const handleAddStart = () => {
    setShowAddStart(!showAddStart)
  }
  const handleAddEnd = () => {
    setShowAddEnd(!showAddEnd)
  }
  const dispatch = useDispatch();
  const tripData = useSelector(state => state.tripDriver)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const trips = tripData?.data.data
  const [loading, setLoading]=useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchTripDriver(idDriver))
    .then(res=>{
      setLoading(false)
    })

  }, [])

  // Tạo đối tượng Date hiện tại
  const now = new Date();

  // tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage] = useState(3); // Số lượng xe hiển thị mỗi trang
  const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
  // const [pageCount, setPageCount] = useState(0); // Initialize pageCount state
  const offset = pageNumber * perPage;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
  };

  const [sortByDepartureTime, setSortByDepartureTime] = useState(false);
  const [paginatedTrips, setPaginatedTrips] = useState([])


  // ... (existing code remains the same)

  // useEffect(() => {
  //   // Sắp xếp từ mới nhất đến cũ nhất dựa trên departure_time
  //   const sortedTrips = sortByDepartureTime
  //     ? trips?.slice().sort((a, b) => new Date(b.departure_time) - new Date(a.departure_time))
  //     : trips?.slice().sort((a, b) => b.id - a.id);
  //   const currentTrips = searchTerm
  //     ? sortedTrips?.filter((trip) =>
  //       trip.start_station.province.toLowerCase().includes(searchTerm.toLowerCase()) || trip.end_station.province.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     : sortedTrips;
  //   setSortedTripsByDepartureTime(currentTrips);
  // }, [sortByDepartureTime, trips, searchTerm]);

  const handleFilterClick = () => {
    setSortByDepartureTime(!sortByDepartureTime);
    setPageNumber(0); // Reset page number on filter change
  };
  // useEffect(() => {
  //   const paginated = sortedTripsByDepartureTime?.slice(offset, offset + perPage);
  //   setPaginatedTrips(paginated);
  //   // Calculate pageCount based on paginatedTrips length
  //   const count = Math.ceil(sortedTripsByDepartureTime?.length / perPage);
  //   setPageCount(count);
  // }, [offset, perPage, sortedTripsByDepartureTime]);


  const [sortedTripsByWaiting,setSortedTripsByWaiting]= useState('')
  const [sortedTripsByWaitingCount,setSortedTripsByWaitingCount]= useState('')

  const [sortedTripsByDone,setSortedTripsByDone]= useState('')
  const [sortedTripsByDoneCount,setSortedTripsByDoneCount]= useState('')

  const [sortedTripsByDoing,setSortedTripsByDoing]= useState('')
  const [sortedTripsByDoingCount,setSortedTripsByDoingCount]= useState('')


  const applyPaginationAndSearch = (data) => {
    const sortedTrips = sortByDepartureTime
      ? data?.slice().sort((a, b) => new Date(b.departure_time) - new Date(a.departure_time))
      : data?.slice().sort((a, b) => b.id - a.id);
  
    const filteredTrips = searchTerm
      ? sortedTrips?.filter((trip) =>
          trip.start_station.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.end_station.province.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sortedTrips;
  
    const offset = pageNumber * perPage;
    const pageCount = Math.ceil(filteredTrips?.length / perPage);
    const paginatedData = filteredTrips?.slice(offset, offset + perPage);
  
    return { paginatedData, pageCount };
  };
// Tránh gọi applyPaginationAndSearch ở mức render
useEffect(() => {

  // Thực hiện các công việc khác dựa trên paginatedAll và pageCount nếu cần
  const { paginatedData: paginatedWait, pageCount: pageCountWait } = applyPaginationAndSearch(
    trips?.filter((i) => i.status ==='Chờ khởi hành')
  );
  setSortedTripsByWaiting(paginatedWait);
  setSortedTripsByWaitingCount(pageCountWait);

  const { paginatedData: paginatedDone, pageCount: pageCountDone} = applyPaginationAndSearch(
    trips?.filter((i) => i.status === 'Đã hoàn thành')
  );
  setSortedTripsByDone( paginatedDone);
  setSortedTripsByDoneCount( pageCountDone);

  const { paginatedData: paginatedDoing, pageCount: pageCountDoing } = applyPaginationAndSearch(
    trips?.filter((i) => i.status === 'Đang khởi hành')
  );
  setSortedTripsByDoing( paginatedDoing);
  setSortedTripsByDoingCount( pageCountDoing);


}, [trips ,sortByDepartureTime,searchTerm, pageNumber, perPage]);
  // const { paginatedData: paginatedAll, pageCount } = applyPaginationAndSearch(trips);
  // const { paginatedData: paginatedWait, pageCount: pageCountWait } = applyPaginationAndSearch(
  //   trips?.filter((i) => i.status === 'Chờ khởi hành')
  // );
  // const { paginatedData: paginatedDoing, pageCount: pageCountDoing } = applyPaginationAndSearch(
  //   trips?.filter((i) => i.status === 'Đang khởi hành')
  // );
  // const { paginatedData: paginatedDone, pageCount: pageCountDone} = applyPaginationAndSearch(
  //   trips?.filter((i) => i.status === 'Đã hoàn thành')
  // );

  // xem chi tiết

  const dataDetail = tripData.update?.data;
  // const stationPoint= useSelector(state=>state.stationAdmin);
  const [nameStart, setNameStart] = useState([]);
  const [nameEnd, setNameEnd] = useState([]);

  const [tripId, setTripId] = useState(null)

  const handleTripdetail = (id, id_start, id_end) => {
    
    dispatch(fetchTripDriverDetail(id))
    setTripId(id)
    dispatch(fetchStationPoint(id_start))
      .then(res => {
        console.log('start', res.payload.data);
        setNameStart(res.payload.data)
      })
      .catch(err => {
        console.error(err);

      })
    dispatch(fetchStationPoint(id_end))
      .then(res => {
        // console.log('end', res.payload.data);
        setNameEnd(res.payload.data)
      })
      .catch(err => {
        console.error(err);

      })

  }
  const loadingDetail = tripData?.loading;
  const [showNotifi, setShowNotifi] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const handleChangeStatus = (id, value,time) => {
    // setLoadingDelete(true)
    const currentTime = new Date();
    const post = {
      id: id,
      status: value
    }

    const isDepartureTimePassed = new Date(time) < currentTime; 
    console.log(isDepartureTimePassed,new Date(time));
    // dispatch(changeStatus(post))
    // dispatch(fetchTripAdmin())
    // setLoadingDelete(false)
    if( value ==='Chờ khởi hành' &&isDepartureTimePassed ){
      setNotificationMessage('Lỗi không cập nhật trạng thái được vì đã qua thời gian khởi hành ');
      setShowNotifi(true);
  
      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return
    }
    const confirmDeletion = window.confirm("Bạn có chắc muốn cập nhật trạng thái chuyến xe này?");
    setLoading(true)
    if (confirmDeletion) {
      dispatch(changeStatusDriver(post))
        .then((res) => {
          console.log(res);
          dispatch(fetchTripDriver(idDriver))// Gọi lại action fetchCarSeat để load lại dữ liệu
            .then(res => {
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

 
  // So sánh departure_time với currentTime
  // if (new Date(trips?.map(item=>{
  //   item.departure_time< currentTime
  // })) {
  // setShowWait(true)
  // console.log(trips?.departure_time, showWait);
  // }
  return (
    <div>
      {loading? (
        <LoadingAd />
      ) : (
        <>
   {showNotifi &&  <Notification message={notificationMessage} />}
          <div className='tripAdmin-container'>
            <h3 className='h3-admin'>Lịch trình chuyến xe</h3>
            <div className='row mx-0 my-2'>
              {/* <div className='col ps-0 '>
              <button className='btn-add' onClick={handleAddTrip}> <i class="fas fa-bus"></i> Thêm chuyến xe</button>
            </div> */}
              <div className='search col text-end my-2' >
                <form action="">
                  <input type="text" placeholder='Tìm kiếm chuyến xe' className='form-control w-100' style={{ marginLeft: "auto" }} value={searchTerm}
                    onChange={handleSearch} /><button type='button'><i class="fas fa-magnifying-glass"></i></button>
                </form>
              </div>
            </div>
            <div>
              <ul class="nav nav-tabs mb-1 row-mobile-tabs" id="pills-tab" role="tablist">
              
                <li class="nav-item col-mobile-tabs" role="presentation">
                  <button class="nav-link active" id="pills-wait-tab" data-bs-toggle="pill" data-bs-target="#pills-wait" type="button" role="tab" aria-controls="pills-wait" aria-selected="false">Chờ khởi hành</button>
                </li>
                <li class="nav-item col-mobile-tabs" role="presentation">
                  <button class="nav-link" id="pills-doing-tab" data-bs-toggle="pill" data-bs-target="#pills-doing" type="button" role="tab" aria-controls="pills-doing" aria-selected="false">Đang khởi hành</button>
                </li>
                <li class="nav-item col-mobile-tabs" role="presentation">
                  <button class="nav-link" id="pills-done-tab" data-bs-toggle="pill" data-bs-target="#pills-done" type="button" role="tab" aria-controls="pills-done" aria-selected="false">Đã hoàn thành</button>
                </li>

              </ul>
              <div class="tab-content" id="pills-tabContent">
             

                <div class="tab-pane px-1 fade show active" id="pills-wait" role="tabpanel" aria-labelledby="pills-wait-tab">
                <div className='table-dataUser mt-4 row-mobile'  >
                    <table className='table col-mobile' >
                      <thead>
                        <tr>
                          <th></th>
                          <th>Nơi bắt đầu</th>
                          <th>Nơi đến</th>
                          <th>Xe</th>
                          <th>Tài xế</th>
                          <th>Ngày khởi hành <i className="fas fa-filter" onClick={handleFilterClick}></i></th>
                          <th>Trạng thái</th>
                          <th></th>

                        </tr>
                      </thead>
                      <tbody>
                      {!sortedTripsByWaiting&& <LoadingAd/>}
                        {sortedTripsByWaiting &&
                         sortedTripsByWaiting.map((item, index) => {
                    
                          return (
                            <tr key={item.id}>
                              <td>{index + offset + 1}</td>
                              <td>{item.start_station.name} ( {item.start_station.province} )</td>
                              <td>{item.end_station.name} ( {item.end_station.province} )</td>
                              <td>{item.car}</td>
                              <td>{item.driver}</td>
                              <td>{formatDateTimeAdminTrip(item.departure_time)}</td>
                              <td className='status-destop'><Tooltip style={{ width: "650px" }} title={
                                <div ><h6 className='text-center' style={{ fontSize: "15px", marginBottom: "10px", paddingTop: "5px" }}>Cập nhật trạng thái xe</h6>
                
                                       
                                   < button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành', item.departure_time)}>Chờ khởi hành</button>
                                              
                                           
                                  <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                  <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                </div>}
                                placement="top" arrow>{item.status} <i class="far fa-hand"></i></Tooltip>

                              </td>
                              <td className='status-mobile'>
                              <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '13px'}}>
                                          Cập nhật
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{width:"100% !important", minWidth:"inherit",    whiteSpace: 'normal'}}>
                                          {/* <li><a class="dropdown-item" href="#">Action</a></li>
                                          <li><a class="dropdown-item" href="#">Another action</a></li>
                                          <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                          < button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px",width:"100%" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành', item.departure_time)}>Chờ khởi hành</button>
                                              
                                           
                                              <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                              <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                        </ul>
                                      </div>
                              </td>
                
                              <td>
                              <button className='btn btn-primary btn-mobile-admin-destop' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem chi tiết</button>
                                <button className='btn btn-primary btn-mobile-admin' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem</button>
                              </td>

                            </tr>
  );
})}



                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-contents">
                    {sortedTripsByWaitingCount> 1 && (<ReactPaginate
                      previousLabel={<i className="fas fa-caret-left"></i>}
                      nextLabel={<i className="fas fa-caret-right"></i>}
                      pageCount={sortedTripsByWaitingCount}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                    )}
                  </div>
                </div>

                <div class="tab-pane px-1 " id="pills-doing" role="tabpanel" aria-labelledby="pills-doing-tab">
                <div className='table-dataUser mt-4 row-mobile'  >
                    <table className='table col-mobile' >
                      <thead>
                        <tr>
                          <th></th>
                          <th>Nơi bắt đầu</th>
                          <th>Nơi đến</th>
                          <th>Xe</th>
                          <th>Tài xế</th>
                          <th>Ngày khởi hành <i className="fas fa-filter" onClick={handleFilterClick}></i></th>
                          <th>Trạng thái</th>
                          <th></th>

                        </tr>
                      </thead>
                      <tbody>
                      {!sortedTripsByDoing&& <LoadingAd/>}
                        {sortedTripsByDoing &&
                         sortedTripsByDoing.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + offset + 1}</td>
                              <td>{item.start_station.name} ( {item.start_station.province} )</td>
                              <td>{item.end_station.name} ( {item.end_station.province} )</td>
                              <td>{item.car}</td>
                              <td>{item.driver}</td>
                              <td>{formatDateTimeAdminTrip(item.departure_time)}</td>
                              <td className='status-destop'><Tooltip style={{ width: "650px" }} title={
                                <div ><h6 className='text-center' style={{ fontSize: "15px", marginBottom: "10px", paddingTop: "5px" }}>Cập nhật trạng thái xe</h6>
                                  <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành',item.departure_time)}>Chờ khởi hành</button>
                                  <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                  <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                </div>}
                                placement="top" arrow>{item.status} <i class="far fa-hand"></i></Tooltip>

                              </td>
                              <td className='status-mobile'>
                              <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '13px'}}>
                                          Cập nhật
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{width:"100% !important", minWidth:"inherit", whiteSpace: 'normal'}}>
                                          {/* <li><a class="dropdown-item" href="#">Action</a></li>
                                          <li><a class="dropdown-item" href="#">Another action</a></li>
                                          <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                          < button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px",width:"100%" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành', item.departure_time)}>Chờ khởi hành</button>
                                              
                                           
                                              <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                              <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                        </ul>
                                      </div>
                              </td>
                              <td>
                              <button className='btn btn-primary btn-mobile-admin-destop' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem chi tiết</button>
                                <button className='btn btn-primary btn-mobile-admin' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem</button>
                              </td>

                            </tr>
                          ))}




                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-contents">
                    {sortedTripsByDoingCount> 1 && (<ReactPaginate
                      previousLabel={<i className="fas fa-caret-left"></i>}
                      nextLabel={<i className="fas fa-caret-right"></i>}
                      pageCount={sortedTripsByDoingCount}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                    )}
                  </div>
                </div>

                <div class="tab-pane px-1" id="pills-done" role="tabpanel" aria-labelledby="pills-done-tab">
                <div className='table-dataUser mt-4 row-mobile'  >
                    <table className='table col-mobile' >
                      <thead>
                        <tr>
                          <th ></th>
                          <th >Nơi bắt đầu</th>
                          <th >Nơi đến</th>
                          <th >Xe</th>
                          <th >Tài xế</th>
                          <th >Ngày khởi hành <i className="fas fa-filter" onClick={handleFilterClick}></i></th>
                          <th >Trạng thái</th>
                          <th ></th>

                        </tr>
                      </thead>
                      <tbody>
                      {!sortedTripsByDone&& <LoadingAd/>}
                        {sortedTripsByDone &&
                         sortedTripsByDone.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + offset + 1}</td>
                              <td>{item.start_station.name} ( {item.start_station.province} )</td>
                              <td>{item.end_station.name} ( {item.end_station.province} )</td>
                              <td>{item.car}</td>
                              <td>{item.driver}</td>
                              <td>{formatDateTimeAdminTrip(item.departure_time)}</td>
                              <td  className='status-destop'><Tooltip style={{ width: "650px" }} title={
                                <div ><h6 className='text-center' style={{ fontSize: "15px", marginBottom: "10px", paddingTop: "5px" }}>Cập nhật trạng thái xe</h6>
                                  <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành', item.departure_time)}>Chờ khởi hành</button>
                                  <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                  <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                </div>}
                                placement="top" arrow>{item.status} <i class="far fa-hand"></i></Tooltip>

                              </td>
                              <td className='status-mobile'>
                              <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '13px'}}>
                                          Cập nhật
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{width:"100% !important", minWidth:"inherit", whiteSpace: 'normal'}}>
                                          {/* <li><a class="dropdown-item" href="#">Action</a></li>
                                          <li><a class="dropdown-item" href="#">Another action</a></li>
                                          <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                          < button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px",width:"100%" }} className={`btn ${item.status === 'Chờ khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Chờ khởi hành', item.departure_time)}>Chờ khởi hành</button>
                                              
                                           
                                              <button type='button' style={{ fontSize: "12.5px", marginRight: "3px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đang khởi hành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đang khởi hành', item.departure_time)}>Đang khởi hành</button>
                                              <button type='button' style={{ fontSize: "12.5px", padding: "5px 4px" ,width:"100%" }} className={`btn ${item.status === 'Đã hoàn thành' ? 'btn-success' : 'btn-light'}`} onClick={() => handleChangeStatus(item.id, 'Đã hoàn thành', item.departure_time)}>Đã hoàn thành</button>
                                        </ul>
                                      </div>
                              </td>
                              <td>
                                <button className='btn btn-primary btn-mobile-admin-destop' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem chi tiết</button>
                                <button className='btn btn-primary btn-mobile-admin' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleTripdetail(item.id, item.start_station.id, item.end_station.id)}>Xem</button>
                              </td>

                            </tr>
                          ))}




                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-contents">
                    {sortedTripsByDoneCount> 1 && (<ReactPaginate
                      previousLabel={<i className="fas fa-caret-left"></i>}
                      nextLabel={<i className="fas fa-caret-right"></i>}
                      pageCount={sortedTripsByDoneCount}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* <!-- Modal --> */}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style={{ maxWidth: "850px" }}>

              <div class="modal-content">
                {loadingDetail ? (
                  <><LoadingAd /></>
                ) : (
                  <>
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Xe {dataDetail && dataDetail.car.name} </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div className='row mx-0 mt-2'>
                        <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12'>
                          <img src={dataDetail && dataDetail.car.primary_img} alt="" className='img-fluid' />
                        </div>
                        <div className='col-xxl-9 col-xl-9 col-lg-9 col-md-12 '>
                          <div className='row m-0'>
                            <div className='col text-start'>Biển số</div>
                            <div className='col text-end '>{dataDetail && dataDetail.car.license_plate}</div>
                          </div>
                          <div className='row m-0'>
                            <div className='col text-start'>Số ghế</div>
                            <div className='col text-end'>{dataDetail && dataDetail.car.number_seat}</div>
                          </div>
                          <div className='row m-0'>
                            <div className='col text-start'>Loại xe</div>
                            <div className='col text-end'>{dataDetail && dataDetail.car.type}</div>
                          </div>
                          <div className='row m-0'>
                            <div className='col text-start'>Ngày khởi hành</div>
                            <div className='col text-end'>{formatDateTimeAdminTrip(dataDetail && dataDetail.departure_time)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row px-4 py-3  tab-contents-car">

                        {dataDetail && dataDetail.car.type === 'Giường nằm' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 '>
                            <h5 className='text-center' style={{ fontSize: '1.1em' }}>Tầng Dưới</h5>
                            <div className='row px-3  items-content-floor'>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('A'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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




                        {dataDetail && dataDetail.car.type === 'Giường nằm' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 '>
                            <h5 className='text-center' style={{ fontSize: '1.1em' }}>Tầng Trên</h5>
                            <div className='row px-3  items-content-floor'>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('B'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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


                        {dataDetail && dataDetail.car.type === 'Limousine' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 '>
                            <h5 className='text-center' style={{ fontSize: '1.1em' }}>Tầng Dưới</h5>
                            <div className='row px-3  items-content-floor'>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('A'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row items-content-floor-double  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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




                        {dataDetail && dataDetail.car.type === 'Limousine' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 '>
                            <h5 className='text-center' style={{ fontSize: '1.1em' }}>Tầng Trên</h5>
                            <div className='row px-3  items-content-floor'>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('B'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row items-content-floor-double  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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


                        {dataDetail && dataDetail.car.type === 'Ghế' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 chair-mobile-admin'>
                            {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                            <div className='row px-3  items-content-floor '>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('A'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row items-content-floor-chair  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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




                        {dataDetail && dataDetail.car.type === 'Ghế' && dataDetail.seats && (
                          <div className='items-FloorDown col-sm-4 chair-mobile-admin'>
                            {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Trên</h5> */}
                            <div className='row px-3  items-content-floor '>

                              {dataDetail.seats
                                .filter(seat => seat.position.startsWith('B'))
                                .sort((a, b) => {
                                  const positionA = parseInt(a.position.substring(1));
                                  const positionB = parseInt(b.position.substring(1));
                                  return positionA - positionB;
                                })
                                .map(seat => (
                                  <div className={`items-content-floor-row items-content-floor-chair  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending' ? 'Chosen-seat' : ''}`}>
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
                              <div className='col text-end'>{dataDetail && dataDetail.seats.filter(i => (i.status === 'booked' || i.status === 'pending')).length} ghế</div>

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
                              <div className='col text-end'>{dataDetail && dataDetail.seats.filter(i => (i.status === 'Available')).length} ghế</div>

                            </div>

                          </div>
                        </div>
                        {/* {/*------------------END --- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                      </div>
                      <div className='row mt-3 mx-0'>
                        <h6 style={{ fontWeight: "700" }} className='mb-2'>Các điểm đón </h6>
                        <div className='col'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th></th>
                                <th>Điểm đón</th>
                                <th>Địa chỉ</th>
                                <th>Thời gian</th>

                              </tr>
                            </thead>
                            {/* {loadPoint ? (
                          <LoadingAd/>
                        ):( */}
                            <tbody>

                              {dataDetail && dataDetail.schedule && dataDetail.schedule
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
                                      <td style={{ maxWidth: "200px" }}>{item.name}</td>
                                      <td style={{ maxWidth: "400px" }}>{item.address}</td>
                                      <td> {formatTimeAdminTrip(item.time)}</td>

                                    </tr>
                                  );
                                })}



                            </tbody>
                            {/* )}    */}
                          </table>
                          {dataDetail && dataDetail.schedule && !dataDetail.schedule.find(item => item.type === 'pickup') && <div className='text-center'>Ko có điểm đón </div>}

                        </div>
                      </div>
                      <div className='row mt-3 mx-0'>
                        <h6 style={{ fontWeight: "700" }} className='mb-2'>Các điểm trả </h6>
                        <div className='col'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th></th>
                                <th>Điểm trả</th>
                                <th>Địa chỉ</th>
                                <th>Thời gian</th>

                              </tr>
                            </thead>
                            <tbody>
                              {dataDetail && dataDetail.schedule && dataDetail.schedule
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
                                      <td style={{ maxWidth: "200px" }}>{item.name}</td>
                                      <td style={{ maxWidth: "400px" }}>{item.address}</td>
                                      <td> {formatTimeAdminTrip(item.time)}</td>

                                    </tr>
                                  );
                                })}

                            </tbody>
                          </table>
                          {dataDetail && dataDetail.schedule && !dataDetail.schedule.find(item => item.type === 'dropoff') && <div className='text-center'>Ko có điểm trả </div>}

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

export default TripOfDriver