import React ,{useEffect,useState,useRef}from "react";
import "../../assets/css/tintuc.css";
import Pagination from "../../componets/pagination";
import { fetchlastest, fetchnews, fetchpopular } from "../../reduxTool/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loadingTrip";
import { formatDateNews } from "../../config";

const Posts= () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng items hiển thị trên mỗi trang

  const firstVisibleItemRef = useRef(null); // Tham chiếu của phần tử đầu tiên trong trang hiện tại


  useEffect(() => {

    // Cuộn đến phần tử đầu tiên của trang hiện tại khi currentPage thay đổi
    if (firstVisibleItemRef.current) {
      firstVisibleItemRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { news, popularNews, lastestNews, isLoading } = useSelector(state => state.news)
  const itemList = news
  console.log('news',news);
  console.log(isLoading);
  useEffect(() => {
    console.log("dispatch");
    dispatch(fetchnews());
    dispatch(fetchpopular());
    dispatch(fetchlastest());
  }, [])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList?.slice(indexOfFirstItem, indexOfLastItem).filter(i=>parseInt(i.active)===1);
  const currentPopularNews = popularNews.filter((item, index) => index < 3)
  const currentlastestNews = lastestNews.filter((item, index) => index < 3)
  console.log(currentPopularNews);
  const navigate= useNavigate()
  const handlnewsDetail= (id)=>{
    navigate(`/tinchitiet/${id}`)
  }
  return (
    <div className='mt-10'>
      {isLoading ? (
        <Loading/>
      ):(
        <div className=" news-container">
        <div className="container  ">
          <h5 className=" text-center py-4"> TIN TỨC</h5>
          <div className="backWhite-padding mb-3">
            <div className="row m-0 ">
              {/* ------------------tất cả tin (col tin trái)------------- */}
  
  
              <div className="col-md-8 pe-4 " style={{ overFlow: 'auto' }}>
                {currentItems?.map((item, index) => (
                  <>
                    {/* ------------------item tin------------- */}
                    <div className="card mb-5 items-news " key={item.id} style={{ border: "none" }} ref={index === 0 ? firstVisibleItemRef : null}>
                      <div className="img-news">
                        <img alt=""
                          src={item.imgs}
                          className="img-fluid"
  
                        />
                      </div>
                      <div className="card-body p-0">
                        <div className="header-news-items my-3 row">
                          {/* <div className="col col-cmt">
                            <div className="row">
                              <div className="col-md-auto">
                                <i
                                  className="fa-solid fa-comment"
                                  style={{ color: "#BBB9B9" }}
                                />
                              </div>
                              <div className="col-md-auto text-start">2 Comments</div>
                            </div>
                          </div> */}
                          <div className="col col-star">
                            <div className="row">
                              <div className="col-md-auto text-start">
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-md-auto text-start">{formatDateNews(item.created_at)}</div>
                          </div>
                          <div className="col text-end">
                            <button className="btn btn-shareFB">
                              <i
                                className="fa-brands fa-facebook"
                                style={{ color: "white" }}
                              />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                        <div className="text">
                          <p className="text-start fs-5 fw-bolder">
                            {item.title}
                          </p>
                          <div className="text-des-news">
                            <p className="text-start">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/tinchitiet/${item.id}`}
                          className="text-start btn-watch-a"
                          style={{ textDecoration: "none" }}
                        >
                          <button type="button" className="btn button btn-watch">
                            <span> Xem thêm</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                    {/* ------------------END  item tin------------- */}
                  </>
                ))}
  
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={itemList?.length}
                  paginate={paginate}
  
                />
  
  
  
              </div>
  
              {/* ------------------END  tất cả tin (col tin trái------------- */}
  
  
              {/* ------------------Col tin phải (xem nhiều và tin mới)------------- */}
              <div className="col-md-4 px-3 ">
                {/* ------------------Col tin xem nhiều------------- */}
                <div className="card news-items-box" style={{ border: "none" }}>
                  <div
                    className="card-header text-light text-center  fw-bold "
                    style={{ backgroundColor: "#FE9831" }}
                  >
                    Tin xem nhiều
                  </div>
                  <ul className="list-group list-group-flush">
                    {currentPopularNews?.filter(i=>parseInt(i.active)===1).map((item, index) => (
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
                    {currentlastestNews?.filter(i=>parseInt(i.active)===1).map((item, index) => (
                      <li className="list-group-item "onClick={()=>handlnewsDetail(item.id)} style={{cursor:"pointer"}}>
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
      </div>
      )}
  
  </div>

  );
};

export default Posts
