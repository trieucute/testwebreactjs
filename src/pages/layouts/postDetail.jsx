import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPostDetail, fetchlastest, fetchnews, fetchpopular } from '../../reduxTool/newsSlice';
import { useEffect } from 'react';
import Loading from '../loadingTrip';
import { formatDate, formatDateNews } from '../../config';

const PostDetail = () => {
  const dispatch = useDispatch();
  const { news, popularNews, lastestNews, postDetail, isLoading } = useSelector(state => state.news)

  const itemList = news
  const { idNews } = useParams();

  useEffect(() => {
    console.log("dispatch");
    dispatch(fetchnews());
    dispatch(fetchpopular());
    dispatch(fetchlastest());
    dispatch(fetchPostDetail(idNews));
    window.scrollTo(0, 0);
  }, [])

  const currentPopularNews = popularNews.filter(i=>parseInt(i.active)===1).filter((item, index) => index < 3)
  const currentlastestNews = lastestNews.filter(i=>parseInt(i.active)===1).filter((item, index) => index < 3)
  const currentRelatedNews = itemList?.filter(i=>parseInt(i.active)===1).filter((item, index) => index < 4)
  const navigate= useNavigate()
  const handlnewsDetail= (id)=>{
    // window.load()
    window.scrollTo(0, 0);
    navigate(`/tinchitiet/${id}`)
    dispatch(fetchPostDetail(id));
  }

  return (
    <div className='mt-10'>
      <>
      {isLoading ?(
          <Loading/>
      ):(
        <>
           <div className=" detail-news-container">
          <div className="container ">

            <div className="row m-0">
           
              <div className="col-md-8 pe-5 backWhite-padding pt-0 mt-3 ">
              <div className="title-news py-4 ">
                <h5 className="text-start title-news ">
                  {postDetail.title}
                </h5>
                <p className="text-start " style={{fontSize:"13px"}}>Posted on {formatDateNews(postDetail.created_at)} by TicketProWeb</p>
              </div>
              <div className="mb-3">
                <div className="text1" style={{ textAlign: "justify" }}>
                  <div className="" dangerouslySetInnerHTML={{ __html: postDetail.content }}/>
                  <p className="text-end mt-5">Sưu tầm</p>
                  <div className="back-news text-start">
                    <Link className="btn-watch btn-back-news" to="/news" >
                      <i
                        className="fa-solid fa-angles-left"
                        style={{ paddingRight: 10 }}
                      />
                      Quay lại
                    </Link>
                  </div>
                </div>
              </div>
            </div>
         
              {/* ------------------tất cả tin (col tin trái)------------- */}
              
              {/* ------------------END  tất cả tin (col tin trái------------- */}
              {/* ------------------Col tin phải (xem nhiều và tin mới)------------- */}
              <div className="col-md-4 px-3 mt-3">
                {/* ------------------Col tin xem nhiều------------- */}
                <div className="card news-items-box" style={{ border: "none" }}>
                  <div
                    className="card-header text-light text-center  fw-bold "
                    style={{ backgroundColor: "#FE9831" }}
                  >
                    Tin xem nhiều
                  </div>
                  <ul className="list-group list-group-flush">
                    {currentPopularNews?.map((item, index) => (
                      <li className="list-group-item " onClick={()=>handlnewsDetail(item.id)} style={{cursor:"pointer"}}>
                        <div className="row m-0 align-items-center">
                          <div className="col-md-auto">
                            
                            <img alt=""
                              src={item.imgs}
                              style={{ width: "5em", height: "5em", borderRadius: "50%" }}
                            />
                          </div>
                          <div className="col text-start">
                            {item.summary}
                          </div>
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>
                {/* ------------------END  Col tin xem nhiều------------- */}
                <br />
                <br />
                <br />
                {/* ------------------Col tin mới------------- */}
                <div className="card news-items-box" style={{ border: "none" }}>
                  <div
                    className="card-header text-light text-center  fw-bold "
                    style={{ backgroundColor: "#FE9831" }}
                  >
                    Tin mới
                  </div>
                  <ul className="list-group list-group-flush">
                    {currentlastestNews?.map((item, index) => (
                      <li className="list-group-item " onClick={()=>handlnewsDetail(item.id)} style={{cursor:"pointer"}}>
                        <div className="row m-0 align-items-center">
                          <div className="col-md-auto">
                            <img alt=""
                              src={item.imgs}
                              style={{ width: "5em", height: "5em", borderRadius: "50%" }}
                            />
                          </div>
                          <div className="col text-start">
                          {item.summary}
                          </div>
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>
                {/* -----------------END -Col tin mới------------- */}
              </div>
              {/* -----------------END -Col tin phải (xem nhiều và tin mới)------------- */}
            </div>
          </div>
        </div>
        <div className="news-relate-container mt-4 mb-5  ">
          <div className="container backWhite-padding">
            <h3 className="text-uppercase">Tin Tức Liên Quan</h3>
            <div className="row m-0 justify-content-between">
              {currentRelatedNews?.map((item, index) => (
                <div className="items-relate-news col-xl-3 col-lg-3 col-sm-6 ">
                  <a className="card " style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",cursor:"pointer", border: "none" }}  onClick={()=>handlnewsDetail(item.id)} >
                    <img alt=""
                      src={item.imgs}
                      className="img-fluid"
                    />
                    <div className="card-body p-2">
                      <div className="card-title">
                        {" "}
                        {item.title}
                      </div>
                      <div className="card-text">
                      <div className="" dangerouslySetInnerHTML={{ __html: item.summary}}/>
                      </div>
                    </div>
                  </a>
                </div>
              ))}

            </div>
          </div>
        </div>
        </>
      )
      }
     
      </>

    </div>
  );
};

export default PostDetail;