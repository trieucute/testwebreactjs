import React , { useEffect} from "react";
import bannerXe from "../../assets/images/Cover_Tcon_DOI_XE.jpg";
import xe1 from "../../assets/images/xe11.gif";
import '../../assets/css/thuexe.css';
import xe7 from '../../assets/images/xe7.jpg';
import xe7_nt1 from '../../assets/images/nt7.jpg';
import xe7_nt2 from '../../assets/images/nt7.1.jpg';
import xe7_nt3 from '../../assets/images/nt7.2.jpg';
import xe16 from '../../assets/images/xe16.jpg';
import xe16_nt1 from '../../assets/images/nt16.jpg';
import xe16_nt2 from '../../assets/images/nt16.1.jpg';
import xe16_nt3 from '../../assets/images/nt16.2.jpg';
import back from "../../assets/images/14_02.png";

const Thuexe = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='mt-10'>
    <div className="rent-car-container">
  {/* {/* ảnh 1 * /} */}
  <div className="banner-rentCar container-fluid p-0 ">
    <img
      src={bannerXe}
      className="img-fluid"
      alt="..."
      style={{ width: "100%", marginBottom: "1em" }}
    />
    {/* {/* mô tả * /} */}
  
  </div>
  <div className="boxFleet-rentCar container backWhite-padding">
  <p
      className="text-uppercase title-rent"
      style={{ fontSize: "1.5em", textAlign: "center" }}
    >
      <b>XE DU LỊCH</b>
    </p>
    <div
      className="boxFleet position-relative"
      style={{ backgroundImage: `url(${back})` }}>
      <div className="contents-fleet-rent  ">
        <div className="fleet-item-rent">
          <div className="infor_fleet text-center">
            <span>
              Xe du lịch 7 chỗ <br />
              Xe du lịch 16 chỗ
            </span>
          </div>
          <a href="/">
            <img src={xe1} alt=""  />
          </a>
        </div>
      </div>
    </div>
    <p className="text-center mt-4">
      Hệ thống xe du lịch hơn 100 chiếc từ 7 -16 chỗ chỗ ngồi chất lượng cao,
      giá cả và dịch vụ tốt.
      <br />
      Khách hàng đến với TicketProWeb không còn phải lo ngại, đắn đo.
    </p>
  </div>
  {/* {/* text center * /} */}
  <div className="container my-4 p-0">
    <div className="backWhite-padding">
    <div className="row">
      <div className="col-sm">
        <img
          src={xe7}
          className="img-fluid"
          alt="..."
          style={{
            width: "21em",
            height: "15em",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",

          }}
        />
      </div>
      <div className="col-sm order-sm-later">
        <p className="text-uppercase" style={{ fontSize: "1.5em" }}>
          <b>XE DU LỊCH 7 CHỖ</b>
        </p>
        <p className="text-start">
          - Hệ thống xe du lịch 7 chỗ chất lượng cao với các dòng xe Toyota
          Fortuner. Không gian xe cao cấp cùng những tính năng thư giãn đi kèm,
          giúp bạn có được chuyến đi thật thoải mái.
        </p>
        <p className="text-start">
          - Dành cho khách từ 4- 6 người. Dòng xe Toyota Fortuner.{" "}
        </p>
      </div>
    </div>
    <br />
    <div className="container " style={{ margin: "2em 0" }}>
      <div className=" row">
        <div className="col-sm">
          <img
            src={xe7_nt1}
            className="img-fluid"
            alt="..."
            style={{
              width: "20em",
              height: "12em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "15%",
              marginBottom: "1em"
            }}
          />
        </div>
        <div className="col-sm">
          <img
            src={xe7_nt2}
            className="img-fluid"
            alt="..."
            style={{
              width: "20em",
              height: "12em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "15%",
              marginBottom: "1em"
            }}
          />
        </div>
        <div className="col-sm">
          <img
            src={xe7_nt3}
            className="img-fluid"
            alt="..."
            style={{
              width: "20em",
              height: "12em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "15%",
              marginBottom: "1em"
            }}
          />
        </div>
      </div>
    </div>
 {/*--------------------------- {/* nút đặt xe  * /----------------------}
        {/* Button trigger modal */}{" "}

