import React from 'react';

const Notification = ({message}) => {
    return (
        <div>
            <div class="alert alert-success" role="alert" style={{position:"fixed", top:"100px", right:"0",background:"var(--colorPrimary)",zIndex:"1000",color:"white", border:"none", borderRadius:"0", width:"fit-content", fontSize:"0.9em"}}>
            <i class="fas fa-circle-xmark"></i>      {message}
               {/* jsdkkhsajkdshajkđ dạkdbjk */}
            </div>
        </div>
    );
};

export default Notification;