/**
 * @file Manages rendering products in all pages.
 * About pages
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

/** Class representing a product. */
class Product {
  dollerRate = 31;

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
    const finalPrice = (price / this.dollerRate).toFixed(2);
    const finalPriceDiscount = (
      (price - (100 * discount) / price) /
      this.dollerRate
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
  sideBarData = {};

  /**
   * Init array of products
   * @param {Array} data - Array of products fetched from api
   */
  constructor(data) {
    super();
    this.data = data;
    this.fetchCategories();
    this.fetchBrands();
    this.fetchPriceRange();
  }

  /**
   * Render products pased on these parameters
   * @param {Object} productsDisplay - Object of filters that controles how products displaies
   * @returns {HTMLElement}
   */
  productsArray({ currentPage, productsLimit }) {
    const pageStart = currentPage * productsLimit - 12;
    const pageEnd = currentPage * productsLimit;

    return this.data
      .map((item) => this.productGridRender(item))
      .slice(pageStart, pageEnd)
      .join("");
  }

  /**
   * Fetching categories names from products objects.
   * @returns {Array} of categories
   */
  fetchCategories() {
    let uniqueCategories = [];
    let uniqueDepartments = {};

    this.data.forEach((product) => {
      const formatingCategory = product.category.toLowerCase();
      const departments = product.department?.toLowerCase();

      if (!uniqueCategories.includes(formatingCategory)) {
        uniqueCategories.push(formatingCategory);
        uniqueDepartments[formatingCategory] = departments ? [] : null;
      }

      if (!uniqueDepartments[formatingCategory]?.includes(departments))
        uniqueDepartments[formatingCategory]?.push(departments);
    });

    let sortedUniqueCategories = uniqueCategories.sort();
    this.sideBarData.categories = sortedUniqueCategories;
    this.sideBarData.departments = uniqueDepartments;
  }

  /**
   * Fetching brands names from products objects.
   * @returns {Array} of brands
   */
  fetchBrands() {
    const uniqueBrands = [];

    this.data.forEach((product) => {
      const formatingBrands = product.brand.toLowerCase();

      if (!uniqueBrands.includes(formatingBrands))
        uniqueBrands.push(formatingBrands);
    });

    const sortedUniqueBrands = uniqueBrands.sort();
    this.sideBarData.brands = sortedUniqueBrands;
  }

  /**
   * Fetching price range.
   * @returns {Object} of min & max
   */
  fetchPriceRange() {
    this.sideBarData.priceRange = {
      min: 99999,
      max: 0,
    };

    this.data.forEach((product) => {
      let priceConvert = Math.round(product.price / this.dollerRate);

      if (priceConvert > this.sideBarData.priceRange.max)
        this.sideBarData.priceRange.max = priceConvert;

      if (priceConvert < this.sideBarData.priceRange.min)
        this.sideBarData.priceRange.min = priceConvert;
    });
  }

  /**
   * Injecting products into category grid page
   */
  productsRender(productsDisplay) {
    categoryGridProducts.innerHTML = this.productsArray(productsDisplay);
  }

  /**
   * Takes limit number and pased on it compain paginations pased on it.
   * @param {Integer} param0 - Page limit
   */
  paginationRender({ productsLimit, currentPage }) {
    /**
     * Takes page url and search spacific param and change its value
     * Stack overflow#https://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery
     * @param {String} url
     * @param {String} paramName
     * @param {*} paramValue
     * @returns URL with changed prame
     */
    const replaceUrlParam = (url, paramName, paramValue) => {
      if (paramValue == null) {
        paramValue = "";
      }
      let pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
      if (url.search(pattern) >= 0) {
        return url.replace(pattern, "$1" + paramValue + "$2");
      }
      url = url.replace(/[?#]$/, "");
      return (
        url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
      );
    };

    /**
     * Creates pages links
     * @param {Integer} pageNumber
     * @returns {HTMLElement}
     */
    const pageNumberSegment = (pageNumber) =>
      `<a class="action action-secondary black page" data-number=${pageNumber} href="${replaceUrlParam(
        pageURL,
        "page",
        pageNumber
      )}">${pageNumber}</a>`;

    const pages = [];
    const pagesNumber = Math.ceil(this.data.length / productsLimit);
    const pageURL = window.location.href;
    currentPage = parseInt(currentPage);

    let i = 1;
    for (; i <= pagesNumber; i++) {
      pages.push(pageNumberSegment(i));
    }

    categoryGridPagination.innerHTML = pages.join("");

    categoryGridPagination.childNodes.forEach((link) => {
      if (link.dataset.number == currentPage) {
        link.classList.add("page--active");
      }
    });

    categoryGridPrevious.addEventListener("click", () => {
      if (currentPage > 1)
        window.location.assign(
          replaceUrlParam(pageURL, "page", currentPage - 1)
        );
    });

    categoryGridNext.addEventListener("click", () => {
      if (currentPage < pagesNumber)
        window.location.assign(
          replaceUrlParam(pageURL, "page", currentPage + 1)
        );
    });
  }
}

/**
 * Receve url parameter and returns value
 * @param {String} parameter - Url parameter.
 * @returns Value of parameter from urlk
 */
const URLParameter = (parameter) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(parameter);
};

/**
 * @type {HTMLElement} - category Grid Products
 */
const categoryGridProducts = document.querySelector(
  ".category-grid .products .items"
);

/**
 * @type {HTMLElement} - category Grid Pagination
 */
const categoryGridPagination = document.querySelector(
  ".category-grid .products .pagination .pages"
);

/**
 * @type {HTMLElement} - category Grid Pagination pages controlers
 */
const categoryGridPrevious = document.querySelector(
  ".category-grid .products .pagination #previousPage"
);
const categoryGridNext = document.querySelector(
  ".category-grid .products .pagination #nextPage"
);

const productsDisplay = {
  currentPage: URLParameter("page") || 1,
  pageSort: URLParameter("sort") || "default",
  productsLimit: URLParameter("limit") || 12,
  filters: {},
};

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    const products = new Products(data);
    products.productsRender(productsDisplay);
    products.paginationRender(productsDisplay);
  });
