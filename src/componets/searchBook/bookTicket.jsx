import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useDispatch, useSelector } from 'react-redux';
import {  searchTrip, updateSearchData } from '../../reduxTool/routesBookingSlice';
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import Notification from "../../pages/NotificationTrip";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';
const Book = () => {

  const handleCheckedKhuHoi = () => {
    let khuhoi = document.getElementById("khuhoi");
    console.log(khuhoi);
    let disabled = document.querySelector(".disabled_input");
    if (khuhoi.checked !== true) {
      console.log(disabled);
      disabled.classList.add("disabled");
      disabled.disabled = true;
    } else {
      disabled.classList.remove("disabled");
      disabled.disabled = false;
    }
  };
//   const dispatch = useDispatch();
//   const   navigate = useNavigate()
//   const [dataStart, setDataStart] = useState([]);
//   const [dataEnd, setDataEnd] = useState([]);

//   const [filteredDataStart, setFilteredDataStart] = useState([]); // Lưu trữ danh sách gợi ý sau khi lọc
//   const [filteredDataEnd, setFilteredDataEnd] = useState([]); // Lưu trữ danh sách gợi ý sau khi lọc

//   const [selectedDate, setSelectedDate] = useState(null);

//   const [formData, setFormData] = useState({
//       start_location: '',
//       end_location: '',
//       date: '',
//       amount:1
//     });
//     // const fetchData = (startLocation) => {
//     //   axiosClient
//     //     .get(`/route/end-location?start_location=${encodeURIComponent(startLocation)}`)
//     //     .then((response) => {
//     //       const data = response.data.data;
//     //       console.log(data);
//     //       setDataEnd(data);
//     //       setFilteredDataEnd(data);
//     //     })
//     //     .catch((err) => {
//     //       console.error(err);
//     //     });
//     // };
//     const [dataProvinces, setDataProvinces] = useState([]);
//     const fetchDataProvinces = () => {
//       axiosClient
//         .get(`/station`)
//         .then((response) => {
//           const data = response.data.data;
//           console.log(data);
//           setDataProvinces(data);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     };
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//      // Kiểm tra nếu ngày hợp lệ thì mới chuyển đổi định dạng
// console.log(date);
// console.log(format(date, 'yyyy-MM-dd'));
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       date:format(date, 'yyyy-MM-dd') // Cập nhật giá trị ngày tháng đã định dạng cho formData
//     }));
  
//   };
//     const handleChange = (event) => {
//       const { name, value } = event.target;
  
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
  
//       if (name === 'start_location') {
//         // Lọc dữ liệu gợi ý cho start_location dựa trên giá trị nhập vào
//         const filteredStartLocations = dataStart.filter((locationObj) =>
//           locationObj.start_location &&
//           locationObj.start_location.toLowerCase().includes(value && value.toLowerCase())
//         );
//         setFilteredDataStart(filteredStartLocations);
//       } else if (name === 'end_location') {
//         // Lọc dữ liệu gợi ý cho end_location dựa trên giá trị nhập vào
//         const filteredEndLocations = dataEnd.filter((locationObj) =>
//           locationObj.end_location &&
//           locationObj.end_location.toLowerCase().includes(value && value.toLowerCase())
//         );
//         setFilteredDataEnd(filteredEndLocations);
//       }
//     };
 
//     const handleSelect = (value, field) => {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [field]: value
//       }));
//       if (field === 'start_location') {
//         // fetchData(value);
//       }
//     };
//     const handleInputClick = (field) => {
//       if (field === 'start_location') {
//         setFilteredDataStart(dataStart); // Cập nhật khi click vào ô start_location
//         if (formData.start_location !== '') {
//           // fetchData(formData.start_location);
//         }
//       } else if (field === 'end_location') {
//         setFilteredDataEnd(dataEnd); // Cập nhật khi click vào ô end_location
//       }
//     };
//     const [showNotifi, setshowNotifi] = useState(false);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//    // Kiểm tra dữ liệu trước khi submit
//    if (!formData.start_location || !formData.end_location || !formData.date) {
//     // alert("Vui lòng nhập đầy đủ thông tin!");
//     setshowNotifi(true)
//     console.log('dataupdate',updateSearchData(formData));

//     // const value= 'Vui lòng nhập đầy đủ thông tin!';
 
//  return  ;
//     // return <Notification value={value}/>; // Ngăn người dùng chuyển trang nếu thông tin chưa được nhập đầy đủ
//   }
//     const startLocation = formData.start_location;
//     const endLocation = formData.end_location;
//     const date = formData.date;
//     // const  amount= formData.amount;

//     console.log('date', date);
//     setSelectedDate(new Date(formData.date)); 

//     dispatch(searchTrip({ startLocation, endLocation, date }));
//     dispatch(updateSearchData(formData))
//     console.log('dataupdate',updateSearchData(formData));
//    navigate(`/lichtrinh1chieu/?start_location=${encodeURIComponent(startLocation)}&end_location=${encodeURIComponent(endLocation)}&date=${date}&amount=1`)
//   };

//   useEffect(() => {

//     // axiosClient
//     //   .get('/route/start-location')
//     //   .then((response) => {
//     //     const data = response.data.data;
//     //     console.log(data);
//     //     setDataStart(data)
//     //     setFilteredDataStart(data);
//     // })
//     //   .catch((err) => {
//     //     console.error(err);
//     //   });
//     fetchDataProvinces()
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);

