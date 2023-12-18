import moment from 'moment';
export const API_BASE_URL = 'https://ticketpro.deece.vn';

export function formatDate(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    
    return `${day}/${month}/${year}`;
  }


  export  function calculateTimeDifference(startTime, endTime) {
    const start = moment(startTime, "HH:mm:ss");
    const end = moment(endTime, "HH:mm:ss");
  
    let duration;
    if (end.isBefore(start)) {
      duration = moment.duration(end.add(1, 'day').diff(start));
    } else {
      duration = moment.duration(end.diff(start));
    }
  
    const hours = duration.hours();
    const minutes = duration.minutes();
    // const seconds = duration.seconds();

    return  `${hours} giờ ${minutes} phút`
    //   seconds
    
  }
  
  export  function TimeHM(timeStr) {
    var timeArray = timeStr.split(":");
  var gioPhut = timeArray[0] + ":" + timeArray[1];

    return gioPhut;
  }
  export function timeFromDeparture(departure_time){
    // Chuyển đổi chuỗi thành đối tượng Date
let dateObj = new Date(departure_time);

// Lấy giờ và phút
let hour = ('0' + dateObj.getHours()).slice(-2);
let minute = ('0' + dateObj.getMinutes()).slice(-2);

// Tạo chuỗi mới chỉ chứa giờ và phút
let hour_minute = hour + ":" + minute;
return hour_minute
  }
  
  export   function formatDateNews(inputDate) {
    // ví dụ  "2023-11-16T01:03:11.000000Z",
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
    const year = date.getFullYear();
  
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  




  export  function formatDateTimeAdminTrip(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    
    const formattedDateTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    
    return formattedDateTime;
  }

  export  function formatTimeAdminTrip(time) {
   const  formattedTime = time.slice(0, 5)
    return  formattedTime ;
  }