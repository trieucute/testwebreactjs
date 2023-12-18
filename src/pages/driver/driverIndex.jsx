import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosClient from '../../axios-client';
import { fetchUserProfile } from '../../reduxTool/authSlice';
import users from '../../assets/images/usernoavatar.png'
const DriverIndex = () => {
    const { setDriver, tokenDriver, driver } = useStateContext();
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
                    Authorization: `Bearer ${tokenDriver}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            setMessage('Cập nhật thông tin thành công')
            // alert("Cập nhật thành công")
            // Handle the response, update UI, etc.
            console.log(response.data); // Log the response data or handle it accordingly
            dispatch(fetchUserProfile(tokenDriver))
                .then((res) => {
                    console.log(res);
                    // setUser(res.payload.data)
                    setUpdateinf(res.payload.data)
                    setImg(res.payload.data.avatar)

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
                if (errors.phone_number == "Trường phone number đã có trong cơ sở dữ liệu.") {
                    setMessage("Số điện thoại đã được sử dụng!");
                    console.log(errors.phone_number);
                } else if (errors.phone_number == "Trường phone number phải có tối thiểu 10 kí tự.") {
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
        dispatch(fetchUserProfile(tokenDriver))
            .then((res) => {
                console.log(res);
                setDriver(res.payload.data)
                setImg(res.payload.data.avatar)
                setUpdateinf(res.payload.data)

            })
            .catch((err) => {
                console.error(err)

            })
        // console.log(    dispatch(fetchUserProfile(token)));
        console.log(img, 'img');
        if (driver) {
            // setLoading(true)
            console.log(driver);
        }
        //  else {
        //     // setLoading(false);
        //     navigate('/admin')
        // }
    }, [])


    return (
        <div className=''>
            <div className='updateInfor-container container pt-2'>
                <div className='backWhite-padding mb-4 '>
                    <h5 className='h5-inf mb-3'>Thông tin của bạn</h5>
                    <div className='text-center mb-3'   style={{fontWeight:"700"}}>{driver.role==='driver' && 'Tài xế'}</div>
                    <form action="" onSubmit={handleUpdateUser}>
                        <div className='row m-0 justify-content-between'>
                            <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12'>
                                <div className='img-user'>
                                    <div className='img-updateinf'>
                                        {img !== null && <img src={img} alt="" className='img-fluid' />}
                                        {img === null &&
                                            <>
                                                <img src={users} alt="" className='img-fluid' />
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
                                    <input type="text" name='name' value={updateinf.name} className='form-control disabled' onChange={handleOnChange}  readOnly disabled  />
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
                                    <button type='submit' className='btn-add'>Cập nhật</button>
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
                </div>
                </div>
    );
};




export default DriverIndex;