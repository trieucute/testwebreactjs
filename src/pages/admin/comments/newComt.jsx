import React from 'react';

const AddNewComment = () => {
    const handleSubmit=()=>{

    }
 
    return (
        <div className='addNew-container '>

          <>
             <h3 className='h3-admin mb-4 text-center'> Thêm bình luận</h3>
        <form onSubmit={handleSubmit}  className='addNew-contents'>
          <div className='row m-0 justify-content-between'> 
            <div className='form-group'>
            <label htmlFor="">Tên người dùng</label>
            <select name="" id=""     className='form-select'>
                <option value="">Triệu Trần</option>
                <option value="">Hoàng Thao</option>

            </select>
            </div>
            <div className='form-group'>
            <label htmlFor="">Xe</label>
            <select name="" id=""     className='form-select'>
                <option value="">Limousine phương trang</option>
                <option value="">Giường nằm</option>

            </select>
            </div>
            <div className='form-group'>
            <label htmlFor="">Đánh giá ( từ 1 đến 5 )</label>
            <input type="number" className='form-control' min={1} max={5}/>
            
            </div>
            <div className='form-group'>
            <label htmlFor="">Ngày đăng</label>
            <input type="date" className='form-control' />
            
            </div>
            <div className='form-group'>
            <label htmlFor="">Trạng thái</label>
            <div className='form-control'>
            <input type="radio" name='active' id='active1' value={1} placeholder='active'  /><label htmlFor="active1 m-0"  style={{fontSize:"16px"}} >Chờ duyệt</label>
            <input type="radio" name='active' id='active0' value={0} placeholder='active'   /> <label htmlFor="active0 m-0"  style={{fontSize:"16px"}} >Duyệt</label>
            </div>
            
            </div>
            <div className='form-group'>
            <label htmlFor="">Nội dung</label>
            {/* <input type="date" className='form-control' /> */}
            <textarea name="" id=""  rows="5"className='form-control' ></textarea>
            </div>
         <div className='form-group mt-3'><button className='btn-add' type="submit">Thêm mới</button></div>
         </div>
        </form>
          </>
   
     
        {/* <div>{content}</div> */}
      </div>
    );
};

export default AddNewComment;