import React, { useEffect, useState } from 'react';
import users from '../../assets/images/usernoavatar.png'
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../reduxTool/authSlice';
import axiosClient from '../../axios-client';
import { fetchhistoryTicket } from '../../reduxTool/historyTicketSlice';
import { calculateTimeDifference, formatDate } from '../../config';
import ReactPaginate from 'react-paginate';
const UpdateInfor = () => {
    const { setUser, token, user } = useStateContext();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [img, setImg] = useState('')
    const [updateinf, setUpdateinf] = useState({
        email: '',
        name: "",
        phone_number: "",
        avatar: null,
        address: "",
    })
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (updateinf.name === '' || updateinf.address === '' || updateinf.phone_number === '') {
            setMessage('Vui lòng nhập đầy đủ thông tin!')
            return
        }

        try {
            const response = await axiosClient.post('/user/update', updateinf, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            setMessage('Cập nhật thông tin thành công')
            // alert("Cập nhật thành công")
            window.location.reload();
            // Handle the response, update UI, etc.
            console.log(response.data); // Log the response data or handle it accordingly
            dispatch(fetchUserProfile(token))
                .then((res) => {
                    console.log(res);
                    // setUser(res.payload.data)
                    setUpdateinf(res.payload.data)
                    console.log('update xong', res.payload.data);
                })
                .catch((err) => {
                    console.error(err)

                })
        } catch (err) {
            console.error(err);
            const response = err.response;

            if (response) {
                const errors = response.data.errors;
                console.log(errors);
                if (errors.phone_number == "The phone number has already been taken.") {
                    setMessage("Số điện thoại đã được sử dụng!");
                    console.log(errors.phone_number);
                } else if (errors.phone_number == "The phone number field must be at least 10 characters.") {
                    setMessage("Số điện thoại ít nhất 10 số!");
                    // console.log(errors.phone_number);
                }
                if (errors.address) {
                    setMessage("Vui lòng nhập địa chỉ nhà!");
                }
            }

        }
    };

    const handleOnChange = (e) => {
        if (e.target.name === 'avatar') {
            setUpdateinf({
                ...updateinf,
                avatar: e.target.files[0],
            });
        } else {
            setUpdateinf({
                ...updateinf,
                [e.target.name]: e.target.value,
            });
        }
    };

    useEffect(() => {
        dispatch(fetchUserProfile(token))
            .then((res) => {
                console.log(res);
                setUser(res.payload.data)
                setImg(res.payload.data.avatar)
                setUpdateinf(res.payload.data)

            })
            .catch((err) => {
                console.error(err)

            })
        // console.log(    dispatch(fetchUserProfile(token)));
        console.log(img, 'img');
        if (user) {
            // setLoading(true)
            console.log(user);
        } else {
            // setLoading(false);
            navigate('/')
        }
    }, [])


    const { historyTicket, isLoading } = useSelector(state => state.historyTicket)
    const itemList = historyTicket
    console.log(historyTicket, 'historyTicket');
    console.log(isLoading);
    useEffect(() => {
        console.log("dispatch")
        if (user) {
            dispatch(fetchhistoryTicket(token))
        }
    }, [])
    const currentItems = historyTicket?.data
 // tìm kiếm
//  const sortedTickets = currentItems?.slice().sort((a, b) => {
//     const dateA = new Date(a.trip.departure_time);
//     const dateB = new Date(b.trip.departure_time);
//     return dateB - dateA; // Sắp xếp theo thứ tự giảm dần (mới nhất đến cũ nhất)
//   });
  const sortedTickets = currentItems?.slice().sort((a, b) => b.id - a.id);
 const [searchTerm, setSearchTerm] = useState('');
 const currentTickets = searchTerm
   ?sortedTickets?.filter((list) =>
     list.code.toLowerCase().includes(searchTerm.toLowerCase()) ||    list.trip.start_location.province.toLowerCase().includes(searchTerm.toLowerCase()) ||   list.trip.end_location.province.toLowerCase().includes(searchTerm.toLowerCase())||   list.trip.start_location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||list.trip.end_location.name.toLowerCase().includes(searchTerm.toLowerCase())
   )
   : sortedTickets;

 const [perPage] = useState(5); // Số lượng xe hiển thị mỗi trang
 const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại

 const offset = pageNumber * perPage;
 const pageCount = Math.ceil(currentTickets?.length / perPage);
 const paginatedTickets = currentTickets?.slice(offset, offset + perPage);

 const handlePageClick = ({ selected }) => {
   setPageNumber(selected);
 };

 const handleSearch = (e) => {
   const value = e.target.value;
   setSearchTerm(value);
   setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
 };

    // Tạo một state để lưu trữ trạng thái của button 
    const [isButtonVisible, setIsButtonVisible] = useState('pending');

    // Hàm để thay đổi trạng thái của button
    const toggleButtonVisibility = () => {
        setIsButtonVisible(isButtonVisible === 'pending' ? 'booked' : 'pending');
    };

    // hủy vé
    const [loading, setLoading] = useState(false)
    const handleCancel = async (id) => {
        setLoading(true)
        const put = {
            ticket_id: id
        }
        const confirmCancel = window.confirm("Bạn có muốn hủy vé?")
        if (confirmCancel) {
            const res = await axiosClient.put(`/user/cancel-booking`, put, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            dispatch(fetchhistoryTicket(token))
        }
    }
    // tô màu ngôi sao

    const [rating, setRating] = useState([false, false, false, false, false]);
    const [starValue, setStarValue] = useState(0);
    const handleStarClick = (index) => {
        const newRating = rating.map((star, i) => i <= index);
        setRating(newRating);
        const newStarValue = index + 1;
        setStarValue(newStarValue);
    }
    console.log(starValue);

    // đánh giá

    const [car_id, setCar_id] = useState('')
    const [content, setContent] = useState('')
    const [messageRate, setMessageRate] = useState('')
    const handleDetailIdCar = (id) => {
        setCar_id(id)
    }
    const [userCmt, setUserCmt] = useState(true)
    // if(messageRate==='Đã đánh giá thành công!'){
    //     setUserCmt(true)
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (content === '' || starValue === 0) {
            setLoading(false)
            alert('Vui lòng nhập nội dung đánh giá .!.')
            return
        }
        try {
            const comment = {
                car_id: car_id,
                content: content,
                rate: parseInt(starValue)
            }
            console.log(comment, 'cmt');
            const res = await axiosClient.post('/user/comment', comment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setCar_id('')
            setContent('')
            setMessageRate('Đã đánh giá thành công!')
            setLoading(false)
            setUserCmt(false)

        } catch (error) {
            setLoading(false);
            setUserCmt(true)
            setMessageRate('')
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  
    const [dataUserCmt, setDataUserCmt] = useState('')
    const carsArr = []
    const car = historyTicket?.data?.map(i => i.car.id)
    carsArr.push(car)
    console.log('car', carsArr[0]);
    const nameUser = user?.name
    // console.log(nameUser, 'nameuser');
    // axiosClient.get(`/car//comment`)
    // .then(res=>{
    //     console.log('comment', res);
    //     setDataUserCmt(res.data.data.filter(i=>i.user.name === nameUser))

    // })
    // .catch(err=>{
    //     console.error(err)
    // })
    console.log(dataUserCmt);
    // if(nameUser === dataUserCmt){
    // console.log(`${dataUserCmt}` );
    // }
    const handleIdCar = (id) => {
        axiosClient.get(`/car/${id}/comment`)
            .then(res => {
                console.log('comment', res);
                setDataUserCmt(res.data.data.filter(i => i.user.name === nameUser))

            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
        <div className='mt-10'>
            <div className='updateInfor-container container pt-2'>
                <div className='backWhite-padding mb-4 '>
                    <h5 className='h5-inf'>Cập nhật thông tin</h5>
                    <form action="" onSubmit={handleUpdateUser}>
                        <div className='row m-0 justify-content-between'>
                            <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12'>
                                <div className='img-user'>
                                    <div className='img-updateinf'>
                                        {img !== null && <img src={img} alt="" className='img-fuild' />}
                                        {img === null &&
                                            <>
                                                <img src={users} alt="" className='img-fuild' />
                                                <br />
                                                <span>Chưa có ảnh đại điện</span>
                                            </>
                                        }

                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="">Đổi ảnh </label>
                                        <input type="file" className="form-control" name='avatar' onChange={handleOnChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                                <div className='form-group'>
                                    <label htmlFor="">Email</label>
                                    <input type="email" name='email' readOnly disabled value={updateinf.email} className='form-control disabled' onChange={handleOnChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Họ và tên</label>
                                    <input type="text" name='name' value={updateinf.name} className='form-control' onChange={handleOnChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="number" name='phone_number' value={updateinf.phone_number} className='form-control' onChange={handleOnChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Địa chỉ</label>
                                    <input type="text" name='address' value={updateinf.address} className='form-control' onChange={handleOnChange} />
                                </div>
                                <div className='form-group'>
                                    <button type='submit' className='button'>Cập nhật</button>
                                </div>
                                {message && <>
                                    <div className="form-group" style={{
                                        color: "rgb(230, 57, 70)",
                                        fontWeight: "700",
                                        marginTop: 5,
                                        fontSize: "0.8em",
                                        textAlign: "left",
                                    }}>
                                        {message}
                                    </div>
                                </>}
                            </div>
                        </div>
                    </form>
                </div>
                <div className='backWhite-padding mb-4'>
                <div className='booking__history'> <span>Lịch sử đặt vé</span> 
                
                  <input type="text" onChange={handleSearch} placeholder='Tìm kiếm vé theo mã vé hoặc nơi đi, nơi đến ' className='form-control w-50' style={{marginLeft:"auto"}}/>
                  </div>
                {paginatedTickets?.map((item, index) => (
                    <>
                        <div className='booking__history__container w-100-auto align-items-end'>
                            <div className='left__container'>
                                <div className='header__left'>
                                    <p style={{ fontWeight: "700" }}>Mã vé: {item.code}</p>
                                    <p style={{ fontWeight: "700" }}>{item?.trip.start_location.name} =&gt; {item?.trip.end_location.name} </p>
                                </div>
                                <div className='footer__left'>

                                    <div className='start'>
                                        <p>{item.trip?.schedule.find(i => i.name === item?.pickup_location).time.substring(0, 5)}</p>
                                        <div className='w-100'><i class="fas fa-bus" style={{ color: "#FE6531" }}></i></div>
                                        <p>{item.pickup_location}</p>
                                    </div>
                                    <div className='middle'>
                                        <p>
                                            {calculateTimeDifference(item.trip?.schedule.find(i => i.name === item?.pickup_location).time.substring(0, 5), item.trip?.schedule.find(i => i.name === item?.dropoff_location).time.substring(0, 5))}
                                        </p>
                                        <div className=''><i class="fa fa-long-arrow-right " aria-hidden="true" ></i></div>
                                        <p>{formatDate( item.trip.departure_time.split(' ')[0])}</p>
                                    </div>
                                    <div className='end'>
                                        <p>{item.trip?.schedule.find(i => i.name === item?.dropoff_location).time.substring(0, 5)}</p>
                                        <div className='w-100'><i class="fas fa-bus" style={{ color: "#FE6531" }}></i></div>
                                        <p>{item.dropoff_location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='right__container'>
                                <p style={{ fontWeight: "700" }}>Xe: {item.car.name}</p>
                                <p>Biển số xe: {item.car.license_plate} </p>
                                <p>Ghế đã chọn: {item.seat.position}</p>
                                <p>Trạng thái thanh toán: {item.status==='cancelled' && 'Đã huỷ'} {item.status==='pending' && 'Đang thanh toán'} {item.status==='booked' && 'Đã thanh toán'}</p>
                                <p>Trạng thái xe: {item.trip.status}</p>
                                <p style={{ color: "#FE6531" }}>Tổng tiền: {parseInt(item.seat.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                {/* {isButtonVisible === 'pending' && <button className='cancel' style={{ backgroundColor: "#e2e2e2", color: "#fe6531" }}> Hủy vé</button>} */}

                            </div>
                            <div className='buttons'>
                                {item.status === 'pending' && <button onClick={() => handleCancel(item.id)} className='button' style={{ backgroundColor: "#e2e2e2", color: "#fe6531" }}> Hủy vé</button>}
                              
                                {item.status === 'cancelled' && ''}
                                {item.status === 'booked' && item.trip.status==='Đã đến'  && userCmt &&<button className='button'data-bs-toggle="modal" onClick={() => handleDetailIdCar(item.car.id)}
                                    data-bs-target="#exampleModal" > Đánh giá xe</button>}
                              
                                {/* {dataUserCmt !== '' ? <button className='assess' onClick={() => handleIdCar(item.car.id)}>Xem đánh giá</button> : <button className={`button ${item.trip.status==='Đã đến' ? 'disabled' :' '}` }data-bs-toggle="modal" onClick={() => handleDetailIdCar(item.car.id)}
                                    data-bs-target="#exampleModal" > Đánh giá xe</button>} */}
                                    
                            </div>
                        </div>
                    </>
                ))}



                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div onSubmit={handleSubmit} className="modal-dialog" style={{ maxWidth: "800px" }}>
                        <div className="modal-content" >
                            <div className="modal-header row m-0">
                                <h5 className="modal-title col text-start" id="exampleModalLabel">
                                    Đánh giá:
                                </h5>

                                <div className='col text-end'><button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                /></div>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="container__star form-group">
                                        <div className='row m-0 flex-row star-content-icon'>

                                            <div className='col p-0'>
                                                {rating.map((star, index) => (
                                                    <i
                                                        key={index}
                                                        className={star ? 'fas fa-star' : 'far fa-star'}
                                                        onClick={() => handleStarClick(index)}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="">Nội dung</label>
                                        <textarea className='form-control' name="" id="" cols="30" rows="10" onChange={e => setContent(e.target.value)}></textarea>
                                    </div>
                                    <div className='form-group'>
                                        <button className='button'>Gửi</button>
                                    </div>
                                    {messageRate && <>
                                <div style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.9em",
                                                textAlign: "left",
                                            }}>
                                    {messageRate}
                                </div>
                            </>}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="pagination-contents">
            {pageCount > 1 && (<ReactPaginate
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
            </div>
        </div>
    );
};

export default UpdateInfor;