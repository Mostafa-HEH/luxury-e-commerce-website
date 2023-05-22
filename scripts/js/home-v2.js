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
