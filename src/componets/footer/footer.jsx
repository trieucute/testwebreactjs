import React from 'react';
import '../../assets/css/footer.css';
import thongbao from '../../assets/images/logoSaleNoti.png'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer>
        <div className="footer-container container">
          <div className="d-flex width-main-items justify-content-around w-100 pt-4 flex-wrap">
            <div className="w-20 ">
              <h5 className="text-center">Liên hệ </h5>
              <div className="mt-4">
                <ul className="d-flex flex-column text-decoration-none list-style-none text-left ">
                  <li className="list-group-item mb-2 ">
                    <a href="/">
                      TRUNG TÂM TỔNG ĐÀI &amp; CSKH: <br />
                      <b style={{ color: "#FE9831" }}>0369540497</b>{" "}
                    </a>{" "}
                  </li>
                  <li className="list-group-item mb-2">
                    <a href="/">EMAIL: ticketproweb@gmail.com</a>
                  </li>
                  <li className="list-group-item mb-2">
                    <a href="/">
                      ĐỊA CHỈ: Công viên phần mềm Quang QTSC Building 1, Trung, P
                      Q.12, Thành phố Hồ Chí Minh
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-20 ">
              <h5 className="text-center">Hỗ trợ </h5>
              <div className="mt-4">
                <ul className="d-flex flex-column text-decoration-none list-style-none text-left ">
                  <li className="list-group-item mb-2 ">
                    <Link to='/searchTicket'>Tra cứu thông tin đặt vé</Link>{" "}
                  </li>
                  <li className="list-group-item mb-2">
                  <Link to='/rules'>Điều khoản sử dụng</Link>
                  </li>
               
                  <li className="list-group-item mb-2">
                  <Link to='/questions'>Câu hỏi thường gặp</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-20 ">
              <h5 className="text-center">Kết nối chúng tôi </h5>
              <div className="iconband-header w-50 m-auto mt-4">
                <ul className="d-flex flex-row text-left p-0 w-100 justify-content-center">
                  <li className="mb-3 ">
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                      </svg>
                    </a>{" "}
                  </li>
                  <li className="mb-3 ms-2">
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                      </svg>
                    </a>
                  </li>
                  <li className="mb-3 ms-2">
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-center mt-3">
                <img src={thongbao} alt="" style={{ width: 220 }} />
              </div>
            </div>
            <div className="w-20 text-center mt-1">
              <div className="mt-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064937!2d106.62525347481906!3d10.85382635776171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1692587002416!5m2!1svi!2s"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          <div className="bot-footer width-main-items">
            @Copyright © 2023 TicketProWeb
          </div>
        </div>
      </footer>
      
    );
};

export default Footer;