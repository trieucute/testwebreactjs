import React from 'react';

const Notification = ({message}) => {
    return (
        <div >
            <div className="alert alert-success notifies" role="alert" style={{position:"fixed",zIndex:"1000" , top:"100px", right:"0",background:"var(--colorPrimary)",color:"white", border:"none", borderRadius:"0", width:"fit-content", fontSize:"0.9em"}}>
            <i className="fas fa-circle-xmark"></i>      {message}
               {/* jsdkkhsajkdshajkđ dạkdbjk */}
            </div>
        </div>
    );
};

export default Notification;