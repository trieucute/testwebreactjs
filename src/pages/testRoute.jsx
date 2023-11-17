import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchTrip, updateSearchData } from '../reduxTool/routesBookingSlice';

import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Autocomplete from 'react-autocomplete';
import Notification from './NotificationTrip';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';

const TestRoute = () => {
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

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.start_location || !formData.end_location || !formData.date) {
      setShowAlert(true);
      return;
    }

    const startLocation = formData.start_location;
    const endLocation = formData.end_location;
    const date = formData.date;

    setSelectedDate(new Date(formData.date));

    dispatch(searchTrip({ startLocation, endLocation, date }));
    dispatch(updateSearchData(formData));

    navigate(`/showroute?start_location=${encodeURIComponent(startLocation)}&end_location=${encodeURIComponent(endLocation)}&date=${date}&amount=1`);
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
    <div>
      {showAlert && <Notification message="Vui lòng nhập đầy đủ thông tin!" />}
      <form id="search-form" className="form-book-ticket flex-wrap align-items-end" onSubmit={handleSubmit}>
        <div className="form-group">
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
              <div className="">
                {items}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                key={item.province}
                className={`autocomplete-item ${isHighlighted ? 'highlighted' : ''}`}
              >
                {item.province}
              </div>
            )}
          />
        </div>

        <div className="form-group">
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
              <div className="">
                {items}
              </div>
            )}

            renderItem={(item, isHighlighted) => (
              <div
                key={item.province}
                className={`autocomplete-item ${isHighlighted ? 'highlighted' : ''}`}
              >
                {item.province}
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_go">Ngày đi</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              slotProps={{ textField: { name: 'date' }}}
              value={selectedDate}
              format="dd/MM/yyyy"
              onChange={handleDateChange}
              renderInput={(params) => <input {...params} />}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </div>

        <div className="form-group">
          <button type="submit" className=" button_search_ticket" style={{ color: "white" }}>Tìm chuyến xe</button>
        </div>
      </form>
    </div>
  );
};

export default TestRoute;
