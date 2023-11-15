// File này gồm:
    // active các bước khi đặt vé khi dùng mobile 
    // active thông tin xe 
  // click ghế còn trống

// active các bước khi đặt vé khi dùng mobile 
export const tabsStepMobile = () => {
    const tabs = document.querySelectorAll(".tabs-step");
    const butNext = document.querySelectorAll(".button_step");
    const content = document.querySelectorAll(".items-choose");
  
    const openTabs = (e) => {
      const btn = e.currentTarget;
      const dataTab = btn.dataset.tabs;

      const dataNext = btn.dataset.next;
  
      content.forEach((el) => {
        el.classList.remove("active-step-item");
      });
      tabs.forEach((el) => {
        el.classList.remove("active-step");
      });
  
      if (dataTab) {
        document.querySelector("#" + dataTab).classList.add("active-step-item");
        btn.classList.add("active-step");
      }
  
      if (dataNext) {
        document.querySelector("#" + dataNext).classList.add("active-step-item");
        const id = document.querySelector('.active-step-item').getAttribute("id");
        document.querySelectorAll(".tabs-step").forEach((e) => {
          if (e.dataset.tabs === id) {
            e.classList.add("active-step");
          }
        });
      }
  
  
    };
  
    tabs.forEach((e) => {
      e.addEventListener("click", openTabs);
    });
    butNext.forEach((e) => {
      e.addEventListener("click", openTabs);
    });

  };
// tabsStepMobile()


  // active thông tin xe 
  export const showInforBus=()=>{
    

      let InforBus = document.getElementById('infor_bus_router');
      let showInfor = document.querySelector('.infor_bus_router');
    
      if (InforBus) {
        InforBus.addEventListener("click", () => {
          showInfor.classList.add('active-busInfor');
        });
      }
      
      showInfor.classList.remove('active-busInfor');
    
      let close = document.querySelector('#close-infor');
      if (close) {
        close.addEventListener('click', () => {
          showInfor.classList.remove('active-busInfor');
        });
      }
    
  }
    
// showInforBus()


  // click ghế còn trống
  export const chairChoose =()=>{
    const items= document.querySelectorAll('.chair-items');


    let selectedChairs = []; // Mảng lưu trữ danh sách các mục đã được chọn
    items.forEach((e)=>{
      e.isClicked = false; // Thêm thuộc tính 'isClicked' để theo dõi trạng thái click
      e.addEventListener('click',(event)=>{
        const chair = event.currentTarget;
        const path = chair.querySelector('path');
        const nameChair = chair.querySelector('.name-chair');
        console.log(nameChair.innerHTML);
        const nameMobileChair= document.getElementById('item-chair-chosen')
      
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

      })
    })
  }

  // chairChoose()


   // click ghế còn trống của trang đặt vé khứ hồi
   export   const chairChooseGoAndBack =()=>{
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
      console.log(selectedChairsGo);
      });
    });

    itemsBack.forEach((e) => {
      e.isClicked = false;
      e.addEventListener('click', (event) => {
        const chair = event.currentTarget;
        const nameMobileChairBack = document.getElementById('item-chair-chosen-back');
        handleClick(chair, selectedChairsBack, nameMobileChairBack);
      console.log(selectedChairsBack);

      });
    });
   
  }

  // chairChooseGoAndBack()