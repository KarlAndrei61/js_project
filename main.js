let navbar = document.querySelector('#navbar');
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 0){
        navbar.classList.add('scrollingnavbar')
    }else{
        navbar.classList.remove('scrollingnavbar')
    }
})

let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });