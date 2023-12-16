import React, { useEffect, useState } from "react";
import axiosAdmin from "../axois-admin";
import { API_BASE_URL } from "../../../config.js";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import LoadingAd from "../../loadingAdmin.js";
import Tooltip from '@mui/material/Tooltip';
const UserList = () => {
  const [users, setUsers] = useState([]);
  // const [ client setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // fetchUsers();
    axiosAdmin.get("/user")
    .then(res=>{
      
      const userData = res.data.data;
      setUsers(userData);
      setLoading(false);
      console.log(userData );
    })
   .catch (error=> {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data. Please try again later.");
      setLoading(false);
    })
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axiosAdmin.get("/user");
      const userData = response.data.data;
      setUsers(userData);

      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data. Please try again later.");
      setLoading(false);
    }
  };
  console.log(users);
  // delete user
  const handleDeleteUser = async (userId) => {
    const confirmDeletion = window.confirm("Bạn có chắc muốn xoá tài khoản này?");
    // setLoadingDelete(true)
    if (confirmDeletion) {
      try {
        await axiosAdmin.delete(`/user/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert("Xóa thành công");
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }

  };
  // search user
const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(0);
  };

  const applyPaginationAndSearch = (data) => {
    const sortedById = data?.slice().sort((a, b) => b.id - a.id);
    const filteredData = searchTerm
      ? sortedById.filter(
          (list) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            list.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sortedById;

    const offset = pageNumber * perPage;
    const pageCount = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice(offset, offset + perPage);

    return { paginatedData, pageCount };
  };

  const { paginatedData: paginatedUser, pageCount } = applyPaginationAndSearch(users);
  const { paginatedData: paginatedClient, pageCount: pageCountClient } = applyPaginationAndSearch(
    users.filter((i) => i.role === 'user')
  );
  const { paginatedData: paginatedDriver, pageCount: pageCountDriver } = applyPaginationAndSearch(
    users.filter((i) => i.role === 'driver')
  );
  const { paginatedData: paginatedAdmin, pageCount: pageCountAdmin} = applyPaginationAndSearch(
    users.filter((i) => i.role === 'admin')
  );
//   const currentUser= searchTerm
//   ? users?.filter((list) =>
//   list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   list.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   : users;



// const offset = pageNumber * perPage;
// const pageCount = Math.ceil(currentUser?.length / perPage);
// const paginatedUser = currentUser?.slice(offset, offset + perPage);

// const handlePageClick = ({ selected }) => {
//   setPageNumber(selected);
// };
// const handleSearch = (e) => {
//   const value = e.target.value;
//   setSearchTerm(value);
//   setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
// };
// const  client = users?.filter(i=>i.role==='user')
// console.log(client, 'client');
// const currentClient= searchTerm
// ?  client?.filter((list) =>
// list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// list.email.toLowerCase().includes(searchTerm.toLowerCase())
// )
// : client;


// const pageCountClient = Math.ceil(currentClient?.length / perPage);
// const paginatedClient = currentClient?.slice(offset, offset + perPage);

// const handlePageClickClient = ({ selected }) => {
// setPageNumber(selected);
// };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      {loading && <LoadingAd/>}
      {error && <p>{error}</p>}
      {!loading && (
        <div className="userAdmin-container">
          <h3 className="h3-admin">Quản lý người dùng</h3>
          <div className="row mx-0 my-2">
            <div className="col ps-0 ">
              <Link
                to={"/admin/user/addnew"}
                type="button"
                class="btn btn-add btn-primary"
              >
                Thêm người dùng
              </Link>
            </div>

            <div className="search col text-end">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng"
                  className="form-control w-75"
                  style={{ marginLeft: "auto" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                  <i className="fas fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
          </div>
        <div>
        <ul class="nav nav-tabs mb-1" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">Tất cả</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-client-tab" data-bs-toggle="pill" data-bs-target="#pills-client" type="button" role="tab" aria-controls="pills-client" aria-selected="false">Khách hàng</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-driver-tab" data-bs-toggle="pill" data-bs-target="#pills-driver" type="button" role="tab" aria-controls="pills-driver" aria-selected="false">Tài xế</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-admin-tab" data-bs-toggle="pill" data-bs-target="#pills-admin" type="button" role="tab" aria-controls="pills-admin" aria-selected="false">Admin</button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane px-1 fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                    <div className="table-dataUser mt-4">
                          <table className="table">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th> 
                                  Vai trò 
                                
                                  </th>
                                
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            {!paginatedUser&& <LoadingAd/>}
                              {paginatedUser&&
                              paginatedUser.map((user,index) =>{
                                const offset = pageNumber * perPage;
                                return (
                                  <tr key={user.id} user={user}>
                                    <td>{index + offset + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number ? user.phone_number : 'Không có'}</td>
                                    <td>{user.role==='user' && 'Khách Hàng' }
                                    {user.role==='admin' &&  'Admin' }
                                    {user.role==='driver' && 'Tài xế' }
                                    </td>
                                    <td>
                                    <Link to={`/admin/user/update/${user.id}`}><i
                                        // onClick={() => {
                                        //   handleShowModalToUpdate(user.id);
                                        // }}
                                        className="fas fa-pen-to-square"
                                      ></i></Link> 
                                      <i
                                        className="fas fa-trash"
                                        onClick={() => handleDeleteUser(user.id)}
                                        style={{ cursor: "pointer" }}
                                      ></i>
                                    </td>
                                  </tr>
                                )})}
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

                  <div class="tab-pane px-1 " id="pills-client" role="tabpanel" aria-labelledby="pills-client-tab">
                    <div className="table-dataUser mt-4">
                          <table className="table">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th> 
                                  Vai trò 
                                  
                                  </th>
                                
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            {!paginatedClient&& <LoadingAd/>}
                              {paginatedClient&&
                              paginatedClient.map((user,index) => {
                                const offset = pageNumber * perPage;
                                return (
                                  <tr key={user.id} user={user}>
                                    <td>{index + offset + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number ? user.phone_number : 'Không có'}</td>
                                    <td>{user.role==='user' && 'Khách Hàng' }
                                   
                                   
                                    </td>
                                    <td>
                                    <Link to={`/admin/user/update/${user.id}`}><i
                                        // onClick={() => {
                                        //   handleShowModalToUpdate(user.id);
                                        // }}
                                        className="fas fa-pen-to-square"
                                      ></i></Link> 
                                      <i
                                        className="fas fa-trash"
                                        onClick={() => handleDeleteUser(user.id)}
                                        style={{ cursor: "pointer" }}
                                      ></i>
                                    </td>
                                  </tr>
                         )})}
                            </tbody>
                          </table>
                        </div>
                        <div className="pagination-contents">
                          {pageCountClient > 1 && (<ReactPaginate
                            previousLabel={<i className="fas fa-caret-left"></i>}
                            nextLabel={<i className="fas fa-caret-right"></i>}
                            pageCount={pageCountClient}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                          />
                          )}
                        </div>

                  </div>

                  <div class="tab-pane px-1 " id="pills-driver" role="tabpanel" aria-labelledby="pills-driver-tab">
                    <div className="table-dataUser mt-4">
                          <table className="table">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th> 
                                  Vai trò 
                                
                                  </th>
                                
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            {!paginatedDriver&& <LoadingAd/>}
                              {paginatedDriver&&
                              paginatedDriver.map((user,index) =>{
                                const offset = pageNumber * perPage;
                                return (
                                  <tr key={user.id} user={user}>
                                    <td>{index + offset + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number ? user.phone_number : 'Không có'}</td>
                                    <td>
                                   
                                    {user.role==='driver' && 'Tài xế' }
                                    </td>
                                    <td>
                                    <Link to={`/admin/user/update/${user.id}`}><i
                                        // onClick={() => {
                                        //   handleShowModalToUpdate(user.id);
                                        // }}
                                        className="fas fa-pen-to-square"
                                      ></i></Link> 
                                      <i
                                        className="fas fa-trash"
                                        onClick={() => handleDeleteUser(user.id)}
                                        style={{ cursor: "pointer" }}
                                      ></i>
                                    </td>
                                  </tr>
                                )})}
                            </tbody>
                          </table>
                        </div>
                        <div className="pagination-contents">
                          {pageCountDriver > 1 && (<ReactPaginate
                            previousLabel={<i className="fas fa-caret-left"></i>}
                            nextLabel={<i className="fas fa-caret-right"></i>}
                            pageCount={pageCountDriver}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                          />
                          )}
                        </div>

                  </div>

                  <div class="tab-pane px-1 " id="pills-admin" role="tabpanel" aria-labelledby="pills-admin-tab">
                    <div className="table-dataUser mt-4">
                          <table className="table">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th> 
                                  Vai trò 
                                
                                  </th>
                                
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            {!paginatedAdmin&& <LoadingAd/>}
                              {paginatedAdmin&&
                              paginatedAdmin.map((user,index) =>{
                                const offset = pageNumber * perPage;
                                return (
                                  <tr key={user.id} user={user}>
                                    <td>{index + offset + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number ? user.phone_number : 'Không có'}</td>
                                    <td>
                                    {user.role==='admin' &&  'Admin' }
                                   
                                    </td>
                                    <td>
                                    <Link to={`/admin/user/update/${user.id}`}><i
                                        // onClick={() => {
                                        //   handleShowModalToUpdate(user.id);
                                        // }}
                                        className="fas fa-pen-to-square"
                                      ></i></Link> 
                                      <i
                                        className="fas fa-trash"
                                        onClick={() => handleDeleteUser(user.id)}
                                        style={{ cursor: "pointer" }}
                                      ></i>
                                    </td>
                                  </tr>
                                )})}
                            </tbody>
                          </table>
                        </div>
                        <div className="pagination-contents">
                          {pageCountAdmin > 1 && (<ReactPaginate
                            previousLabel={<i className="fas fa-caret-left"></i>}
                            nextLabel={<i className="fas fa-caret-right"></i>}
                            pageCount={pageCountAdmin}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                          />
                          )}
                        </div>

                  </div>

                  </div>
        </div>
    

  
        </div>
      )}
    </div>
  );
};

export default UserList;
