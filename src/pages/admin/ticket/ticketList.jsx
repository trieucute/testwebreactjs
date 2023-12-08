import React from 'react';
import { useNavigate } from 'react-router-dom';
import car from '../../../assets/images/bus1.jpg'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchticketAdmin } from '../../../reduxTool/ticketSlice';
import axiosAdmin from '../axois-admin';
import ReactPaginate from 'react-paginate';
import LoadingAd from '../../loadingAdmin';
import { formatDateNews } from '../../../config';

const TicketList = () => {
    const navigate = useNavigate();
    const handleAdd=()=>{
    navigate('/admin/tickets/addnew')
    }
    const [loadingAction, setLoadingAction] = useState(false)
    useEffect(() => {
        console.log('CommentListcomponent loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);

      const dispatch = useDispatch();
      const ticket = useSelector (state => state.ticketAdmin)

      const itemList =ticket?.data.data
      const loading= ticket?.loading
  
      useEffect(()=>{
      dispatch(fetchticketAdmin())
      },[])
          console.log(itemList);

       // xóa

        const handleDelete = async (id) => {
          // setLoading(true)
          const confirmDeletion = window.confirm("Bạn có chắc muốn tin tuyển dụng này?");
          if (confirmDeletion) {
            const res = await axiosAdmin.delete(`/ticket/${id}`)
            if(res.data){
              // setLoading(false)
            }
          }
       
        }
      // tìm kiếm

      const [searchTerm, setSearchTerm] = useState('');
      const currentticket = searchTerm
        ? itemList?.filter((list) =>
          list.code.toLowerCase().includes(searchTerm.toLowerCase()) ||   list.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : itemList;
    
      const [perPage] = useState(5); // Số lượng xe hiển thị mỗi trang
      const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
    
      const offset = pageNumber * perPage;
      const pageCount = Math.ceil(currentticket?.length / perPage);
      const paginatedTicket = currentticket?.slice(offset, offset + perPage);
    
      const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
      };
    
      const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
      };

const [dataDetail, setDataDetail] = useState('')
    const handleDetailTicket =(id)=>{
      setLoadingAction(true)
      axiosAdmin.get(`/ticket/${id}`)
      
      .then(res=>{
          console.log(res);
        
          setDataDetail(res.data.data)
          setLoadingAction(false)
      })
      .catch(err=>{
        console.error(err)
        setLoadingAction(false)
      })
    }
    // console.log(dataDetail, 'detail');
    return (
        <div>
            
              {loading ? <LoadingAd/> : (
                <>
                <div className='ticketAdmin-container'>
                <h3 className='h3-admin'>Quản lý vé xe</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              {/* <button className='btn-add' onClick={handleAdd}> <i class="fas fa-bus"></i> Thêm vé xe</button> */}
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm vé theo tên người đặt hoặc mã vé' className='form-control w-75' style={{marginLeft:"auto"}}   value={searchTerm}
      onChange={handleSearch}/><button><i class="fas fa-magnifying-glass"></i></button>
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
                  {/* <th></th> */}
                </tr>
                </thead>
                <tbody>
                {paginatedTicket  && paginatedTicket.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + offset + 1}</td>
                        <td>{item.code}</td>
                          <td>{item.user.name}</td>
                          <td>{item.user.phone_number}</td>
                          <td>{item.start_station.province} - {item.start_station.name}</td>
                          <td>{item.end_station.province} - {item.end_station.name }</td>
                        <td>{item.seat.position} ({item.car.name}) </td>
                        <td>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                        <td>{item.status ==='booked' && 'Đã thanh toán'}
                        {item.status ==='pending' && 'Đang thanh toán'}
                        {item.status ==='canceled' && 'Đã huỷ'}
                        </td>
                  
                        <td>
                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleDetailTicket(item.id)}>Xem chi tiết</button>
                        </td>
                          {/* <td >
                            
                            <i class="fas fa-pen-to-square"></i>
                            <i class="fas fa-trash"></i>
                            </td> */}
                            </tr>

                        ))}
            
           
                </tbody>
              </table>
          </div>
          <div className="pagination-contents">
            {pageCount > 1 && (<ReactPaginate
              previousLabel={<i className="fas fa-caret-left"></i>}
              nextLabel={<i className="fas fa-caret-right"></i>}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
            )}
          </div>

        </div>
        
{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:"750px"}}>
    <div class="modal-content">
    {loadingAction? <LoadingAd/> : (
      <>
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Chi tiết vé </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modal-tickets">
        <div className='row m-0'>
          <div className='col-3'>
            <img src={dataDetail && dataDetail.car.img} alt="" className='img-fluid' />
          </div>
          <div className='col'>
          <div className='row m-0'>
              <div className='col text-start'>Xe:</div>
              <div className='col text-end'>  {dataDetail && dataDetail?.car.name}</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Biển số:</div>
              <div className='col text-end'> {dataDetail && dataDetail?.car.license_plate}</div>
            </div>
            <div className='row m-0'>
              <div className='col text-start'>Loại xe:</div>
              <div className='col text-end'>{dataDetail && dataDetail?.car.type}</div>
            </div>
          </div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Người đặt:</div>
            <div className='col text-end'>{dataDetail && dataDetail?.user.name}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Số điện thoại người đặt:</div>
            <div className='col text-end'>{dataDetail && dataDetail?.user.phone_numbere}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Email</div>
            <div className='col text-end'>{dataDetail && dataDetail?.user.email}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Điểm đón:</div>
            <div className='col text-end'>{dataDetail && dataDetail?.pickup_point}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Điểm trả:</div>
            <div className='col text-end'>{dataDetail && dataDetail?.dropoff_point}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Ghế đã đặt: </div>
            <div className='col text-end'>{dataDetail && dataDetail?.seat.position}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Tổng tiền: </div>
            <div className='col text-end'>{dataDetail && dataDetail?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Phương thức thanh toán: </div>
            <div className='col text-end'>{dataDetail && dataDetail?.payment_method}</div>
        </div>
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Trạng thái: </div>
            <div className='col text-end'>{dataDetail && dataDetail?.status ==='booked' && 'Đã thanh toán'}
                        {dataDetail && dataDetail?.status ==='pending' && 'Đang thanh toán'}
                        {dataDetail && dataDetail?.status ==='canceled' && 'Đã huỷ'}
            
            </div>
        </div>
     
        <div className='row mx-0 my-2'>
            <div className='col text-start'>Ngày đặt:</div>
            <div className='col text-end'>{dataDetail &&  formatDateNews(dataDetail?.created_at)}</div>
        </div>
      </div>
      </>
    )}
    
   
    </div>
  </div>
</div>
                </>

              )}

        </div>
    );
};

export default TicketList;