import React from 'react';
import { useState } from 'react';
import axiosAdmin from '../axois-admin';
import LoadingAd from '../../loadingAdmin';

const AddNewJob = () => {
  const [title, setTitle] = useState('');
  const [requirements, setRequirement] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (title === '' || requirements === '' || location === '' || salary === '' || status === '' || description === '') {
      setLoading(false)
      alert('Vui lòng nhập đầy đủ nội dung!')
      return
    }
    try {
      const jobNew = {
        title: title,
        requirements: requirements,
        location: location,
        salary: salary,
        status: status,
        description: description
      }
      const res = await axiosAdmin.post('/job', jobNew, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setTitle('');
      setRequirement('');
      setLocation('');
      setSalary('');
      setStatus('');
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
        <h3 className='h3-admin mb-4 text-center'> Thêm tin tuyển dụng</h3>
        <form onSubmit={handleSubmit} className='addNew-contents'>
          <div className='row m-0 justify-content-between'>
            <div className='form-group'>
              <label htmlFor="">Tiêu đề</label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} className='form-control' />
            </div>

            {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' />
          </div> */}
            <div className='form-group'>
              <label htmlFor="">Yêu cầu</label>
              <input type="text" onChange={(e) => setRequirement(e.target.value)} className='form-control' />

            </div>
            <div className='form-group'>
              <label htmlFor="">Địa điểm</label>
              <input type="text" onChange={(e) => setLocation(e.target.value)} className='form-control' />
            </div>



            <div className='form-group'>
              <label htmlFor="">Lương</label>
              <input type="number" onChange={(e) => setSalary(e.target.value)} className='form-control' />
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
              <input type="date" onChange={(e) => setCreat_at(e.target.value)} className='form-control' />
            </div> */}

            <div className='form-group'>
              <label htmlFor="">Mô tả</label>
              {/* <input type="text"  className='form-control' /> */}
              <textarea name="" id="" rows="3" onChange={(e) => setDescription(e.target.value)} className='form-control' ></textarea>
            </div>
            <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Thêm mới</button></div>
          </div>
        </form>
      </>
)}

      {/* <div>{content}</div> */}
    </div>
  );
};

export default AddNewJob;