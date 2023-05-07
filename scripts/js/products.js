/**
 * @file Manages rendering products in all pages.
 * About pages
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

/** Class representing a product. */
class Product {
  /**
   * Init product object.
   * @param {Object} product - product opject
   */
  constructor(product) {
    this.product = product;
  }

  /**
   * Sliceing title into 30 char if it more than 30 char.
   * @param {String} title - Slice titles longest than 30 char.
   * @returns 30 Character.
   */
  titleSlice(title) {
    return title.slice(0, 30) + (title.length > 30 ? "..." : "");
  }

  /**
   * Receive tags array and loop into with returning tags component.
   * @param {Array} tags - Array of tags
   * @returns {HTMLElement}
   */
  tagSegments(tags) {
    return tags
      ? tags.map((tag) => `<div class="tag">${tag}</div>`).join("")
      : "";
  }

  /**
   * Receive rate number and returns rate as HTML-CSS components as stars.
   * @param {Integer} rate - Rate number from 5
   * @returns {HTMLElement}
   */
  rateSegments(rate) {
    if (!rate) return "";

    const rateInteger = Math.trunc(rate);
    const decemalNumber = parseInt(rate.toString().split(".")[1]);
    const betweenRatingAnd5 =
      5 - (decemalNumber ? rateInteger + 1 : rateInteger);
    const ratingStars = [];

    for (let i = 1; i <= rateInteger; i++) {
      ratingStars.push('<i class="fa-solid fa-star"></i>');
    }

    if (decemalNumber === NaN || decemalNumber < 3)
      ratingStars.push('<i class="fa-light fa-star"></i>');

    if (3 <= decemalNumber && decemalNumber <= 8)
      ratingStars.push('<i class="fa-solid fa-star-half-stroke"></i>');

    if (8 < decemalNumber) ratingStars.push('<i class="fa-solid fa-star"></i>');

    for (let i = 1; i <= betweenRatingAnd5; i++) {
      ratingStars.push('<i class="fa-light fa-star"></i>');
    }

    return ratingStars.map((star) => star).join("");
  }

  /**
   * Receive price and discount and returns HTML-CSS component with price befor
   * and after discounting and calculate price into doller.
   * @param {Integer} price - Product price
   * @param {Integer} discount - Product discount
   * @returns {HTMLElement}
   */
  priceSegments(price, discount) {
    const finalPrice = (price / 31).toFixed(2);
    const finalPriceDiscount = (
      (price - (100 * discount) / price) /
      31
    ).toFixed(2);

    if (discount)
      return `
          <div class="price__before">$${finalPrice}</div>
          <div class="price__after">$${finalPriceDiscount}</div>
      `;
    else
      return `
          <div class="price__after">$${finalPrice}</div>
      `;
  }

  /**
   * Receive product object and returns product as HTML-CSS component.
   * @param {Object} item - product opject
   * @returns {HTMLElement}
   */
  productGridRender(item) {
    const {
      title,
      price,
      discountPercentage,
      rating,
      description,
      thumbnail,
      tags,
    } = item;

    return `
      <div class="product-card">
      <div class="img-container product-card__image"><img src=${thumbnail} alt="${title}">
        <div class="navigation"><span class="navigation__link"><i class="fa-light fa-magnifying-glass-plus"></i></span><span class="navigation__link"><i class="fa-light fa-bag-shopping"></i></span><span class="navigation__link"><i class="fa-regular fa-retweet"></i></span><span class="navigation__link"><i class="fa-light fa-heart"></i></span></div>
      </div>
      <div class="product-card__tags">${this.tagSegments(tags)}</div>
      <div class="product-card__content">
        <h3 class="name">${this.titleSlice(title)}</h3>
        <div class="rate">${this.rateSegments(rating)}</div>
      <div class="price">${this.priceSegments(price, discountPercentage)}</div>
      </div>
      </div>
      `;
  }
}

/**
 * Category grid page products render.
 */
class Products extends Product {
  /**
   * Init array of products
   * @param {Array} data - Array of products fetched from api
   */
  constructor(data) {
    super();
    this.data = data;
  }

  /**
   * Injecting products into category grid page
   */
  productsRender() {
    categoryGridProducts.innerHTML = this.data
      .map((item) => this.productGridRender(item))
      .join("");
  }
}

/**
 * @type {HTMLElement} - category Grid Products
 */
const categoryGridProducts = document.querySelector(
  ".category-grid .products .items"
);

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    const products = new Products(data);
    products.productsRender();
  });
