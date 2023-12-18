import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../NotificationTrip";

const Timer = (props) => {
  const { minute: initialMinute = props.minute, second: initialSecond = props.second } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSecond);
  const nav = useNavigate();
  const [showNotifi, setShowNotifi] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const handleWhenCountEnds = () => {
    alert('Đã hết thời gian thanh toán, vé của bạn đã bị huỷ!')
  
    nav("/"); // Chuyển hướng về trang chủ
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          handleWhenCountEnds();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [handleWhenCountEnds, minutes, seconds]);

  return (
    <div>
           {/* {showNotifi &&  <Notification message={notificationMessage} />} */}
      {minutes === 0 && seconds === 0 ? null : (
        <b className="text-success">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </b>
      )}
    </div>
  );
};

export default Timer;
