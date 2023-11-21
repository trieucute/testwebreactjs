import React from 'react';
import { useNavigate } from 'react-router-dom';
import car from '../../../assets/images/bus1.jpg'

const TicketList = () => {
    const navigate = useNavigate();
    const handleAdd=()=>{
    navigate('/admin/tickets/addnew')
    }
    return (
        <div>
            <div className='ticketAdmin-container'>
          <h3 className='h3-admin'>Quản lý vé xe</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              {/* <button className='btn-add' onClick={handleAdd}> <i class="fas fa-bus"></i> Thêm vé xe</button> */}
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm vé theo tên người đặt' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
          </div>
        
          <div className='table-dataUser mt-4'>
              <table className='table'>
                <thead>
                <tr>
                  <th></th>
                  <th>Mã vé</th>
                  <th>Tên người đặt</th>    
                    <th>Số điện thoại</th>
                    <th>Từ</th>
                    <th>Đến</th>
                    <th>Ghế đã đặt</th>
                    <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>1</td>
                <td>Q8sM3umqTi</td>
                  <td>Trần Bích Triệu</td>
                  <td>0369540497</td>
                  <td>Đà Nẵng - Bến xe Đà Nẵng </td>
                  <td>Hồ Chí Minh - Bến xe Miền Tây </td>
                <td>Ghế A01 - tầng 1</td>
                <td>500.000 đ</td>
                <td>Đã thanh toán</td>
                  {/* <td>Limousine phương trang <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button></td>
                  <td>Nguyễn Văn A</td> */}
                <td>
                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button>
                </td>
                  <td >
                    
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
                <tr>
                <td>2</td>
                <td>gCfs4V2vZ9</td>
                  <td>Trần Bích Trâm</td>
                  <td>0369540497</td>
                  <td>Đà Nẵng - Bến xe Đà Nẵng </td>
                  <td>Hồ Chí Minh - Bến xe Miền Tây </td>
                <td>Ghế B01 - tầng 2</td>
                <td>700.000 đ</td>
                <td>Đang thanh toán</td>
                  {/* <td>Limousine phương trang <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button></td>
                  <td>Nguyễn Văn A</td> */}
                <td>
                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button>
                </td>
                  <td >
                    
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr>
                <tr>
                <td>3</td>
                <td>gCfs4V2vZ9</td>
                  <td>Nguyễn Trần</td>
                  <td>0369540497</td>
                  <td>Đà Nẵng - Bến xe Đà Nẵng </td>
                  <td>Hồ Chí Minh - Bến xe Miền Tây </td>
                <td>Ghế B05 - tầng 2</td>
                <td>700.000 đ</td>
                <td>Đã huỷ</td>
                  {/* <td>Limousine phương trang <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button></td>
                  <td>Nguyễn Văn A</td> */}
                <td>
                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button>
                </td>
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
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:"750px"}}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Chi tiết vé </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modal-tickets">
        <div className='row m-0'>
          <div className='col-3'>
            <img src={car} alt="" className='img-fluid' />
          </div>
          <div className='col'>
          <div className='row m-0'>
              <div className='col text-start'>Xe:</div>
              <div className='col text-end'>  Xe Limousine phương trang</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Biển số:</div>
              <div className='col text-end'>29A-12345</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Loại xe:</div>
              <div className='col text-end'>Giường nằm</div>
            </div>
          </div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Người đặt:</div>
            <div className='col text-end'>Trần Bích Triệu</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Số điện thoại người đặt:</div>
            <div className='col text-end'>0369540497</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Email</div>
            <div className='col text-end'>trieutran989@gmail.com</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Điểm đón:</div>
            <div className='col text-end'>Văn Phòng Đà Nẵng ( 75 Thanh Tịnh, Phường Hòa Minh, Liên Chiểu, Đà Nẵng )</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Điểm trả:</div>
            <div className='col text-end'>Cổng phụ ( 292 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh, Hồ Chí Minh )</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Ghế đã đặt: </div>
            <div className='col text-end'>A01</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Tổng tiền: </div>
            <div className='col text-end'>500.000 đ</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Phương thức thanh toán: </div>
            <div className='col text-end'>Thanh toán online</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Trạng thái: </div>
            <div className='col text-end'>Đã thanh toán</div>
        </div>
     
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Ngày đặt:</div>
            <div className='col text-end'>20/11/2023  10:03:00</div>
        </div>
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

export default TicketList;