//     setFormData({
//       start_location: urlParams.get('start_location') || '',
//       end_location: urlParams.get('end_location') || '',
//       date: urlParams.get('date') || ''
//     });

//   }, []);

//   // useEffect(() => {
//   //   if (formData.start_location !== '') {
//   //     // fetchData(formData.start_location);
//   //   }
//   // }, [formData.start_location]);
//   useEffect(() => {
//     if (formData.date) {
//       setSelectedDate(new Date(formData.date)); // Cập nhật selectedDate từ formData.date
//     }
//   }, [formData.date]);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataProvinces, setDataProvinces] = useState([]);
  const [filteredDataProvinces, setFilteredDataProvinces] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    start_location: '',
    end_location: '',
    date: ''
  });

  const fetchDataProvinces = () => {
    axiosClient
      .get(`/station`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setDataProvinces(data);
        setFilteredDataProvinces(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: format(date, 'yyyy-MM-dd')
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'start_location' || name === 'end_location') {
      const filteredLocations = dataProvinces.filter((locationObj) =>
        locationObj.province &&
        locationObj.province.toLowerCase().includes(value && value.toLowerCase())
      );
      setFilteredDataProvinces(filteredLocations);
    }
  };

  const handleSelect = (value, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value
    }));
  };

  const handleInputClick = (field) => {
    if (field === 'start_location' || field === 'end_location') {
      setFilteredDataProvinces(dataProvinces);
    }
  };

  // const [showAlert, setShowAlert] = useState(false);
  const [showNotifi, setShowNotifi] = useState(false);
  const [messLocation, setMessLocation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.start_location || !formData.end_location || !formData.date) {
      // setShowAlert(true);
      setShowNotifi(true)
      return;
    }

    const startLocation = formData.start_location;
    const endLocation = formData.end_location;
    const date = formData.date;
 // Kiểm tra nếu start_location và end_location giống nhau
 if (startLocation === endLocation) {
  setMessLocation(true);
  return;
}

    setSelectedDate(new Date(formData.date));

    dispatch(searchTrip({ startLocation, endLocation, date }));
    dispatch(updateSearchData(formData));

    navigate(`/lichtrinh1chieu/?start_location=${encodeURIComponent(startLocation)}&end_location=${encodeURIComponent(endLocation)}&date=${date}&amount=1`);
  };

  useEffect(() => {
    fetchDataProvinces();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setFormData({
      start_location: urlParams.get('start_location') || '',
      end_location: urlParams.get('end_location') || '',
      date: urlParams.get('date') || ''
    });

  }, []);

  useEffect(() => {
    if (formData.start_location !== '') {
      fetchDataProvinces();
    }
  }, [formData.start_location]);

  useEffect(() => {
    if (formData.date) {
      setSelectedDate(new Date(formData.date));
    }
  }, [formData.date]);

  return (
    <div className='book-content_container container'>
       {showNotifi && <Notification message="Vui lòng nhập đầy đủ thông tin!" />}
       {messLocation && <Notification message="Vui lòng chọn điểm đến và điểm đi khác nhau!" />}

    <div className="book-contents">
      <div className="booking-content">
        <div className="trip-book">
          <div className="form-check">
            <input
              className="form-input"
              type="radio"
              name="trip"
              id="motchieu"
              defaultValue="motchieu"
              defaultChecked="checked"
              onChange={handleCheckedKhuHoi}
            />
            <label className="form-check-label" htmlFor="motchieu">
              Một chiều
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-input"
              type="radio"
              name="trip"
              id="khuhoi"
              defaultValue="khuhoi"
              defaultChecked=""
              onChange={handleCheckedKhuHoi}
            />
            <label className="form-check-label" htmlFor="khuhoi">
              Khứ hồi
            </label>
          </div>
        </div>
        <div className="book-ticket">
          <form id="search-form"  className="form-book-ticket flex-wrap align-items-end" onSubmit={handleSubmit}>

<div className="form-group control-location" >
<label htmlFor="destination">Điểm đi</label>
<Autocomplete
              inputProps={{
                className: 'form-control',
                name: 'start_location',
                placeholder: 'Chọn tỉnh thành',
                autoComplete: 'off',
              }}
            value={formData.start_location}
            items={filteredDataProvinces}
            getItemValue={(item) => item.province}
            onSelect={(value) => handleSelect(value, 'start_location')}
            onChange={(event) => handleChange(event)}
            onClick={() => handleInputClick('start_location')}
            renderMenu={(items, value) => (
              <div className="autocomplete-options">
                {items}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                key={item.province}
                className={`autocomplete-item location_booking ${isHighlighted ? 'highlighted' : ''}`}
              >
                {item.province}
              </div>
            )}
          />

     
      </div>
      <div className="form-group control-location" >
        <label htmlFor="destination">Điểm đến</label>

            <Autocomplete
            inputProps={{
              className: 'form-control',
              name: 'end_location',
              placeholder: 'Chọn tỉnh thành',
              autoComplete: 'off'
            }}
            value={formData.end_location}
            items={filteredDataProvinces}
            getItemValue={(item) => item.province}
            onSelect={(value) => handleSelect(value, 'end_location')}
            onChange={(event) => handleChange(event)}
            onClick={() => handleInputClick('end_location')}
            renderMenu={(items, value) => (
              <div className="autocomplete-options">
                {items}
              </div>
            )}

            renderItem={(item, isHighlighted) => (
              <div
                key={item.province}
                className={`autocomplete-item location_booking ${isHighlighted ? 'highlighted' : ''}`}
              >
                {item.province}
              </div>
            )}
          />
      </div>

  {/* <input type="number" name="amount" id="amount" value={1} hidden /> */}

            <div className="form-group">
              <label htmlFor="date_go">Ngày đi</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // label="Ngày đi"
          slotProps={{ textField: { name: 'date' }}}
          value={selectedDate}
          // views={["year", "month", "day"]}
          format="dd/MM/yyyy" 
          // name="date"
          onChange={handleDateChange}
          renderInput={(params) => <input {...params} />} // Render thành input thay vì TextField
          minDate={new Date()} // Hạn chế chọn ngày trước ngày hiện tại
        />

      </LocalizationProvider>
            </div>
            <div className="form-group">
              <label htmlFor="date_go">Ngày về</label>
              <input
                type="date"
                className="form-control disabled_input disabled"
                id="date_go" 
              />
            </div>

          <div className="form-group ">
                      <button type="submit" className=" button_search_ticket" style={{color:"white"}} >Tìm chuyến xe
                     {/* <a href="/lichtrinh" style={{textDecoration:"none", color:"white"}}></a>  */}
                      </button>
                  </div>
          </form>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Book;
