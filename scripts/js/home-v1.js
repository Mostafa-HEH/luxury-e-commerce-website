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

// Home new products
const newProducts = document.getElementById("newProducts");

// Home top products
const topProducts = document.getElementById("topProducts");

// Home top products tabs
const topProductsTabs = document.querySelectorAll(
  "#topProductsTabs .tabs-changer__tab"
);

/**
 * Fetching array of data from server ("/proucts")
 * @param {Array} data
 */
const handleData = (data) => {
  const products = new Products(data, "grid");

  // Render new products section
  products.customRender("new-products");
  newProducts.innerHTML = products.productsRender();

  // Change displayed products top-products as default.
  products.customRender("top-products");
  topProducts.innerHTML = products.productsRender();

  // Change displayed products pased on tab click.
  topProductsTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      topProductsTabs.forEach((item) =>
        item.classList.remove("tabs-changer__tab--active")
      );

      if (e.target.dataset.tab === "top") {
        tab.classList.add("tabs-changer__tab--active");
        products.customRender("top-products");
      }

      if (e.target.dataset.tab === "sale") {
        tab.classList.add("tabs-changer__tab--active");
        products.customRender("sale-products");
      }

      topProducts.innerHTML = products.productsRender();
    });
  });
};

/**
 * Handle data from server
 * @param {*} res
 * @returns error or data
 */
const handleServerError = (res) => {
  if (!res.ok) console.log("Server has somthing worng");
  else return res.json();
};

/**
 * Handle errors while fetching data.
 * @param {Object} error
 */
const handleDataError = (error) => {
  console.log(error);
};

fetch("http://localhost:3000/products")
  .then(handleServerError)
  .then(handleData);

// offer Section slider

// Slider slides
const offerSliderSlides = document.querySelectorAll(
  "#offerSectionslider #sliderSlides .slide"
);

// Slider Bullets
const offerSliderBullets = document.querySelectorAll(
  "#offerSectionslider #sliderBullets .bullet"
);

let currentSlideHomev1Offer = 1;

// Slider click
offerSliderBullets?.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    offerSliderSlides[currentSlideHomev1Offer].classList.remove(
      "slide--active"
    );
    offerSliderBullets[currentSlideHomev1Offer].classList.remove(
      "bullet--active"
    );

    currentSlideHomev1Offer = parseInt(e.target.dataset.id) - 1;

    offerSliderSlides[currentSlideHomev1Offer].classList.add("slide--active");
    offerSliderBullets[currentSlideHomev1Offer].classList.add("bullet--active");
  });
});
