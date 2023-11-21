import React from 'react';
import { useState } from 'react';

const AddNewStation = () => {
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
        <div className='addNew-container addNew-stations'>

          <>
             <h3 className='h3-admin mb-4 text-center'> Thêm bến xe</h3>
        <form onSubmit={handleSubmit}  className='addNew-contents'>
          <div className='row m-0 justify-content-between'> 
            <div className='form-group'>
            <label htmlFor="">Tên bến xe</label>
           <input type="text" className='form-control' />
            </div>
            <div className='form-group'>
            <label htmlFor="">Địa chỉ</label>
            <input type="text" className='form-control' />
            </div>
            <div className='form-group'>
            <label htmlFor="">Tình / Thành</label>
            <select name="" id=""     className='form-select'>
                <option value="">Hồ Chí Minh</option>
                <option value="">Đà Lạt</option>

            </select>
            </div>
        
     

            <div className=''>
      {divs.map((div, index) => (
        <div key={div.id} className='row m-0 justify-content-between stations'>
            <div  className='form-group p-0'>
          <label htmlFor={`diemDon${div.id}`}>Điểm đón / trả</label>
          <input type="text" className='form-control' />
          </div>
          <div  className='form-group p-0'>
          <label htmlFor={`diemTra${div.id}`}>Địa chỉ điểm đón / trả</label>
          <input type="text" className='form-control' />
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

export default AddNewStation;