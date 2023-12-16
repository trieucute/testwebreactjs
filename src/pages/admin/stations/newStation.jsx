import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddStation, deleteStation } from '../../../reduxTool/stationSlice';
import Notification from '../../NotificationTrip';
export    const provincesVietnam = [
      "Hà Nội",
      "Hồ Chí Minh",
      "Đà Nẵng",
      "Hải Phòng",
      "Cần Thơ",
      "Quảng Ninh",
      "Lào Cai",
      "Lai Châu",
      "Sơn La",
      "Hòa Bình",
      "Lai Châu",
      "Điện Biên",
      "Bắc Ninh",
      "Phú Thọ",
      "Vĩnh Phúc",
      "Bắc Giang",
      "Quảng Ninh",
      "Thái Bình",
      "Hải Dương",
      "Hà Nam",
      "Nam Định",
      "Ninh Bình",
      "Thanh Hóa",
      "Nghệ An",
      "Hà Tĩnh",
      "Quảng Bình",
      "Quảng Trị",
      "Thừa Thiên Huế",
      "Quảng Nam",
      "Quảng Ngãi",
      "Bình Định",
      "Phú Yên",
      "Khánh Hòa",
      "Ninh Thuận",
      "Bình Thuận",
      "Kon Tum",
      "Gia Lai",
      "Đắk Lắk",
      "Đắk Nông",
      "Lâm Đồng",
      "Bình Phước",
      "Tây Ninh",
      "Bình Dương",
      "Đồng Nai",
      "Bà Rịa - Vũng Tàu",
      "Long An",
      "Tiền Giang",
      "Bến Tre",
      "Trà Vinh",
      "Vĩnh Long",
      "Đồng Tháp",
      "An Giang",
      "Kiên Giang",
      "Cần Thơ",
      "Hậu Giang",
      "Sóc Trăng",
      "Bạc Liêu",
      "Cà Mau"
    ];
const AddNewStation = () => {

    const [divs, setDivs] = useState([{ id: 0 }]); // Mảng chứa các div, mỗi div có một id để xác định

    // Hàm thêm một div mới
    const handleAddDiv = () => {
      const newDivId = divs.length; // Tạo id mới cho div
      const newDivs = [...divs, { id: newDivId }]; // Thêm div mới vào mảng divs
      setDivs(newDivs);
    };
  
    // Hàm xóa một div dựa trên id
    const handleRemoveDiv = (id) => {
      if (id === 0) {
        // Nếu id là 0 (div đầu tiên), không thực hiện việc xóa
        return;
      }
  
      const updatedDivs = divs.filter((div) => div.id !== id); // Loại bỏ div có id tương ứng
      setDivs(updatedDivs);
    };

    const [message, setMessage]=useState(null)
    const dispatch= useDispatch()
    const station = useSelector(state=>state.stationAdmin)
    const [selectedProvince, setSelectedProvince] = useState('');
    const [address, setAddress]= useState('')
    const [name, setName]= useState('')
    const handleProvinceChange = (e) => {
      setSelectedProvince(e.target.value);
    };
    


    const setDivValue = (index, key, value, id) => {
      const updatedDivs = divs.map((div, i) => {
        if (i === index) {
          let updatedValue = value;
          // let updatedId = id; // Lưu ID vào một trường khác, ví dụ: pickupId và dropoffId
          // ... (các điều kiện và xử lý khác nếu cần)
          return { ...div, [key]: updatedValue}; // Lưu ID tương ứng
        }
        return div;
      });
      setDivs(updatedDivs);
    };
    const [showNotifi, setShowNotifi] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleSubmit=(e)=>{
      e.preventDefault();
   
      const pointData = divs.map((div) => ({
        name: div.namePoint, // Sử dụng thuộc tính pickupTime của mỗi phần tử
        address: div.addressPoint, // Sử dụng thuộc tính pickupValue của mỗi phần tử
      }));
      const isValidPointData = pointData.every(point => point.name !== undefined && point.address !== undefined );
      if(name===''  || selectedProvince==='' || address==='' ||  !isValidPointData){
        setNotificationMessage('Vui lòng nhập đầy đủ thông tin!');
        setShowNotifi(true);
    
        // Hide the notification after 3 seconds
        setTimeout(() => {
          setShowNotifi(false);
        }, 3000);
        return
      }



      const post={
        name:name,
        address:address,
        province:selectedProvince,
        points:pointData
      }
      console.log(post);
      dispatch(AddStation(post))
      .then(res=>{
        setMessage('Thêm mới thành công')
      })
      
    }

    return (
        <div className='addNew-container addNew-stations'>

          <>
          {showNotifi &&  <Notification message={notificationMessage} />}
             <h3 className='h3-admin mb-4 text-center'> Thêm bến xe</h3>
        <form onSubmit={handleSubmit}  className='addNew-contents'>
          <div className='row m-0 justify-content-between'> 
            <div className='form-group'>
            <label htmlFor="">Tên bến xe</label>
           <input type="text" className='form-control' name='name '  value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div className='form-group'>
            <label htmlFor="">Địa chỉ</label>
            <input type="text" className='form-control' name='address' value={address} onChange={e=>setAddress(e.target.value)}/>
            </div>
            <div className='form-group'>
            <label htmlFor="">Tình / Thành</label>
            <select
                  id="provinceSelect"
                  value={selectedProvince} className='form-select'
                  onChange={handleProvinceChange}
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provincesVietnam.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
            </div>
        
     

            <div className=''>
      {divs.map((div, index) => (
        <div key={div.id} className='row m-0 justify-content-between stations'>
            <div  className='form-group p-0'>
          <label htmlFor={`diemDon${div.id}`}>Tên điểm đón / trả</label>
          <input type="text" className='form-control' name='namePoint'         onChange={(e) => setDivValue(index, 'namePoint', e.target.value )} />
          </div>
          <div  className='form-group p-0'>
          <label htmlFor={`diemTra${div.id}`}>Địa chỉ điểm đón / trả</label>
          <input type="text" className='form-control' name='addressPoint'   onChange={(e) => setDivValue(index, 'addressPoint', e.target.value )} />
          </div>
            {/* Nút xóa chỉ hiển thị cho các div không phải div đầu tiên */}
            {div.id !== 0 && (
            <button type='button' className='but-closeX' onClick={() => handleRemoveDiv(div.id)}>
            <i class="fas fa-x"></i>
            </button>
          )}
     

        </div>
      ))}
      <div className='but-addStation'><button type='button'  onClick={handleAddDiv}>Thêm điểm đón / trả</button></div>
    </div>
  
         
         <div className='form-group mt-3'><button className='btn-add' type="submit">Thêm mới</button></div>
         </div>
         {message && <>
                                <div className="form-group"  style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>
                                    {message}
                                </div>
                            </>}
        </form>
          </>
   
     
        {/* <div>{content}</div> */}
      </div>
    );
};

export default AddNewStation;