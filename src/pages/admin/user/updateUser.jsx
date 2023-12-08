import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosAdmin from "../axois-admin";
import { useEffect } from "react";
import LoadingAd from "../../loadingAdmin";

const UpdateUser = () => {
    const {id}= useParams() 
  const [loading, setLoading] = useState(true);

  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
  });
  const [error, setError]= useState('')

const [messageSuccess, setMessageSuccess]=useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigation = useNavigate();
  useEffect(() => {
    // fetchUsers();
    axiosAdmin.get(`/user/${id}`)
    .then(res=>{
      
      const userData = res.data.data;
      setNewUserData(userData);
      setLoading(false);
      console.log(userData );
    })
   .catch (error=> {
      console.error("Error fetching user data:", error);
    //   setError("Error fetching user data. Please try again later.");
      setLoading(false);
    })
  }, []);
  const handleAddUser = async (e) => {
    e.preventDefault()
    if(newUserData.name==='' || newUserData.email===''|| newUserData.phone_number===''|| newUserData.role ===''|| newUserData.password===''){
        alert('Vui lòng nhập đầy đủ thông tin!')
        return
    }
    try {
      const response = await axiosAdmin.put(`/user/${id}`, newUserData,{
        headers: {
            'Content-Type': 'application/json',
          },
      });
      setMessageSuccess('Cập nhật người dùng thành công')
    //   navigation("/admin/user");
    // setNewUserData({
    //     name: "",
    //     email: "",
    //     phone_number: "",
    //     role: "",
    //     password:''
    // })
      setError('')

    } catch (error) {

      console.error("Error adding new user:", error);

      if (error.response) {
        const errors= error.response
        console.log(errors, 'lỗi');
        if(errors.status===500){
            setError('Email hoặc số điện thoại đã tồn tại!')

        }else{
            setError('')
        }
     
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
      console.log(error);
      // error message
    //   alert("Thêm user lỗi");
    }
  };

  return (
    <div>
      <div className="addNew-container">
        {loading ? <LoadingAd/> :
        (
            <>
            <h3 className="h3-admin mb-4 text-center"> Câp nhật người dùng</h3>
        <form onSubmit={handleAddUser} className="addNew-contents">
          <div className="row m-0 justify-content-between">
            <div className="form-group">
              <label htmlFor="">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên"
                aria-label="ten"
                name="name"
                value={newUserData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="SĐT"
                aria-label="sdt"
                name="phone_number"
                value={newUserData.phone_number}
                onChange={handleInputChange}
              />
           
            </div>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
              />
            
            </div>
     
            <div className="form-group">
              <label htmlFor="">Vai trò</label>
              <div className="form-control">
                <input
                  type="radio"
                  placeholder="Vai trò"
                  aria-label="role"
                  name="role"
                  value={"user"}
                  checked ={newUserData.role==='user' ? 'checked' :''}
                  onChange={handleInputChange}
                />
                <label>User</label>

                <input
                  type="radio"
                  placeholder="Vai trò"
                  aria-label="role"
                  name="role"
                  value={"driver"} checked ={newUserData.role==='driver' ? 'checked' :''}
                  onChange={handleInputChange}
                />
                <label>Driver</label>

                <input
                  type="radio"
                  placeholder="Vai trò"
                  aria-label="role"
                  name="role"
                  value={"admin"}
                  checked ={newUserData.role==='admin' ? 'checked' :''}
                  onChange={handleInputChange}
                />
                <label>Admin</label>
              </div>
            </div>
            <div className="form-group w-100">   
          <button className="btn-add" type="submit">
            Cập nhật
          </button>
          </div>
          </div>
          {messageSuccess && <>
                                <div style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.9em",
                                                textAlign: "left",
                                            }}>
                                    {messageSuccess}
                                </div>
                            </>}
                            {error && <>
                                <div   style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {error}
                                </div>
                            </>}
        </form>
            </>
        )}
        {/* <h3 className="h3-admin mb-5">Thêm người dùng</h3> */}
        
      </div>
    </div>
  );
};

export default UpdateUser;
