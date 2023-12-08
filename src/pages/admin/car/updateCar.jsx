import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchcarAdminDetail } from '../../../reduxTool/carSlice';
import LoadingAd from '../../loadingAdmin';
import axios from 'axios';
import axiosAdmin from '../axois-admin';

const UpdateCar = () => {
    const [loading, setLoading]= useState(false)
    const [message, setMessage]=useState(null)
    // const [data, setData]= useState({
    //     name: "",
    //     license_plate: "",
    //     type: "",
    //     status: 1,
    //     primary_img:'',
    //     number_seat: 0,
    // })
    const [data, setData]= useState([])
    const handleInputChange = (e) => {
        if (e.target.name === 'img') {
          setData({
            ...data,
            img: e.target.files[0],
          });
        } else {
          setData({
            ...data,
            [e.target.name]: e.target.value,
          });
        }
      };
    
    const dispatch= useDispatch();
    const  update= useSelector(state => state.carAdmin)

    const datafetch=update.data
    const { id } = useParams();
    useEffect(()=>{
      setLoading(true)
        dispatch(fetchcarAdminDetail(id))
        .then(res=>{
          setData(res.payload.data)
          // console.log(res.payload.data);
          setLoading(false)

        })
    },[])
  // const [img, setImg]= useState()
    useEffect(()=>{
     
        setData(datafetch)
    },[datafetch])

    const handleEditSubmit =(e)=>{
        
        e.preventDefault()
        setLoading(true)
        
        if(data.name===''|| data.type===''|| data.license_plate==='' || data.img===''){
            alert('Vui lòng nhập đầy đủ nội dung!')
            return;
        }
        const updateData={
          name:data.name,
          img:data.img,
          license_plate:data.license_plate,
          type:data.type
        }

        axiosAdmin.post(`/car/${id}/update`, updateData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res=>{
          console.log(res);
         setLoading(false)
          setMessage('Cập nhật thành công!')
          console.log(updateData);
        })
        .catch(err=>{
          console.error(err)
         setLoading(false)

          const response= err.response;
          if(response){
            if(response.status===500){
              setMessage('Biển số xe đã được sử dụng!')
            }
          }
        })
    }
    return (
        <div className='addNew-container'>
      {loading ? <LoadingAd/> : (
 <>
           <h3 className='h3-admin mb-4 text-center'> Cập nhật xe khách</h3>
      <form   className='addNew-contents' onSubmit={handleEditSubmit}>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tên xe</label>
          <input type="text" className='form-control' name='name' value={data.name} onChange={(e)=>handleInputChange(e)} />
          </div>
          <div className='form-group'>
          <label htmlFor="">Biển số</label>
        <input type="text"  className='form-control' name='license_plate' value={data.license_plate} onChange={(e)=>handleInputChange(e)} />
          </div>
     
           <div className='form-group'>
          <label htmlFor="">Loại xe</label>
          <select name="type" id="" className='form-select'  onChange={(e)=>handleInputChange(e)}  value={data.type}>
            <option value="">Chọn loại xe</option>
            <option value="Giường nằm"  >Giường nằm</option>
            <option value="Ghế">Ghế</option>
            <option value="Limousine">Limousine ( phòng )</option>

     
          </select>
          </div>
          
          <div className='form-group'>
          <label htmlFor="">Số lượng ghế</label>
        <input type="number"  className='form-control' name='number_seat'  value={data.number_seat} onChange={(e)=>handleInputChange(e)} disabled readOnly/>
          </div>
          {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' name='price' value={data.price}  onChange={(e)=>handleInputChange(e)} />
          </div> */}
    
  
          <div className='form-group'>
          <label htmlFor="">Hình</label>
        <input type="file"  className='form-control' name='img'  onChange={(e)=>handleInputChange(e)}  />
        <img src={data.primary_img}  alt="" style={{width:"70px", height:"70px", marginTop:"1em",objectFit:"cover"}}  />
          </div>
       
       
   
          <div >
            <b>* Lưu ý:</b>
            <div>Xe Giường nằm thường là 36 giường (tiêu chuẩn)</div>
            <div>Xe Limousine là 24 phòng (tiêu chuẩn)</div>
            <div>Xe Ghế là 28 ghế (tiêu chuẩn)</div>

          </div>
       
       <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Cập nhật</button></div>
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

export default UpdateCar;