<div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button
        type="button"
        className="btn btn-danger me-md-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        THUÊ XE
      </button>
    </div>
    </div>
   
    {/* {/* xe 16 chỗ * /} */}
    <div className="car mt-4 backWhite-padding">
      <div className="row">
        <div className="col-sm order-sm-last ">
          <img
            src={xe16}
            className="img-fluid"
            alt="..."
            style={{
              width: "24em",
              height: "14em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
     
            }}
          />
        </div>
        <div className="col-sm margins order-sm-first">
          <p className="text-uppercase" style={{ fontSize: "1.5em" }}>
            <b>XE DU LỊCH 16 CHỖ</b>
          </p>
          <p className="text-start">
            - Xe 16 chỗ sự góp mặt của dòng Toyota Hiace và Huyndai Solati phục
            vụ cho dịch vụ du lịch, trung chuyển và chạy hợp đồng. Các dòng xe
            đều có khả năng chứa hành lý thoải mái khi cần đi xa.
          </p>
          <p className="text-start">
            - Dành cho khách từ 6 - 15 người. Dòng xe Toyota Hiace, Huyndai
            Solati.
          </p>
        </div>
      </div>
      <br />
      <div className="container" style={{ marginBottom: "2em" }}>
        <div className=" row">
          <div className="col-sm">
            <img
              src={xe16_nt1}
              className="img-fluid"
              alt="..."
              style={{
                width: "20em",
                height: "12em",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15%",
                marginBottom: "1em"
              }}
            />
          </div>
          <div className="col-sm">
            <img
              src={xe16_nt2}
              className="img-fluid"
              alt="..."
              style={{
                width: "20em",
                height: "12em",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15%",
                marginBottom: "1em"
              }}
            />
          </div>
          <div className="col-sm">
            <img
              src={xe16_nt3}
              className="img-fluid"
              alt="..."
              style={{
                width: "20em",
                height: "12em",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15%",
                marginBottom: "1em"
              }}
            />
          </div>
        </div>
      </div>
      {/*----------------------------- {/* nút đặt xe  * /----------------------}
          {/* Button trigger modal */}{" "}
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
        <button
          type="button"
          className="btn btn-danger me-md-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          THUÊ XE
        </button>
      </div>
      {/*------------------------- {/* Modal * /} ---------------------------------*/}
      <div
  className="modal fade"
  id="exampleModal"
  tabIndex="{-1}"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-rent-car">
    <div className="modal-content">
      <div className="text-end pt-2">
        <button
          type="button"
          style={{ color: "gray", backgroundColor: "white" }}
          className="btn-close text-end"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      {/* <div class="modal-header"> */}
      <h5 className="modal-title text-center">Đăng ký thuê xe du lịch</h5>
      {/* </div> */}
      <div className="modal-body">
        <form action="">
          <div className="form-group">
            <label className="form-label">Anh / Chị</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Nơi đón</label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Địa diểm đón</option>
              <option value={1}>Hồ Chí Minh</option>
              <option value={2}>Nha Trang</option>
              <option value={3}>Hà Nội</option>
            </select>
            <div className="mt-2">
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder="Địa chỉ nơi đón"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Nơi trả</label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Địa diểm đón</option>
              <option value={1}>Hồ Chí Minh</option>
              <option value={2}>Nha Trang</option>
              <option value={3}>Hà Nội</option>
            </select>
            <div className="mt-2">
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder="Địa chỉ nơi trả"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Chọn loại xe</label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Chọn loại xe</option>
              <option value={1}>xe 16 chỗ</option>
              <option value={2}>xe 6 chỗ</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Số lượng khách</label>
            <input type="number" className="form-control" />
          </div>
          <div className="form-group w-100">
            <label className="form-label">Lịch trình</label>
            <select
              className="form-select "
              aria-label="Default select example"
            >
              <option selected="">Đưa đón 1 chiều</option>
              <option value={1}>Đưa đón 2 chiều</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Ngày đi</label>
            <input type="date" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Giờ đi</label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Giờ đi</option>
              <option value={1}>07:00</option>
              <option value={2}>08:00</option>
            </select>
          </div>
          <label className="form-label mt-2">
            Nếu chọn lịch trình khứ hồi thì mời chọn
          </label>
          <div className="form-group">
            <label className="form-label">Ngày về</label>
            <input type="date" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Giờ về</label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Giờ về</option>
              <option value={1}>07:00</option>
              <option value={2}>08:00</option>
            </select>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-danger">
              Đặt xe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
  </div>
</div>
</div>
  );
};

export default Thuexe;
