import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosAdmin from '../axois-admin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchjob } from '../../../reduxTool/jobSlide';
import ReactPaginate from 'react-paginate';

// const JobList = () => {
//     useEffect(() => {
//         console.log('CommentListcomponent loaded');
//         // Kiểm tra điều kiện chuyển hướng ở đây
//       }, []);
//       const navigate = useNavigate()
//       const handleAdd=(e)=>{
//         e.preventDefault();
//         navigate('/admin/jobs/addnew')
//       }
//     return (
//         <div>
//             <div className='jobsAdmin-container'>
//               <h3 className='h3-admin'>Quản lý tuyển dụng</h3>
//               <div className='row mx-0 my-2'>
//                 <div className='col ps-0 '>
//                   <button type='button' className='btn-add' onClick={handleAdd}><i class="fas fa-newspaper"></i> Thêm tin tuyển dụng</button>
//                 </div>
//               <div className='search col text-end'>
//                 <form action="">
//                   <input type="text" placeholder='Tìm kiếm tin tuyển dụng' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
//                 </form>
//               </div>
//               </div>
            
//               <div className='table-dataCommentList mt-4'>
//                   <table className='table'>
//                     <thead>
//                     <tr>
//                         <th></th>
//                       <th>Vị trí tuyển dụng</th>
//                       <th>Mô tả</th>
//                       <th>Yêu cầu</th>
//                       <th>Địa điểm</th>
//                       <th>Lương</th>
//                       <th>Ngày đăng</th>
//                     <th>Hiện</th>
//                       <th></th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>1</td>
//                       <td>Lái xe trung chuyển khách VP Bảo Lộc</td>
//                       <td>Hạn nộp hồ sơ 30/02/2024</td>
//                      <td>Kinh nghiệm lái xe ít nhất 2 năm.</td>
//                      <td>TP HCM</td>
//                       <td>  10.000.000 đ  </td>
//                       <td>11/10/2023</td>
//                       <td></td>
//                       <td >
//                         <i class="fas fa-pen-to-square"></i>
//                         <i class="fas fa-trash"></i>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>2</td>
//                       <td>Lái xe trung chuyển khách VP Bảo Lộc</td>
//                       <td>Hạn nộp hồ sơ 30/02/2024</td>
//                      <td>Kinh nghiệm lái xe ít nhất 2 năm.</td>
//                      <td>TP HCM</td>
//                       <td>  10.000.000 đ  </td>
//                       <td>11/10/2023</td>
//                       <td><i class="fas fa-check"></i></td>
//                       <td >
//                         <i class="fas fa-pen-to-square"></i>
//                         <i class="fas fa-trash"></i>
//                         </td>
//                     </tr>
                 
//                     </tbody>
//                   </table>
//               </div>
//             </div>
//         </div>
//     );
// };

// export default JobList;

const JobList = () => {
  const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log('CommentListcomponent loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);
      const navigate = useNavigate()
      const handleAdd=(e)=>{
        e.preventDefault();
        navigate('/admin/jobs/addnew')
        
      }
      const dispatch = useDispatch();
      const {job, isLoading} = useSelector (state => state.job)
      const itemList = job
      console.log(job);
      useEffect(()=>{
      dispatch(fetchjob())
      },[loading])
      
    // ngay dang

    function formatDateJob(inputDate) {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
      const year = date.getFullYear();
  
      const formattedDay = day < 10 ? '0' + day : day;
      const formattedMonth = month < 10 ? '0' + month : month;
  
      return `${formattedDay}/${formattedMonth}/${year}`;
    }

      const currentItems = job

       // xóa

        const handleDelete = async (id) => {
          setLoading(true)
          const confirmDeletion = window.confirm("Bạn có chắc muốn tin tuyển dụng này?");
          if (confirmDeletion) {
            const res = await axiosAdmin.delete(`/job/${id}`)
            if(res.data){
              setLoading(false)
            }
          }
       
        }
      // tìm kiếm

      const [searchTerm, setSearchTerm] = useState('');
      const currentJob = searchTerm
        ? itemList?.filter((list) =>
          list.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : itemList;
    
      const [perPage] = useState(5); // Số lượng xe hiển thị mỗi trang
      const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
    
      const offset = pageNumber * perPage;
      const pageCount = Math.ceil(currentJob?.length / perPage);
      const paginatedNews = currentJob?.slice(offset, offset + perPage);
    
      const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
      };
    
      const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
      };


    return (
        <div>
            <div className='jobsAdmin-container'>
              <h3 className='h3-admin'>Quản lý tuyển dụng</h3>
              <div className='row mx-0 my-2'>
                <div className='col ps-0 '>
                  <button type='button' className='btn-add' onClick={handleAdd}><i class="fas fa-newspaper"></i> Thêm tin tuyển dụng</button>
                </div>
              <div className='search col text-end'>
                <form action="">
                  <input type="text" onChange={handleSearch} placeholder='Tìm kiếm tin tuyển dụng' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
                </form>
              </div>
              </div>
            
              <div className='table-dataCommentList mt-4'>
                  <table className='table'>
                    <thead>
                    <tr>
                        <th></th>
                      <th>Vị trí tuyển dụng</th>
                      <th>Mô tả</th>
                      <th>Yêu cầu</th>
                      <th>Địa điểm</th>
                      <th>Lương</th>
                      <th>Ngày đăng</th>
                    <th>Hiện</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedNews && paginatedNews.map((item, index) => (
                    <tr>
                        <td>{index + offset + 1}</td>
                        {/* <td>{item.id}</td> */}
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                     <td>{item.requirements}</td>
                     <td>{item.location}</td>
                      <td>{item.salary.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                      <td>{formatDateJob(item.created_at)}</td>
                      <td className='text-center'>{item.status=== 1 ? (<i class="fas fa-check"></i>) : ''}</td>
                      <td >
                        <Link to={`/admin/jobs/update/${item.id}`} ><i class="fas fa-pen-to-square"></i></Link>
                        <i onClick={() => handleDelete(item.id)} class="fas fa-trash"></i>
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
        </div>
    );
};

export default JobList;