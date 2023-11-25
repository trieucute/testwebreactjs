import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
    useEffect(() => {
        console.log('CommentListcomponent loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);
      const navigate = useNavigate()
      const handleAdd=(e)=>{
        e.preventDefault();
        navigate('/admin/jobs/addnew')
      }
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
                  <input type="text" placeholder='Tìm kiếm tin tuyển dụng' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
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
                    <tr>
                        <td>1</td>
                      <td>Lái xe trung chuyển khách VP Bảo Lộc</td>
                      <td>Hạn nộp hồ sơ 30/02/2024</td>
                     <td>Kinh nghiệm lái xe ít nhất 2 năm.</td>
                     <td>TP HCM</td>
                      <td>  10.000.000 đ  </td>
                      <td>11/10/2023</td>
                      <td></td>
                      <td >
                        <i class="fas fa-pen-to-square"></i>
                        <i class="fas fa-trash"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                      <td>Lái xe trung chuyển khách VP Bảo Lộc</td>
                      <td>Hạn nộp hồ sơ 30/02/2024</td>
                     <td>Kinh nghiệm lái xe ít nhất 2 năm.</td>
                     <td>TP HCM</td>
                      <td>  10.000.000 đ  </td>
                      <td>11/10/2023</td>
                      <td><i class="fas fa-check"></i></td>
                      <td >
                        <i class="fas fa-pen-to-square"></i>
                        <i class="fas fa-trash"></i>
                        </td>
                    </tr>
                 
                    </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
};

export default JobList;