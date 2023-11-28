import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosAdmin from '../axois-admin';
import { useState } from 'react';
import LoadingAd from '../../loadingAdmin';

const AddNewCar = () => {
  const [loading, setLoading]= useState(false)
  const [message, setMessage]=useState(null)
  const [newData, setNewData]= useState({
    name:'',
    number_seat:0,
    license_plate:"",
    type:"",
    img: '',
    price:0
  })
  const addcar= useSelector(state=>state.carAdmin.addCar)
  const dispatch= useDispatch();
  const handleInputChange = (e) => {
    if (e.target.name === 'img') {
      setNewData({
        ...newData,
        img: e.target.files[0],
      });
    } else {
      setNewData({
        ...newData,
        [e.target.name]: e.target.value,
      });
    }
  };

const handleAddSubmit = (e) => {
  e.preventDefault();
  setLoading(true)
  if(newData.name==='' || newData.number_seat===''|| newData.license_plate===''|| newData.type===''|| newData.img===''||newData.price===''){
    setLoading(false)
    alert('Vui lòng nhập đầy đủ nội dung!')
    return
  }
  // Tạo dữ liệu cho xe mới
  const { name, number_seat, license_plate, type, img } = newData;

  // Tạo một mảng seats dựa trên số lượng ghế hoặc phòng
  const seats = [];
  const halfSeats = Math.ceil(number_seat / 2); // Làm tròn lên nửa số ghế

  for (let i = 0; i < number_seat; i++) {
    const seatType = type; // Sử dụng giá trị type từ newData

    const seatData = {
      position: i < halfSeats ? `A${i + 1}` : `B${i + 1 - halfSeats}`,
      type: seatType,
      price: newData.price,
    };
    seats.push(seatData);
  }

  // Dữ liệu cho request POST
  const datapost = {
    name,
    number_seat,
    license_plate,
    type,
    img,
    seats, // Thêm dữ liệu ghế vào thông tin xe
  };

  // Gửi request POST đến API
  axiosAdmin.post('/car', datapost,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      console.log(res.data);
      // Thực hiện các hành động cần thiết sau khi thêm xe mới thành công
      setMessage('Thêm mới thành công')
      setLoading(false)
      dispatch(addcar);
      setNewData({
        name:'',
        number_seat:0,
        license_plate:"",
        type:"",
        img: '',
        price:0
      })
     
    })
    .catch((err) => {
      // Xử lý lỗi nếu có
      setLoading(false)
      console.error('Error adding new car:', err);
      const response = err.response;

      if(response){
        const errors = response.data.errors;
          if(errors.license_plate =="The license plate has already been taken."){
          setMessage("Biển số xe đã tồn tại!");
         
          } 
      }
    });
};

  console.log('addcar',addcar);
    return (
        <div className='addNew-container'>
      {loading ? <LoadingAd/> : (
 <>
           <h3 className='h3-admin mb-4 text-center'> Thêm xe khách</h3>
      <form   className='addNew-contents' onSubmit={handleAddSubmit}>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tên xe</label>
          <input type="text" className='form-control' name='name' onChange={(e)=>handleInputChange(e)} />
          </div>
          <div className='form-group'>
          <label htmlFor="">Biển số</label>
        <input type="text"  className='form-control' name='license_plate' onChange={(e)=>handleInputChange(e)} />
          </div>
          {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' />
          </div> */}   
           <div className='form-group'>
          <label htmlFor="">Loại xe</label>
          <select name="type" id="" className='form-select'  onChange={(e)=>handleInputChange(e)} >
            <option value="">Chọn loại xe</option>
            <option value="Giường nằm">Giường nằm</option>
            <option value="Ghế">Ghế</option>
            <option value="Limousine">Limousine ( phòng )</option>

     
          </select>
          </div>
          
          <div className='form-group'>
          <label htmlFor="">Số lượng ghế</label>
        <input type="number"  className='form-control' name='number_seat'  value={newData.number_seat} onChange={(e)=>handleInputChange(e)} />
          </div>
          <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' name='price' value={newData.price}  onChange={(e)=>handleInputChange(e)} />
          </div>
    
  
          <div className='form-group'>
          <label htmlFor="">Hình</label>
        <input type="file"  className='form-control' name='img'  onChange={(e)=>handleInputChange(e)}  />
          </div>
       
       
   
          <div >
            <b>* Lưu ý:</b>
            <div>Xe Giường nằm thường là 36 giường (tiêu chuẩn)</div>
            <div>Xe Limousine là 24 phòng (tiêu chuẩn)</div>
            <div>Xe Ghế là 28 ghế (tiêu chuẩn)</div>

          </div>
       
       <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Thêm mới</button></div>
       </div>
       {message && <>
                                <div className="form-group"  style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {message}
                                </div>
                            </>}
      </form>
        </>
      )}
       
 
   
      {/* <div>{content}</div> */}
    </div>
    );
};

export default AddNewCar;