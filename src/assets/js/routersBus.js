// File này gồm:
    // avtive chuyến xe về
    // active button floor (tầng trên, tầng dưới)
    //  avtive ra bộ lộc tìm kiếm khi dùng mobile 
    // Cuộn trang (mobile) thì cho fixed cái tên của kết quả tìm kiếm (title bus search)


// avtive chuyến xe về
export const tabs = () => {
     let tabs = document.querySelectorAll(".tabs");
    let content = document.querySelectorAll(".items-results-search");
    const openTabs = (e) => {
      let btn = e.currentTarget;
      // console.log(btn);
      let dataTab = btn.dataset.tabs;
      // console.log(dataTab);
      content.forEach(function (el) {
        el.classList.remove("active");
      });
      tabs.forEach(function (el) {
        el.classList.remove("active_tabs");
      });
      document.querySelector("#" + dataTab).classList.add("active");
      btn.classList.add("active_tabs");
    };
    tabs.forEach((e) => {
      e.addEventListener("click", openTabs);
    });

  };
  
  // // active button floor (tầng trên, tầng dưới)
  // export const acitveBtnFloor = () => {
  //   document.addEventListener("DOMContentLoaded", function() {
  //     var labels = document.querySelectorAll(".btn-floor");
  //     console.log(labels);
  //     labels.forEach(function(label) {
  //       label.addEventListener("click", function() {
  //         this.classList.toggle("active-btn");
  //         console.log(label);
  //       });
  //     });
  //   });
    
  // }
  export const acitveBtnFloor = () => {
    // document.addEventListener("DOMContentLoaded", function() {
      var labels = document.querySelectorAll(".btn-floor");
      let clickCount = false;

      console.log(labels);
      labels.forEach(function(label) {
        label.addEventListener("click", function(e) {
          if( clickCount){
          clickCount=!clickCount
            e.target.classList.add("active-btn");
            console.log(label);
          }else{
            clickCount=!clickCount

            e.target.classList.remove("active-btn");

          }
        
          
        });
       
      }); 
    // });
    
  }

//   avtive ra bộ lộc tìm kiếm khi dùng mobile 
export  const filterMobile=()=>{
      let checked = document.querySelector('#filter-toggler');
      let filterBox= document.querySelector('.search-filters');
      if(checked){
         checked.addEventListener('click',()=>{
          filterBox.classList.toggle('activeFil');
  
      })
      } 
      let closeFil=document.querySelector('.close-filter')
     if(closeFil){
        closeFil.addEventListener('click',()=>{
        filterBox.classList.remove('activeFil');
       
      })
     }
      let clickbackground=document.querySelector('.background')
    if(clickbackground){
      clickbackground.addEventListener('click',()=>{
              filterBox.classList.remove('activeFil');
        
            })
    }
     
     
    }


// Cuộn trang (mobile) thì cho fixed cái tên của kết quả tìm kiếm (title bus search)
export function scrollFunction() {
  window.addEventListener('scroll', function() {
    var menu = document.querySelector('.fixed-mobile-results');
    if(menu){
      var maxHeight = 650; // Độ cao tối đa của menu
      var scrollHeight = window.scrollY; // Chiều cao cuộn của trang
    
      if (scrollHeight > maxHeight) {
        menu.classList.add('fixed-item');
   
        
      } else {
        menu.classList.remove('fixed-item');
      }

    }
      });  
}
