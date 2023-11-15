import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';

const AutocompleteCity = () => {
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [dataStart, setDataStart] = useState([]);
  const [showdataStart, setShowdataStart] = useState(false);
  const [showdataEnd, setShowdataEnd] = useState(false);


  const [dataEnd, setDataEnd] = useState([]);
  
  useEffect(() => {
    axiosClient
      .get('/route/start-location')
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setDataStart(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleStartChange = (e) => {
    const inputValue = e.target.value;
    setStartValue(inputValue);
    fetchData(inputValue);
  };

  const handleEndChange = (e) => {
    const inputValue = e.target.value;
    setEndValue(inputValue);
  };

  const suggestStartWord = (value) => {
    const matches = dataStart.filter((obj) => {
      const startLocation = obj.start_location;
      if (typeof startLocation === 'string') {
        return startLocation.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    return matches;
  };

  const suggestEndWord = (value) => {
    const matches = dataEnd.filter((obj) => {
      const endLocation = obj.end_location;
      if (typeof endLocation === 'string') {
        return endLocation.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    return matches;
  };

  const handleStartSelect = (val) => {
    setStartValue(val);
    fetchData(val);
  };

  const handleEndSelect = (val) => {
    setEndValue(val);
  };

  const fetchData = (startLocation) => {
    axiosClient
      .get(`/route/end-location?start_location=${startLocation}`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setDataEnd(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
const showList=()=>{
  setShowdataStart(!showdataStart)
}
const showListEnd=()=>{
  setShowdataEnd(!showdataEnd)
}
  return (
    <>
      <div className="form-group control-location" onClick={showList}>
        <label htmlFor="departure">Điểm đi</label>
        <input
          type="text"
          className="form-control"
          name="start_location"
          placeholder='Chọn tỉnh thành'
          value={startValue}
          id='start_location'
          onChange={handleStartChange}
        />
      {showdataStart &&suggestStartWord(startValue).length > 0 && (
          <ul className="autocomplete-options">
            {suggestStartWord(startValue).map((option) => (
              <li className='location_booking'
                key={option.id}
                onClick={() => handleStartSelect(option.start_location)}
              >
                {option.start_location}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-group control-location" onClick={showListEnd}>
        <label htmlFor="destination">Điểm đến</label>
        <input
          type="text"
          className="form-control"
          name="end_location"
          id='end_location'
          value={endValue}
          placeholder='Chọn tỉnh thành'
          onChange={handleEndChange}
        />

     {showdataEnd &&suggestEndWord(endValue).length > 0 && (
          <ul className="autocomplete-options">
            {suggestEndWord(endValue).map((option) => (
              <li className='location_booking' key={option.id} onClick={() => handleEndSelect(option.end_location)}>
                {option.end_location}
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </>
  );
};

export default AutocompleteCity;
