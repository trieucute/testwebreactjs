import React,{useState, useRef, useEffect} from 'react';

const Test = () => {
    // Khởi tạo state
//     const [chairData, setChairData] = useState([]);
//     const refChairItem = useRef();

// // Hàm xử lý khi click vào "chair-item-go"
// const handleClick = (event) => {
//   // Lấy nội dung của name-chair
//   const name = event.target.nextSibling.innerText;
//   console.log(event.target.lastChild);
//   // Đổi màu của path thành màu đỏ
// //   event.target.firstChild.setAttribute("fill", "red");
//   const path = refChairItem.current.querySelector('path');

//   // Đổi màu của path thành màu đỏ
//   path.setAttribute('fill', 'red');
//   // Lưu trữ nội dung và màu vào mảng chairData
//   setChairData([...chairData, { name, color: "red" }]);
// };
const chairChooseGoAndBack =()=>{
    const itemsGo= document.querySelectorAll('.chair-item-go');
    const itemsBack= document.querySelectorAll('.chair-item-back');

    let selectedChairsGo = []; // Mảng lưu trữ danh sách các mục đã được chọn
    let selectedChairsBack = []; // Mảng lưu trữ danh sách các mục đã được chọn
    
    const handleClick = (chair, selectedChairs, nameMobileChair) => {
      const path = chair.querySelector('path');
      const nameChair = chair.querySelector('.name-chair');
      if (chair.isClicked) {
        // Nếu đã được click trước đó
        path.style.fill = ''; 
        nameChair.style.color = ''; 
        chair.isClicked = false; // Đặt trạng thái click thành false
        const index = selectedChairs.indexOf(nameChair.innerHTML);
        if (index > -1) {
          selectedChairs.splice(index, 1); // Lọc bỏ phần tử đã được click
        } 
      } else {
        // Nếu chưa được click trước đó
        path.style.fill = '#E63946'; 
        nameChair.style.color = '#E63946'; 
        chair.isClicked = true; // Đặt trạng thái click thành true
        selectedChairs.push(nameChair.innerHTML); // Thêm vào mảng
         
      }
        nameMobileChair.innerText = selectedChairs.join(', '); // Hiển thị danh sách đã chọn với dấu phẩy
      console.log( selectedChairs);
    }

    itemsGo.forEach((e) => {
      e.isClicked = false;
      e.addEventListener('click', (event) => {
        const chair = event.currentTarget;
        const nameMobileChairGo = document.getElementById('item-chair-chosen-go');
        handleClick(chair, selectedChairsGo, nameMobileChairGo);
    //   console.log(selectedChairsGo);
      });
    });

    itemsBack.forEach((e) => {
      e.isClicked = false;
      e.addEventListener('click', (event) => {
        const chair = event.currentTarget;
        const nameMobileChairBack = document.getElementById('item-chair-chosen-back');
        handleClick(chair, selectedChairsBack, nameMobileChairBack);
    //   console.log(selectedChairsBack);

      });
    });
   
  }
  useEffect(()=>{
    chairChooseGoAndBack()

  },[])
    return (
        <div>
                    <div
                              className=" position-relative chair-item-go" 
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#2E8A99"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B10
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#2E8A99"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B11
                              </span>
                            </div>
                         
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#2E8A99"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B12
                              </span>
                            </div>
                         
                          
                            

        {/* {chairContent.map((content, index) => (
  <div key={index}>{content}</div>
))} */}
        </div>
    );
};

export default Test;