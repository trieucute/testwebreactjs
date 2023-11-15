import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const NewsList= () => {
    useEffect(() => {
        console.log('NewsListcomponent loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);
      const navigate = useNavigate()
      const handleAddnews=(e)=>{
        e.preventDefault();
        navigate('/admin/news/addnew')
      }
    return (
        <div>
            <div className='newsAdmin-container'>
              <h3 className='h3-admin'>Quản lý tin tức</h3>
              <div className='row mx-0 my-2'>
                <div className='col ps-0 '>
                  <button type='button' className='btn-add' onClick={handleAddnews}><i class="fas fa-newspaper"></i> Thêm tin mới</button>
                </div>
              <div className='search col text-end'>
                <form action="">
                  <input type="text" placeholder='Tìm kiếm người dùng' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
                </form>
              </div>
              </div>
            
              <div className='table-dataNewsList mt-4'>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Mô tả</th>
                      <th>Nội dung</th>
                      <th>Hiện / ẩn</th>
                      <th>Lượt xem</th>
                      <th>Ngày đăng</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Prenn Đà Lạt - Thắng cảnh thiên nhiên không thể bỏ qua</td>
                      <td>Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.</td>
                      <td>Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam. Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.
                      Thác Prenn là một thác nước ở thành phố Đà Lạt thuộc tỉnh Lâm Đồng, Việt Nam.</td>
                      <td><i class="fas fa-check"></i></td>
                      <td>120</td>
                      <td>2023-11-02</td>
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

export default NewsList ;