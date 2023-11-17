import moment from 'moment';
export const API_BASE_URL = 'http://localhost:8000';

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
  