import React from 'react';
import { useState } from 'react';

const AddNewTicket = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [dataTab1, setDataTab1] = useState({
        trip: '',
        name: '',
        phone_number:"",
        email:"",
        
    });
    const [dataTab2, setDataTab2] = useState({
        pickup: '',
        dropoff: '',
        seat:'',
        status:''
    });

    const handleTabChange = (tab) => {
        if (tab === 2 && (!dataTab1.trip || !dataTab1.name || !dataTab1.phone_number ||!dataTab1.email )) {
            alert('Vui lòng nhập đủ dữ liệu trong tab 1 trước khi chuyển tab!');
            return;
        }
        setCurrentTab(tab);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (currentTab === 1 && (!dataTab1.trip || !dataTab1.name || !dataTab1.phone_number ||!dataTab1.email )) ||
            (currentTab === 2 && (!dataTab2.pickup || !dataTab2.dropoff || !dataTab2.seat ||!dataTab2.status))
        ) {
            console.log(dataTab1);
            alert('Vui lòng nhập đủ dữ liệu trước khi thêm mới!');
            return;
        }
        // Xử lý logic khi submit dữ liệu
    };

    const handleInputChangeTab1 = (e) => {
        const { name, value } = e.target;
        setDataTab1({
            ...dataTab1,
            [name]: value
        });
    };

    const handleInputChangeTab2 = (e) => {
        const { name, value } = e.target;
        setDataTab2({
            ...dataTab2,
            [name]: value
        });
    };

    return (
        <div className='addNew-container'>
            <h3 className='h3-admin mb-4 text-center'> Thêm vé xe</h3>
            <div className='row m-0'>
                <div className='col text-center'>
                <div className={`tab tab1 ${currentTab === 1 ? 'active' : ''}`} onClick={() => handleTabChange(1)}>
                    <button>1</button>
                </div>
                </div>
                <div className='col text-center'>
                <div className={`tab tab2 ${currentTab === 2 ? 'active' : ''}`} onClick={() => handleTabChange(2)}>
                    <button>2</button>
                </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='addNew-contents'>
                
                    <div id='tabTicket1' style={{ display: currentTab === 1 ? 'block' : 'none' }}>
                    <div className='row m-0 justify-content-between'>
                        <div className='form-group'>
                            <label htmlFor="">Chuyến xe</label>
                    
                            <select
                                name="trip"
                                className='form-select'
                                value={dataTab1.trip}
                                onChange={handleInputChangeTab1}
                            >
                                    <option value="">Chọn tỉnh</option>
                                <option value="1">Bến xe Miền Tây (Hồ Chí Minh) - Bến xe Đà Nẵng (Đà Nẵng)</option>
                                <option value="2">Bến xe Đà Nẵng (Đà Nẵng) - Bến xe Miền Tây (Hồ Chí Minh)</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Tên Người đặt</label>
                            <input type="text" className='form-control'   value={dataTab1.name} name='name'
                                onChange={handleInputChangeTab1}/>
                            {/* <select
                                name="endLocation"
                                id="endLocation"
                                className='form-select'
                                value={dataTab1.endLocation}
                                onChange={handleInputChangeTab1}
                            >
                                <option value="0">Chọn tỉnh</option>
                                <option value="1">Bến xe Miền Tây (Tây Ninh)</option>
                                <option value="2">Bến xe Miền Đông (Hồ Chí Minh)</option>
                            </select> */}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Số điện thoại người đặt</label>
                            <input type="text" className='form-control'   value={dataTab1.phone_number} name='phone_number'
                                onChange={handleInputChangeTab1}/>
              
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Email người đặt</label>
                            <input type="email" className='form-control'   value={dataTab1.email} name='email'
                                onChange={handleInputChangeTab1}/>
              
                        </div>
                    </div>
                    </div>
                    <div id='tabTicket2' style={{ display: currentTab === 2 ? 'block' : 'none' }}>
                    <div className='row m-0 justify-content-between'>
                        <div className='form-group'>
                            <label htmlFor="">Chọn ghế</label>
                            <div>
                            <div className='items-FloorDown col-sm-4 '>
                                          <h5 className='text-center' style={{ fontSize: '1.1em'}}>Tầng Dưới</h5>
                                          <div className='row items-content-floor'>

                                                <div className={`items-content-floor-row items-content-floor-double `}
                                                    // key={seat.id}
                                                    // onClick={() => handleSeatClick(seat)}
                                                    >
                                                  <div className='d-flex justify-content-center m-auto py-1' >
                                                    <div className='position-relative'>
                                                      <svg width={43} height={33} viewBox="0 0 43 33" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                        //  className={selectedSeats.includes(seat.position) ? 'selected-path' : ''}
                                                          d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                                         
                                                          fillOpacity="0.8"
                                                        />
                                                      </svg>
                                                      <span    className={`name-chair position-absolute`} style={{ fontSize: "0.6em", top: "3px" }}>A01</span>
                                                    </div>
                                                  </div>
                                                </div>
                                               
                                            
                                         </div>
                                   
                                            </div>
                            </div>
                            
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Tài xế</label>
                            <select
                                name="driver"
                                id="driver"
                                className='form-select'
                                value={dataTab2.driver}
                                onChange={handleInputChangeTab2}
                            >
                                <option value="">Nguyễn Văn A</option>
                                <option value="">Nguyễn Văn B</option>
                            </select>
                        </div>
                    </div>
                </div>
                {currentTab===1 &&  <div className='row m-0'>
                <div className='col text-end'> <button type="button"  className='btn-add'  onClick={() => handleTabChange(2)}>Tiếp tục</button></div>
                </div>
                  }
                {currentTab===2 &&  <div className='row m-0'>
                    <div className='col text-start'>
                        <button type="button"  className='btn-add '  onClick={() => handleTabChange(1)}>Quay lại</button>
                        </div>
                        <div className='col text-end'>
                    <button type="button"  className='btn-add '   >Thêm mới </button>
                            
                        </div>
                </div>  }

              

            </form>
        </div>
    );
};

export default AddNewTicket;