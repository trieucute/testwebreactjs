import React, {  useEffect,useRef ,useState} from "react";
import "../../assets/css/tuyendung.css";
import avatar1 from "../../assets/images/avatarnv1.jpg";
import avatar2 from "../../assets/images/avatarnv2.jpg";
import Pagination from "../../componets/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchjob } from "../../reduxTool/jobSlide";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const  Recruitment= () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Danh sách items của bạn
  // const itemListVacancies = [
  //   // { id: 1, name: "Lái xe KHÁCH GIƯỜNG NẰM" , salary:'Từ 25.000.000 VND đến 30.000.000 VND', location:'Lâm Đồng',deadlineDate:'30/02/2024' },
  //   // { id: 2, name: "Lái xe trung chuyển khách VP Bảo Lộc" , salary:'Từ 9.000.000 VND đến 11.000.000 VND', location:'Lâm Đồng',deadlineDate:'30/02/2024' },
  //   // { id: 3, name: "Tiếp nhận khách TPHCM" , salary:'Từ 7.000.000 VND đến 10.000.000 VND', location:'Hồ Chí Minh',deadlineDate:'30/12/2023' },
  //   // { id: 4, name: "Tổng đài viên TPHCM" , salary:'Từ 7.000.000 VND đến 10.000.000 VND', location:'Hồ Chí Minh',deadlineDate:'30/12/2023' },
  //   // { id: 5, name: "Nhân viên Giao nhận hàng tại kho VP Bảo Lộc" , salary:'Từ 7.000.000 VND đến 8.000.000 VND', location:'Lâm Đồng',deadlineDate:'30/12/2023' },
  //   // { id: 6, name: "Lái xe Trung chuyển hàng Tp HCM" , salary:'Từ 12.000.000 VND đến 13.000.000 VND', location:'Hồ Chí Minh',deadlineDate:'30/12/2023' },
  //   // { id: 7, name: "Lái xe Trung chuyển hàng Tp HCM" , salary:'Từ 12.000.000 VND đến 13.000.000 VND', location:'Hồ Chí Minh',deadlineDate:'30/12/2023' },
  // ];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số lượng items hiển thị trên mỗi trang

  const firstVisibleItemRef = useRef(null); // Tham chiếu của phần tử đầu tiên trong trang hiện tại

  useEffect(() => {
  window.scrollTo(0, 0);
   
    // Cuộn đến phần tử đầu tiên của trang hiện tại khi currentPage thay đổi
    if (firstVisibleItemRef.current) {
      window.scrollTo(0, 500);
      firstVisibleItemRef.current.scrollTo(0, 500);
     
    }

  }, [currentPage]);

  const {job, isLoading} = useSelector (state => state.job)
  const itemListVacancies = job

  console.log(job,'job');
  useEffect(()=>{
    dispatch(fetchjob())
  },[])
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemListVacancies?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className='mt-10'>
<div className="container recruitment-containers ">
  <div className="recruitment-container py-4">
    <div className=" backWhite-padding">
