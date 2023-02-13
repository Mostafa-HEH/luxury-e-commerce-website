// *****************************
// **** Hero section slides ****
// *****************************

// Controllers selector
const heroSlideLeftControler = document.getElementById(
  "heroSlideLeftControler"
);
const heroSlideRightControler = document.getElementById(
  "heroSlideRightControler"
);

// Bullet Selectors
const heroSlidesBullet = document.querySelectorAll(
  ".hero-section .slides .slides__bullets .bullet"
);

// Slides Selectors
const heroSlides = document.querySelectorAll(
  ".hero-section .slides .slides__slide"
);

// current displaied slide
let heroCurrentSlide = 1;

// Change Bullet
const changeHeroBullet = (current) => {
  // Remove active bullet
  heroSlidesBullet.forEach((bullet) =>
    bullet.classList.remove("bullet--active")
  );

  // Active current bullet
  heroSlidesBullet[heroCurrentSlide].classList.add("bullet--active");
};

// Change Slide
const changeHeroSlide = (current) => {
  // Remove active slide
  heroSlides.forEach((slide) =>
    slide.classList.remove("slides__slide--active")
  );

  // Active current bullet
  heroSlides[heroCurrentSlide].classList.add("slides__slide--active");
};

// Click at controlers
heroSlideLeftControler.addEventListener("click", () => {
  if (heroCurrentSlide <= 0) heroCurrentSlide = 2;
  else heroCurrentSlide--;

  // Change Bullet
  changeHeroBullet(heroCurrentSlide);

  // Change Slide
  changeHeroSlide(heroCurrentSlide);
});

heroSlideRightControler.addEventListener("click", () => {
  if (heroCurrentSlide >= 2) heroCurrentSlide = 0;
  else heroCurrentSlide++;

  // Change Bullet
  changeHeroBullet(heroCurrentSlide);

  // Change Slide
  changeHeroSlide(heroCurrentSlide);
});

// Change Bullet by click on it
heroSlidesBullet.forEach((bullet) =>
  bullet.addEventListener("click", (e) => {
    if (heroCurrentSlide === parseInt(e.target.dataset.id)) return;

    heroCurrentSlide = parseInt(e.target.dataset.id);

    // Change Bullet
    changeHeroBullet(heroCurrentSlide);

    // Change Slide
    changeHeroSlide(heroCurrentSlide);
  })
);

// Change slides by swipe for touch devices
let touchstartX = 0;
let touchendX = 0;

const checkDirection = () => {
  if (touchendX < touchstartX) {
    if (heroCurrentSlide >= 2) heroCurrentSlide = 0;
    else heroCurrentSlide++;
  }
  if (touchendX > touchstartX) {
    if (heroCurrentSlide <= 0) heroCurrentSlide = 2;
    else heroCurrentSlide--;
  }

  // Change Bullet
  changeHeroBullet(heroCurrentSlide);

  // Change Slide
  changeHeroSlide(heroCurrentSlide);
};

document.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});
