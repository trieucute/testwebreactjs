import React from 'react';

const AddNewJob = () => {
    return (
        <div className='addNew-container'>

        <>
           <h3 className='h3-admin mb-4 text-center'> Thêm tin tuyển dụng</h3>
      <form   className='addNew-contents'>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tiêu đề</label>
          <input type="text" className='form-control' />
          </div>
    
          {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' />
          </div> */}   
           <div className='form-group'>
          <label htmlFor="">Yêu cầu</label>
        <input type="text"  className='form-control' />
         
          </div>
          <div className='form-group'>
          <label htmlFor="">Địa điểm</label>
        <input type="text"  className='form-control' />
          </div>
      
    
  
          <div className='form-group'>
          <label htmlFor="">Lương</label>
        <input type="number"  className='form-control' />
          </div>
       
          <div className='form-group'>
            <label htmlFor="">Hiện / ẩn</label>
            <div className='form-control'>
            <input type="radio" name='active' id='active1' value={1} placeholder='active'   /><label htmlFor="active1 m-0" style={{fontSize:"16px"}} >Hiện</label>
            <input type="radio" name='active' id='active0' value={0} placeholder='active'   /> <label htmlFor="active0 m-0"  style={{fontSize:"16px"}} >Ẩn</label>
            </div>
            
          </div>
          <div className='form-group'>
          <label htmlFor="">Ngày đăng</label>
        <input type="date"  className='form-control' />
          </div>

          <div className='form-group'>
          <label htmlFor="">Mô tả</label>
        {/* <input type="text"  className='form-control' /> */}
        <textarea name="" id="" rows="3" className='form-control' ></textarea>
          </div>
       <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Thêm mới</button></div>
       </div>
      </form>
        </>
 
   
      {/* <div>{content}</div> */}
    </div>
    );
};

export default AddNewJob;