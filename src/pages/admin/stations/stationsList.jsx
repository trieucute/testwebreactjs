import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddStationPoint, deleteStation, deleteStationPoint, fetchStation, fetchStationPoint } from '../../../reduxTool/stationSlice';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import LoadingAd from '../../loadingAdmin';
import axiosAdmin from '../axois-admin';

const StationsList = () => {
    const navigate = useNavigate();
    const handleAdd=()=>{
    navigate('/admin/stations/addnew')
    }
    const [divsForm, setDivsForm] = useState([{ id: 0 }]); // Mảng chứa các div, mỗi div có một id để xác định

    // Hàm thêm một div mới
    const handleAddDiv = () => {
        const newDivId = divsForm.length; // Tạo id mới cho div
        const newDivs = [...divsForm, { id: newDivId }]; // Thêm div mới vào mảng divs
        setDivsForm(newDivs);
      };
  
    // Hàm xóa một div dựa trên id
    const handleRemoveDiv = (id) => {
    //   if (id === 0) {
    //     // Nếu id là 0 (div đầu tiên), không thực hiện việc xóa
    //     return;
    //   }
  
      const updatedDivs = divsForm.filter((div) => div.id !== id); // Loại bỏ div có id tương ứng
      setDivsForm(updatedDivs);
    };
    const [showForm, setShowForm] = useState(false);

// Hàm để hiển thị form khi nhấn nút "Thêm điểm đón / trả"
const handleShowForm = () => {
  setShowForm(!showForm); // Đảo ngược giá trị của showForm khi nhấn nút
  setEditForm(false)
};
const dispatch = useDispatch();
const station = useSelector (state => state.stationAdmin)
const itemList = station?.data?.data

useEffect(()=>{
dispatch(fetchStation())
},[])
// console.log( itemList );
    // tìm kiếm

    const [searchTerm, setSearchTerm] = useState('');
    const currentJob = searchTerm
      ? itemList?.filter((list) =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||   list.province.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : itemList;
  
    const [perPage] = useState(5); // Số lượng xe hiển thị mỗi trang
    const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
  
    const offset = pageNumber * perPage;
    const pageCount = Math.ceil(currentJob?.length / perPage);
    const paginatedStations= currentJob?.slice(offset, offset + perPage);
  
    const handlePageClick = ({ selected }) => {
      setPageNumber(selected);
    };
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
    };

    // const point= useSelector (state => state.stationAdmin.point)
    const [pointData, setPointData]=useState([])
    const [loadingPoint, setLoadingPoint]=useState(false)
    const [pointName, setPointName]=useState(null)
    const [pointStationId, setPointStationId]=useState(null)
    const handlePoint=(id,name)=>{
      setLoadingPoint(true)
      setPointName(name)
      setPointStationId(id)
      dispatch(fetchStationPoint(id))
      .then(res=>{
          setPointData(res.payload.data)
          setLoadingPoint(false)
      })
      .catch(err=>{
        setLoadingPoint(false)
        console.error(err);
      })
    }
    const [address, setAddress]= useState('')
    const [name, setName]= useState('')
    console.log(pointStationId);
    const handleAddStationPoint=(e)=>{
      e.preventDefault()
      if(address ===''|| name===''){
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
      }
      const newpoint={
        station_id:pointStationId,
        address:address ,
        name: name
      }
      setLoadingPoint(true)
      dispatch(AddStationPoint(newpoint))
      .then(res=>{
        setAddress('')
        setName('')
        setLoadingPoint(false)
         dispatch(fetchStationPoint(pointStationId))
         .then(res=>{
          setPointData(res.payload.data)
          setLoadingPoint(false)
      })
      .catch(err=>{
        setLoadingPoint(false)
        console.error(err);
      })
      })
      .catch(err=>{
        setLoadingPoint(false)
        console.error(err)
      })
     
    }
    const handleDeleteSation=(id)=>{
      const confirmDeletion = window.confirm("Bạn có chắc muốn xoá bến xe này?");
      if (confirmDeletion) {
        dispatch(deleteStation(id))
          .then((res) => {
            console.log(res);
            dispatch(fetchStation())
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    const handleDeleteSationPoint=(id)=>{
      const confirmDeletion = window.confirm("Bạn có chắc muốn xoá điểm đón trả của bến xe này?");
      if (confirmDeletion) {
        setLoadingPoint(true)
        dispatch(deleteStationPoint(id))
          .then((res) => {
            console.log(res);
            dispatch(fetchStationPoint(pointStationId))
            .then(res=>{
             setPointData(res.payload.data)
             setLoadingPoint(false)
         })
         .catch(err=>{
           setLoadingPoint(false)
           console.error(err);
         })
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    const [editForm, setEditForm]= useState(false);
    const [message,  setMessage]= useState(false);
    const [idStationPointEdit, setIdStationPointEdit]= useState('')
    const handleUpdateStationPoint=(id,name,address)=>{
      setEditForm(true)
      setShowForm(false)
      setAddress(address)
      setName(name)
    setIdStationPointEdit(id)
    }
    const handleEditStationPoint =(e)=>{
      e.preventDefault()
      const post={
        name:name,
        address:address
      }
      setLoadingPoint(true)
      axiosAdmin.put(`/station/point/${idStationPointEdit}`, post,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      .then(res=>{
     
        // setLoading(false);
        
        setMessage('Cập nhật thành công')
        dispatch(fetchStationPoint(pointStationId))
        .then(res=>{
         setPointData(res.payload.data)
         setLoadingPoint(false)
     })
     .catch(err=>{
       setLoadingPoint(false)
       console.error(err);
     })
        // console.log(res);
      })
      .catch(err=>{
        // setLoading(false)
        console.error(err)
        const response= err.response
        setLoadingPoint(false)
      })
    }
    return (
        <div>
        <div className='tripAdmin-container'>
          <h3 className='h3-admin'>Quản lý bến xe</h3>
          <div className='row mx-0 my-2'>
            <div className='col ps-0 '>
              <button className='btn-add' onClick={handleAdd}> <i class="fas fa-bus"></i> Thêm bến xe</button>
            </div>
          <div className='search col text-end'>
            <form action="">
              <input type="text" placeholder='Tìm kiếm bến xe' className='form-control w-75' style={{marginLeft:"auto"}}  value={searchTerm}
      onChange={handleSearch}/><button type='button'><i class="fas fa-magnifying-glass"></i></button>
            </form>
          </div>
          </div>
        
          <div className='table-dataUser mt-4'>
              <table className='table'>
                <thead>
                <tr>
                  <th></th>
                  <th>Tên bến xe</th>
                  <th>Địa chỉ</th>    
                <th>Tình / Thành</th>
                <th>Các điểm đón / trả</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedStations && paginatedStations.map((item, index) => (
                     <tr key={item.id}>
                     <td>{index + offset + 1}</td>
                    <td> {item.name} </td>
                    <td>{item.address} </td>
                    <td> {item.province}</td>
                    <td> <button  className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handlePoint(item.id, item.name)}>Điểm đón / trả</button></td>

                    <td >
                    <Link  to={`/admin/stations/update/${item.id}`}> <i class="fas fa-pen-to-square"></i></Link>
                      <i class="fas fa-trash" onClick={()=>handleDeleteSation(item.id)}></i>
                      </td>
                  </tr>
                    ))}
             
                {/* <tr>
                <td>2</td>
                  <td> Bến xe Miền Tây</td>
                  <td>395 Kinh Dương Vương, An Lạc, Bình Tân, Thành phố Hồ Chí Minh 700000 </td>
                  <td>Hồ Chí Minh</td>
                  <td> <button  className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal">Điểm đón / trả</button></td>
             
                  <td >
                    <i class="fas fa-pen-to-square"></i>
                    <i class="fas fa-trash"></i>
                    </td>
                </tr> */}
               
                
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

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:"650px"}}>
  <div class="modal-content">
{loadingPoint ? <LoadingAd/> : (



      <>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Điểm đón / trả của {pointName !== null && pointName} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table className='table'>
            <thead>
                <tr>
                    <th></th>
                <th>Điểm</th>
                <th>Địa chỉ</th>
                <th></th>
                </tr>
                
            </thead>
            <tbody>
            {pointData && pointData.map((i,index)=>(
                   <tr key={i.id}>
                   <td>{++index}</td>
                   <td>
                       {i.name}
                   </td>
                   <td>
                  {i.address}
                   </td>
                   <td>
                   <i class="fas fa-pen-to-square" onClick={()=>handleUpdateStationPoint(i.id,i.name, i.address)}></i>
                   <i class="fas fa-trash" onClick={()=>handleDeleteSationPoint(i.id)}></i>
                   </td>
               </tr>
            ))}
         
            </tbody>
        </table>
        <div ><button  className='btn btn-primary' onClick={handleShowForm}>Thêm điểm đón / trả</button></div>
        {/* // Thay đổi biến divs thành divsForm */}
   {showForm &&  <div>
    <form className='row m-0 justify-content-between stations' onSubmit={handleAddStationPoint}>
            <div  className='form-group p-0 my-3'>
          <label htmlFor=''>Điểm đón / trả</label>
          <input type="text" className='form-control' name='name' value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div  className='form-group p-0 mb-3'>
          <label htmlFor=''>Địa chỉ</label>
          <input type="text" className='form-control'  name='address' value={address} onChange={e=>setAddress(e.target.value)}/>
          </div>

           <button type='submit' className='btn-add'>  Thêm</button>
          
     

        </form>
</div>
}    
   {editForm &&  <div>
    <form className='row m-0 justify-content-between stations' onSubmit={handleEditStationPoint}>
            <div  className='form-group p-0 my-3'>
          <label htmlFor=''>Điểm đón / trả</label>
          <input type="text" className='form-control' name='name' value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div  className='form-group p-0 mb-3'>
          <label htmlFor=''>Địa chỉ</label>
          <input type="text" className='form-control'  name='address' value={address} onChange={e=>setAddress(e.target.value)}/>
          </div>

           <button type='submit' className='btn-add'>  Cập nhật</button>
          
     

        </form>
</div>
}    
      </div>
      </>
      )}
    </div>
    
     
  </div>
</div>

    </div>
    );
};

export default StationsList;