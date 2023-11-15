import React from 'react';
import logoxe from "../assets/images/busgif.gif";

const Loading = () => {
    return (
        <div >
        <div className="loading-xe">
        <div className='img-load'><img src={logoxe} alt=""  /></div>
        <div class="dots-3"></div>
        </div>
        </div>
    );
};

export default Loading;