<div className="box-brings-contents" >
      <h1 className="text-uppercase text-center mb-4 text-title-recruitment">
        TicketProWeb sẽ mang đến cho bạn
      </h1>
      <div className="row justify-content-between mt-4">
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <i className="fas fa-house" />
            </div>
            <div className="col-12">
              Môi trường làm việc thoải mái, linh hoạt, dân chủ
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <i className="fas fa-hand-holding-heart" />
            </div>
            <div className="col-12">
              Có định hướng tốt.Mang nhiều giá trị xã hội
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <i className="far fa-rectangle-list" />
            </div>
            <div className="col-12">
              Chính sách, phúc lợi liên tục được nâng cao.
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <i className="fas fa-people-robbery" />
            </div>
            <div className="col-12">
              Con người cởi mở, sẵn sàng hỗ trợ lẫn nhau
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <i className="fas fa-star" />
            </div>
            <div className="col-12">Các giá trị văn hóa được thể hiện tốt</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row items-brings">
            <div className="col-12">
              <svg
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M59.7917 36.458C59.7917 50.9553 48.039 62.708 33.5417 62.708C19.0445 62.708 7.29175 50.9553 7.29175 36.458C7.29175 21.9607 19.0445 10.208 33.5417 10.208"
                  stroke="#FE9831"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 41.5622C29.8958 41.5622 35 40.833 45.2083 27.708"
                  stroke="#FE9831"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M33.5417 27.7082H45.2084V39.3748M45.2084 7.2915V13.854M63.4376 24.7915H56.8751M59.6313 10.2082L53.9584 15.8811"
                  stroke="#FE9831"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="col-12">Sản phẩm được cải tiến ngày càng tốt</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
   
    <div className="vacancies-container my-5">
        <div className=" backWhite-padding">
      <h1 className="text-title-recruitment text-uppercase text-center ">
        các vị trí tuyển dụng tại ticketproweb
      </h1>
      {/* <div className="image-line2" /> */}
      <div className="vacancies-contents">
      {/* {currentItems.map((item, index) => (
   <div className="items-vacancies" key={item.id}  >
   <div className="row align-items-center m-0">
     <div className="col p-0">
       <div className="row m-0">
         <div className="col-12 title-position">
           {item.name}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-sack-dollar" />
           {item.salary}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-location-dot" />
           {item.location}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-clock" />
           Hạn nộp hồ sơ {item.deadlineDate}
         </div>
       </div>
     </div>
     <div className="col-md-3 p-0">
       <div className="b-email">
         Gửi CV trực tiếp về Email: <b>ticketproweb@gmail.com</b>{" "}
       </div>
     </div>
   </div>
 </div>

      ))} */}
{currentItems?.map((item, index) => (
   <div className="items-vacancies" key={item.id}  >
   <div className="row align-items-center m-0">
     <div className="col p-0">
       <div className="row m-0">
         <div className="col-12 title-position">
           {item.title}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-sack-dollar" />
           {item.salary.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-location-dot" />
           {item.location}
         </div>
         <div className="col-12 ps-4">
           <i className="fas fa-clock" />
            {item.description}
         </div>
       </div>
     </div>
     <div className="col-md-3 p-0">
       <div className="b-email">
         Gửi CV trực tiếp về Email: <b>ticketproweb@gmail.com</b>{" "}
       </div>
     </div>
   </div>
 </div>

      ))}
<Pagination
  itemsPerPage={itemsPerPage}
  totalItems={itemListVacancies?.length}
  paginate={paginate}
  
/>
     
      
      </div>
      </div>
      {/* <nav aria-label="Page navigation example" className="page-navigation">
        <ul className="pagination"></ul>
      </nav> */}
    </div>
    <div className="employee-container my-5 backWhite-padding">
      <h1 className="text-title-recruitment text-uppercase text-center ">
        NHÂN VIÊN GẮN BÓ NÓI VỀ TICKETPROWEB
      </h1>
      {/* <div className="image-line" /> */}
      <div className="row justify-content-between mt-7 employ-contents">
        <div className="col-md-4 mt-3 items-employee">
          <div className=" card">
            <img
              src={avatar2}
              alt="employee"
              className="card-img-top"
            />
            <div className="card-body">
              <div className="card-text">
                "Đây là môi trường an toàn có thể thoả sức sáng tạo, phát triển
                hết mình...tôn trọng màu sắc riêng mỗi người mọi người cùng
                hướng tới mục tiêu chung"
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3 items-employee">
          <div className=" card">
            <img
              src={avatar1}
              alt="employee"
              className="card-img-top"
            />
            <div className="card-body">
              <div className="card-text">
                "Mình được phát huy thế mạnh của bản thân..., không có rào cản
                giữa sếp và nhân viên, mọi người thoải mái trao đổi và đưa quan
                điểm để hướng tới kết quả tốt nhất"
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3 items-employee">
          <div className=" card">
            <img
              src={avatar2}
              alt="employee"
              className="card-img-top"
            />
            <div className="card-body">
              <div className="card-text">
                "TicketProWeb luôn chú trọng việc phát triển cho nhân viên, mình
                đã có thể hiểu, biết được bản thân mình tốt về mặt nào và tìm
                được cách nâng cao kỹ năng bản thân"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="line-qanda" />
    <div className="questions-asked-container my-5">
      <h1 className="text-title-recruitment text-uppercase text-center ">
        Câu hỏi thường gặp
      </h1>
      <div className="question-contents">
        <div className="row m-0 justify-content-between">
          <div className="col-md-5 p-0">
            <div className="row m-0 item-question">
              <div className="col-12">
                Làm sao để biết 1 vị trí còn đang nhận CV không?
              </div>
              <div className="col-12">
                Để thuận tiện cho bạn trong việc theo dõi các vị trí, TicketProWeb chỉ
                hiển thị các vị trí đang còn tuyển dụng nên nếu bạn còn thấy tin
                tuyển dụng thì nhanh tay gửi CV cho TicketProWeb nhé.
              </div>
            </div>
            <div className="row m-0 item-question">
              <div className="col-12">Cách thức ứng tuyển tại TicketProWeb?</div>
              <div className="col-12">
                Gửi CV trực tiếp về Email: <b>ticketproweb@gmail.com</b> (nhớ
                ghi rõ vị trí bạn muốn ứng tuyển nhé)
              </div>
            </div>
            <div className="row m-0 item-question">
              <div className="col-12">Quy trình phỏng vấn tại TicketProWeb?</div>
              <div className="col-12">
                Quy trình phỏng vấn cho mỗi vị trí thường không hoàn toàn giống
                nhau, trong vòng từ 3-5 ngày từ lúc ứng tuyển nếu CV của bạn phù
                hợp với vị trí, bộ phận Nhân sự sẽ liên hệ lại cho bạn để trao
                đổi về công việc cũng như phổ biến quy trình phỏng vấn cho bạn
                nhé. (Nhu cầu tuyển cho mỗi vị trí có giới hạn về số lượng,
                TicketProWeb rất tiếc chưa thể liên hệ đến tất cả các CV gửi về mà chỉ
                liên hệ các CV phù hợp nhất với vị trí mong các bạn thông cảm
                nhé)
              </div>
            </div>
            <div className="row m-0 item-question">
              <div className="col-12">Thời gian làm việc?</div>
              <div className="col-12">
                Từ 8h30- 12h00 và 13h30-18h00 từ thứ Hai- sáng thứ Bảy. Riêng
                team Chăm sóc khách hàng sẽ làm việc theo thời gian riêng của
                team nhé.
              </div>
            </div>
          </div>
          <div className="col-md-5 p-0">
            <div className="row m-0 item-question">
              <div className="col-12">Quy định về đồng phục?</div>
              <div className="col-12">
                Tại TicketProWeb không có quy định về đồng phục, bạn có thể thoải mái
                thể hiện phong cách trang phục của mình lưu ý không phản cảm là
                được bạn nhé.
              </div>
            </div>
            <div className="row m-0 item-question">
              <div className="col-12">
                Kinh nghiệm làm việc có phải là yếu tố quyết định cho sự phù hợp
                với TicketProWeb?
              </div>
              <div className="col-12">
                Kinh nghiệm làm việc là yếu tố quan trọng tuy nhiên tại TicketProWeb
                đó không phải là yếu tố đầu tiên vì hàng năm TicketProWeb đều tạo ra
                nhiều cơ hội cho các bạn trẻ chưa có kinh nghiệm tại các vị trí
                intern, trainee, junior. TicketProWeb tìm kiếm những nhân sự phù hợp
                với văn hoá và định hướng với tổ chức như: có tinh thần Customer
                first, không ngừng học hỏi và phát triển bản thân, làm việc với
                “tinh thần tự chủ” và đề cao “tinh thần đồng đội”, bạn có thể
                xem thêm tại “Chân dung nhân tài tại TicketProWeb” để xác định sự phù
                hợp của mình với TicketProWeb nhé.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="line-qanda" />
  </div>
</div>
</div>

  );
};

export default Recruitment;
