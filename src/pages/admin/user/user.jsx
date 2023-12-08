import React, { useEffect, useState } from "react";
import axiosAdmin from "../axois-admin";
import { API_BASE_URL } from "../../../config.js";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import LoadingAd from "../../loadingAdmin.js";
import Tooltip from '@mui/material/Tooltip';
const UserList = () => {
  const [users, setUsers] = useState([]);

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

  const currentUser= searchTerm
  ? users?.filter((list) =>
  list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  list.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  : users;

const [perPage] = useState(5); // Số lượng xe hiển thị mỗi trang
const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại

const offset = pageNumber * perPage;
const pageCount = Math.ceil(currentUser?.length / perPage);
const paginatedUser = currentUser?.slice(offset, offset + perPage);

const handlePageClick = ({ selected }) => {
  setPageNumber(selected);
};
const handleSearch = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
};



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
                     <Tooltip title={<div style={{padding:"8px 15px"}}>
                     <input type="checkbox"  id="driver"/><label htmlFor="driver" style={{fontSize:"15px", marginRight:"10px"}}>Tài xế</label>
                     <input type="checkbox"  id="admin"/><label htmlFor="admin" style={{fontSize:"15px"}}>Admin</label>
                    
                          </div>}              
                    placement="top" arrow><i className="fas fa-filter ms-2" ></i>
                      </Tooltip>
                     </th>
                  
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUser&&
                 paginatedUser.map((user,index) => (
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

export default UserList;
