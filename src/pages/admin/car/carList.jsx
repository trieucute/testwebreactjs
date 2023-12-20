import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import car from '../../../assets/images/bus1.jpg'
import user from '../../../assets/images/usernoavatar.png'
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux';
import { deletecarAdmin, fetchcarAdmin } from '../../../reduxTool/carSlice';
import LoadingAd from '../../loadingAdmin';
import { deleteCarSeat, fetchCarSeat, postCarSeat, updateCarSeat } from '../../../reduxTool/seatSlice';
import ReactPaginate from 'react-paginate';
import { API_BASE_URL } from '../../../config';
import axiosAdmin from '../axois-admin';
import Notification from '../../NotificationTrip';

const CarList = () => {
    const navigate = useNavigate();
    const handleAdd=()=>{
    navigate('/admin/cars/addnew')
    }
    const [showAddChair, setShowAddChair]= useState(false)
    const handleshowAddChair =()=>{
    setShowAddChair(!showAddChair)
    setEditChair(false) 
    }
    const dispatch= useDispatch();
    const carData= useSelector(state=>state.carAdmin)
    const cars= carData?.data.data

    useEffect(()=>{

    dispatch(fetchcarAdmin())

    },[])

    const [selectedCarComments, setSelectedCarComments] = useState([]);
    const seats= useSelector(state=>state.seatAdmin)
    const [typeCar, setTypeCar] = useState('');
    const [idCar, setIdCar] = useState('');
    const [showDetail, setShowDetail] = useState(false);

    const handleViewDetail = (comments,id,type) => {
      setSelectedCarComments(comments);
      setTypeCar(type)
      setIdCar(id)
      dispatch(fetchCarSeat(id))
    };
    
      console.log(selectedCarComments,'seats');
    const seatsData= seats?.data.data; 
    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

 // Sắp xếp từ cao đến thấp
 const sortedCarsById = cars?.slice().sort((a, b) => b.id - a.id);
 
    const currentCars = searchTerm
    ? sortedCarsById?.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sortedCarsById  ;

  const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
  const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại

  const offset = pageNumber * perPage;
  const pageCount = Math.ceil(currentCars?.length / perPage);
  const paginatedCars = currentCars?.slice(offset, offset + perPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
  };


  // Tính trung bình số sao (rate) từ mảng comment và làm tròn
  const calculateRoundedAverageRate = (comments) => {
    const totalRates = comments.reduce((acc, comment) => {
      return acc + parseInt(comment.rate);
    }, 0);

    const averageRate = totalRates / comments.length;
    return Math.round(averageRate); // Làm tròn trung bình số sao
  };

  // Render icon fa-star dựa trên giá trị đã làm tròn
  const renderStars = (roundedRate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < roundedRate) {
        stars.push(<i key={i} className="fas fa-star" style={{ color: "yellow" }}></i>);
      } else {
        stars.push(<i key={i} className="far fa-star" style={{ color: "grey" }}></i>);
      }
    }
    return stars;
  };


  const [dataChair, setDataChair]= useState({
    position:'',
    type:'',
    price:0
  })
  const handleChangeinput=(e)=>{
    setDataChair({
      ...dataChair,
      [e.target.name]: e.target.value,
    })
  }
  const handleAddChair =(e)=>{
    e.preventDefault();
    const { position, type, price } = dataChair;
    const positionRegex =/^(A|B)\d{1,2}$/;

    if(dataChair.position===''|| dataChair.type===''|| dataChair.price===''){
      setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return
    }
    if (!positionRegex.test(position)) {
      setNotificationMessage('Sai cú pháp! Vui lòng nhập đúng định dạng (A10) (B12).');
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return;
    }
  
    // Kiểm tra xem ghế đã tồn tại hay chưa
    const existingSeat = seatsData.find(seat => seat.position === position);
    if (existingSeat) {
      setNotificationMessage('Ghế đã tồn tại!');
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return;
    }
  
    const data={
      // car_id:idCar,
      position:dataChair.position,
      type:dataChair.type,
      price:dataChair.price
    }
    // console.log(postCarSeat(idCar,data));
    dispatch(postCarSeat({id:idCar,payload:data}))
    .then(res=>{
      console.log(res);
      // alert("Thêm ghế thành công")
      setDataChair({
        position:'',
        type:'',
        price:0
      })
      dispatch(fetchCarSeat(idCar)); // Gọi lại action fetchCarSeat để load lại dữ liệu
      // dispatch(fetchcarAdmin());

    })
    .catch(err=>{
      console.error(err);
    })

  }
  const handleDeleteChair=(id)=>{
    const confirmDeletion = window.confirm("Bạn có chắc muốn xoá ghế này?");
    console.log(idCar,' idCar');
    if (confirmDeletion) {
      
      // dispatch(deleteCarSeat(id,idCar))
      axiosAdmin.delete(`/car/${idCar}/seat/${id}`)
        .then((res) => {
          console.log(res);
          dispatch(fetchCarSeat(idCar)); // Gọi lại action fetchCarSeat để load lại dữ liệu
          // dispatch(fetchcarAdmin())

        })
        .catch((err) => {
       
            console.error(err);
          
        });
    }
  };

  // sửa ghế
  // State để lưu thông tin ghế cần chỉnh sửa
  const [editingSeat, setEditingSeat] = useState(null);
  const [editChair,setEditChair ]= useState(false)
  const [showNotifi, setShowNotifi] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const handleEditChair =(seat)=>{
    setEditChair(!editChair)
    console.log(seat,'seatedit');
   setEditingSeat(seat)
   setShowAddChair(false)
  }
  const handleChangeinputedit=(e)=>{
    setEditingSeat((prevEditingSeat) => ({
      ...prevEditingSeat,
      [e.target.name]: e.target.value,
    }));
  
  }
  console.log(editingSeat,'editing');
  const handleSubmitEditChair=(e)=>{
    e.preventDefault();
    const { position, type, price } = editingSeat;
    const positionRegex =/^(A|B)\d{1,2}$/;


    if(editingSeat.position===''|| editingSeat.type===''|| editingSeat.price===''){
      // alert('Vui lòng nhập đầy đủ thông tin!')
      setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return
    }
    if (!positionRegex.test(position)) {
      // alert('Vui lòng nhập tên ghế bắt đầu bằng A hoặc B!');
      setNotificationMessage('Sai cú pháp! Vui lòng nhập đúng định dạng (A10) (B12).');
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return;
    }
      // // Kiểm tra xem ghế đã tồn tại hay chưa
      // const existingSeat = seatsData.find(seat => seat.position === position);
      // if (existingSeat) {
      //   // alert('Ghế đã tồn tại!');
      //   setNotificationMessage('Ghế đã tồn tại!');
      //   setShowNotifi(true);
  
      //   // Hide the notification after 3 seconds
      //   setTimeout(() => {
      //     setShowNotifi(false);
      //   }, 3000);
      //   return;
      // }

    dispatch(updateCarSeat({ id: editingSeat.id, payload: editingSeat }))
    .then(res=>{
      console.log(res);
      setEditingSeat('')
      setEditChair()
      dispatch(fetchCarSeat(idCar)); // Gọi lại action fetchCarSeat để load lại dữ liệu
    })
    .catch(err=>{
      console.error(err)
    })
  }
  // xoá ghế
  const handleDelete = async (id) => {
    // dispatch(deletecarAdmin(id))
    const confirmDeletion = window.confirm("Bạn có chắc muốn xoá xe này?");
    if (confirmDeletion) {
      dispatch(deletecarAdmin(id))
        .then((res) => {
          console.log(res);
          dispatch(fetchcarAdmin())
        })
        .catch((err) => {
          console.error(err);
        });
    }
    
  }

    return (
        <div>
         {carData.loading ? (
          <><LoadingAd/></>
         ):(
          
     <>
 
        <div className='carAdmin-container'>
          <h3 className='h3-admin'>Quản lý xe khách</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              <button className='btn-add' onClick={handleAdd}> <i class="fas fa-bus"></i> Thêm xe khách</button>
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm xe' className='form-control w-75' style={{marginLeft:"auto"}}  value={searchTerm}
      onChange={handleSearch}/><button type='button'><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
          {/* <div ><button type='button' onClick={handleSort}>Sắp xếp</button></div> */}
          </div>
        
          <div className='table-dataUser mt-4'>
              <table className='table'>
                <thead>
                <tr>
                  <th></th>
                  <th>Tên xe</th>
                  <th>Biển số </th>    
                    <th>Số lượng ghế</th>
                    <th>Hình</th>
                    <th>Loại</th>
                    {/* <th>Giá</th> */}
                    <th>Đánh giá</th>
                  {/* <th>Trạng thái</th> */}
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedCars &&
          paginatedCars.map((item, index) => (
                          <tr key={item.id}>
               <td>{index + offset + 1}</td>

                  <td>{item.name}</td>
                  <td>{item.license_plate}</td>
                  <td>{item.number_seat}</td>
                  <td className='img-car'><img src={item.primary_img} alt="" /></td>
                  <td>{item.type}</td>
                  {/* <td>500.000 đ</td> */}
                  <td>{renderStars(calculateRoundedAverageRate(item.comment))} ({item.comment.length > 0 ? item.comment.length : 0 } đánh giá)</td>
                  {/* <td>1</td> */}
                  <td>
                  <button type='button' className='btn btn-primary ' data-bs-toggle="modal" data-bs-target="#exampleModal"   onClick={() => handleViewDetail(item.comment, item.id, item.type)}>Xem chi tiết</button>
                  </td>
                  <td >
                  <Link to={`/admin/cars/update/${item.id}`}><i class="fas fa-pen-to-square"></i></Link>
                    {/* <button data-bs-toggle="modal" data-bs-target="#exampleModaledit"></button><i class="fas fa-pen-to-square" onClick={()=>handleEdit(item.id)}></i> */}
                    <i class="fas fa-trash" onClick={()=>handleDelete(item.id)}></i>
                    </td>
                </tr> 
                  ))}
         
               
                
                </tbody>
              </table>
          </div>
          <div className="pagination-contents">
          {pageCount > 1 && (              <ReactPaginate  
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
  <div class="modal-dialog modal-dialog-centered modal-dialog-rate " style={{maxWidth:"800px"}}>
    <div class="modal-content">
      <div class="modal-header " style={{border:"none"}}>
        {/* <h5 class="modal-title" id="exampleModalLabel">Đánh giá </h5> */}
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
      {showNotifi &&  <Notification message={notificationMessage} />}
      <div class="tab-contents-car  ">
              <ul class="nav nav-tabs mb-1" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Ghế</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Đánh giá</button>
                </li>
                
              </ul>
              
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane px-1 fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                 {/* <h5>Giá ghế</h5> */}
                 <div className="row px-4 py-3 justify-content-center ">
                      {/* {/*-------------------- SỐ GHẾ TẦNG DƯỚI--------------------------* /} */}
           
                      {seats.loading ? (
                        <><LoadingAd/></>
                      ):(
                        <>
                           {seatsData && typeCar==='Giường nằm'&& (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                            
                                                        
                                                <div  key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                                                {seatsData && typeCar==='Limousine'  && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row items-content-floor-double'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                              
                                                <div  key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                                                   {seatsData  &&typeCar==='Ghế'  && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row items-content-floor-chair'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                
                                                <div  key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                    <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                        </>
                      )}
                   
             
                      {/* {/*-------------------- SỐ GHẾ TẦNG TRÊN--------------------------* /} */}
                      {seats.loading ? (
                        <><LoadingAd/></>
                      ):(
                        <>
                           {seatsData  && typeCar==='Giường nằm'  && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Trên</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                                
                                                <div  key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                                                       {seatsData  &&typeCar==='Limousine'  && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row items-content-floor-double'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                               
                                                       
                                                <div key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                       
                                    {seatsData  &&typeCar==='Ghế'  && (
                                          <div className='items-FloorDown col-sm-4 '>
                                          {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                          <div className='row px-3  items-content-floor'>
                     
                                          {seatsData
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                <div className='items-content-floor-row items-content-floor-chair'>
                                                <div className="d-flex  justify-content-center  m-auto py-1">
                                            
                                                       
                                                <div key={seat.id} id={`clickable-${seat.id}`}
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
                                                        color: "#2E8A99"
                                                      }}
                                                    >
                                                     {seat.position}
                                                    </span>
                                               
                                                  </div>
                                                  <Tooltip      anchorSelect={`#clickable-${seat.id}`} clickable>
                                                          <div><span> Ghế: {seat.position}, Loại: {seat.type}, Giá: {parseInt(seat.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}    </span>
                                                             <i class='fas fa-pen-to-square' style={{paddingLeft:"10px", cursor:"pointer"}} onClick={()=>handleEditChair(seat)}></i>
                                                            <i class='fas fa-trash' onClick={()=>handleDeleteChair(seat.id)} style={{paddingLeft:"10px", cursor:"pointer"}}></i>
                                                       </div>
                                                       </Tooltip>
                                                  </div>
                                                  </div>
               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                        </>
                      )}
                   

                      </div>
                      <button type='button' className='btn btn-primary' onClick={handleshowAddChair}>Thêm ghế</button>
                   {showAddChair &&  <div className='formaddchair mt-4'>
                   <h6 className='text-center' style={{fontWeight:"700"}}>Thêm ghế mới</h6>
                        <form action="" className='row m-0' onSubmit={handleAddChair}>
                          <div className='form-group col'>
                        <input type="number" value={idCar} hidden />
                            <label htmlFor="">Tên ghế</label>
                            <input type="text" className='form-control' placeholder='A19...' style={{fontSize:'14px'}} name='position'  onChange={e=>handleChangeinput(e)}/>
                          </div>
                 
                          <div className='form-group col'>
                            <label htmlFor="">Giá ghế</label>
                            <input type="number" className='form-control'  placeholder='500000' name='price' onChange={e=>handleChangeinput(e)}/>
                          </div>
                          <div className='form-group col'>
                            <label htmlFor="">Loại ghế</label>
                            <input type="text" className='form-control'  placeholder='Giường nằm vip...' name='type' onChange={e=>handleChangeinput(e)}/>
                          </div>
                          <p className='mt-2'>
                            * Bắt đầu bằng A là tầng dưới và B là tầng trên đối với xe giường và Limousine <br />
                          * Bắt đầu bằng A là cột bên trái và B là cột bên phải đối với xe ghế
                          </p>

                          <div className='form-group text-center mt-4'>
                            <button type='submit' className='btn-add'>Thêm ghế mới</button>
                          </div>
                        </form>
                      </div> }

                      {editChair && <div className='mt-3'>
                          <h6 className='text-center' style={{fontWeight:"700"}}>Cập nhật ghế</h6>
                          <form action="" className='row m-0' onSubmit={handleSubmitEditChair}>
                          <div className='form-group col'>
                        
                            <label htmlFor="">Tên ghế</label>
                            <input type="text" className='form-control' placeholder='A19...' style={{fontSize:'14px'}} name='position' value={editingSeat.position}  onChange={e=>handleChangeinputedit(e)}/>
                          </div>
                 
                          <div className='form-group col'>
                            <label htmlFor="">Giá ghế</label>
                            <input type="number" className='form-control'  placeholder='500.000' name='price' value={parseInt(editingSeat.price)} onChange={e=>handleChangeinputedit(e)}/>
                          </div>
                          <div className='form-group col'>
                            <label htmlFor="">Loại ghế</label>
                            <input type="text" className='form-control'  placeholder='Giường nằm vip...' name='type' value={editingSeat.type} onChange={e=>handleChangeinputedit(e)}/>
                          </div>
                          <p className='mt-2'>
                            * Bắt đầu bằng A là tầng dưới và B là tầng trên đối với xe giường và Limousine <br />
                          * Bắt đầu bằng A là cột bên trái và B là cột bên phải đối với xe ghế
                          </p>

                          <div className='form-group text-center mt-4'>
                            <button type='submit' className='btn-add'>Cập nhật</button>
                          </div>
                        </form>
                        </div>}
                </div>
                
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <div className='rate-contents modal-rateCar'>
                  {selectedCarComments.map((comment, index) => {
            
                       return (
                        <div key={index} className='row m-0 item-rate'>
                        <div className='col-3'>
                        {comment.avatar!==`${API_BASE_URL}/storage` ? (<img src={comment.avatar} alt="" className='img-fluid' />) :  (<img src={user} alt="" className='img-fluid' />)}
                        <div className='text-center nameUser'>{comment.user}</div>

                        {/* {comment.user &&    } */}
                        </div>
                        <div className='col'>
                          <div className='row m-0'>
                            <div className='col text-start content-rate'>{comment.content}</div>
                            <div className='col-3 text-end'>
                              {Array(parseInt(comment.rate)).fill().map((_, i) => (
                                <i key={i} class="fas fa-star" style={{color:"yellow"}}></i>
                              ))}
                              {Array(5 - parseInt(comment.rate)).fill().map((_, i) => (
                                <i key={i + parseInt(comment.rate)} class="far fa-star" style={{color:"grey"}}></i>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                       )
                  }
                 
          
          )}
                 
                  </div>
                </div>
              
              </div>
              
            </div>
   
      </div>
     
    </div>
  </div>
</div>
</>
    )} 







    </div>
    );
};

export default CarList;