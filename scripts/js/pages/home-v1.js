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

// New products section

// Home new products container
const newProducts = document.getElementById("newProducts");

// Fetch data from firebase
firebase
  .database()
  .ref("/products/")
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const productsLength = snapshot.val().length;

      newProducts.innerHTML = snapshot
        .val()
        .slice(productsLength - 8, productsLength)
        .reverse()
        .map(
          (product) => `
            <div class="product-card">
                <div class="img-container product-card__image">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <div class="navigation">
                        <a href="./product-details-v1.html?id=${
                          product.id
                        }" class="navigation__link">
                            <i class="fa-light fa-magnifying-glass-plus"></i>
                        </a>
                        <span class="navigation__link product-to-cart" data-id="${
                          product.id
                        }">
                            <i class="fa-light fa-bag-shopping"></i>
                        </span>
                        <span class="navigation__link">
                            <i class="fa-regular fa-retweet"></i>
                        </span>
                        <span class="navigation__link">
                            <i class="fa-light fa-heart"></i>
                        </span>
                    </div>
                </div>
                ${
                  product.tags
                    ? `<div class="product-card__tags">
                    ${product.tags.map(
                      (tag) => `<div class="tag">${tag}</div>`
                    )}
                </div>`
                    : ""
                }
                <div class="product-card__content">
                    <h3 class="name">${product.title}</h3>
                    ${
                      product.rating
                        ? `
                    <div class="rate">
                        ${ratesGenerator(product.rating).join("")}
                    </div>
                    `
                        : ""
                    }
                <div class="price">
                    ${
                      product.discountPercentage
                        ? `
                    <div class="price__before">$${(
                      product.price / egpusd
                    ).toFixed(2)}</div>
                    <div class="price__after">$${applyDiscount(
                      product.price,
                      product.discountPercentage
                    )}</div>
                    `
                        : `<div class="price__after">$${(
                            product.price / egpusd
                          ).toFixed(2)}</div>`
                    }
                </div>
                </div>
            </div>`
        )
        .join("");
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

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

// Top products section

// Top products container
const topProducts = document.getElementById("topProducts");
const topProductsTabs = document.querySelectorAll(
  "#topProductsTabs .tabs-changer__tab"
);

const renderRatingMore = 3.5;
const renderSaleMore = 40;

