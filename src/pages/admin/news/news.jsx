import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnews } from '../../../reduxTool/newsSlice';
import Loading from '../../loadingTrip';
import { useState } from 'react';
import axiosAdmin from '../axois-admin';
import ReactPaginate from 'react-paginate';
import LoadingAd from '../../loadingAdmin';

const NewsList = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log('NewsListcomponent loaded');
    // Kiểm tra điều kiện chuyển hướng ở đây
  }, []);
  const navigate = useNavigate()
  const handleAddnews = (e) => {
    e.preventDefault();
    navigate('/admin/news/addnew')
  }

  const { news, isLoading } = useSelector(state => state.news)
  const itemList = news
  // const currentItems = itemList
// console.log( news);
  useEffect(() => {
    dispatch(fetchnews());
  }, [])

  function formatDateNews(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  // xóa

  const handleDelete = async (id) => {
    setLoading(true)
  
    const confirmDeletion = window.confirm("Bạn có chắc muốn xoá tin tức này?");
    if (confirmDeletion) {
      const res = await axiosAdmin.delete(`/news/${id}`);
      if (res.data) {
        setLoading(false)
        dispatch(fetchnews());
      }
    }
  }


// tìm kiếm
const [searchTerm, setSearchTerm] = useState('');
const currentNews = searchTerm
? itemList?.filter((list) =>
list.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
: itemList;

const [perPage] = useState(8); // Số lượng xe hiển thị mỗi trang
const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại

const offset = pageNumber * perPage;
const pageCount = Math.ceil(currentNews?.length / perPage);
const paginatedNews  = currentNews?.slice(offset, offset + perPage);

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
      {isLoading ? (
        <LoadingAd />
      ) : (
        <div className='newsAdmin-container'>
          <h3 className='h3-admin'>Quản lý tin tức</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              <button type='button' className='btn-add' onClick={handleAddnews}><i class="fas fa-newspaper"></i> Thêm tin mới</button>
            </div>
            <div className='search col text-end'>

              <input type="text" placeholder='Tìm kiếm tin' value={searchTerm}
      onChange={handleSearch} className='form-control w-75' style={{ marginLeft: "auto" }} /><button type='button'><i class="fas fa-magnifying-glass"></i></button>

            </div>
          </div>
          <div className='table-dataNewsList mt-4'>
            <table className='table'>
              <thead>
                <tr>
                  <th></th>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th >Nội dung</th>
                  <th style={{width:"83px"}}>Hiện / ẩn</th>
                  <th style={{width:"90px"}}>Lượt xem</th>
                  <th >Ngày đăng</th>
                  <th  style={{width:"70px"}}></th>
                </tr>
              </thead>
              <tbody>
              {/* {noResults ? (
        <p>Không có kết quả tìm kiếm</p>
      ) : ( */}
                  <>
                    {paginatedNews  && paginatedNews.map((item, index) => (
                      <tr>
                             <td>{index + offset + 1}</td>
                        <td className='td-content-title'>{item.title}</td>
                        <td className='td-content-summarys'>
                          <div className='content-summarys'>
                            {item.summary}
                          </div>
                          
                          </td>
                          <td className='td-content-news'>
                          <div className='content-news' dangerouslySetInnerHTML={{__html:item.content}} >
                          {/* {item.content} */}

                          </div>
                          </td>
                          <td className='text-center'>{parseInt(item.active)===1 ? (<i class="fas fa-check"></i>) :  '' }</td>
                        <td>{item.view}</td>
                        <td>{formatDateNews(item.created_at)}</td>
                        <td >
                          <Link to={`/admin/news/update/${item.id}`}><i class="fas fa-pen-to-square"></i></Link>

                          <i onClick={() => handleDelete(item.id)} class="fas fa-trash"></i>
                          {/* <i class="fas fa-trash"></i> */}
                        </td>
                      </tr>
                    ))}
              
                
        </>

              </tbody>
            </table>
          </div>
   
          <div className="pagination-contents">
          {pageCount > 1 && (      <ReactPaginate
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

export default NewsList;