import React from 'react';
import { useState } from 'react';

const AddNewTrip = () => {
    const handleSubmit=()=>{

    }
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
    return (
        <div className='addNew-container'>

          <>
             <h3 className='h3-admin mb-4 text-center'> Thêm chuyến xe</h3>
        <form onSubmit={handleSubmit}  className='addNew-contents'>
          <div className='row m-0 justify-content-between'> 
            <div className='form-group'>
            <label htmlFor="">Nơi bắt đầu</label>
            <select name="" id=""     className='form-select'>
                <option value="">Bến xe Miền Tây (Hồ Chí Minh)</option>
                <option value="">Bến xe Miền Đông (Hồ Chí Minh)</option>

            </select>
            </div>
            <div className='form-group'>
            <label htmlFor="">Nơi đến</label>
            <select name="" id=""     className='form-select'>
                <option value="">Bến xe Miền Tây (Tây Ninh)</option>
                <option value="">Bến xe Miền Đông (Hồ Chí Minh)</option>

            </select>
            </div>
            <div className='form-group'>
            <label htmlFor="">Xe</label>
            <select name="" id=""     className='form-select'>
                <option value="">limousine phương trang</option>
                <option value="">Ghế vip</option>

            </select>
            </div>
            <div className='form-group'>
            <label htmlFor="">Tài xế</label>
            <select name="" id=""     className='form-select'>
                <option value="">Nguyễn Văn A</option>
                <option value="">Nguyễn Văn B</option>

            </select>
            </div>
            <div className='form-group'>
              <label htmlFor="">Thời gian khởi hành</label>
            <input type="date" name="summary" id='summary'  className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor="">Trạng thái</label>
              <div className='form-control'>
              <input type="radio" name='active' id='active1' value={1} placeholder='active'/><label htmlFor="active1 m-0"  style={{fontSize:"16px"}} >Chờ khởi hành</label>
              <input type="radio" name='active' id='active0' value={0} placeholder='active'     /> <label htmlFor="active0 m-0"  style={{fontSize:"16px"}} >Đang khởi hành</label>
              <input type="radio" name='active' id='active0' value={0} placeholder='active'     /> <label htmlFor="active0 m-0"  style={{fontSize:"16px"}} >Đã đến</label>

              </div>
              
            </div>
     

            <div className=''>
      {divs.map((div, index) => (
        <div key={div.id} className='row m-0 justify-content-between stations'>
            <div  className='form-group ps-0'>
          <label htmlFor={`diemDon${div.id}`}>Điểm đón</label>
          <select id={`diemDon${div.id}`} className='form-select'>
            <option value="">Bến xe Miền Tây (Hồ Chí Minh)</option>
            <option value="">Bến xe Miền Đông (Hồ Chí Minh)</option>
          </select>
          </div>
          <div  className='form-group pe-0'>
          <label htmlFor={`diemTra${div.id}`}>Điểm trả</label>
          <select id={`diemTra${div.id}`} className='form-select'>
            <option value="">Bến xe Miền Tây (Hồ Chí Minh)</option>
            <option value="">Bến xe Miền Đông (Hồ Chí Minh)</option>
          </select>
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
        </form>
          </>
   
     
        {/* <div>{content}</div> */}
      </div>
    );
};

export default AddNewTrip;