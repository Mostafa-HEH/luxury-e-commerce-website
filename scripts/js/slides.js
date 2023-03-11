// ==((This script contains Slides for))==
// - Hero section slides for Home v1, Home v2, Home v3
// - Offers section slides for Home v1

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
  ".hero-section .slides .bullets .bullet"
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

// *******************************
// **** Offers section slides ****
// *******************************

// Bullet Selectors
const offersSlidesBullet = document.querySelectorAll(
  ".offers-section .offers-section__slides .bullets .bullet"
);

// Slides Selectors
const offersSlides = document.querySelectorAll(
  ".offers-section .offers-section__slides .slide"
);

let offersCurrentSlide = 2;

// change slide
const changeOffersSlide = (slideNum) => {
  offersCurrentSlide = slideNum;

  // remove last active bullet
  offersSlidesBullet.forEach((bullet) =>
    bullet.classList.remove("bullet--active")
  );

  // active current active bullet
  offersSlidesBullet[offersCurrentSlide].classList.add("bullet--active");

  // remove last active slide
  offersSlides.forEach((slide) => slide.classList.remove("slide--active"));

  // add current active slide
  offersSlides[offersCurrentSlide].classList.add("slide--active");
};

// Change slides by clicking bullets
offersSlidesBullet.forEach((bullet) =>
  bullet.addEventListener("click", (e) =>
    changeOffersSlide(parseInt(e.target.dataset.id))
  )
);

// *******************************
// ****** Tab Slides Cards *******
// *******************************

// Tab Slides Sellector
const slideCards = document.querySelector(".tab-slides .slide-cards");

// cotrollers sellector
const slideCardsLeft = document.querySelector(".tab-slides #leftControler");
const slideCardsRight = document.querySelector(".tab-slides #rightControler");

const cardWidth = 300;

slideCardsLeft.addEventListener("click", () => {
  slideCards.scrollLeft += cardWidth;
});

slideCardsRight.addEventListener("click", () => {
  slideCards.scrollLeft -= cardWidth;
});

// *******************************
// ***** From Blogs Slides *******
// *******************************
const blogsSlidesPosts = document.querySelector(
  ".from-blogs-section .slides .posts"
);

fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
