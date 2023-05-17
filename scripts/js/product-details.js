/**
 * @file Manages rendering product in product details v1 & v2.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

//TODO duplcated with products.js
/**
 * Receve url parameter and returns value
 * @param {String} parameter - Url parameter.
 * @returns Value of parameter from url
 */
const URLParameter = (parameter) => {
  return urlParams.get(parameter);
};

//TODO duplcated with products.js
/**
 * Receive rate number and returns rate as HTML-CSS components as stars.
 * @param {Integer} rate - Rate number from 5
 * @returns {HTMLElement}
 */
const rateRender = (rate) => {
  /**
   * Generates stars segments based on rate number.
   * @param {Number} rate - Rating number
   * @param {Object} starsSegments - Object of html segment.
   * @returns {HTMLElement} Full rate stars.
   */
  const handleRate = (rate, { half, empty, full }) => {
    const stars = [];

    let i = 5;
    for (; i > 0; i--) {
      if (i > rate) {
        if (i - 0.5 <= rate) {
          stars.push(half);
        } else {
          stars.push(empty);
        }
      } else {
        stars.push(full);
      }
    }
    return stars.reverse();
  };

  const starsSegments = {
    full: `<i class="fa-solid fa-star"></i>`,
    empty: `<i class="fa-light fa-star"></i>`,
    half: `<i class="fa-solid fa-star-half-stroke"></i>`,
  };

  if (!rate) return "";
  return handleRate(rate, starsSegments).join("");
};

//TODO duplcated with products.js
/**
 * Receive price and discount and returns HTML-CSS component with price befor
 * and after discounting and calculate price into doller.
 * @param {Integer} price - Product price
 * @param {Integer} discount - Product discount
 * @returns {HTMLElement}
 */
const priceRender = (price, discount) => {
  /**
   * Converting price into spacific currency
   * @param {Number} price
   * @returns - Converted price
   */
  const priceConvert = (price) => {
    return (price / convertingRate).toFixed(2);
  };

  /**
   * Takes price, discount and return price after discount
   * @param {Number} price
   * @param {Number} discount
   * @returns - Price with discount
   */
  const applyDiscount = (price, discount) => {
    return ((price - (100 * discount) / price) / convertingRate).toFixed(2);
  };

  const { convertingRate, displayPrice } = priceData;
  const { symbol } = displayPrice;

  const priceBefore = discount
    ? `<div class="price__before">${symbol}${priceConvert(price)}</div>`
    : "";

  const priceAfter = `<div class="price__after">${symbol}${
    discount ? applyDiscount(price, discount) : priceConvert(price)
  }</div>`;

  return priceBefore + priceAfter;
};

//TODO make subImages that more than 5 slides
/**
 * Generate main & sub Images for onetime render.
 * @param {Array} images  - Images source string.
 * @param {String} title - Product title for images alt .
 * @returns {HTMLElemnet} - Generated images.
 */
const imagesRender = ({ images, title }) => {
  /**
   * Generate image segment
   * @param {String} img - Image source code
   * @param {Number} idx - Image index
   * @returns {HTMLElement}
   */
  const subImage = (img, idx) => {
    return `
    <div class="img-container img ${
      idx === currentImage ? "img--active" : ""
    } productdetails-subimage" data-id="${idx}"><img src="${img}" alt="${title}"></div>
    `;
  };

  const currentImage = 0;

  return `
        <div class="images">
            <div class="images__subs"> 
                ${images
                  .map((img, idx) => subImage(img, idx))
                  .slice(0, 5)
                  .join("")}
            </div>
            <div class="img-container images__main" id="productDetailsMainImage">
              <img src="${images[currentImage]}" alt="${title}">
            </div>
        </div>
        `;
};

/**
 * Generates prodact details for v1
 * @param {Object} param - Product object
 * @returns {HTMLElement}
 */
const renderProductDetailsV1 = ({
  title,
  rating,
  price,
  discountPercentage,
  stock,
  description,
  size,
  color,
  features,
}) => {
  return `
  <div class="product-card-list">
    <div class="product-card-list__content">
    <h3 class="name">${title}</h3>
    <div class="rate">
        ${rating ? `<div class="rate__stars">${rateRender(rating)}</div>` : ""}
        <!-- Not designed yet -->
        <div class="rate__details">
          <span>12 Review(s)</span>
          <span class="seprator"></span>
          <span>Add Your Review</span>
        </div>
    </div>
    <div class="price">${priceRender(price, discountPercentage)}</div>
    <div class="availability">Availability: <span>${
      stock > 0 ? "In stock" : "Not available"
    }</span></div>
    ${description ? `<div class="description">${description}</div>` : ""}
    <div class="data-input">
        ${
          stock
            ? `<label class="select-number">
            Quantity:
            <input type="number" value="${stock > 0 ? 1 : 0}" min="1" max=${
                stock || 0
              }>
          </label>`
            : ""
        }
        ${
          size
            ? `<label class="select">
            Size:
            <select>
                ${size?.map(
                  (item) => `<option value="${item}">${item}</option>`
                )}
            </select>
          </label>`
            : ""
        }
        ${
          color
            ? `<label class="select">
            Color:
            <select>
                ${color?.map(
                  (item) => `<option value="${item}">${item}</option>`
                )}
            </select>
          </label> `
            : ""
        }
    </div>
    <div class="navigation">
      <span class="action action-primary black icon">
        <i class="fa-light fa-bag-shopping"></i>
        Add to cart
      </span>
      <span class="action action-secondary black">
        <i class="fa-regular fa-retweet"></i>
      </span>
      <span class="action action-secondary black">
        <i class="fa-light fa-heart"></i>
      </span>
    </div>
    <div class="featurs">${
      features
        ?.map((item, idx) => item + (idx !== features.length - 1 ? " | " : ""))
        .join("") || ""
    }</div>
    <div class="share">
        <span>Share:</span>
        <div class="social-links">
          <a class="action action-primary white" href="#">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a class="action action-primary white" href="#">
            <i class="fa-brands fa-twitter"></i> 
          </a>
          <a class="action action-primary white" href="#">
            <i class="fa-brands fa-pinterest-p"></i>
          </a>
        </div>
    </div>
    </div>
  </div>
    
  `;
};

