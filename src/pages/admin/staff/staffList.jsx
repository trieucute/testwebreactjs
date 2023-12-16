import React, { useEffect, useState } from "react";
import axiosAdmin from "../axois-admin.js";
import { API_BASE_URL } from "../../../config.js";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import LoadingAd from "../../loadingAdmin.js";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // fetchUsers();
    axiosAdmin.get("/user")
    .then(res=>{
      
      const userData = res.data.data;
      setUsers(userData);
      setFilteredUsers(userData);
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
      setFilteredUsers(userData);
      
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
    try {
      await axiosAdmin.delete(`/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("Xóa thành công");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  // search user
//   const currentJob = searchTerm
//   ? itemList?.filter((list) =>
//     list.title.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   : itemList;

// const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
// const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại

// const offset = pageNumber * perPage;
// const pageCount = Math.ceil(currentJob?.length / perPage);
// const paginatedNews = currentJob?.slice(offset, offset + perPage);

// const handlePageClick = ({ selected }) => {
//   setPageNumber(selected);
// };
  const currentUser= searchTerm
  ? users?.filter((list) =>
  list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  list.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  list.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
  )
  : users;

const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
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

  // const handleSearch = () => {
  //   const searchTermLowerCase = (searchTerm || "").toLowerCase();
  //   const filteredData = users.filter((user) => {
  //     const name = user?.name || "";
  //     const email = user?.email || "";
  //     const phone_number = user?.phone_number || "";

  //     return (
  //       name.toLowerCase().includes(searchTermLowerCase) ||
  //       email.toLowerCase().includes(searchTermLowerCase) ||
  //       phone_number.toLowerCase().includes(searchTermLowerCase)
  //     );
  //   });
  //   setFilteredUsers(filteredData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  // add user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdate((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const tokenAdmin = localStorage.getItem("adminToken");
      const resp = await fetch(`${API_BASE_URL}/api/user/${userUpdate?.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + tokenAdmin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });
      const jsonResp = await resp.json();
      if (resp.status == 200) {
        await fetchUsers();
        setShowModal(false);
        setUserUpdate({});
        alert("Cập nhật thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAndFillUser = async (userId) => {
    try {
      const tokenAdmin = localStorage.getItem("adminToken");
      const resp = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenAdmin,
          "Content-Type": "application/json",
        },
      });
      const jsonResp = await resp.json();
      if (resp.status == 200) {
        setUserUpdate(jsonResp?.data);
        setShowModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleShowModalToUpdate = async (id) => {
    await fetchAndFillUser(id);
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
                to={"/admin/user/create"}
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
                  <th>Vai trò</th>
                  
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
                      <td>{user.role}</td>
                      <td>
                        <i
                          onClick={() => {
                            handleShowModalToUpdate(user.id);
                          }}
                          className="fas fa-pen-to-square"
                        ></i>
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

          {showModel && (
            <div
              id="myModal"
              class="modal d-block"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content bg-white">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      {"Sửa người dùng"}
                    </h1>
                    <button
                      onClick={() => {
                        setShowModal(false);
                      }}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tên"
                        aria-label="ten"
                        name="name"
                        value={userUpdate.name}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        className="form-control"
                        placeholder="SĐT"
                        aria-label="sdt"
                        name="phone_number"
                        value={userUpdate.phone_number}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="email"
                        name="email"
                        value={userUpdate.email}
                        onChange={handleInputChange}
                      />
                      <div className="d-flex justify-content-center align-item-center">
                        <div className="d-flex justify-content-center align-items-center mx-2">
                          <input
                            type="radio"
                            className="me-2"
                            placeholder="Vai trò"
                            aria-label="role"
                            name="role"
                            value={"user"}
                            onChange={handleInputChange}
                          />
                          <label>User</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                          <input
                            type="radio"
                            className="me-2"
                            placeholder="Vai trò"
                            aria-label="role"
                            name="role"
                            value={"drive"}
                            onChange={handleInputChange}
                          />
                          <label>Driver</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                          <input
                            type="radio"
                            className="me-2"
                            placeholder="Vai trò"
                            aria-label="role"
                            name="role"
                            value={"admin"}
                            onChange={handleInputChange}
                          />
                          <label>Admin</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateUser}
                    >
                      {"Sửa"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
