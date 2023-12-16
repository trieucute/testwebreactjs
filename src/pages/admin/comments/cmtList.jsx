import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


import user from '../../../assets/images/avatarnv1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentAdmin, putStatusCmt } from '../../../reduxTool/commentSlice';
import axiosAdmin from '../axois-admin';
import LoadingAd from '../../loadingAdmin';

const CommentList = () => {

  useEffect(() => {
    console.log('CommentListcomponent loaded');
    // Kiểm tra điều kiện chuyển hướng ở đây
  }, []);
  const navigate = useNavigate()
  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/admin/comments/addnew')
  }

  const dispatch = useDispatch()
  const {data} = useSelector (state => state.comment)
  const [loading, setLoading]=useState(false)

  const itemList = data?.data
  console.log(data);
  useEffect (()=>{

    setLoading(true)
    dispatch(fetchCommentAdmin())
    .then(res=>{
      setLoading(false)
    })
  },[])

// ngày đăng 
function formatDateCmt(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

  const currentItems = data

  //tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
      const currentCmt = searchTerm
        ? itemList?.filter((list) =>
          list.user.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : itemList;
    
      const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
      const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
    
      const offset = pageNumber * perPage;
      const pageCount = Math.ceil(currentCmt?.length / perPage);
      const paginatedCmt = currentCmt?.slice(offset, offset + perPage);
    
      const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
      };
    
      const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
      };

      const handleputStatus=(id,value)=>{
        const status= parseInt(value)
        console.log(status);
        const put={
          status:status
        }
        // dispatch(putStatusCmt(id,put))
        // console.log(putStatusCmt(id,status));
        axiosAdmin.put(`/comment/${id}`, put,{
          headers: {
           'Content-Type': 'application/json',
          }
        })
        .then(res=>{
          console.log(res);
          dispatch(fetchCommentAdmin())
        })
        .catch(err=>{
          console.log(err);
        })
      }
      const handleDetele =(id)=>{
        const confirmDeletion = window.confirm("Bạn có chắc muốn bình luận này?");
        if (confirmDeletion) {
        axiosAdmin.delete(`/comment/${id}`)
        .then(res=>{
          setLoading(false)
          dispatch(fetchCommentAdmin())
        })
       
        }
      }
  return (
    <div>
      {loading ? <LoadingAd/> : (
        <div className='commentAdmin-container'>
        <h3 className='h3-admin'>Quản lý bình luận</h3>
        <div className='row mx-0 my-2'>
          <div className='col ps-0 '>
            {/* <button type='button' className='btn-add' onClick={handleAdd}><i class="fas fa-newspaper"></i> Thêm bình luận</button> */}
          </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" onChange={handleSearch} placeholder='Tìm kiếm bình luận' className='form-control w-75' style={{ marginLeft: "auto" }} /><button><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
        </div>

        <div className='table-dataCommentList mt-4'>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Tên người dùng</th>
                <th>Xe</th>
                <th>Nội dung</th>
                <th>Đánh giá</th>
                <th>Ngày bình luận</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {paginatedCmt && paginatedCmt.map((item, index) => (
                <tr key={item.id}>
                <td>{index + offset + 1}</td>
                <td>{item.user}</td>
                <td>{item.car.name}</td>
                <td className='td-content-cmt'>
                  <div className='content-cmt'>
                    {item.content}
                  </div>
                  </td>
                  <td>
                  {Array(item.rate).fill().map((_, i) => (
                                <i key={i} class="fas fa-star" style={{color:"yellow"}}></i>
                              ))}
                              {Array(5 - item.rate).fill().map((_, i) => (
                                <i key={i + item.rate} class="far fa-star" style={{color:"grey"}}></i>
                              ))}
                  </td>
                <td>{formatDateCmt(item.created_at)}</td>
                <td>
                {item.status===0 &&   <button className='btn btn-primary loading_cmt' onClick={()=>handleputStatus(item.id,'1')}>
                    <div class="spinner-border text-light" role="status" style={{marginRight:"5px"}}>
                      <span class="visually-hidden">Loading...</span>

                    </div>
                    <span>Chờ duyệt
                    
                    </span>
                  </button>} 
                 
                  {item.status===1 &&    <button className='btn btn-success loading_cmt' onClick={()=>handleputStatus(item.id,'0')}>
                  <span style={{marginRight:"5px"}}><i class="fas fa-check"></i></span>
                    <span >Đã duyệt</span>
                  </button>} 
                </td>
                <td >
                  {/* <i class="fas fa-pen-to-square"></i> */}
                  <i class="fas fa-trash" onClick={()=>handleDetele(item.id)}></i>
                </td>
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
      )}
      
    </div>
  );
};

export default CommentList;