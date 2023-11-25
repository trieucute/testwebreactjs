import React from 'react';

const AddNewCar = () => {
    return (
        <div className='addNew-container'>

        <>
           <h3 className='h3-admin mb-4 text-center'> Thêm xe khách</h3>
      <form   className='addNew-contents'>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tên xe</label>
          <input type="text" className='form-control' />
          </div>
          <div className='form-group'>
          <label htmlFor="">Biển số</label>
        <input type="text"  className='form-control' />
          </div>
          {/* <div className='form-group'>
          <label htmlFor="">Giá ghế</label>
        <input type="number"  className='form-control' />
          </div> */}   
           <div className='form-group'>
          <label htmlFor="">Loại xe</label>
          <select name="" id="" className='form-select'>
            <option value="0">Chọn loại xe</option>
            <option value="">Giường nằm</option>
            <option value="">Ghế</option>
            <option value="">Limousine ( phòng đôi )</option>
     
          </select>
          </div>
          <div className='form-group'>
          <label htmlFor="">Số ghế</label>
        <input type="number"  className='form-control' />
          </div>
      
    
  
          <div className='form-group'>
          <label htmlFor="">Hình</label>
        <input type="file"  className='form-control' />
          </div>
       
       
   

       
       <div className='form-group mt-3 w-100'><button className='btn-add' type="submit">Thêm mới</button></div>
       </div>
      </form>
        </>
 
   
      {/* <div>{content}</div> */}
    </div>
    );
};

export default AddNewCar;