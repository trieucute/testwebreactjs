import React from 'react';
import user from '../../assets/images/usernoavatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCommentDetail } from '../../reduxTool/commentSlice';
import { formatDateNews} from '../../config'
const RenderStars = ({ rate }) => {
    const stars = [];
    // Tạo một mảng chứa số sao tương ứng với giá trị rate từ 1 đến 5
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<i key={i} className="fas fa-star" style={{ color: 'yellow' }}></i>);
      } else {
        stars.push(<i key={i} className="far fa-star" style={{ color: 'grey' }}></i>);
      }
    }
  
    return (
      <div style={{ fontSize: '13px' }}>
        {stars}
      </div>
    );
  };
const Comments = ({id}) => {
    const dispatch = useDispatch();
    const dataCmt = useSelector(state => state.comment);
    const data = dataCmt.data?.data || []; // Sử dụng optional chaining để kiểm tra dataCmt.data
  // Lọc các comment có status = 1
const filteredComments = data.filter(comment => comment.status === 1);

    useEffect(() => {
      dispatch(fetchCommentDetail(id));
    //   console.log('comment', filteredComments);
    }, []);
  console.log(data);
    let totalStars = 0;
  
    // Tính tổng số sao từ danh sách đánh giá (nếu data không rỗng)
    if (filteredComments.length > 0) {
        filteredComments.forEach(comment => {
        totalStars += comment.rate;
      });
    }
  
    // Tính trung bình số sao (nếu data không rỗng)
    const averageStars = filteredComments.length > 0 ? totalStars / filteredComments.length : 0;
  
    return (
        <div>
     <div className='comment-contents px-4'>
                <div className='sum-star pb-3 mb-3'>
                    <button type='button ' className='btn btn-star-xe'>    <i class="fas fa-star" style={{color:"white"}}></i>{Math.round(averageStars)}</button>
                    <span>

                        { [...Array(5)].map((_, index) => (
                            <i
                                key={index}
                                className={index < averageStars ? "fas fa-star" : "far fa-star"}
                                style={{ color: index < averageStars ? "yellow" : "grey" }}
                            ></i>
                            ))}
                    </span>
                    <span>{filteredComments &&<> - {filteredComments.length} đánh giá</>  }</span>
                </div>
               <div className='all-cmt-items'>  
                {filteredComments && 
                    filteredComments.map(item=>(
               
                   
               
                <div className='row m-0 flex-column items-cmt'>
                    <div className='col'>
                        <div className='row m-0 align-items-center'>
                            <div className="col-2 p-0 text-center" >
                              {item.user.avatar ===null && 
                                <img src={user} alt=""className='img-fluid'style={{height:"40px",borderRadius:"100%" }} />}
                                  {item.user.avatar !==null && 
                                <img src={item.user.avatar} alt=""className='img-fluid'style={{height:"40px",borderRadius:"100%" }} />}
                            </div>
                            <div className="col-sm-6  ps-0 ">
                                <span style={{fontSize:"13px"}}>
                                  {item.user.name}</span>
                                
                                <RenderStars rate={item.rate} />
                                    
                            </div>
                            <div className='col p-0 text-end' style={{fontSize:"13px"}}>Đăng ngày {formatDateNews(item.created_at)}</div>
                        </div>
                        <div className='col px-3 ' style={{fontSize:"13px"}}>
                            {item.content}
                        </div>
                    </div>
                </div>
          
               
                  
                     ))
                  } 
                  </div>
            </div>
     
        </div>
    );
};

export default Comments;