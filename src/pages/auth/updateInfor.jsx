import React, { useEffect } from 'react';
import user from '../../assets/images/usernoavatar.png'
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../reduxTool/authSlice';
const UpdateInfor = () => {
    const { user, setUser,token } = useStateContext();
    const navigate= useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchUserProfile(token))
    .then((res)=>{
        console.log(res);
        setUser(res.payload.data)
    })
    .catch((err)=>{
        console.error(err)
    })
    // console.log(    dispatch(fetchUserProfile(token)));
    if(token){
        // setLoading(true)
        console.log(token);
    }else{
        // setLoading(false);
        navigate('/')
    }
 },[])
    return (
        <div className='mt-10'>
            <div className='updateInfor-container container pt-2'>
                <div className='backWhite-padding mb-4 '>   
                <h5 className=''>Cập nhật thông tin</h5>
                <form action="">
                    <div className='row m-0 justify-content-between'>
                        <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12'>
                            <div className='img-user'>
                            <div className='img-updateinf'><img src={user.avatar} alt="" className='img-fuild'/></div>
                            <div className='form-group'>
                                <label htmlFor="">Đổi ảnh </label>
                                <input type="file" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor="">Email</label>
                                <input type="email" name='email' readOnly disabled value={user.email} className='form-control disabled'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">Họ và tên</label>
                                <input type="text" name='name' value={user.name} className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">Số điện thoại</label>
                                <input type="number" name='phone_number' value={user.phone_number} className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" name='address' value={user.address} className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <button type='submit'>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default UpdateInfor;