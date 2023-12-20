import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosAdmin from "../axois-admin";
import Notification from "../../NotificationTrip";

const AddNewUser = () => {
  const [userUpdate, setUserUpdate] = useState({});
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    password:''
  });
  const [errorEmail, setErrorEmail]= useState('')
  const [errorPhone, setErrorPhone]= useState('')
  const [errorPassword, setErrorPassword]= useState('')
const [messageSuccess, setMessageSuccess]=useState('')
const [showNotifi, setShowNotifi] = useState(false);
const [notificationMessage, setNotificationMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigation = useNavigate();
  const handleAddUser = async (e) => {
    e.preventDefault()
    if(newUserData.name==='' || newUserData.email===''|| newUserData.phone_number===''|| newUserData.role ===''|| newUserData.password===''){

      setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
      setShowNotifi(true);
  
      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotifi(false);
      }, 3000);
        return
    }
    try {
      const response = await axiosAdmin.post("/user", newUserData);
      setMessageSuccess('Thêm người dùng thành công')
    //   navigation("/admin/user");
    setNewUserData({
        name: "",
        email: "",
        phone_number: "",
        role: "",
        password:''
    })
      setErrorEmail('')
      setErrorPhone('')
      setErrorPassword('')
    } catch (error) {

      console.error("Error adding new user:", error);

      if (error.response) {
        const errors= error.response.data.data
        console.log(errors);
        if(errors.email){
            setErrorEmail(errors.email)

        }else{
            setErrorEmail('')
        }
        if(errors.phone_number){
            setErrorPhone(errors.phone_number)
        }else{
               setErrorPhone('')
        }
        if(errors.password){
            setErrorPassword(errors.password)
            
        }else{
            setErrorPassword('')
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
      {showNotifi &&  <Notification message={notificationMessage} />}
        {/* <h3 className="h3-admin mb-5">Thêm người dùng</h3> */}
        <h3 className="h3-admin mb-4 text-center"> Thêm người dùng</h3>
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
                 {errorPhone && <>
                                <div   style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {errorPhone}
                                </div>
                            </>}
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
                   {errorEmail && <>
                                <div   style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {errorEmail}
                                </div>
                            </>}
            </div>
            <div className="form-group">
              <label htmlFor="">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                name="password"
                value={newUserData.password}
                onChange={handleInputChange}
              />
                  {errorPassword && <>
                                <div   style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {errorPassword}
                                </div>
                            </>}
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
                  onChange={handleInputChange}
                />
                <label>User</label>

                <input
                  type="radio"
                  placeholder="Vai trò"
                  aria-label="role"
                  name="role"
                  value={"driver"}
                  onChange={handleInputChange}
                />
                <label>Driver</label>

                <input
                  type="radio"
                  placeholder="Vai trò"
                  aria-label="role"
                  name="role"
                  value={"admin"}
                  onChange={handleInputChange}
                />
                <label>Admin</label>
              </div>
            </div>
            <div className="form-group w-100">   
          <button className="btn-add" type="submit">
            Thêm mới 
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
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
