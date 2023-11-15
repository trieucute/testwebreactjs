var swiper = new Swiper(".slide-content", {
  slidesPerView: 4,
  spaceBetween: 22,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
      1200:{
          slidesPerView: 4,
      },
      1440: {
          slidesPerView: 4,
      }
  },
});