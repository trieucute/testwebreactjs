import React from 'react';
import '../../assets/css/index.css';

import Book from '../../componets/searchBook/bookTicket';
import RoutesBus from '../../componets/home/routesBusPopular';

import TouristInformation from '../../componets/home/touristInformation';
import hinh1 from '../../assets/images/1.png';
import hinh2 from '../../assets/images/2.png';
import hinh3 from '../../assets/images/3.png';
import hinh4 from '../../assets/images/4.png';
import client1 from '../../assets/images/boxclientxe2.jpg';
import footerback from '../../assets/images/footer.png';

import xe1 from "../../assets/images/xe11.gif";
import xe2 from "../../assets/images/xe2.gif";
import back from "../../assets/images/14_02.png";
import Slideshow from '../../componets/home/slideshow';




const Home = () => {
    return (
        <div className='w-100'>
        
        
  {/* ------------------Banner -----------------------*/}
      <Slideshow/>

  {/*-----------------END  Banner ------------------*/}
  {/*-----------------END  tìm kiếm chuyến xe đi ------------------*/}
                    <Book/>
  {/*-----------------END  tìm kiếm chuyến xe đi------------------*/}

                <div className='RoutesBus mt container backWhite-padding'>
                    <RoutesBus/>
                </div>
                <div className='SystemBus container backWhite-padding'>
                <div className='contentsTopFleet-container w-full'>
            <div className="title_home_bus ">
                    <h1>Hệ thống đội xe</h1>
            </div>
            <div className='contentsTopFleet text-center' >
                <div className='contents-des'>
                WebProTicket nỗ lực hoàn thiện dịch vụ và khẳng định được giá trị của mình trong ngành vận tải đường bộ với đội xe được đánh giá đạt chất lượng hàng đầu.
                </div>
            
            <div className="boxFleet"  style={{ backgroundImage: `url(${back})` }}>
                <div className="contents-fleet d-flex justify-content-center">
                    <div className="fleet-item">
                        <a href="#">
                            <img src={xe1} alt="" />
                        </a>
                        <div className='infor_fleet'>
                        <div className='infor-pad'>
                            <span>Xe du lịch 7 chỗ <br />
                            Xe du lịch 16 chỗ</span>
                            </div>
                        </div>
                    </div>
                    <div className="fleet-item">
                        <a href="#" >
                            <img src={xe2} alt="" />
                        </a>
                        <div className='infor_fleet'>
                            <div className='infor-pad'>
                                <span>
                            Xe giường nằm <br />
                            Xe ghế nằm
                            </span>
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </div>
                </div>
                <div className='bus-tour-infor--container container backWhite-padding'>
                    <div className='title_home_bus '>
                        <h1>Xe Khách Thoải Mái</h1>
                        <p>Khám phá lợi ích tiện lợi</p>
                    </div>
                
                    <div className='grid-content--infor' >
                        <div className='grid-item1'>
                            <img src={client1} alt="" className='img-fluid'/>
                        </div>
                        <div className='grid-item2 grid-item '>
                        <div className='w-100'><i className="fas fa-couch"></i></div>
                        <p className='w-100'>Không gian thoải mái</p>
                        
                        </div>
                        <div className='grid-item3 grid-item'>
                        <div className='w-100'><i class="fas fa-shield"></i></div>
                        <p className='w-100'>An toàn và tiện lợi</p>
                        </div>
                        <div className='grid-item4 grid-item'>
                        <div className='w-100'><i class="fas fa-calendar"></i></div>
                        <p className='w-100'>Lịch trình cá nhân</p>
                        </div>
                        <div className='grid-item5 grid-item'>
                        <div className='w-100'><i class="fas fa-bus"></i></div>
                        <p className='w-100'>Nhiều tuyến xe</p>
                        </div>
                    </div>
                </div>
                <div className='TouristInformation container backWhite-padding'>
                    <TouristInformation/>
                </div>
                <div className='introduce-web-container'>
                    <div className='container' style={{backgroundImage:`url(${footerback})`}}>
                    <h1> LÝ DO ĐỂ BẠN TIN CHỌN XE KHÁCH <span>TICKETPROWEB</span> </h1>
                    <div className='d-flex flex-wrap justify-content-center align-items-start'>
                        <div className="content-items-introduce d-flex flex-wrap justify-content-center">
                            <div className='img-des text-center'><img src={hinh1} alt="" /></div>
                            <div className="introduce-des text-center">
                                Luôn luôn lắng nghe và phục vụ khách hàng 24/24
                            </div>
                        </div>
                        <div className="content-items-introduce  d-flex flex-wrap justify-content-center">
                        <div className='img-des text-center'><img src={hinh2} alt="" /></div>
                            <div className="introduce-des text-center">
                            Hệ thống xe mới được trang bị tiện ích cao cấp, hiện đại
                            </div>
                        </div>
                        <div className="content-items-introduce  d-flex flex-wrap justify-content-center">
                        <div className='img-des text-center'><img src={hinh3} alt="" /></div>
                            <div className="introduce-des text-center">
                            Đội ngũ nhân viên, lái xe được đào tạo chuyên nghiệp
                            </div>
                        </div>
                        <div className="content-items-introduce  d-flex flex-wrap justify-content-center">
                        <div className='img-des text-center'><img src={hinh4} alt="" /></div>
                            <div className="introduce-des text-center">
                            Cách thức đặt chỗ nhanh chóng và tiện lợi, mọi lúc mọi nơi
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        
        </div>
    );
};

export default Home;