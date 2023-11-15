import React ,{useEffect,useState,useRef}from "react";
import "../../assets/css/tintuc.css";
import Pagination from "../../componets/pagination";

const Posts= () => {
  // Danh sách items của bạn
  const itemList = [
    { id: 1, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 2, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 3, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 4, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 5, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 6, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},
    { id: 7, name: "  Don't Get Lost: Sarajevo Has Two Bus Stations" , content:' When your visiting Sarajevo make sure not to get lost especially if you plan to visit the city by bus, because Sarajevo has two bus stations. The main Sarajevo bus station is located near the city center, next to the main railway. The main bus station is the starting point for most buses'},

  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số lượng items hiển thị trên mỗi trang

  const firstVisibleItemRef = useRef(null); // Tham chiếu của phần tử đầu tiên trong trang hiện tại


  useEffect(() => {

    // Cuộn đến phần tử đầu tiên của trang hiện tại khi currentPage thay đổi
    if (firstVisibleItemRef.current) {
      firstVisibleItemRef.current.scrollIntoView({ behavior: "smooth" });
    } else{
      window.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [currentPage]);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='mt-10'>
<div className=" news-container">
  <div className="container  ">
    <h5 className=" text-center py-4"> TIN TỨC</h5>
     <div className="backWhite-padding mb-3">
    <div className="row m-0 ">
      {/* ------------------tất cả tin (col tin trái)------------- */}
   

      <div className="col-md-8 pe-4 " style={{overFlow:'auto'}}>
      {currentItems.map((item, index) => (
        <>
                {/* ------------------item tin------------- */}
                <div className="card mb-5 items-news "  key={item.id}  style={{ border: "none" }}   ref={index === 0 ? firstVisibleItemRef : null}>
                <div className="img-news">
                  <img alt=""
                    src="http://via.placeholder.com/905x348"
                    className="img-fluid"
                  />
                </div>
                <div className="card-body p-0">
                  <div className="header-news-items my-3 row">
                    <div className="col col-cmt">
                      <div className="row">
                        <div className="col-md-auto">
                          <i
                            className="fa-solid fa-comment"
                            style={{ color: "#BBB9B9" }}
                          />
                        </div>
                        <div className="col-md-auto text-start">2 Comments</div>
                      </div>
                    </div>
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
                      <div className="col-md-auto text-start">Dec 05, 2017</div>
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
                    {item.name}
                    </p>
                    <div className="text-des-news">
                      <p className="text-start">
                      {item.content}
                      </p>
                    </div>
                  </div>
                  <a
                    href="/tinchitiet"
                    className="text-start btn-watch-a"
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button" className="btn button btn-watch">
                      <span> Xem thêm</span>
                    </button>
                  </a>
                </div>
              </div>
              {/* ------------------END  item tin------------- */}
              </>
      ))}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={itemList.length}
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
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
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
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
            <li className="list-group-item ">
              <div className="row m-0 align-items-center">
                <div className="col-md-auto">
                  <img alt=""
                    src="http://via.placeholder.com/80x80"
                    style={{ width: "5em", borderRadius: "50%" }}
                  />
                </div>
                <div className="col text-start">
                  When your visiting Sarajevo make sure not to get lost,
                  especially if you plan to visit the city by bus,
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* -----------------END -Col tin mới------------- */}
      </div>
      {/* -----------------END -Col tin phải (xem nhiều và tin mới)------------- */}
    </div>
    </div>
  </div>
</div>
</div>

  );
};

export default Posts
