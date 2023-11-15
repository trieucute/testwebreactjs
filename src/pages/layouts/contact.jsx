import React,{useEffect} from "react";
import "../../assets/css/contact.css";
import bannerContact from "../../assets/images/lienhe-banner.png";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='mt-10'>
    <div className="contact-container container mb-5 ">
  {/* {/* banner * /} */}
<div className=" pt-2">


  <div className="row justify-content-center w-100 mx-auto backWhite-padding">
    {/* {/* contact address  * /} */}
    <div className="contact__address col-5">
      <p className="title">Liên hệ với chúng tôi</p>
      <div className="w-100">
        <p>
          Địa chỉ: Công viên phần mềm Quang QTSC Building 1, Trung, P Q.12,
          Thành phố Hồ Chí Minh
        </p>
        <p>Số điện thoại: 0369540497</p>
        <p>Email: webproticket@gmail.com</p>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064937!2d106.62525347481906!3d10.85382635776171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1692448798583!5m2!1svi!2s"
          width={600}
          height={301}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
    {/* {/* form * /} */}
    <div className="form col-5 ">
      <p className="title">
        <i className="fa-solid fa-envelope icon-email" /> Gửi thông tin liên hệ
        đến chúng tôi
      </p>
      <div className="form-group mb-2">
        <span>Họ và tên</span>
        <br />
        <input type="text" />
      </div>
      <div className="form-group mb-2">
        <span>Số điện thoại</span>
        <br />
        <input type="number" />
      </div>
      <div className="form-group mb-2">
        <span>Tiêu đề</span>
        <br />
        <input type="text" />
      </div>
      <div className="form-group mb-2">
        <span>Nội dung</span>
        <br />
        <textarea name="" id="" cols={70} rows={6} defaultValue={""} />
      </div>
      <div className="btn-send mt-3">
        {/* <button class="btn submit" type="submit">
              Gửi
            </button> */}
        <button type="button" className="btn button submit">
          <span style={{ margin: "0 0" }}> Gửi</span>
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
};

export default Contact;
