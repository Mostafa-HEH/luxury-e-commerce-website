/**
 * @file Class representing a product.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

class Product {
  priceData = {
    dbPrice: "egp",
    displayPrice: {
      currency: "usd",
      symbol: "$",
    },
    convertingRate: 31,
  };
  titleLength = 30;

  /**
   * Init product object.
   * @param {Object} product - product opject
   */
  constructor(product) {
    this.product = product;
  }

  /**
   * Receive tags array and loop into with returning tags component.
   * @param {Array} tags - Array of tags
   * @returns {HTMLElement}
   */
  tagsRender(tags) {
    if (!tags) return "";
    return tags.map((tag) => `<div class="tag">${tag}</div>`).join("");
  }

  /**
   * Receive rate number and returns rate as HTML-CSS components as stars.
   * @param {Integer} rate - Rate number from 5
   * @returns {HTMLElement}
   */
  rateRender(rate) {
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
  }

  /**
   * Receive price and discount and returns HTML-CSS component with price befor
   * and after discounting and calculate price into doller.
   * @param {Integer} price - Product price
   * @param {Integer} discount - Product discount
   * @returns {HTMLElement}
   */
  priceRender(price, discount) {
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
      const convertPrice = price / convertingRate;

      return (convertPrice - (convertPrice / 100) * discount).toFixed(2);
    };

    const { convertingRate, displayPrice } = this.priceData;
    const { symbol } = displayPrice;

    const priceBefore = discount
      ? `<div class="price__before">${symbol}${priceConvert(price)}</div>`
      : "";

    const priceAfter = `<div class="price__after">${symbol}${
      discount ? applyDiscount(price, discount) : priceConvert(price)
    }</div>`;

    return priceBefore + priceAfter;
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
        <div class="product-card__tags">${this.tagsRender(tags)}</div>
        <div class="product-card__content">
          <h3 class="name">${title}</h3>
          <div class="rate">${this.rateRender(rating)}</div>
        <div class="price">${this.priceRender(price, discountPercentage)}</div>
        </div>
        </div>
        `;
  }

  /**
   * Receive product object and returns product as HTML-CSS component.
   * @param {Object} item - product opject
   * @returns {HTMLElement}
   */
  productListRender(item) {
    const {
      thumbnail,
      title,
      tags,
      rating,
      price,
      discountPercentage,
      description,
    } = item;

    return `
        <div class="product-card-list">
          <div class="img-container product-card__image"><img src="${thumbnail}" alt="${title}"></div>
          <div class="product-card__tags">${this.tagsRender(tags)}</div>
          <div class="product-card-list__content">
            <h3 class="name">${title}</h3>
            <div class="rate">
              <div class="rate__stars">${this.rateRender(rating)}</div>
              <!-- Not designed yet, rendere static data -->
              <div class="rate__details">
                <span>2 Review(s)</span>
                <span class="seprator"></span>
                <span>Add Your Review</span>
              </div>
            </div>
            <div class="price">${this.priceRender(
              price,
              discountPercentage
            )}</div>
            <div class="description">${
              description?.length > 230
                ? description.slice(0, 230) + " ..."
                : description || ""
            }</div>
            <div class="navigation">
              <span class="action action-primary black icon">
                <i class="fa-light fa-bag-shopping"></i>Add to cart
              </span>
              <span class="action action-secondary black">
                <i class="fa-regular fa-retweet"></i>
              </span>
              <span class="action action-secondary black">
                <i class="fa-light fa-heart"></i>
              </span>
            </div>
          </div>
        </div>
      `;
  }
}
