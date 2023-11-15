import React from 'react';
import logoxe from "../assets/images/busgif.gif";

const LoadingAd = () => {
    return (
        <div >
        <div className="loading-xe">
        <div className='img-load'>
        <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
            </div>
        <div class="dots-3"></div>
        </div>
        </div>
    );
};

export default LoadingAd;