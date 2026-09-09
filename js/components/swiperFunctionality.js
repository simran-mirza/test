export function initSwiperFunctionality() {
  const thumbsSwiper = new Swiper(".thumbsSwiper", {
    slidesPerView: 6,
    spaceBetween: 0,
    watchSlidesProgress: true,
    // freeMode: true,
    // slideToClickedSlide: true,

    a11y: {
      enabled: true,
    },

    breakpoints: {
      200: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 2,
      },
      310: {
        slidesPerView: 2.5,
      },
      400: {
        slidesPerView: 2.5,
      },
      500: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2.5,
      },
      600: {
        slidesPerView: 3.2,
      },
      803: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    },
  });

  const mainSwiper = new Swiper(".mainSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      enabled: true,
    },
    // thumbs: {
    //   swiper: thumbsSwiper,
    // },
    allowTouchMove: true,
    autoHeight: true,

    breakpoints: {
      991: {
        allowTouchMove: false,
      },
    },
  });


  // ==========================
  // slide accessibility
  // ==========================
  function updateSlideAccessibility() {
    const slides = document.querySelectorAll(".mainSwiper .swiper-slide");

    slides.forEach((slide, index) => {
      // allows for user to tab on active slide without interacting with other slides
      slide.inert = index !== mainSwiper.activeIndex;
    });
  }


  // ==========================
  // toolbar navigation
  // =========================
  const navButtons = document.querySelectorAll(".thumbsSwiper button");

  function updateBottomNav() {
    const activeIndex = mainSwiper.activeIndex;

    navButtons.forEach((button) => {
      const buttonIndex = Number(button.dataset.slide);

      const isActive = buttonIndex === activeIndex;

      button.classList.toggle("active", isActive);

      // A11Y addition
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }


  // =========================================
  // Bottom navigation buttons
  // =========================================

  // checks if slide has changed on toolbar bottom nav
  let focusNewSlide = false;

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const slideIndex = Number(this.dataset.slide);

      focusNewSlide = true;

      mainSwiper.slideTo(slideIndex);
    });
  });


  // =========================================
  // Toolbar bottom nav/slide functions
  // =========================================

  mainSwiper.on("slideChange", function () {
    updateSlideAccessibility();
    updateBottomNav();

    thumbsSwiper.slideTo(mainSwiper.activeIndex);

    // reset height when user navigates to new slide
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });


  // =========================================
  // Focus tab on active page only
  // =========================================

  mainSwiper.on("slideChangeTransitionEnd", function () {
    if (!focusNewSlide) {
      return;
    }

    const currentSlide = mainSwiper.slides[mainSwiper.activeIndex];

    const heading = currentSlide.querySelector("h1, h2, h3");

    if (heading) {
      heading.focus();
    }

    focusNewSlide = false;
  });

  
  // =========================================
  // Init for first load
  // =========================================

  updateSlideAccessibility();
  updateBottomNav();
}
