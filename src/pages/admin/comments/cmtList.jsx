import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import user from '../../../assets/images/avatarnv1.jpg'
const CommentList= () => {
    useEffect(() => {
        console.log('CommentListcomponent loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);
      const navigate = useNavigate()
      const handleAdd=(e)=>{
        e.preventDefault();
        navigate('/admin/comments/addnew')
      }
    return (
        <div>
            <div className='commentAdmin-container'>
              <h3 className='h3-admin'>Quản lý bình luận</h3>
              <div className='row mx-0 my-2'>
                <div className='col ps-0 '>
                  <button type='button' className='btn-add' onClick={handleAdd}><i class="fas fa-newspaper"></i> Thêm bình luận</button>
                </div>
              <div className='search col text-end'>
                <form action="">
                  <input type="text" placeholder='Tìm kiếm bình luận' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
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
                    <tr>
                        <td>1</td>
                      <td> Triệu Trần</td>
                      <td>Limousine phương trang</td>
                      <td className='td-content-cmt'>
                        <div className='content-cmt'>Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam. Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.
                      Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.
                            </div></td>
                      <td>  <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="far fa-star" style={{color:"grey"}}></i>  </td>
                      <td>2023-11-02</td>
                      <td>
                        <button className='btn btn-primary loading_cmt'>
                        <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                      
                        </div>
                        <span>Chờ duyệt</span>
                        </button>
                    
                      </td>
                      <td >
                        <i class="fas fa-pen-to-square"></i>
                        <i class="fas fa-trash"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                      <td> Triệu Trần</td>
                      <td>Limousine phương trang</td>
                      <td className='td-content-cmt'>
                        <div className='content-cmt'>Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam. Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.
                      Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.
                            </div></td>
                      <td>  <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="fas fa-star" style={{color:"yellow"}}></i>
                    <i class="far fa-star" style={{color:"grey"}}></i>  </td>
                      <td>2023-11-02</td>
                      <td>
                        <button className='btn btn-success loading_cmt'>
                       
                        <span >Đã duyệt</span>
                        </button>
                    
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
        </div>
    );
};

export default CommentList ;