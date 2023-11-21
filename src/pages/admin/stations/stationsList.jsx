import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StationsList = () => {
    const navigate = useNavigate();
    const handleAdd=()=>{
    navigate('/admin/stations/addnew')
    }
    const [divsForm, setDivsForm] = useState([{ id: 0 }]); // Mảng chứa các div, mỗi div có một id để xác định

    // Hàm thêm một div mới
    const handleAddDiv = () => {
        const newDivId = divsForm.length; // Tạo id mới cho div
        const newDivs = [...divsForm, { id: newDivId }]; // Thêm div mới vào mảng divs
        setDivsForm(newDivs);
      };
  
    // Hàm xóa một div dựa trên id
    const handleRemoveDiv = (id) => {
    //   if (id === 0) {
    //     // Nếu id là 0 (div đầu tiên), không thực hiện việc xóa
    //     return;
    //   }
  
      const updatedDivs = divsForm.filter((div) => div.id !== id); // Loại bỏ div có id tương ứng
      setDivsForm(updatedDivs);
    };
    const [showForm, setShowForm] = useState(false);

// Hàm để hiển thị form khi nhấn nút "Thêm điểm đón / trả"
const handleShowForm = () => {
  setShowForm(!showForm); // Đảo ngược giá trị của showForm khi nhấn nút
};
    return (
        <div>
        <div className='tripAdmin-container'>
          <h3 className='h3-admin'>Quản lý bến xe</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              <button className='btn-add' onClick={handleAdd}> <i class="fas fa-bus"></i> Thêm bến xe</button>
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm bến xe' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
          </div>
        
          <div className='table-dataUser mt-4'>
              <table className='table'>
                <thead>
                <tr>
                  <th></th>
                  <th>Tên bến xe</th>
                  <th>Địa chỉ</th>    
                <th>Tình / Thành</th>
                <th>Các điểm đón / trả</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>1</td>
                  <td> Bến xe Đà Nẵng </td>
                  <td>Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng </td>
                  <td> Đà Nẵng </td>
                  <td> <button  className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal">Điểm đón / trả</button></td>
             
                  <td >
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
                <tr>
                <td>2</td>
                  <td> Bến xe Miền Tây</td>
                  <td>395 Kinh Dương Vương, An Lạc, Bình Tân, Thành phố Hồ Chí Minh 700000 </td>
                  <td>Hồ Chí Minh</td>
                  <td> <button  className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal">Điểm đón / trả</button></td>
             
                  <td >
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
               
                
                </tbody>
              </table>
          </div>
        </div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:"650px"}}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Điểm đón / trả của Bến xe Đà Nẵng </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table className='table'>
            <thead>
                <tr>
                    <th></th>
                <th>Điểm</th>
                <th>Địa chỉ</th>
                <th></th>
                </tr>
                
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>
                        Cổng chính
                    </td>
                    <td>
                    201 Tôn Đức Thắng, Phường Hòa Minh, Liên Chiểu, Đà Nẵng
                    </td>
                    <td>
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        Cổng phụ
                    </td>
                    <td>
                    201 Tôn Đức Thắng, Phường Hòa Minh, Liên Chiểu, Đà Nẵng
                    </td>
                    <td>
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div ><button  className='btn btn-primary' onClick={handleShowForm}>Thêm điểm đón / trả</button></div>
        {/* // Thay đổi biến divs thành divsForm */}
   {showForm &&  <div>
    <form className='row m-0 justify-content-between stations'>
            <div  className='form-group p-0 my-3'>
          <label htmlFor=''>Điểm đón / trả</label>
          <input type="text" className='form-control' />
          </div>
          <div  className='form-group p-0 mb-3'>
          <label htmlFor=''>Địa chỉ</label>
          <input type="text" className='form-control' />
          </div>

           <button type='submit' className='btn-add'>Thêm</button>
          
     

        </form>
</div>
}    
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

    </div>
    );
};

export default StationsList;