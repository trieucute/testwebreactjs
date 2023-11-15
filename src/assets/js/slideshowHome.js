// slideshow của content thông tin du lịch trong trang home

//   slide show
export const slide = () =>  document.querySelectorAll('.carousel-tour .carousel-item').forEach((item) => {

    let minPerSlide = 2;
    let next = item.nextElementSibling;
    if (!next) {
        next = item.parentNode.firstElementChild;
    }
    item.appendChild(next.firstElementChild.cloneNode(true));
    for (let i = 0; i < minPerSlide; i++) {
        next = next.nextElementSibling;
        if (!next) {
            next = item.parentNode.firstElementChild;
        }
        item.appendChild(next.firstElementChild.cloneNode(true));
    }
    });
// slide()


export const slideTicket =()=>{
  document.querySelectorAll('.carousel-card-item .carousel-item').forEach(function (item) {
    var minPerSlide = 4;
    var next = item.nextElementSibling;
    
    if (!next) {
      next = item.parentElement.firstElementChild;
    }
    
    item.appendChild(next.firstElementChild.cloneNode(true));
    
    for (var i = 0; i < minPerSlide; i++) { 
      next = next.nextElementSibling;
      if (!next) {
        next = item.parentElement.firstElementChild;
      }
      item.appendChild(next.firstElementChild.cloneNode(true));
    }
  });
}

