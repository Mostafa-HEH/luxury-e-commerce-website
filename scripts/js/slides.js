/**
 * @file Manages slides.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

const changeSliderPrv = () => {
  if (currentSlide > 0) {
    // Remove previous active
    sliderSlides[currentSlide].classList.remove("slide--active");
    sliderBullets[currentSlide].classList.remove("bullet--active");

    currentSlide--;

    //   Active new one
    sliderSlides[currentSlide].classList.add("slide--active");
    sliderBullets[currentSlide].classList.add("bullet--active");
  }
};

const changeSliderNxt = () => {
  if (currentSlide < sliderSlides.length - 1) {
    // Remove previous active
    sliderSlides[currentSlide].classList.remove("slide--active");
    sliderBullets[currentSlide].classList.remove("bullet--active");

    currentSlide++;

    //   Active new one //   Active new one
    sliderSlides[currentSlide].classList.add("slide--active");
    sliderBullets[currentSlide].classList.add("bullet--active");
  }
};

// Slider slides
const sliderSlides = document.querySelectorAll("#sliderSlides .slide");

// Slidetr controlers
const sliderControlers = document.querySelectorAll("#sliderControlers .action");

// Slider Bullets
const sliderBullets = document.querySelectorAll("#sliderBullets .bullet");

let currentSlide = 1;

// Controlers click
sliderControlers.forEach((controler) => {
  controler.addEventListener("click", (e) => {
    if (e.target.dataset.btn === "previous") changeSliderPrv();
    if (e.target.dataset.btn === "next") changeSliderNxt();
  });
});

// Slider click
sliderBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // Remove previous active
    sliderSlides[currentSlide].classList.remove("slide--active");
    sliderBullets[currentSlide].classList.remove("bullet--active");

    currentSlide = parseInt(e.target.dataset.bullet) - 1;

    //   Active new one
    sliderSlides[currentSlide].classList.add("slide--active");
    sliderBullets[currentSlide].classList.add("bullet--active");
  });
});