// Fetch data from firebase
firebase
  .database()
  .ref("/products/")
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const productsLength = snapshot.val().length;

      // Default render
      topProducts.innerHTML = snapshot
        .val()
        .filter((product) => product.rating >= renderRatingMore)
        .map(
          (product) => `
              <div class="product-card">
                  <div class="img-container product-card__image">
                      <img src="${product.thumbnail}" alt="${product.title}">
                      <div class="navigation">
                          <a href="./product-details-v1.html?id=${
                            product.id
                          }" class="navigation__link">
                              <i class="fa-light fa-magnifying-glass-plus"></i>
                          </a>
                          <span class="navigation__link product-to-cart" data-id="${
                            product.id
                          }">
                              <i class="fa-light fa-bag-shopping"></i>
                          </span>
                          <span class="navigation__link">
                              <i class="fa-regular fa-retweet"></i>
                          </span>
                          <span class="navigation__link">
                              <i class="fa-light fa-heart"></i>
                          </span>
                      </div>
                  </div>
                  ${
                    product.tags
                      ? `<div class="product-card__tags">
                      ${product.tags.map(
                        (tag) => `<div class="tag">${tag}</div>`
                      )}
                  </div>`
                      : ""
                  }
                  <div class="product-card__content">
                      <h3 class="name">${product.title}</h3>
                      ${
                        product.rating
                          ? `
                      <div class="rate">
                          ${ratesGenerator(product.rating).join("")}
                      </div>
                      `
                          : ""
                      }
                  <div class="price">
                      ${
                        product.discountPercentage
                          ? `
                      <div class="price__before">$${(
                        product.price / egpusd
                      ).toFixed(2)}</div>
                      <div class="price__after">$${applyDiscount(
                        product.price,
                        product.discountPercentage
                      )}</div>
                      `
                          : `<div class="price__after">$${(
                              product.price / egpusd
                            ).toFixed(2)}</div>`
                      }
                  </div>
                  </div>
              </div>`
        )
        .join("");

      topProductsTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          topProductsTabs.forEach((tab) =>
            tab.classList.remove("tabs-changer__tab--active")
          );

          if (tab.dataset.tab === "top") {
            tab.classList.add("tabs-changer__tab--active");
            topProducts.innerHTML = snapshot
              .val()
              .filter((product) => product.rating >= renderRatingMore)
              .map(
                (product) => `
                      <div class="product-card">
                                <div class="img-container product-card__image">
                                    <img src="${product.thumbnail}" alt="${
                  product.title
                }">
                                    <div class="navigation">
                                        <a href="./product-details-v1.html?id=${
                                          product.id
                                        }" class="navigation__link">
                                            <i class="fa-light fa-magnifying-glass-plus"></i>
                                        </a>
                                        <span class="navigation__link product-to-cart" data-id="${
                                          product.id
                                        }">
                                            <i class="fa-light fa-bag-shopping"></i>
                                        </span>
                                        <span class="navigation__link">
                                            <i class="fa-regular fa-retweet"></i>
                                        </span>
                                        <span class="navigation__link">
                                            <i class="fa-light fa-heart"></i>
                                        </span>
                                    </div>
                                </div>
                                ${
                                  product.tags
                                    ? `<div class="product-card__tags">
                                    ${product.tags.map(
                                      (tag) => `<div class="tag">${tag}</div>`
                                    )}
                                </div>`
                                    : ""
                                }
                                <div class="product-card__content">
                                    <h3 class="name">${product.title}</h3>
                                    ${
                                      product.rating
                                        ? `
                                    <div class="rate">
                                        ${ratesGenerator(product.rating).join(
                                          ""
                                        )}
                                    </div>
                                    `
                                        : ""
                                    }
                                <div class="price">
                                    ${
                                      product.discountPercentage
                                        ? `
                                    <div class="price__before">$${(
                                      product.price / egpusd
                                    ).toFixed(2)}</div>
                                    <div class="price__after">$${applyDiscount(
                                      product.price,
                                      product.discountPercentage
                                    )}</div>
                                    `
                                        : `<div class="price__after">$${(
                                            product.price / egpusd
                                          ).toFixed(2)}</div>`
                                    }
                                </div>
                                </div>
                            </div>`
              )
              .join("");
          }

          if (tab.dataset.tab === "sale") {
            tab.classList.add("tabs-changer__tab--active");
            topProducts.innerHTML = snapshot
              .val()
              .filter((product) => product.discountPercentage >= renderSaleMore)
              .map(
                (product) => `
                      <div class="product-card">
                          <div class="img-container product-card__image">
                              <img src="${product.thumbnail}" alt="${
                  product.title
                }">
                              <div class="navigation">
                                  <a href="./product-details-v1.html?id=${
                                    product.id
                                  }" class="navigation__link">
                                      <i class="fa-light fa-magnifying-glass-plus"></i>
                                  </a>
                                  <span class="navigation__link product-to-cart" data-id="${
                                    product.id
                                  }">
                                      <i class="fa-light fa-bag-shopping"></i>
                                  </span>
                                  <span class="navigation__link">
                                      <i class="fa-regular fa-retweet"></i>
                                  </span>
                                  <span class="navigation__link">
                                      <i class="fa-light fa-heart"></i>
                                  </span>
                              </div>
                          </div>
                          ${
                            product.tags
                              ? `<div class="product-card__tags">
                              ${product.tags.map(
                                (tag) => `<div class="tag">${tag}</div>`
                              )}
                          </div>`
                              : ""
                          }
                          <div class="product-card__content">
                              <h3 class="name">${product.title}</h3>
                              ${
                                product.rating
                                  ? `
                              <div class="rate">
                                  ${ratesGenerator(product.rating).join("")}
                              </div>
                              `
                                  : ""
                              }
                          <div class="price">
                              ${
                                product.discountPercentage
                                  ? `
                              <div class="price__before">$${(
                                product.price / egpusd
                              ).toFixed(2)}</div>
                              <div class="price__after">$${applyDiscount(
                                product.price,
                                product.discountPercentage
                              )}</div>
                              `
                                  : `<div class="price__after">$${(
                                      product.price / egpusd
                                    ).toFixed(2)}</div>`
                              }
                          </div>
                          </div>
                      </div>`
              )
              .join("");
          }
        });
      });
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

const topProductsArrows = document.querySelectorAll(
  "#topProductsDisplay .arrow"
);

topProductsArrows.forEach((arrow) =>
  arrow.addEventListener("click", () => {
    if (arrow.dataset.direction === "left") {
      topProducts.scrollLeft = topProducts.scrollLeft - topProducts.offsetWidth;
    } else if (arrow.dataset.direction === "right") {
      topProducts.scrollLeft = topProducts.scrollLeft + topProducts.offsetWidth;
    } else {
      console.log("Click direction is something else not right or left");
    }
  })
);
