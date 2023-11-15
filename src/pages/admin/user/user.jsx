import React from 'react';
import { useEffect } from 'react';
import IndexAdmin from '..';
import MenuSidebar from '../menu';

const UserList = () => {
    useEffect(() => {
        console.log('User component loaded');
        // Kiểm tra điều kiện chuyển hướng ở đây
      }, []);
    return (
        <div>
            <div className='userAdmin-container'>
              <h3 className='h3-admin'>Quản lý người dùng</h3>
              <div className='row mx-0 my-2'>
                <div className='col ps-0 '>
                  <button className='btn-add'><i class="fas fa-user"></i> Thêm người dùng</button>
                </div>
              <div className='search col text-end'>
                <form action="">
                  <input type="text" placeholder='Tìm kiếm người dùng' className='form-control w-75' style={{marginLeft:"auto"}}/><button><i class="fas fa-magnifying-glass"></i></button>
                </form>
              </div>
              </div>
            
              <div className='table-dataUser mt-4'>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th>Tên </th>
                      <th>Email</th>
                      <th>SĐT</th>
                      <th>Vai trò</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Trần Bích Triệu</td>
                      <td>trieutran@gmail.com</td>
                      <td>0980942342</td>
                      <td>User</td>
                      <td >
                        <i class="fas fa-pen-to-square"></i>
                        <i class="fas fa-trash"></i>
                        </td>
                    </tr>
                    <tr>
                      <td>Trần Bích Triệu</td>
                      <td>trieutran@gmail.com</td>
                      <td>0980942342</td>
                      <td>Admin</td>
                      <td>
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

export default UserList ;