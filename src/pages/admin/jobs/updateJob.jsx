import React from 'react';
import { useState } from 'react';
import axiosAdmin from '../axois-admin';
import LoadingAd from '../../loadingAdmin';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchjobDetail } from '../../../reduxTool/jobSlide';
import { formatDateTimeAdminTrip } from '../../../config';
import Notification from '../../NotificationTrip';

const UpdateJob = () => {

  const navigate = useNavigate ()
  const [title, setTitle] = useState('');
  const [requirements, setRequirement] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
//   const [created_at, setCreat_at] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState('');

  const dispatch = useDispatch()  
  const {jobDetail} = useSelector(state => state.job)
  const itemList = jobDetail.data
  console.log(jobDetail);
  const {id} = useParams();

  useEffect(() =>{
    console.log("dispatch");
    dispatch(fetchjobDetail(id))
  }, [])
// const changeDate=(dateTimeString)=>{
//     // Chuyển đổi sang đối tượng Date
// const dateTime = new Date(dateTimeString);

// // Lấy ngày, tháng và năm từ đối tượng Date
// const year = dateTime.getFullYear();
// const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Thêm 0 phía trước nếu cần thiết
// const day = String(dateTime.getDate()).padStart(2, "0"); // Thêm 0 phía trước nếu cần thiết

// // Tạo chuỗi định dạng mới "YYYY-MM-DD"
// const formattedDate = `${year}-${month}-${day}`;
// return formattedDate
// }
  useEffect(()=>{
    setTitle(jobDetail.title)
    setRequirement(jobDetail.requirements)
    setLocation(jobDetail.location)
    setSalary(jobDetail.salary)
    setStatus(jobDetail.status)
    // const date=jobDetail.created_at
    // console.log(changeDate(jobDetail.created_at));
    // setCreat_at(changeDate(jobDetail.created_at))
    setDescription(jobDetail.description)
  }, [jobDetail])
  const [showNotifi, setShowNotifi] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (title === '' || requirements === '' || location === '' || salary === '' || status === ''|| description === '') {
      setLoading(false)
      setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
      setShowNotifi(true);
  
      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
      return
    }
    try {
      const jobNew = {
        title: title,
        requirements: requirements,
        location: location,
        salary: salary,
        status: status,
        // created_at: `${created_at}T00:00:00.000000Z`,
        description: description
      }
      console.log('jobnew',jobNew);
      const res = await axiosAdmin.put(`/job/${id}`, jobNew, {
        headers: {
          'Accept': 'application/json'
        }
      })
      navigate('/admin/jobs')
      console.log(res.data);
      setTitle('');
      setRequirement('');
      setLocation('');
      setSalary('');
      setStatus('');
    //   setCreat_at('');
      setDescription('');
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = (e) => {
    const value = parseInt(e.target.value,10); // Chuyển giá trị sang kiểu number
    setStatus(value); // Lưu giá trị đã chọn vào state
  };

  return (
    <div className='addNew-container'>
      {loading ? <LoadingAd/> : (
      <>
         {showNotifi &&  <Notification message={notificationMessage} />}
        <h3 className='h3-admin mb-4 text-center'> Cập nhật tuyển dụng</h3>
        <form onSubmit={handleSubmit} className='addNew-contents'>
          <div className='row m-0 justify-content-between'>
            <div className='form-group'>
              <label htmlFor="">Tiêu đề</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' />
            </div>

            {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' />
          </div> */}
            <div className='form-group'>
              <label htmlFor="">Yêu cầu</label>
              <input type="text" value={requirements} onChange={(e) => setRequirement(e.target.value)} className='form-control' />

            </div>
            <div className='form-group'>
              <label htmlFor="">Địa điểm</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='form-control' />
            </div>



            <div className='form-group'>
              <label htmlFor="">Lương</label>
              <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className='form-control' />
            </div>

            <div className='form-group'>
              <label htmlFor="">Hiện / ẩn</label>
              <div className='form-control'>
                <input type="radio" name='active' id='active1' value={1} placeholder='active' checked={ status ===1} onChange={handleStatusChange} /><label htmlFor="active1 m-0" style={{ fontSize: "16px" }} >Hiện</label>
                <input type="radio" name='active' id='active0' value={0} placeholder='active' checked={ status ===0} onChange={handleStatusChange} /> <label htmlFor="active0 m-0" style={{ fontSize: "16px" }} >Ẩn</label>
              </div>

            </div>
            {/* <div className='form-group'>
              <label htmlFor="">Ngày đăng</label>
              <input type="date" value={created_at} onChange={(e) => setCreat_at(e.target.value)} className='form-control' />
            </div> */}

            <div className='form-group'>
              <label htmlFor="">Mô tả</label>
              {/* <input type="text"  className='form-control' /> */}
              <textarea name="" id="" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className='form-control' ></textarea>
            </div>
            <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Cập nhật</button></div>
          </div>
        </form>
      </>
)}

      {/* <div>{content}</div> */}
    </div>
  );
};

export default UpdateJob;