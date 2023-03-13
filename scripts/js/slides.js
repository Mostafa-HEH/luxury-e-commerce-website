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
const blogsSlidesPostsLeft = document.querySelector(
  ".from-blogs-section .slides #leftControler"
);
const blogsSlidesPostsRight = document.querySelector(
  ".from-blogs-section .slides #rightControler"
);

const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Get posts
fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then(async (posts) => {
    const postsLength = posts.length;
    let postsHTML = "";

    for (let i = postsLength - 1; i >= postsLength - 5; i--) {
      let { id, title, short_description, date, image } = posts[i];
      let postCommentsLength = 0;

      // Date handle
      let monthFromDate = monthShortNames[new Date(date).getMonth()];
      let dayFromDate = new Date(date).getDate();
      let yearFromDate = new Date(date).getFullYear();

      // Fetch comments
      await fetch("http://localhost:3000/comments")
        .then((res) => res.json())
        .then((comments) => {
          comments.forEach((comment) => {
            if (comment.postid == id) postCommentsLength++;
          });
        });

      postsHTML += `
      <div class="blog-post-review grid">
        <div class="img-container blog-post-review__img">
          <img src="${image}" alt="${title}"/>
        </div>
        <div class="blog-post-review__content">
          <h3 class="title">${title}</h3>
          <p class="preview">${short_description}</p>
          <div class="details">
            <div class="details__data"><i class="fa-regular fa-calendar-days"></i><span>${monthFromDate}  ${dayFromDate}, ${yearFromDate}</span></div>
            <div class="details__data"><i class="fa-light fa-comment"></i><span>${postCommentsLength}</span></div>
            <div class="details__data read-more"><i class="fa-solid fa-caret-right"></i><a href="#">Read More</a></div>
          </div>
        </div>
      </div>`;
    }

    blogsSlidesPosts.innerHTML = postsHTML;
  });

let scrollPostRange = 596;

// Change slides
blogsSlidesPostsRight.addEventListener("click", () => {
  blogsSlidesPosts.scrollLeft += scrollPostRange;
});

blogsSlidesPostsLeft.addEventListener("click", () => {
  if (blogsSlidesPosts.scrollLeft <= scrollPostRange + scrollPostRange / 2) {
    blogsSlidesPosts.scrollLeft = 0;
  } else {
    blogsSlidesPosts.scrollLeft -= scrollPostRange;
  }
});
