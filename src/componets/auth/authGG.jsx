import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import logo from "../../assets/images/LogoWebProTicket.png";
import "../../assets/css/index.css"
import {  useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
const AuthGG = ({ location }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    const {  setToken } = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (location) {
            fetch(`${API_BASE_URL}/api/login/google/callback${location.search}`, { headers: new Headers({ accept: 'application/json' }) })
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

export default AuthGG;

