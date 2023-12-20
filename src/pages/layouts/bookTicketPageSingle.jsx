import React, { useEffect, useState } from 'react';
// import "../../assets/css/home.css";
// import "../../assets/css/searchBus.css";
import "../../assets/css/datve.css";
import xe2 from "../../assets/images/xe2.gif";
import city from "../../assets/images/city2.jpg";
import axiosClient from '../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { TimeHM, formatDate } from '../../config';
import Notification from '../NotificationTrip';
import { useStateContext } from '../../context/ContextProvider';
import Loading from '../loadingTrip';
import { postPayment, setFormData, setUserData } from '../../reduxTool/dataTicketSlice';
import Comments from './comment';
import { tabsStepMobile } from '../../assets/js/bookTicketPage';
import { Tab, Tabs } from 'react-bootstrap';


const BookTicketPageSingle  = () => {

  const [key, setKey] = useState('step1');

useEffect(()=>{
  tabsStepMobile()
},[])
      const [isInforVisible, setIsInforVisible] = useState(false);
      const showInforne=()=>{
        setIsInforVisible(!isInforVisible)
      }

        
        const navigate= useNavigate()
        const tripId= useSelector(state => state.tripReducer.selectedTrip);
        // if(tripId===null){
     
        // }
        console.log(tripId);
   const [tripDetail,setTripDetail]= useState([])
   const [selectedSeats, setSelectedSeats] = useState([]);
   const [selectedSeatIds, setSelectedSeatIds] = useState([]);
   const [showFullMessage, setShowFullMessage] = useState(false);
   const handleSeatClick = (seat) => {
    if (seat.status !== 'booked' && seat.status !== 'pending') {
      const seatIndex = selectedSeats.indexOf(seat.position);
      const seatId = selectedSeatIds.indexOf(seat.id);
      if (seatIndex === -1 && selectedSeats.length < 5) {
        // Nếu chưa được chọn và số lượng ghế đã chọn chưa đạt tới giới hạn (5)
        setSelectedSeats([...selectedSeats, seat.position]);
        setSelectedSeatIds([...selectedSeatIds, seat.id]);
      } else if (seatIndex !== -1) {
        // Nếu đã được chọn, loại bỏ khỏi mảng
        const newSelectedSeats = [...selectedSeats];
        const newSelectedSeatIds = [...selectedSeatIds];
        newSelectedSeats.splice(seatIndex, 1);
        newSelectedSeatIds.splice(seatId, 1);
        setSelectedSeats(newSelectedSeats);
        setSelectedSeatIds(newSelectedSeatIds);
        
      }
      else {
        setShowFullMessage(true); // Hiển thị thông báo khi đã chọn đủ 5 ghế
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setShowFullMessage(false);
      }, 4000);
    }
  }

  };

   console.log(selectedSeats)
   console.log('seatid', selectedSeatIds);
   const { token } = useStateContext();
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true); // Biến trạng thái để kiểm soát việc hiển thị
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNum, setPhoneNum] = useState('');
   const [isChecked, setIsChecked] = useState(false);
  // useEffect(()=>{

  // })
  const handleCancel =()=>{
    window.history.back()
  }
      useEffect(()=>{
        window.scrollTo(0, 0);
        if (!tripId) {
          // navigate('/lichtrinh1chieu/?'); // Điều hướng đến đường dẫn tìm kiếm chuyến xe của bạn
          window.history.back()
          return; // Dừng các thao tác tiếp theo nếu không có tripId

        }
        // setIsLoading(true);
        const fetchData = async () => {
          try {
            setIsLoading(true); // Bắt đầu hiển thị "Loading..."
    
            // Fetch dữ liệu từ API /trip/${tripId}
            const tripResponse = await axiosClient.get(`/trip/${tripId}`);
            const tripData = tripResponse.data.data;
            setTripDetail(tripData);
            console.log(tripData );
           
            // Gọi API lấy thông tin người dùng nếu có token
            if (token) {
              const userInfor = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const userResponse = await axiosClient.get("/user/profile", userInfor);
              const userData = userResponse.data.data;
              setUser(userData);
            }
  
            setIsLoading(false); // Dừng hiển thị "Loading..." khi đã tải xong dữ liệu
 
            tabsStepMobile();
            // showInforBus();
          } catch (error) {
            console.error(error);
          
            setIsLoading(false); // Dừng hiển thị "Loading..." khi gặp lỗi trong quá trình tải dữ liệu
          }
        };
    
        fetchData();
       
      },[tripId, token])
  
    //   console.log(tripDetail.seats.position);
    const [pickupValue, setPickupValue] = useState('');
    const [dropoffValue, setDropoffValue] = useState('');
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [selectedDropoff, setSelectedDropoff] = useState(null);
  
    const handleSelect = (value, item, type) => {
      // Đây là nơi để xử lý khi một mục được chọn
      // Trong ví dụ này, mình giữ thông tin của mục đã chọn
      if (type === 'pickup') {
        setPickupValue(value);
        setSelectedPickup(item);
      } else if (type === 'dropoff') {
        setDropoffValue(value);
        setSelectedDropoff(item);
      }
    };


    const dispatch = useDispatch()
    const [showNotifi, setShowNotifi] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handlePay=(e)=>{
      e.preventDefault();
      if (selectedSeats.length === 0) {

        setNotificationMessage('Vui lòng chọn ghế');
        setShowNotifi(true);
  
        // Hide the notification after 3 seconds
        setTimeout(() => {
          setShowNotifi(false);
        }, 3000);
        return;
      }
        // Kiểm tra nếu không có giá trị trong input thì hiển thị thông báo
    if (!pickupValue.trim() || !dropoffValue.trim()) {

      setNotificationMessage('Vui lòng chọn điểm đón và điểm trả' );
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return; // Dừng việc xử lý nếu không có giá trị trong input
    }
   
    if (!isChecked) {
   
      setNotificationMessage('Vui lòng chấp nhận điều khoản và chính sách bảo mật của TicketProWeb' );
      setShowNotifi(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return;
    }
    if (Object.keys(user).length === 0 && (name === '' || email === '' || phoneNum === '')) {

        setNotificationMessage('Vui lòng nhập đầy đủ thông tin khách hàng' );
        setShowNotifi(true);
  
        // Hide the notification after 3 seconds
        setTimeout(() => {
          setShowNotifi(false);
        }, 3000);
    return; // Dừng việc xử lý nếu không có giá trị trong input
    }    
     // Lưu dữ liệu vào Redux store bằng cách dispatch các actions
    //  dispatch(setFormData({pickupValue, dropoffValue}));
    //  dispatch(setUserData({ name, email, phoneNum }));
    //  console.log('formData ', formData ,'userData',userData);
    const seatIds = selectedSeatIds.reduce((acc, seat, index) => {
      acc[`seat_id[${index}]`] = seat;
      return acc;
    }, {});
  
    const data = {
      email: email,
      trip_id: tripId,
      name: name,
      phone_number: phoneNum,
      pickup_location: pickupValue,
      dropoff_location: dropoffValue,
      selectedSeatsIds: selectedSeatIds,
      ...seatIds, // Thêm seatIds vào dữ liệu gửi đi
    };
  //   dispatch(postPayment(data))
  // .then((response) => {
  //   // Xử lý kết quả thành công nếu cần
  //   const payLink= response.payload.data
  //   console.log(payLink);
  //   window.location=`${payLink}`
  //   // navigate(`${payLink}`)
  // })
  // .catch((error) => {
  //   // Xử lý lỗi nếu có
  //   console.error(error)
  // });
  localStorage.setItem("ticket_ordered", JSON.stringify(data));
  setTimeout(() => {
    navigate("/pay");
  }, 1000);
    }
    useEffect(() => {
      if (Object.keys(user).length !== 0) {
        setName(user.name || '');
        setPhoneNum(user.phone_number || '');
        setEmail(user.email || '');
      }
    }, [user]);


    return (
        <div className='mt-10'>
            {/* ---------------------------tên chuyến xe (TP.HCM -> ĐÀ LẠT ) từ đâu đến đâu ----------------------------*/}
            {isLoading ? (
              <Loading/>
      ) : (
        <>
  
        <form action="">
        <div className='routes-bus-container container  ps-0 pe-0'>

                <div className=" d-flex align-items-center" style={{backgroundColor:"white"}}>
                    <div className='w-25 text-center'><img src={xe2} alt="" style={{width:"65%"}} /></div>
                    <div className='text-center w-50 ' >
                        <h5 className='p-0 m-0'>
                        {tripDetail&& tripDetail.start_station &&  tripDetail.end_station&&(
                          <>{tripDetail.start_station.province} - {tripDetail.end_station.province}</>
                        )
                        }
                          {/* TP.Hồ Chí Minh - Đà Lạt */}
                          </h5>
                        <span className='date_go'> {tripDetail && tripDetail.departure_time&&(
                                       <>{formatDate( tripDetail.departure_time.split(' ')[0])}</>
                                      )}
                        </span>
                    </div>
                    <div className='w-25 text-center'><img src={city} alt=""  style={{width:"63%"}} /></div>
                </div>

            {/* ---------------------------CÁC BƯỚC THỰC HIỆN MUA VÉ TRÊN MOBILE----------------------------*/}
            <Tabs
        id="controlled-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="steps-booking-contents mt-5"
      >
        <Tab eventKey="step1" title="Chọn ghế">
        <div className='contents-items-choose  items-chair items-choose backWhite-padding' id='step1'>
                                <div className='d-flex justify-content-between'>
                                    <h5>Chọn ghế</h5>
                                {/* ---------------------------THÔNG TIN XE --------------------------*/}

                                    <h6 className=' position-relative' id='infor_bus_router' style={{cursor:"pointer"}} onClick={showInforne}>Thông tin xe</h6>
                                    
                               {isInforVisible &&      <div className='position-absolute infor_bus_router ' >
                                        <div className='py-3'>
                                        <div className='d-flex justify-content-between px-3 pb-2'>
                                        <ul class="nav nav-tabs mb-1 row-mobile" id="pills-tab" role="tablist">
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link active" id="pills-main-tab" data-bs-toggle="pill" data-bs-target="#pills-main" type="button" role="tab" aria-controls="pills-main" aria-selected="true">Chính sách</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-car-tab" data-bs-toggle="pill" data-bs-target="#pills-car" type="button" role="tab" aria-controls="pills-car" aria-selected="false">Hình ảnh xe</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-location-tab" data-bs-toggle="pill" data-bs-target="#pills-location" type="button" role="tab" aria-controls="pills-location" aria-selected="false">Điểm đón trả</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-utilities-tab" data-bs-toggle="pill" data-bs-target="#pills-utilities" type="button" role="tab" aria-controls="pills-utilities" aria-selected="false">Tiện ích</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-star-tab" data-bs-toggle="pill" data-bs-target="#pills-star" type="button" role="tab" aria-controls="pills-star" aria-selected="false">Đánh giá</button>
                                            </li>
                                          </ul>
                                          <span className='pe-1' id='close-infor' style={{cursor:"pointer"}}  onClick={showInforne}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" style={{fill:'#cececf'}}>
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                                                    </svg>
                                                </span>
                                            </div>
                                          <div class="tab-content" id="pills-tabContent">
                                       <div class="tab-pane px-1 fade show active" id="pills-main" role="tabpanel" aria-labelledby="pills-main-tab">
                                          <div className='row overflow-auto infor-bus-content' style={{width:"95%", margin:"0 auto"}}>
                                                <div className='items_infor_bus_router '>
                                                    <h6>Chính sách huỷ vé</h6>
                                                    <ul>
                                                        <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
                                                        <li>Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp dụng theo các quy định hiện hành.</li>
                                                        <li>Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán, cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé, trên email hoặc tin nhắn để được hướng dẫn thêm.</li>

                                                    </ul>
                                                    <hr />
                                                </div>
                                                
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Yêu cầu khi lên xe</h6>
                                                    <ul>
                                                        <li>Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60 phút).</li>
                                                        <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
                                                        <li>Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích thích trên xe.</li>
                                                        <li>Không mang các vật dễ cháy nổ lên xe.</li>
                                                        <li>Không vứt rác trên xe.</li>
                                                        <li>Không mang động vật lên xe.</li>

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Hành lý xách tay</h6>
                                                    <ul>
                                                        <li>Tổng trọng lượng hành lý không vượt quá 20kg</li>
                                                        <li>Không vận chuyển hàng hoá cồng kềnh</li>
                                                

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Trẻ em dưới 6 tuổi và phụ nữ có thai</h6>
                                                    <ul>
                                                        <li>Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì không phải mua vé.</li>
                                                        <li>Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01 vé tương đương với người lớn</li>
                                                        <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
                                                        <li>Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển.</li>
                                                        <li>Không vứt rác trên xe.</li>
                                                        <li>Không mang động vật lên xe.</li>

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Vé đón đường</h6>
                                                    <ul>
                                                        <li>Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng liên hệ tổng đài 19006067 để đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).</li>
                                                        <li>Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm trên lộ trình</li>
                            
                                                    </ul>
                                                </div>
                                           </div>
                                           </div>
                                           <div class="tab-pane fade" id="pills-star" role="tabpanel" aria-labelledby="pills-star-tab">
                                           {tripDetail && tripDetail.car &&
                                                  <Comments id={tripDetail.car.id}/>
                                           
                                         
                                          }
                                            </div>
                                            <div class="tab-pane fade" id="pills-utilities" role="tabpanel" aria-labelledby="pills-utilities-tab">
                                              <div className='utilities-contents px-3'>
                                                <div className='row mx-0 flex-column items-utilities my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-language"></i>Nhân viên sử dụng tiếng anh</div>
                                                  <div className='col'>Nhân viên phòng vé, tài xế , phụ xe có thể giao tiếp bằng tiếng anh với hành khách.</div>
                                                </div>
                                                <div className='row mx-0 flex-column  items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-rotate-right"></i>Dây đai an toàn</div>
                                                  <div className='col'>Trên xe có trang bị dây đai an toàn cho hành khách khi ngồi trên xe</div>
                                                </div>
                                                <div className='row mx-0 flex-column  items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-pump-medical" ></i>Khử trùng xe</div>
                                                  <div className='col'>Nhà xe có thực hiện phun khử trùng Nano Bạc lên xe nhằm bảo vệ an toàn cho hành khách mùa Covid</div>
                                                </div>
                                                <div className='row mx-0 flex-column items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-glass-water"></i>Nước uống</div>
                                                  <div className='col'>Nhà xe có phục vụ nước cho hành khách</div>
                                                </div>
                                                <div className='row mx-0 flex-column items-utilities my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-hammer"  ></i>Búa phá kính</div>
                                                  <div className='col'>Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp.</div>
                                                </div>
                                                <div className="row mx-0  items-utilities  my-2">
                                                  <div className='col text-main-item ps-0'><i class="fa-solid fa-wifi"></i> Wifi</div>
                                                  <div className='col text-main-item p-0'><i class="fa-solid fa-snowflake"></i>Điều hoà</div>
                                                  <div className='col text-main-item pe-0'><i class="fa-solid fa-rug"></i>Chăn đắp</div>

                                                </div>
                                              </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-car" role="tabpanel" aria-labelledby="pills-car-tab">
                                             <div className='car-container-tabs px-3'>
                                              <div className='row m-0'>
                                                <div className='col-sm-6'>
                                                   {tripDetail &&tripDetail.car && <>
                                                <img src={tripDetail.car.primary_img} alt="" style={{height:"150px", objectFit:"cover", maxWidth:"100%"}}/>
                                              </>}
                                                </div>
                                                <div className='col'>
                                                  <span><b>{tripDetail &&tripDetail.car && tripDetail.car.name}</b></span>  <br />
                                                  <span><b>Biển số:</b>  {tripDetail &&tripDetail.car && tripDetail.car.license_plate}</span>  <br />
                                                  <span><b>Loại xe:</b>  {tripDetail &&tripDetail.car && tripDetail.car.type}</span> 
                                                  </div>
                                              </div>
                                             </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-location" role="tabpanel" aria-labelledby="pills-location-tab">
                                             <div className='location-container-tabs px-3'>
                                                    <div className='row' >
                                                      <div className='col col-pick'>
                                                      <h5 className='text-center'>Điểm đón</h5>
                                                      <div class="schedule-tour">
                                                      
                                                      {tripDetail &&tripDetail.schedule && tripDetail.schedule.filter(i=>i.type==='pickup').map((item,index)=>(
                                                        <div class="schedule-item">
                                                          
                                                        
                                                            <div class="step-plan"><span>{TimeHM( item.time)}</span></div>
                                                            <div class="dot-start"></div>
                                                              <div class="row m-0 flex-column ">
                                                                  <h6 class="col">{item.name}</h6>
                                                                  <div class="schedule-item-detail mt-4 col">
                                                                      {item.address}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        ))
                                                      }

                                                      
                                                      </div>
                                                      </div>

                                                      <div className='col col-drop'>
                                                      <h5 className='text-center '>Điểm trả</h5>
                                                      <div class="schedule-tour">
                                                        
                                                      {tripDetail &&tripDetail.schedule && tripDetail.schedule.filter(i=>i.type==='dropoff').map((item,index)=>(
                                                        <div class="schedule-item">
                                                          
                                                        
                                                            <div class="step-plan"><span>{TimeHM( item.time)}</span></div>
                                                            <div class="dot-start"></div>
                                                              <div class="row m-0 flex-column ">
                                                                  <h6 class="col">{item.name}</h6>
                                                                  <div class="schedule-item-detail mt-4 col">
                                                                      {item.address}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        ))
                                                      }
                                                      </div>
                                                      </div>
                                                    </div>
                                             </div>
                                            </div>
                                           </div>
                                        </div>
                                    </div>
                                // {/* ------------------------END---THÔNG TIN XE --------------------------*/}
 }
                                </div>
                               

                                <div className='row px-4 py-3 '>
                                {showFullMessage&& <Notification message="Đã chọn đủ số ghế!" />}
                                    {/*-------------------- SỐ GHẾ TẦNG DƯỚI--------------------------*/}
                                    {/* <div className='items-FloorDown col-sm-4 '>
                                        <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                        <div className='row items-content-floor'> */}
                                        {tripDetail && tripDetail.car && tripDetail.car.type === "Limousine" && (
                                          <div className='items-FloorDown col-sm-4 width-mobile'>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                
                                                <div className={`items-content-floor-row items-content-floor-double ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                                {tripDetail && tripDetail.car && tripDetail.car.type === "Giường nằm" && (
                                     <div className='items-FloorDown col-sm-4 '>
                                     <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                     <div className='row items-content-floor'>
                                       { tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                             
                                                <div className={`items-content-floor-row ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked'|| seat.status === 'pending' ? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                              }
                                             </div>
                                   
                                                    </div>
                                        
                                             
                                              )}
                                          {tripDetail && tripDetail.car && tripDetail.car.type === "Ghế" && (
                                                  <div className='items-FloorDown col-sm-3 width-mobile '>
                                                  {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                                  <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                          
                                                <div className={`items-content-floor-row items-content-floor-chair ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                 
                                              ))
                                              }
                                           </div>
                                   
                                                    </div>
                                             
                                              )}
                                        
                                     
                                    {/*----------------END---- SỐ GHẾ TẦNG DƯỚI --------------------------*/}


                                    {/*-------------------- SỐ GHẾ TẦNG TRÊN--------------------------*/}
                                    {/* <div className='items-FloorUp col-sm-4'>
                                        <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                        <div className='row items-content-floor'> */}
                                        {tripDetail && tripDetail.car && tripDetail.car.type === "Limousine" && (
                                              <div className='items-FloorUp col-sm-4 width-mobile'>
                                              <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                              <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                            
                                                <div className={`items-content-floor-row items-content-floor-double ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                              }
                                        </div>
                                                </div>
                                             
                                              )}
                                    {tripDetail && tripDetail.car && tripDetail.car.type === "Giường nằm" && (
                                       <div className='items-FloorUp col-sm-4'>
                                       <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                       <div className='row items-content-floor'>
                                       {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                               
                                                <div className={`items-content-floor-row ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''} ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                         
                                              }
                                             </div>
                                                </div>
                                              )}
                                    {tripDetail && tripDetail.car && tripDetail.car.type === "Ghế" && (
                                                  <div className='items-FloorDown col-sm-3 width-mobile '>
                                                  {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                                  <div className='row items-content-floor'>
                                                  {/* <div className={`items-content-floor-row items-content-floor-chair`} style={{visibility:'hidden'}}>
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                      
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute `} style={{ fontSize: "0.6em", top: "3px" }}></span>
                                                    </div>
                                                  </div>
                                                  </div>
                                                  <div className={`items-content-floor-row items-content-floor-chair`}  style={{visibility:'hidden'}}>
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path                                                       
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute`} style={{ fontSize: "0.6em", top: "3px" }}></span>
                                                    </div>
                                                  </div>
                                                  </div> */}

                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                          
                                                <div className={`items-content-floor-row items-content-floor-chair ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                 
                                              ))
                                              }
                                           </div>
                                   
                                                    </div>
                                             
                                              )}
                                        {/* </div>
                                    </div> */}
                                    {/*----------------END---- SỐ GHẾ TẦNG TRÊN--------------------------*/}

                                                       {/* {/*-------------------- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                      <div className="items-Floor-des col-sm-4">
                        <div className="row mt-4">
                          <div className="item-des d-flex my-2">
                            <span>
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
                            <span className="ms-3">Đã bán</span>
                          </div>
                          <div className="item-des d-flex  my-2">
                            <span>
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
                            <span className="ms-3">Còn trống</span>
                          </div>
                          <div className="item-des d-flex my-2">
                            <span>
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
                                  fill="#FE6531"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Đang chọn</span>
                          </div>
                        </div>
                      </div>
                      {/* {/*------------------END --- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                                </div>
                                {/* --------------------------- HIỆN SỐ GHẾ ĐÃ CHỌN TRÊN MOBILE--------------------------*/}

                                <div className='chair-chosen'>
                                    <hr />
                                    <span>Ghế:  {selectedSeats.length>0 && selectedSeats.join(', ')}</span>
                                </div>
                                {/* ------------------------END--- HIỆN SỐ GHẾ ĐÃ CHỌN MOBILE- --------------------------*/}

                                {/* ------------------------ NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}
                              
                                {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
        </Tab>
        <Tab eventKey="step2" title="Địa điểm">
        <div className='contents-items-choose pickUp-dropOff-location-contents   items-choose backWhite-padding' id='step2'>
                                    <div>
                                        <h5>Địa điểm đón trả</h5>
                                        <div className='mt-3'>
                                            <div action="" className='row'>
                                                <div className="form-group">
                                                    <label htmlFor="diemdon" className='mb-2'>Điểm đón</label>
                                                    {tripDetail && tripDetail.schedule && (
                                                      <Autocomplete
                                                      inputProps={{
                                                        className: 'form-control',
                                                        name: 'pickup_location',
                                                        placeholder: 'Điểm đến',
                                                        autoComplete: 'off',
                                                        // value: pickUpLocation, // Bind giá trị của input với biến trạng thái dropoffLocation
                                                        // onChange: (e) => setPickUpLocation(e.target.value), // Cập nhật giá trị khi người dùng nhập
                                                      }}
                                                        getItemValue={(item) => `${item.name}`}
                                                        items={tripDetail.schedule.filter(schedule => schedule.type === 'pickup').map((schedule, index) => ({
                                                          name: `${schedule.name}`,
                                                          time: `${schedule.time}`,
                                                          address: ` ${schedule.address}`,
                                                          value: index,
                                                        }))}
                                                        renderItem={(item, isHighlighted) => (
                                                          <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                            <div className='row mx-0 py-2'>
                                                              <div className='col pe-0'>
                                                                <span className='medium-name'>{item.name}</span><br />
                                                                <span className='small-address'> {item.address}</span>
                                                              </div>
                                                              <div className='col-3 text-end'><span className='medium-name text-end'>{TimeHM( item.time)}</span></div>
                                                            </div>
                                            
                                                          </div>
                                                        )}
                                                        value={pickupValue}
                                                        onChange={(e) => setPickupValue(e.target.value)}
                                                        onSelect={(value, item) => handleSelect(value, item, 'pickup')}
                                                      />
                                                    )}                                     
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diemdon"  className='mb-2'>Điểm trả</label>
                                                    {tripDetail && tripDetail.schedule && (
                                                      <Autocomplete
                                                      inputProps={{
                                                        className: 'form-control',
                                                        name: 'dropoff_location',
                                                        placeholder: 'Điểm đến',
                                                        autoComplete: 'off',
                                                      }}
                                                        getItemValue={(item) => `${item.name} `}
                                                        items={tripDetail.schedule.filter(schedule => schedule.type === 'dropoff').map((schedule, index) => ({
                                                          name: `${schedule.name}`,
                                                          time: `${schedule.time}`,
                                                          address: ` ${schedule.address}`,
                                                          value: index,
                                                        }))}
                                                        renderItem={(item, isHighlighted) => (
                                                          <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                          <div className='row mx-0 py-2'>
                                                            <div className='col pe-0'>
                                                              <span className='medium-name'>{item.name}</span><br />
                                                              <span className='small-address'> {item.address}</span>
                                                            </div>
                                                            <div className='col-3 text-end'><span className='medium-name text-end'>{TimeHM( item.time)}</span></div>
                                                          </div>
                                          
                                                        </div>
                                                        )}
                                                        value={dropoffValue}
                                                        onChange={(e) => setDropoffValue(e.target.value)}
                                                        onSelect={(value, item) => handleSelect(value, item, 'dropoff')}
                                                      />
                                                    )}
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/* --------------------------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                  
                                {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
        </Tab>
        <Tab eventKey="step3" title="Thông tin">
        <div className='contents-items-choose Client-information-contents   items-choose backWhite-padding' id='step3'>
                                    <div className='row mt-3'>
                                        <div className='items-infor col-6'>
                                            <h5 >Thông tin khách hàng</h5>
                                            <div className='mt-4'>
                                                <div action="">
                                                <div className="form-group">
                                                        <label  className='mb-2'>Họ và tên</label>
                                                        <input type="text" className="form-control" name='name' placeholder="Họ tên" value={name } onChange={(e)=>setName(e.target.value)}/>
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label  className='mb-2'>Số điện thoại</label>
                                                        <input type="number" className="form-control" placeholder="Số điện thoại" name='phone_number' value={phoneNum } onChange={(e)=>setPhoneNum(e.target.value)}/>
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label  className='mb-2'>Email</label>
                                                        <input type="email" className="form-control" placeholder="Email" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className='items-terms-notes col-6'>
                                            <h5 className='text-center'>ĐIỀU KHOẢN & LƯU Ý</h5>
                                            <div className='mt-4' style={{textAlign:"justify"}}>
                                            (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống TicketProWeb. Vui lòng liên hệ Trung tâm tổng đài 1900 6067 để được hỗ trợ.
                                            <br />
                                            (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển 1900 6918 trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.
                                            </div>
                                        </div>
                                    </div>
                                 <div className='d-flex align-items-center mt-5 submit-checkbox'>
                                    <input type="checkbox" style={{width:"15px", height:"15px", }}  checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                                    <div className='text'><span className='ms-3' style={{color:"#E63946"}}>Chấp nhận điều khoản   </span> đặt vé & chính sách bảo mật thông tin của TicketProWeb </div>
                                </div>

                                   {/* -------------------------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}
                     
                                   {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
        </Tab>
        <Tab eventKey="step4" title="Thanh toán">
        <div className='contents-items-choose infor-bus-contents  items-choose backWhite-padding'  id='step4'>
                        <div className="col">
                            <div className="card" style={{border:"none", backgroundColor:"white", borderRadius:"5px"}}>
                                <div className="card-body">
                                <h5 className="card-title text-start">Thông tin lượt đi</h5>
                                <div className="row mt-3">
                                    <div className="col text-start">Tuyến xe</div>
                                    <div className="col-9 text-end">
                                      {tripDetail &&  tripDetail.start_station &&(
                                       <>{tripDetail.start_station.name} =&gt; {tripDetail.end_station.name}</>
                                      )}
                                      {/* BX Mien Dong =&gt; Da lat */}
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Thời gian</div>
                                    <div className="col text-end text-danger">
                                    {tripDetail && tripDetail.departure_time&&(
                                       <>{formatDate( tripDetail.departure_time.split(' ')[0])}</>
                                      )}
                                      {/* 19:35 10-08-2023 */}
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Số lượng ghế</div>
                                    <div className="col text-end">
                                    {/* {selectedSeats.length=0 && selectedSeats.length} */}
                                        {selectedSeats.length>0 ? selectedSeats.length : 0}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Số ghế</div>
                                    <div className="col text-end text-danger">
                                      {selectedSeats.length>0 && 
                                      selectedSeats.join(', ')
                                      }
                                      
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Tổng tiền lượt đi</div>
                                    <div className="col text-end text-danger">
                                    {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        let totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);
                                        // console.log( isInt(totalPrice),'total');
                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }

                                      </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col mt-4">
                                <div className="card" style={{border:"none", backgroundColor:"white", borderRadius:"5px"}}>
                                    <div className="card-body">
                                    <h5 className="card-title text-start">Chi tiết giá</h5>
                                    <div className="row mt-3">
                                        <div className="col text-start">Giá vé lượt đi</div>
                                        <div className="col text-end text-danger">
                                          {/* 1.120.000đ */}
                                          {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        const totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);

                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }
                                          </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col text-start">Phí thanh toán</div>
                                        <div className="col text-end">0 ₫</div>
                                    </div>
                                    <hr />
                                    <div className="row mt-3">
                                        <div className="col text-start">Tổng tiền</div>
                                        <div className="col text-end text-danger">
                                          {/* 1.120.000đ */}
                                          {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        const totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);

                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }
                                          </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/* --------------------------- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------*/}

                            <div className="col justify-content-between d-flex mt-4 btn-handle">
                  <button className="btn" type='button' onClick={handleCancel}>
                    Huỷ
                  </button>
                  <button className="btn" onClick={handlePay}>Thanh toán
                    {/* <a href="/thanhtoan1chieu">Thanh toán</a> */}
                  </button>
                </div>
                            {/* ------------------------END --- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------*/}

                        </div>
        </Tab>
      </Tabs>
                {/* <div className='steps-booking-contents'>
                <div className='row align-items-center p-2' style={{margin:"0 auto", width:"98%"}}>
                    <div className='col text-center tabs-step active-step' data-tabs="step1">
                        <span className='position-relative'>
                            <svg width={22} height={22} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#AEACAC" fillOpacity="0.8" />
                            </svg>
                            <span className='number-step' >1</span>
                        </span>
                        
                        <br />
                        <span>Chọn ghế</span>
                    </div>
                    <div className='col border-step'>
                    </div>
                    <div className='col  text-center  tabs-step' data-tabs="step2">
                        <span className='position-relative'>
                            <svg width={22} height={22} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#AEACAC" fillOpacity="0.8" />
                            </svg>
                            <span className='number-step' >2</span>
                        </span>
                        
                        <br />
                        <span>Địa điểm </span>
                    </div>
                    <div className='col border-step'>
                    </div>
                    <div className='col  text-center  tabs-step' data-tabs="step3">
                        <span className='position-relative'>
                            <svg width={22} height={22} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#AEACAC" fillOpacity="0.8" />
                            </svg>
                            <span className='number-step' >3</span>
                        </span>
                        
                        <br />
                        <span>Thông tin</span>
                    </div>
                    <div className='col border-step '>
                    </div>
                    <div className='col  text-center  tabs-step' data-tabs="step4">
                        <span className='position-relative'>
                            <svg width={22} height={22} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#AEACAC" fillOpacity="0.8" />
                            </svg>
                           <span className='number-step' >4</span> 
                        </span>
                        
                        <br />
                        <span>Thanh toán</span>
                    </div>
                </div>
            </div> */}
            {/* ------------------------END---CÁC BƯỚC THỰC HIỆN MUA VÉ TRÊN MOBILE----------------------------*/}

            </div>
            {/* --------------------------END -tên chuyến xe  từ đâu đến đâu ----------------------------*/}
        
            <div className=" my-3 ">
          <div className="contents-items-choose container ">
          {showNotifi &&  <Notification message={notificationMessage} />}
                    <div className='row'>
                        <div className="col-md-8  card backWhite-padding" style={{border:"none"}}>
                            <div className='items-contents'>
                                {/* --------------------------- BƯỚC 1 CHỌN GHẾ---------------------------*/}
                        
                   
                                <div className='items-chair items-choose active-step-item' id='step1'>
                                <div className='d-flex justify-content-between'>
                                    <h5>Chọn ghế</h5>
                                {/* ---------------------------THÔNG TIN XE --------------------------*/}

                                    <h6 className=' position-relative' id='infor_bus_router' style={{cursor:"pointer"}} onClick={showInforne}>Thông tin xe</h6>
                                    
                               {isInforVisible &&      <div className='position-absolute infor_bus_router ' >
                                        <div className='py-3'>
                                        <div className='d-flex justify-content-between px-3 pb-2'>
                                        <ul class="nav nav-tabs mb-1 row-mobile" id="pills-tab" role="tablist">
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link active" id="pills-main-tab" data-bs-toggle="pill" data-bs-target="#pills-main" type="button" role="tab" aria-controls="pills-main" aria-selected="true">Chính sách</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-car-tab" data-bs-toggle="pill" data-bs-target="#pills-car" type="button" role="tab" aria-controls="pills-car" aria-selected="false">Hình ảnh xe</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-location-tab" data-bs-toggle="pill" data-bs-target="#pills-location" type="button" role="tab" aria-controls="pills-location" aria-selected="false">Điểm đón trả</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-utilities-tab" data-bs-toggle="pill" data-bs-target="#pills-utilities" type="button" role="tab" aria-controls="pills-utilities" aria-selected="false">Tiện ích</button>
                                            </li>
                                            <li class="nav-item col-mobile" role="presentation">
                                              <button class="nav-link" id="pills-star-tab" data-bs-toggle="pill" data-bs-target="#pills-star" type="button" role="tab" aria-controls="pills-star" aria-selected="false">Đánh giá</button>
                                            </li>
                                          </ul>
                                          <span className='pe-1' id='close-infor' style={{cursor:"pointer"}}  onClick={showInforne}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" style={{fill:'#cececf'}}>
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                                                    </svg>
                                                </span>
                                            </div>
                                          <div class="tab-content" id="pills-tabContent">
                                       <div class="tab-pane px-1 fade show active" id="pills-main" role="tabpanel" aria-labelledby="pills-main-tab">
                                          <div className='row overflow-auto infor-bus-content' style={{width:"95%", margin:"0 auto"}}>
                                                <div className='items_infor_bus_router '>
                                                    <h6>Chính sách huỷ vé</h6>
                                                    <ul>
                                                        <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
                                                        <li>Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp dụng theo các quy định hiện hành.</li>
                                                        <li>Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán, cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé, trên email hoặc tin nhắn để được hướng dẫn thêm.</li>

                                                    </ul>
                                                    <hr />
                                                </div>
                                                
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Yêu cầu khi lên xe</h6>
                                                    <ul>
                                                        <li>Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60 phút).</li>
                                                        <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
                                                        <li>Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích thích trên xe.</li>
                                                        <li>Không mang các vật dễ cháy nổ lên xe.</li>
                                                        <li>Không vứt rác trên xe.</li>
                                                        <li>Không mang động vật lên xe.</li>

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Hành lý xách tay</h6>
                                                    <ul>
                                                        <li>Tổng trọng lượng hành lý không vượt quá 20kg</li>
                                                        <li>Không vận chuyển hàng hoá cồng kềnh</li>
                                                

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Trẻ em dưới 6 tuổi và phụ nữ có thai</h6>
                                                    <ul>
                                                        <li>Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì không phải mua vé.</li>
                                                        <li>Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01 vé tương đương với người lớn</li>
                                                        <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
                                                        <li>Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển.</li>
                                                        <li>Không vứt rác trên xe.</li>
                                                        <li>Không mang động vật lên xe.</li>

                                                    </ul>
                                                    <hr />

                                                </div>
                                                <div  className='items_infor_bus_router'>
                                                    <h6>Vé đón đường</h6>
                                                    <ul>
                                                        <li>Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng liên hệ tổng đài 19006067 để đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).</li>
                                                        <li>Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm trên lộ trình</li>
                            
                                                    </ul>
                                                </div>
                                           </div>
                                           </div>
                                           <div class="tab-pane fade" id="pills-star" role="tabpanel" aria-labelledby="pills-star-tab">
                                           {tripDetail && tripDetail.car &&
                                                  <Comments id={tripDetail.car.id}/>
                                           
                                         
                                          }
                                            </div>
                                            <div class="tab-pane fade" id="pills-utilities" role="tabpanel" aria-labelledby="pills-utilities-tab">
                                              <div className='utilities-contents px-3'>
                                                <div className='row mx-0 flex-column items-utilities my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-language"></i>Nhân viên sử dụng tiếng anh</div>
                                                  <div className='col'>Nhân viên phòng vé, tài xế , phụ xe có thể giao tiếp bằng tiếng anh với hành khách.</div>
                                                </div>
                                                <div className='row mx-0 flex-column  items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-rotate-right"></i>Dây đai an toàn</div>
                                                  <div className='col'>Trên xe có trang bị dây đai an toàn cho hành khách khi ngồi trên xe</div>
                                                </div>
                                                <div className='row mx-0 flex-column  items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-pump-medical" ></i>Khử trùng xe</div>
                                                  <div className='col'>Nhà xe có thực hiện phun khử trùng Nano Bạc lên xe nhằm bảo vệ an toàn cho hành khách mùa Covid</div>
                                                </div>
                                                <div className='row mx-0 flex-column items-utilities  my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-glass-water"></i>Nước uống</div>
                                                  <div className='col'>Nhà xe có phục vụ nước cho hành khách</div>
                                                </div>
                                                <div className='row mx-0 flex-column items-utilities my-2'>
                                                  <div className='col text-main-item'><i class="fas fa-hammer"  ></i>Búa phá kính</div>
                                                  <div className='col'>Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp.</div>
                                                </div>
                                                <div className="row mx-0  items-utilities  my-2">
                                                  <div className='col text-main-item ps-0'><i class="fa-solid fa-wifi"></i> Wifi</div>
                                                  <div className='col text-main-item p-0'><i class="fa-solid fa-snowflake"></i>Điều hoà</div>
                                                  <div className='col text-main-item pe-0'><i class="fa-solid fa-rug"></i>Chăn đắp</div>

                                                </div>
                                              </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-car" role="tabpanel" aria-labelledby="pills-car-tab">
                                             <div className='car-container-tabs px-3'>
                                              <div className='row m-0'>
                                                <div className='col-sm-6'>
                                                   {tripDetail &&tripDetail.car && <>
                                                <img src={tripDetail.car.primary_img} alt="" style={{height:"150px", objectFit:"cover", maxWidth:"100%"}}/>
                                              </>}
                                                </div>
                                                <div className='col'>
                                                  <span><b>{tripDetail &&tripDetail.car && tripDetail.car.name}</b></span>  <br />
                                                  <span><b>Biển số:</b>  {tripDetail &&tripDetail.car && tripDetail.car.license_plate}</span>  <br />
                                                  <span><b>Loại xe:</b>  {tripDetail &&tripDetail.car && tripDetail.car.type}</span> 
                                                  </div>
                                              </div>
                                             </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-location" role="tabpanel" aria-labelledby="pills-location-tab">
                                             <div className='location-container-tabs px-3'>
                                                    <div className='row' >
                                                      <div className='col col-pick'>
                                                      <h5 className='text-center'>Điểm đón</h5>
                                                      <div class="schedule-tour">
                                                      
                                                      {tripDetail &&tripDetail.schedule && tripDetail.schedule.filter(i=>i.type==='pickup').map((item,index)=>(
                                                        <div class="schedule-item">
                                                          
                                                        
                                                            <div class="step-plan"><span>{TimeHM( item.time)}</span></div>
                                                            <div class="dot-start"></div>
                                                              <div class="row m-0 flex-column ">
                                                                  <h6 class="col">{item.name}</h6>
                                                                  <div class="schedule-item-detail mt-4 col">
                                                                      {item.address}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        ))
                                                      }
{/*                                                           
                                                          // <div class="schedule-item">
                                                          //     <div class="step-plan"><span>1</span></div>
                                                          //     <div class="dot-start"></div>
                                                          //     <div class="row m-0 flex-column ">
                                                          //         <h6 class="col">HANEDA – TOKYO (Ăn hai bữa)</h6>
                                                          //         <div class="schedule-item-detail mt-4 col">
                                                          //             Đoàn đến sân bay quốc tế Haneda (Tokyo), làm thủ tục nhập cảnh và nhận hành lý. Xe đón đoàn khởi hành tham quan:
                                                          //             <ul class="mt-2">
                                                          //                 <li><b>Công viên Chidori-ga-fuchi </b>– nằm gần Cung điện Hoàng Gia, một nơi cổ kính để ngắm hoa anh đào. Công viên này tự hào là nơi tập trung rất nhiều người đến để ngắm hoa anh đào ở Tokyo trong suốt giai đoạn cuối tháng 3 và đầu tháng 4. ( Qúy khách vui lòng lưu ý do phụ thuộc vào điều kiện thời tiết nên các loại hoa có thể nở sớm hơn hoặc chậm hơn, mong Qúy khách thông cảm vì đây là trường hợp bất khả kháng)</li>
                                                          //                 <li><b>Chùa Asakusa Kannon </b>– ngôi chùa linh thiêng bậc nhất Tokyo, nơi diễn ra các lễ hội lớn của quốc gia cùng với truyền thuyết ra đời ngôi đền bí ẩn.</li>
                                                          //                 <li><b>Tháp truyền hình Tokyo Sky Tree </b>– Từ chùa ngắm nhìn và chụp hình được toàn cảnh của tháp.</li>
                                                          //                 <li><b>Tham quan và mua sắm tại con đường mua sắm Nakamise Arcade nằm trong khuôn viên chùa </b>– là một trong những khu phố mua sắm cổ nhất Nhật Bản, có chiều dài khoảng 250m kéo dài từ cổng Kaminarimon của chùa Senso-ji đến Hozomon. Trên con phố này có bày bán những món đồ nhỏ mang đậm phong cách Nhật như đồ chơi thời Edo, nơ, kẹp tóc quạt; hay các món ăn vặt như được chế biến trên phố như Ningyoyaki, Kaminari Okoshi. Các cửa hàng nổi tiếng của khu phố cổ thời Edo nằm tiếp nối nhau, những chiếc đèn lồng và đồ trang trí theo mùa ở trước các cửa hàng, con đường lát đá tảng kéo dài từ cổng Kaminarimon đến cổng Hozomon…tạo nên một con phố mang đậm phong cách Nhật Bản.</li>
                                                                      
                                                          //             </ul>
                                                          //             Ăn trưa tại nhà hàng địa phương, đoàn tiếp tục tham quan:
                                                          //             <ul class="mt-2">
                                                          //                 <li><b>Chụp ảnh bên ngoài Ngoại thành Hoàng Cung </b>– nơi sinh sống của Hoàng gia Nhật với khuôn viên vườn cây cổ thụ.</li>
                                                          //                 <li>Qúy khách tự do tham quan mua sắm tại khu phố chuyên bán các mặt hàng điện tử nổi tiếng của Nhật Akihabara.</li>
                                                          //                 <li>Tiếp tục Qúy khách mua sắm tại khu phố Ginza ( Nếu có thời gian).</li>
                                                                      
                                                                      
                                                          //             </ul>
                                                          //             Ăn tối tại nhà hàng địa phương, về khách sạn nghỉ ngơi. Nghỉ đêm tại Tokyo.
                                                          //         </div>
                                                          //     </div>
                                                          // </div> */}
                                                      
                                                      </div>
                                                      </div>

                                                      <div className='col col-drop'>
                                                      <h5 className='text-center '>Điểm trả</h5>
                                                      <div class="schedule-tour">
                                                        
                                                      {tripDetail &&tripDetail.schedule && tripDetail.schedule.filter(i=>i.type==='dropoff').map((item,index)=>(
                                                        <div class="schedule-item">
                                                          
                                                        
                                                            <div class="step-plan"><span>{TimeHM( item.time)}</span></div>
                                                            <div class="dot-start"></div>
                                                              <div class="row m-0 flex-column ">
                                                                  <h6 class="col">{item.name}</h6>
                                                                  <div class="schedule-item-detail mt-4 col">
                                                                      {item.address}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        ))
                                                      }
                                                      </div>
                                                      </div>
                                                    </div>
                                             </div>
                                            </div>
                                           </div>
                                        </div>
                                    </div>
                                // {/* ------------------------END---THÔNG TIN XE --------------------------*/}
 }
                                </div>
                               

                                <div className='row px-4 py-3 '>
                                {showFullMessage&& <Notification message="Đã chọn đủ số ghế!" />}
                                    {/*-------------------- SỐ GHẾ TẦNG DƯỚI--------------------------*/}
                                    {/* <div className='items-FloorDown col-sm-4 '>
                                        <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                        <div className='row items-content-floor'> */}
                                        {tripDetail && tripDetail.car && tripDetail.car.type === "Limousine" && (
                                          <div className='items-FloorDown col-sm-4 width-mobile'>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                                
                                                <div className={`items-content-floor-row items-content-floor-double ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                               
                                              ))
                                              }
                                         </div>
                                   
                                            </div>
                                             
                                              )}
                                {tripDetail && tripDetail.car && tripDetail.car.type === "Giường nằm" && (
                                     <div className='items-FloorDown col-sm-4 '>
                                     <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                     <div className='row items-content-floor'>
                                       { tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                             
                                                <div className={`items-content-floor-row ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked'|| seat.status === 'pending' ? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                              }
                                             </div>
                                   
                                                    </div>
                                        
                                             
                                              )}
                                          {tripDetail && tripDetail.car && tripDetail.car.type === "Ghế" && (
                                                  <div className='items-FloorDown col-sm-3 width-mobile '>
                                                  {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                                  <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('A'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                          
                                                <div className={`items-content-floor-row items-content-floor-chair ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                 
                                              ))
                                              }
                                           </div>
                                   
                                                    </div>
                                             
                                              )}
                                        
                                     
                                    {/*----------------END---- SỐ GHẾ TẦNG DƯỚI --------------------------*/}


                                    {/*-------------------- SỐ GHẾ TẦNG TRÊN--------------------------*/}
                                    {/* <div className='items-FloorUp col-sm-4'>
                                        <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                        <div className='row items-content-floor'> */}
                                        {tripDetail && tripDetail.car && tripDetail.car.type === "Limousine" && (
                                              <div className='items-FloorUp col-sm-4 width-mobile'>
                                              <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                              <div className='row items-content-floor'>
                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                            
                                                <div className={`items-content-floor-row items-content-floor-double ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                              }
                                        </div>
                                                </div>
                                             
                                              )}
                                    {tripDetail && tripDetail.car && tripDetail.car.type === "Giường nằm" && (
                                       <div className='items-FloorUp col-sm-4'>
                                       <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng trên</h5>
                                       <div className='row items-content-floor'>
                                       {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                               
                                                <div className={`items-content-floor-row ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''} ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                              ))
                                         
                                              }
                                             </div>
                                                </div>
                                              )}
                                    {tripDetail && tripDetail.car && tripDetail.car.type === "Ghế" && (
                                                  <div className='items-FloorDown col-sm-3 width-mobile '>
                                                  {/* <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5> */}
                                                  <div className='row items-content-floor'>
                                                  {/* <div className={`items-content-floor-row items-content-floor-chair`} style={{visibility:'hidden'}}>
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                      
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute `} style={{ fontSize: "0.6em", top: "3px" }}></span>
                                                    </div>
                                                  </div>
                                                  </div>
                                                  <div className={`items-content-floor-row items-content-floor-chair`}  style={{visibility:'hidden'}}>
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path                                                       
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute`} style={{ fontSize: "0.6em", top: "3px" }}></span>
                                                    </div>
                                                  </div>
                                                  </div> */}

                                        {tripDetail.seats &&
                                            tripDetail.seats
                                              .filter(seat => seat.position.startsWith('B'))
                                              .sort((a, b) => {
                                                const positionA = parseInt(a.position.substring(1));
                                                const positionB = parseInt(b.position.substring(1));
                                                return positionA - positionB;
                                              })
                                              .map(seat => (
                                          
                                                <div className={`items-content-floor-row items-content-floor-chair ${selectedSeats.includes(seat.position) ? 'selected-seat' : ''}  ${seat.status === 'Available' ? 'available-seat' : ''} ${seat.status === 'booked' || seat.status === 'pending'? 'Chosen-seat' : ''}`}
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                         className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute ${selectedSeats.includes(seat.position) ? 'selected-span' : ''}`} style={{ fontSize: "0.6em", top: "3px" }}>{seat.position}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                 
                                              ))
                                              }
                                           </div>
                                   
                                                    </div>
                                             
                                              )}
                                        {/* </div>
                                    </div> */}
                                    {/*----------------END---- SỐ GHẾ TẦNG TRÊN--------------------------*/}

                                                       {/* {/*-------------------- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                      <div className="items-Floor-des col-sm-4">
                        <div className="row mt-4">
                          <div className="item-des d-flex my-2">
                            <span>
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
                            <span className="ms-3">Đã bán</span>
                          </div>
                          <div className="item-des d-flex  my-2">
                            <span>
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
                            <span className="ms-3">Còn trống</span>
                          </div>
                          <div className="item-des d-flex my-2">
                            <span>
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
                                  fill="#FE6531"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Đang chọn</span>
                          </div>
                        </div>
                      </div>
                      {/* {/*------------------END --- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                                </div>
                                {/* --------------------------- HIỆN SỐ GHẾ ĐÃ CHỌN TRÊN MOBILE--------------------------*/}

                                <div className='chair-chosen'>
                                    <hr />
                                    <span>Ghế:  {selectedSeats.length>0 && selectedSeats.join(', ')}</span>
                                </div>
                                {/* ------------------------END--- HIỆN SỐ GHẾ ĐÃ CHỌN MOBILE- --------------------------*/}

                                {/* ------------------------ NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}
                                <div className='button_conti-step'>
                                    <div className='d-flex justify-content-end mt-3 btn-handle'>
                                        <button className='btn' hidden>Quay lai</button>
                                        <button className='btn button_step' type='button' data-next='step2'>Tiếp tục</button>
                                    </div>
                                  </div>
                                {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
                                {/* -------------------------END-- BƯỚC CHỌN GHẾ---------------------------*/}

                                 <div className='border-bt'></div>

                                {/* --------------------------- BƯỚC 2 ĐIỂM ĐÓN TRẢ KHÁCH---------------------------*/}

                                <div className='pickUp-dropOff-location-contents my-4  items-choose' id='step2'>
                                    <div>
                                        <h5>Địa điểm đón trả</h5>
                                        <div className='mt-3'>
                                            <div action="" className='row'>
                                                <div className="form-group">
                                                    <label htmlFor="diemdon" className='mb-2'>Điểm đón</label>
                                                    {tripDetail && tripDetail.schedule && (
                                                      <Autocomplete
                                                      inputProps={{
                                                        className: 'form-control',
                                                        name: 'pickup_location',
                                                        placeholder: 'Điểm đến',
                                                        autoComplete: 'off',
                                                        // value: pickUpLocation, // Bind giá trị của input với biến trạng thái dropoffLocation
                                                        // onChange: (e) => setPickUpLocation(e.target.value), // Cập nhật giá trị khi người dùng nhập
                                                      }}
                                                        getItemValue={(item) => `${item.name}`}
                                                        items={tripDetail.schedule.filter(schedule => schedule.type === 'pickup').map((schedule, index) => ({
                                                          name: `${schedule.name}`,
                                                          time: `${schedule.time}`,
                                                          address: ` ${schedule.address}`,
                                                          value: index,
                                                        }))}
                                                        renderItem={(item, isHighlighted) => (
                                                          <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                            <div className='row mx-0 py-2'>
                                                              <div className='col pe-0'>
                                                                <span className='medium-name'>{item.name}</span><br />
                                                                <span className='small-address'> {item.address}</span>
                                                              </div>
                                                              <div className='col-3 text-end'><span className='medium-name text-end'>{TimeHM( item.time)}</span></div>
                                                            </div>
                                            
                                                          </div>
                                                        )}
                                                        value={pickupValue}
                                                        onChange={(e) => setPickupValue(e.target.value)}
                                                        onSelect={(value, item) => handleSelect(value, item, 'pickup')}
                                                      />
                                                    )}                                     
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diemdon"  className='mb-2'>Điểm trả</label>
                                                    {tripDetail && tripDetail.schedule && (
                                                      <Autocomplete
                                                      inputProps={{
                                                        className: 'form-control',
                                                        name: 'dropoff_location',
                                                        placeholder: 'Điểm đến',
                                                        autoComplete: 'off',
                                                      }}
                                                        getItemValue={(item) => `${item.name} `}
                                                        items={tripDetail.schedule.filter(schedule => schedule.type === 'dropoff').map((schedule, index) => ({
                                                          name: `${schedule.name}`,
                                                          time: `${schedule.time}`,
                                                          address: ` ${schedule.address}`,
                                                          value: index,
                                                        }))}
                                                        renderItem={(item, isHighlighted) => (
                                                          <div className='option-select-PD' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                          <div className='row mx-0 py-2'>
                                                            <div className='col pe-0'>
                                                              <span className='medium-name'>{item.name}</span><br />
                                                              <span className='small-address'> {item.address}</span>
                                                            </div>
                                                            <div className='col-3 text-end'><span className='medium-name text-end'>{TimeHM( item.time)}</span></div>
                                                          </div>
                                          
                                                        </div>
                                                        )}
                                                        value={dropoffValue}
                                                        onChange={(e) => setDropoffValue(e.target.value)}
                                                        onSelect={(value, item) => handleSelect(value, item, 'dropoff')}
                                                      />
                                                    )}
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/* --------------------------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                    <div className='button_conti-step'>
                                    <div className='d-flex justify-content-between mt-3 btn-handle'>
                                        <button className='btn button_step' type='button' data-next='step1'>Quay lại</button>
                                        <button  className='btn button_step' type='button' data-next='step3'>Tiếp tục</button>
                                    </div>
                                  </div>
                                {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
                                {/* -----------------------END---- BƯỚC 2 ĐIỂM ĐÓN TRẢ KHÁCH---------------------------*/}

                                <div className='border-bt'></div>

                                {/* --------------------------- BƯỚC 3 NHẬP THÔNG TIN ĐẶT VÉ ---------------------------*/}
                                <div className='Client-information-contents my-4  items-choose' id='step3'>
                                    <div className='row mt-3'>
                                        <div className='items-infor col-6'>
                                            <h5 >Thông tin khách hàng</h5>
                                            <div className='mt-4'>
                                                <div action="">
                                                <div className="form-group">
                                                        <label  className='mb-2'>Họ và tên</label>
                                                        <input type="text" className="form-control" name='name' placeholder="Họ tên" value={name } onChange={(e)=>setName(e.target.value)}/>
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label  className='mb-2'>Số điện thoại</label>
                                                        <input type="number" className="form-control" placeholder="Số điện thoại" name='phone_number' value={phoneNum } onChange={(e)=>setPhoneNum(e.target.value)}/>
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label  className='mb-2'>Email</label>
                                                        <input type="email" className="form-control" placeholder="Email" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className='items-terms-notes col-6'>
                                            <h5 className='text-center'>ĐIỀU KHOẢN & LƯU Ý</h5>
                                            <div className='mt-4' style={{textAlign:"justify"}}>
                                            (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống TicketProWeb. Vui lòng liên hệ Trung tâm tổng đài 1900 6067 để được hỗ trợ.
                                            <br />
                                            (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển 1900 6918 trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.
                                            </div>
                                        </div>
                                    </div>
                                 <div className='d-flex align-items-center mt-5 submit-checkbox'>
                                    <input type="checkbox" style={{width:"15px", height:"15px", }}  checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                                    <div className='text'><span className='ms-3' style={{color:"#E63946"}}>Chấp nhận điều khoản   </span> đặt vé & chính sách bảo mật thông tin của TicketProWeb </div>
                                </div>

                                   {/* -------------------------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}
                                <div className='button_conti-step'>
                                    <div className='d-flex justify-content-between mt-3 btn-handle'>
                                        <button className='btn button_step' type='button' data-next='step2'>Quay lại</button>
                                        <button  className='btn button_step' type='button' data-next='step4'>Tiếp tục</button>
                                    </div>
                                  </div>   
                                   {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------*/}

                                </div>
                                {/* -----------------------END---- BƯỚC 3 NHẬP THÔNG TIN ĐẶT VÉ ---------------------------*/}
                               
                            </div>
                          
                        </div>

                        {/* --------------------------- BƯỚC 4 HIỆN TỔNG QUÁT THÔNG TIN ĐẶT VÉ ---------------------------*/}
                        <div className='col-4 infor-bus-contents  items-choose'  id='step4'>
                        <div className="col">
                            <div className="card" style={{border:"none", backgroundColor:"white", borderRadius:"5px"}}>
                                <div className="card-body">
                                <h5 className="card-title text-start">Thông tin lượt đi</h5>
                                <div className="row mt-3">
                                    <div className="col text-start">Tuyến xe</div>
                                    <div className="col-9 text-end">
                                      {tripDetail &&  tripDetail.start_station &&(
                                       <>{tripDetail.start_station.name} =&gt; {tripDetail.end_station.name}</>
                                      )}
                                      {/* BX Mien Dong =&gt; Da lat */}
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Thời gian</div>
                                    <div className="col text-end text-danger">
                                    {tripDetail && tripDetail.departure_time&&(
                                       <>{formatDate( tripDetail.departure_time.split(' ')[0])}</>
                                      )}
                                      {/* 19:35 10-08-2023 */}
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Số lượng ghế</div>
                                    <div className="col text-end">
                                    {/* {selectedSeats.length=0 && selectedSeats.length} */}
                                        {selectedSeats.length>0 ? selectedSeats.length : 0}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Số ghế</div>
                                    <div className="col text-end text-danger">
                                      {selectedSeats.length>0 && 
                                      selectedSeats.join(', ')
                                      }
                                      
                                      </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col text-start">Tổng tiền lượt đi</div>
                                    <div className="col text-end text-danger">
                                    {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        let totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);
                                        // console.log( isInt(totalPrice),'total');
                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }

                                      </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col mt-4">
                                <div className="card" style={{border:"none", backgroundColor:"white", borderRadius:"5px"}}>
                                    <div className="card-body">
                                    <h5 className="card-title text-start">Chi tiết giá</h5>
                                    <div className="row mt-3">
                                        <div className="col text-start">Giá vé lượt đi</div>
                                        <div className="col text-end text-danger">
                                          {/* 1.120.000đ */}
                                          {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        const totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);

                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }
                                          </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col text-start">Phí thanh toán</div>
                                        <div className="col text-end">0 ₫</div>
                                    </div>
                                    <hr />
                                    <div className="row mt-3">
                                        <div className="col text-start">Tổng tiền</div>
                                        <div className="col text-end text-danger">
                                          {/* 1.120.000đ */}
                                          {
                                      tripDetail && tripDetail.seats &&
                                      (() => {
                                        const totalPrice = tripDetail.seats
                                          .filter(seat => selectedSeats.includes(seat.position))
                                          .reduce((total, seat) => total + parseInt(seat.price), 0);

                                        return parseInt(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                      })()
                                    }
                                          </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/* --------------------------- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------*/}

                            <div className="col justify-content-between d-flex mt-4 btn-handle">
                  <button className="btn" type='button' onClick={handleCancel}>
                    Huỷ
                  </button>
                  <button className="btn" onClick={handlePay}>Thanh toán
                    {/* <a href="/thanhtoan1chieu">Thanh toán</a> */}
                  </button>
                </div>
                            {/* ------------------------END --- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------*/}

                        </div>
                        {/* --------------------------- BƯỚC 4 HIỆN TỔNG QUÁT THÔNG TIN ĐẶT VÉ ---------------------------*/}

                    </div>
                </div>
              
            </div>
            </form>
        </>
      )}
            
        </div>
    );
};

export default BookTicketPageSingle;