import React,{useEffect} from "react";
import '../../assets/css/introduce.css';
import bannerIntro from "../../assets/images/gioithieu.jpg";
import banner2 from '../../assets/images/bannerto.jpg'
import xegn from '../../assets/images/xegn1.jpg';
import xegn_nt1 from '../../assets/images/xegn2.jpeg';
import xegn_nt2 from '../../assets/images/xegn3.jpg';
import xegn_nt3 from '../../assets/images/xegm3.jpg';

import xeghe from '../../assets/images/xeghe.jpg';
import xeghe_nt1 from '../../assets/images/xeghe1.jpg';
import xeghe_nt2 from '../../assets/images/xeghe2.jpg';
import xeghe_nt3 from '../../assets/images/xeghe3.jpg';
const Introduce = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='mt-10'>
    <div className=" introduce-contents">
    {/* {/* ảnh 1 * /} */}
    <div className="banner-intro w-100">
      <div className="container-fluid p-0">
        <img src={bannerIntro} className="img-fluid w-100" alt="..." />
      </div>
    </div>
    {/* {/* mô tả * /} */}
    <div className="container backWhite-padding my-4" style={{ textAlign: "justify" }}>
      <p className="lh-base my-3 px-3">
        Trang web này là một nền tảng giúp người dùng dễ dàng tìm kiếm, đặt và mua
        vé xe khách trực tuyến một cách nhanh chóng và tiện lợi. Với trải nghiệm
        đơn giản và giao diện dễ sử dụng, chúng tôi giúp bạn tiết kiệm thời gian
        và công sức trong việc tìm kiếm và đặt vé xe cho mọi chuyến đi.
      </p>
      <p className="lh-base my-3 px-3">
        Với trang web thuê bán vé xe khách, bạn có thể dễ dàng tìm hiểu về các
        hãng xe khách, lịch trình, giá cả và các dịch vụ đi kèm. Bạn có thể đặt vé
        trực tiếp trên trang web của chúng tôi và thanh toán bằng nhiều phương
        thức khác nhau, bao gồm cả thẻ tín dụng, ví điện tử và chuyển khoản ngân
        hàng.
      </p>
      <p className="lh-base my-3 px-3">
        Đội ngũ chúng tôi luôn cập nhật thông tin về lịch trình, giá cả và các ưu
        đãi đặc biệt từ các hãng xe khách hàng đầu. Bạn có thể yên tâm về việc tìm
        kiếm và đặt vé với độ tin cậy cao và dịch vụ đáng tin cậy từ chúng tôi.
      </p>
      <p className="lh-base my-3 px-3">
        Ngoài ra, chúng tôi cũng cung cấp chế độ hỗ trợ khách hàng 24/7 để giải
        đáp mọi thắc mắc và hỗ trợ bạn trong quá trình đặt vé. Đội ngũ chuyên
        nghiệp, thân thiện và tận tâm của chúng tôi sẽ trả lời tất cả các câu hỏi
        của bạn và giúp bạn có một trải nghiệm đáng nhớ.
      </p>
      {/* {/* ảnh 2 * /} */}
      <br />
      <img
        src={banner2}
        className="img-fluid banner2"
        alt="..."
        style={{
          width: "80%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "1.5em"
        }}
      />
      {/* {/* text center * /} */}
      <p className="text-center mt-3 infor-text2">
        Với trang web thuê bán vé xe khách, chúng tôi là đối tác đáng tin cậy của
        bạn trong mọi chuyến đi. Hãy đến với chúng tôi và trải nghiệm sự tiện lợi
        và tin cậy khi đặt vé xe khách!
      </p>
      <div className="container mt-5">
        <div className="row m-0">
          <div className="col-sm img-des-bus--first">
            <img
              src={xegn}
              className="img-fluid"
              alt="..."
              style={{
                width: "21em",
                height: "18em",
                display: "block",
                borderRadius: "50%"
              }}
            />
          </div>
          <div className="col-sm p-0 mt-2">
            <p
              className="text-uppercase mb-3 title-intro"
              style={{  fontSize: "1.5em" }}
            >
              <b>xe giường nằm</b>
            </p>
            <p className="text-start " style={{ marginBottom: "0.5em" }}>
              - Xe giường nằm tiện nghi cao cấp
            </p>
            <p className="text-start" style={{ marginBottom: "0.5em" }}>
              - 41 Giường nằm / xe
            </p>
            <p className="text-start" style={{ marginBottom: "0.5em" }}>
              - Wifi Internet, mền, nước suối, khăn lạnh.
            </p>
          </div>
        </div>
        <br />
        <div
          className="container imgs-bus--Intro"
          style={{ marginBottom: "2em" }}
        >
          <div className="row m-0 justify-content-between ">
            <div className="col-xl-3 col-lg-3 col-sm-12">
              <img
                src={xegn_nt1}
                className="img-fluid"
                alt="..."
                style={{ width: "100%", display: "block", borderRadius: "15%" }}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-12">
              <img
                src={xegn_nt2}
                className="img-fluid"
                alt="..."
                style={{ width: "100%", display: "block", borderRadius: "15%" }}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-12">
              <img
                src={xegn_nt3}
                className="img-fluid"
                alt="..."
                style={{ width: "100%", display: "block", borderRadius: "15%" }}
              />
            </div>
          </div>
        </div>
        {/* {/* xe bus * /} */}
        <div className="car mt-5 mb-5">
          <div className="row m-0 ">
            <div className="col-sm order-sm-last img-des-bus--first">
              <img
                src={xeghe}
                className="img-fluid"
                alt="..."
                style={{
                  width: "21em",
                  height: "18em",
                  marginLeft: "auto",
                  display: "block",
                  borderRadius: "50%"
                }}
              />
            </div>
            <div className="col-sm mt-2 margins order-sm-first ps-5 img-des-bus--first">
              <p
                className="text-uppercase  mb-3 title-intro"
                style={{  fontSize: "1.5em" }}
              >
                <b>xe ghế nằm</b>
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Xe ghế nằm gồm: Ghế nằm cao cấp chuẩn hàng không
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Độ ngả tối đa: 160 độ, một hàng 3 ghế
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Màn hình cảm ứng chạm
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Jack tai nghe
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Cổng sạc đa năng
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Ghế ngả chỉnh điện cao cấp
              </p>
              <p className="text-start" style={{ marginBottom: "0.5em" }}>
                - Sàn được lót gỗ sang trọng.
              </p>
            </div>
          </div>
          <br />
          <div
            className="container imgs-bus--Intro"
            style={{ marginBottom: "2em" }}
          >
            <div className="row m-0 justify-content-between">
              <div className="col-xl-3 col-lg-3 col-sm-12">
                <img
                  src={xeghe_nt1}
                  className="img-fluid"
                  alt="..."
                  style={{ width: "100%", display: "block", borderRadius: "15%" }}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-12">
                <img
                  src={xeghe_nt2}
                  className="img-fluid"
                  alt="..."
                  style={{ width: "100%", display: "block", borderRadius: "15%" }}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-12">
                <img
                  src={xeghe_nt3}
                  className="img-fluid"
                  alt="..."
                  style={{ width: "100%", display: "block", borderRadius: "15%" }}
                />
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

export default Introduce;
