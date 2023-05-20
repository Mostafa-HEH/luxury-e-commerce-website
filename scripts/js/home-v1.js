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

let currentSlideHomev1Hero = 1;

// Controlers click
heroSliderControlers?.forEach((controler) => {
  controler.addEventListener("click", (e) => {
    if (e.target.dataset.btn === "previous" && currentSlideHomev1Hero > 0) {
      // Remove previous active
      heroSliderSlides[currentSlideHomev1Hero].classList.remove(
        "slide--active"
      );
      heroSliderBullets[currentSlideHomev1Hero].classList.remove(
        "bullet--active"
      );

      currentSlideHomev1Hero--;

      //   Active new one
      heroSliderSlides[currentSlideHomev1Hero].classList.add("slide--active");
      heroSliderBullets[currentSlideHomev1Hero].classList.add("bullet--active");
    }
    if (
      e.target.dataset.btn === "next" &&
      currentSlideHomev1Hero < heroSliderSlides.length - 1
    ) {
      // Remove previous active
      heroSliderSlides[currentSlideHomev1Hero].classList.remove(
        "slide--active"
      );
      heroSliderBullets[currentSlideHomev1Hero].classList.remove(
        "bullet--active"
      );

      currentSlideHomev1Hero++;

      //   Active new one //   Active new one
      heroSliderSlides[currentSlideHomev1Hero].classList.add("slide--active");
      heroSliderBullets[currentSlideHomev1Hero].classList.add("bullet--active");
    }
  });
});

// Slider click
heroSliderBullets?.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // Remove previous active
    heroSliderSlides[currentSlideHomev1Hero].classList.remove("slide--active");
    heroSliderBullets[currentSlideHomev1Hero].classList.remove(
      "bullet--active"
    );

    currentSlideHomev1Hero = parseInt(e.target.dataset.bullet) - 1;

    //   Active new one
    heroSliderSlides[currentSlideHomev1Hero].classList.add("slide--active");
    heroSliderBullets[currentSlideHomev1Hero].classList.add("bullet--active");
  });
});

// Top Categories Section
const topCategories = document.querySelectorAll("#topCategories .category");
const topCategoriesArray = [
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
topCategories.forEach(
  (elm, id) =>
    (elm.outerHTML = `
    <a class="category" href="${topCategoriesArray[id].link}">
        <div class="img-container category__img"><img src="${topCategoriesArray[id].imgSrc}" alt="${topCategoriesArray[id].title}"></div>
        <div class="category__title"><h4>${topCategoriesArray[id].title}</h4></div>
    </a>
    `)
);
