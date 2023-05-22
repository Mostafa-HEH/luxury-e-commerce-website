/**
 * @file Home v1 scripts.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

// Hero section slides

// Slider container
const heroSliderContainer = document.querySelector(
  "#heroSectionslider #slider"
);

// Slider slides
const heroSliderSlides = document.querySelectorAll(
  "#heroSectionslider #sliderSlides .slide"
);

// Slidetr controlers
const heroSliderControlers = document.querySelectorAll(
  "#heroSectionslider #sliderControlers .action"
);

// Slider Bullets
const heroSliderBullets = document.querySelectorAll(
  "#heroSectionslider #sliderBullets .bullet"
);

let currentSlideHero = 1;

// Controlers click
heroSliderControlers?.forEach((controler) => {
  controler.addEventListener("click", (e) => {
    if (e.target.dataset.btn === "previous" && currentSlideHero > 0) {
      // Remove previous active
      heroSliderSlides[currentSlideHero].classList.remove("slide--active");
      heroSliderBullets[currentSlideHero].classList.remove("bullet--active");

      currentSlideHero--;

      //   Active new one
      heroSliderSlides[currentSlideHero].classList.add("slide--active");
      heroSliderBullets[currentSlideHero].classList.add("bullet--active");
    }
    if (
      e.target.dataset.btn === "next" &&
      currentSlideHero < heroSliderSlides.length - 1
    ) {
      // Remove previous active
      heroSliderSlides[currentSlideHero].classList.remove("slide--active");
      heroSliderBullets[currentSlideHero].classList.remove("bullet--active");

      currentSlideHero++;

      //   Active new one //   Active new one
      heroSliderSlides[currentSlideHero].classList.add("slide--active");
      heroSliderBullets[currentSlideHero].classList.add("bullet--active");
    }
  });
});

// Slider click
heroSliderBullets?.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // Remove previous active
    heroSliderSlides[currentSlideHero].classList.remove("slide--active");
    heroSliderBullets[currentSlideHero].classList.remove("bullet--active");

    currentSlideHero = parseInt(e.target.dataset.bullet) - 1;

    //   Active new one
    heroSliderSlides[currentSlideHero].classList.add("slide--active");
    heroSliderBullets[currentSlideHero].classList.add("bullet--active");
  });
});

// Populuer Categories Section
const populerCategories = document.querySelectorAll("#topCategories .category");
const populerCategoriesArray = [
  {
    id: 1,
    title: "Women",
    link: "#",
    imgSrc: "#",
  },
  {
    id: 2,
    title: "Men",
    link: "#",
    imgSrc: "#",
  },
  {
    id: 3,
    title: "bags",
    link: "#",
    imgSrc: "#",
  },
  {
    id: 4,
    title: "watches",
    link: "#",
    imgSrc: "#",
  },
];

// Render categoris
populerCategories.forEach(
  (elm, id) =>
    (elm.outerHTML = `
    <a class="category" href="${populerCategoriesArray[id].link}">
        <div class="img-container category__img"><img src="${populerCategoriesArray[id].imgSrc}" alt="${populerCategoriesArray[id].title}"></div>
        <div class="category__title"><h4>${populerCategoriesArray[id].title}</h4></div>
    </a>
    `)
);