/**
 * Generates prodact details for v2
 * @param {Object} param - Product object
 * @returns {HTMLElement}
 */
const renderProductDetailsV2 = ({
  title,
  rating,
  price,
  discountPercentage,
  stock,
  description,
  size,
  color,
  features,
}) => {
  return `
    <div class="product-card-list">
      <div class="product-card-list__content">
        <h3 class="name">${title}</h3>
        <div class="rate">
          ${
            rating ? `<div class="rate__stars">${rateRender(rating)}</div>` : ""
          }
          <!-- Not designed yet -->
          <div class="rate__details"><span>12 Review(s)</span><span class="seprator"></span><span>Add Your Review</span></div>
        </div>
        <div class="price">${priceRender(price, discountPercentage)}</div>
        <div class="availability">Availability: <span>${
          stock > 0 ? "In stock" : "Not available"
        }</span></div>
        ${description ? `<div class="description">${description}</div>` : ""}
        <div class="data-input">
          ${
            size
              ? `
            <div class="selector">
              <div class="selector__name">size: </div>
              <div class="selector__options">
                ${size
                  ?.map((item) => `<div class="option">${item}</div>`)
                  .join("")}
              </div>
            </div>
          `
              : ""
          }
          ${
            color
              ? `
            <div class="selector">
              <div class="selector__name">color: </div>
              <div class="selector__options">
              ${color
                ?.map((item) => `<div class="option">${item}</div>`)
                .join("")}
              </div>
          </div>
          `
              : ""
          }
          ${
            stock
              ? `<label class="select-number">
              Quantity:
              <input type="number" value="${stock > 0 ? 1 : 0}" min="1" max=${
                  stock || 0
                }>
            </label>`
              : ""
          }
        </div>
        <div class="navigation"><span class="action action-primary black icon"><i class="fa-light fa-bag-shopping"></i>Add to cart</span><span class="action action-secondary black"><i class="fa-regular fa-retweet"></i></span><span class="action action-secondary black"><i class="fa-light fa-heart"></i></span></div>
        <div class="featurs">${
          features
            ?.map(
              (item, idx) => item + (idx !== features.length - 1 ? " | " : "")
            )
            .join("") || ""
        }</div>
        <div class="share"><span>Share:</span>
          <div class="social-links"> <a class="action action-primary white" href="#"><i class="fa-brands fa-facebook-f"></i></a><a class="action action-primary white" href="#"><i class="fa-brands fa-twitter"></i></a><a class="action action-primary white" href="#"><i class="fa-brands fa-pinterest-p"></i></a></div>
        </div>
      </div>
    </div>
  `;
};

// Collecting url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = parseInt(URLParameter("id"));

//TODO duplcated with products.js
const priceData = {
  dbPrice: "egp",
  displayPrice: {
    currency: "usd",
    symbol: "$",
  },
  convertingRate: 31,
};

const productDetailsV1 = document.getElementById("productDetailsV1");
const productDetailsV2 = document.getElementById("productDetailsV2");

/**
 * Fetching array of data from server ("/proucts")
 * @param {Array} data
 */
const handleData = async (data) => {
  const productObj = data.filter((item) => item.id === productID)[0];

  if (productDetailsV1)
    productDetailsV1.innerHTML =
      (await imagesRender(productObj)) + renderProductDetailsV1(productObj);

  if (productDetailsV2)
    productDetailsV2.innerHTML =
      (await imagesRender(productObj)) + renderProductDetailsV2(productObj);

  // Images - Main & Sub Image
  const productDetailsMainImage = document.getElementById(
    "productDetailsMainImage"
  );
  const productDetailsSubImage = document.querySelectorAll(
    ".productdetails-subimage"
  );

  // Controls sub images click
  productDetailsSubImage.forEach((img) => {
    img.addEventListener("click", () => {
      const imgId = img.dataset.id;

      // Add active class to clicked image and remove from others
      productDetailsSubImage.forEach((subImge) => {
        if (imgId == subImge.dataset.id) img.classList.add("img--active");
        else subImge.classList.remove("img--active");
      });

      // Rerender seletet sub image as main image
      productDetailsMainImage.innerHTML = `<img src="${productObj.images[imgId]}" alt="${productObj.title}">`;
    });
  });
};

//TODO duplcated with products.js

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
