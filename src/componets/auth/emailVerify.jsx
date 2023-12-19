import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import logo from "../../assets/images/LogoWebProTicket.png";
import "../../assets/css/index.css"
import {  useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
const EmailVerify = ({ location }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    const {  setToken } = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (location) {
            fetch(`${API_BASE_URL}//email/verify${location.search}`, { headers: new Headers({ accept: 'application/json' }) })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    // throw new Error('Something went wrong!');
                })
                .then((data) => {
                    setLoading(false);
                    // setData(data);
                    // console.log(data.data);
                    console.log(data.data.access_token);
                    setToken(data.data.access_token)
                     // Lưu thời gian hiện tại khi token được tạo
                    // const currentTime = new Date().getTime(); // Lấy thời gian hiện tại
                    // localStorage.setItem('tokenCreationTime', currentTime); // Lưu vào localStorage
                    navigate('/')
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error);
                    console.error(error);
                });
        } else {
            console.error('Location is undefined');
        }
    }, [location]);
// Trong useEffect hoặc bất kỳ hàm nào có thể được gọi khi người dùng truy cập trang hoặc thực hiện hành động trong ứng dụng
// useEffect(() => {
//     const tokenCreationTime = localStorage.getItem('tokenCreationTime');
//     const currentTime = new Date().getTime(); // Thời gian hiện tại
  
//     if (tokenCreationTime) {
//       const elapsedTime = currentTime - Number(tokenCreationTime);
//       const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 ngày tính bằng mili giây
  
//       if (elapsedTime >= twoDaysInMillis) {
//         // Token đã hết hạn sau 2 ngày, xóa token và thực hiện các hành động khác cần thiết
//         localStorage.removeItem('tokenCreationTime');
//         setToken(null); // Xóa token trong context hoặc local state của bạn
//         // Thực hiện các hành động khác khi token hết hạn
//       }
//     }
//   }, []);
    if (loading) {
        return <>
            <div className="loading ">
        <div className='img-load'><img src={logo} alt=""  /></div>
        <div class="dots-3"></div>
        </div>
        </>;
    }



    return (
        <div>
            {/* Render the component content */}
        </div>
    );
};

export default EmailVerify;

