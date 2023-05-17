/**
 * @file Manages rendering products in Categoty grid & list pages.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

/** Class representing a product. */
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
      return ((price - (100 * discount) / price) / convertingRate).toFixed(2);
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

/**
 * Category grid page products render.
 */
class Products extends Product {
  productsSegmentsArray = null;
  pageDisplay = {
    start: 0,
    end: 12,
  };
  sideBarData = {};
  pageURL = window.location.href;
  displayType = "list";

  /**
   * Init array of products
   * @param {Array} data - Array of products fetched from api
   */
  constructor(data, productsDisplay) {
    super();
    this.data = data;
    this.productsDisplay = productsDisplay;

    const { currentPage, productsLimit } = this.productsDisplay;
    this.pageDisplay.start = currentPage * productsLimit - productsLimit;
    this.pageDisplay.end = currentPage * productsLimit;
  }

  /**
   *---------------------------------------------------
   *[************ Making things methods **************]
   *---------------------------------------------------
   * 1 - Methods:
   *      - {generateProductsArray} - Generates products list pased on filters,
   *        sorting, number of displayed products
   *      - {replaceUrlParam} - Replace URL serach parametres.
   *      - {settingbarConroler} Change Categorid page sitting controles how
   *        products displays.
   *
   */

  /**
   * Render products pased on these parameters
   * @param {Object} productsDisplay - Object of filters that controles how products displaies
   * @returns {HTMLElement}
   */
  generateProductsArray() {
    /**
     * Soring array of data
     * @param {*} a - Compare value 1
     * @param {*} b Compare value 2
     * @returns Sorted array
     */
    const sorting = (a, b) => {
      if (pageSort === "name") {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
      } else if (pageSort === "price") {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
      }
      return 0;
    };

    const { pageSort, filters } = this.productsDisplay;

    this.productsSegmentsArray = this.data
      .filter((item) =>
        filters.categories.length > 0
          ? filters.categories.includes(item.category.toLowerCase())
          : item
      )
      .filter((item) =>
        filters.brands.length > 0
          ? filters.brands.includes(item.brand.toLowerCase())
          : item
      )
      .sort(sorting)
      .map((item) => {
        // Method from main class
        if (this.displayType === "list") return this.productListRender(item);
        if (this.displayType === "grid") return this.productGridRender(item);
      });
  }

  /**
   * Takes page url and search spacific param and change its value
   * Stack overflow#https://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery
   * @param {String} url
   * @param {String} paramName
   * @param {*} paramValue
   * @returns URL with changed prame
   */
  replaceUrlParam(url, paramName, paramValue) {
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
  }

  /**
   * Change how products displays pased on changing in setting bar
   * @param {Integer} param0 - Page display limit
   */
  settingbarConroler() {
    /**
     * Make selected option the deafult selected
     * @param {HTMLElement} optionsContainer - The select container
     */
    const selectDefault = (optionsContainer) => {
      let i = 0;
      while (optionsContainer[i]) {
        if ([pageSort, productsLimit].includes(optionsContainer[i].value))
          optionsContainer[i].setAttribute("selected", true);
        i++;
      }
    };

    /**
     * Change param and reload page
     * @param {Object} e - Event
     * @param {String} param - The url parameter
     */
    const replaceSelectedParam = (e, param) => {
      window.location.assign(
        this.replaceUrlParam(this.pageURL, param, e.target.value)
      );
    };

    const { productsLimit, pageSort } = this.productsDisplay;

    // Change sort filter based on option value
    categorySortFilter.addEventListener("change", (e) =>
      replaceSelectedParam(e, "sort")
    );

    // Maske parameter sort value selected in html
    selectDefault(categorySortFilter);

    // Change limit based on option value
    categoryRangeLimit.addEventListener("change", (e) =>
      replaceSelectedParam(e, "limit")
    );

    // Maske parameter limit value selected in html
    selectDefault(categoryRangeLimit);
  }

  /**
   * Fetching sections data from database.
   * @param {String} sectionNameDB - Section name in database.
   * @param {String} propertyName - Section name in sideBarData property.
   */
  fetchSideBarData(sectionNameDB, propertyName) {
    const uniqueDataArr = [];

    this.data.forEach((item) => {
      const formatingItem = item[sectionNameDB].toLowerCase();

      if (!uniqueDataArr.includes(formatingItem))
        uniqueDataArr.push(formatingItem);
    });

    const sortUniqueDataArr = uniqueDataArr.sort();
    this.sideBarData[propertyName] = sortUniqueDataArr;
  }

  /**
   *---------------------------------------------------
   */

  /**
   *---------------------------------------------------
   *[************** Comopnents render ****************]
   *---------------------------------------------------
   * 1 - Methods:
   *      - {productsRender} - render Products arrtay form
   *        (productsSegmentsArray) property
   *      - {paginationRender} - render Pagination form
   *        (productsDisplay) property
   *      - {sidebarRender} - sidebar sections generator
   */

  /**
   * Injecting products into category grid page
   */
  productsRender() {
    const { start, end } = this.pageDisplay;

    this.generateProductsArray();
    categoryProducts.innerHTML = this.productsSegmentsArray
      ?.slice(start, end)
      .join("");
  }

  /**
   * Generate pagination and render it.
   */
  paginationRender() {
    /**
     * Change page direction pased when click.
     * @param {String} direction - Direction clicked.
     */
    const changePagination = (direction) => {
      if (direction === "prv" && currentPage > 1)
        window.location.assign(
          this.replaceUrlParam(this.pageURL, "page", currentPage - 1)
        );
      if (direction === "nxt" && currentPage < pagesNumber)
        window.location.assign(
          this.replaceUrlParam(this.pageURL, "page", currentPage + 1)
        );
    };

    /**
     * Creates pages links
     * @param {Integer} pageNumber
     * @returns {HTMLElement}
     */
    const pageNumberSegment = (pageNumber) =>
      `<a class="action action-secondary black page" data-number=${pageNumber} href="${this.replaceUrlParam(
        this.pageURL,
        "page",
        pageNumber
      )}">${pageNumber}</a>`;

    let { productsLimit, currentPage } = this.productsDisplay;
    const pages = [];
    const pagesNumber = Math.ceil(
      this.productsSegmentsArray.length / productsLimit
    );
    currentPage = parseInt(currentPage);

    // Generate pages
    let i = 1;
    for (; i <= pagesNumber; i++) {
      pages.push(pageNumberSegment(i));
    }

    categoryPagination.innerHTML = pages.join("");

    // Change style for current page
    categoryPagination.childNodes.forEach((link) => {
      if (link.dataset.number == currentPage) {
        link.classList.add("page--active");
      }
    });

    // Controles page change when click arrows
    categoryPaginationPrv.addEventListener("click", () =>
      changePagination("prv")
    );
    categoryPaginationNxt.addEventListener("click", () =>
      changePagination("nxt")
    );
  }

  /**
   * Render sidebar sections
   */
  sidebarRender() {
    /**
     * Render Sidebar sections item
     * @param {String} departName - Category, brands...
     * @param {*} departValue - men, woman....
     * @param {*} isChecked - Check if URL search contains item value it will be checked
     * @returns Render item in sidebar section
     */
    const itemSegments = (departName, departValue, isChecked) =>
      `<li class="item ${isChecked ? "item--active" : ""}">
          <input type="checkbox" ${
            isChecked && "checked"
          } name="${departName}" value="${departValue}"/>
          ${departValue}
          <span class="box"></span>
        </li>`;

    /**
     * Generate Sidebar section
     * @param {Object} sectionObject - Contain section informations
     * @returns {HTMLElment} - The section html
     */
    const sectionRender = (sectionObject) => {
      const {
        sectionClass,
        sectionTitle,
        itemsArray,
        itemsInUrl,
        sectionItemsValue,
      } = sectionObject;

      return `
      <div class="group ${sectionClass}">
        <h4 class="group__title">${sectionTitle}</h4>
        <ul class="group__list">${itemsArray
          .map((item) =>
            itemSegments(sectionItemsValue, item, itemsInUrl.includes(item))
          )
          .join("")}
        </ul>
      </div>`;
    };

    // Fetch sidebar sections data
    this.fetchSideBarData("category", "categories");
    this.fetchSideBarData("brand", "brands");

    const { filters } = this.productsDisplay;
    const { categories, brands } = filters;
    const categoriesObj = {
      sectionClass: "category",
      sectionTitle: "Categories",
      itemsArray: this.sideBarData.categories,
      itemsInUrl: categories,
      sectionItemsValue: "category",
    };
    const brandsObj = {
      sectionClass: "by-brand",
      sectionTitle: "By Brand",
      itemsArray: this.sideBarData.brands,
      itemsInUrl: brands,
      sectionItemsValue: "brand",
    };

    categorySidebar.insertAdjacentHTML(
      "afterbegin",
      sectionRender(categoriesObj) + sectionRender(brandsObj)
    );
  }

  /**
   *---------------------------------------------------
   */
}

/**
 * @type {HTMLElement} - category Products
 */
const categoryProducts = document.getElementById("categoryProducts");

/**
 * @type {HTMLElement} - category Grid Pagination
 */
const categoryPagination = document.getElementById("categoryPagination");

/**
 * @type {HTMLElement} - category Pagination pages controlers
 */
const categoryPaginationPrv = document.getElementById("categoryPaginationPrv");
const categoryPaginationNxt = document.getElementById("categoryPaginationNxt");

/**
 * @type {HTMLElement} - category Grid settings controls how products displays
 */
const categorySortFilter = document.querySelector("#categorySortFilter select");
const categoryRangeLimit = document.querySelector("#categoryRangeLimit select");

/**
 * @type {HTMLElement} - Products filters sidebar
 */
const categorySidebar = document.getElementById("categorySidebar");

/**
 *---------------------------------------------------
 *[********* Reading data from URL param ***********]
 *---------------------------------------------------
 * 1 - Functions
 *      - {URLParameter} get spacific param value
 *        by passing param as string.
 *      - {fetchFilterParams} get sidebar params values.
 * 2 - Object
 *      - {productsDisplay} collecting data
 */

/**
 * Receve url parameter and returns value
 * @param {String} parameter - Url parameter.
 * @returns Value of parameter from urlk
 */
const URLParameter = (parameter) => {
  return urlParams.get(parameter);
};

/**
 * Take Department name and collect all values from parameters in URL
 * @param {String} paramTo Sidebar Category or Brands
 * @returns Array of selected value
 */
const fetchFilterParams = (paramTo) =>
  Array.from(urlParams)
    .map((param) => (param[0] === paramTo ? param[1] : undefined))
    .filter((param) => param !== undefined);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const productsDisplay = {
  currentPage: URLParameter("page") || 1,
  pageSort: URLParameter("sort") || "default",
  productsLimit: URLParameter("limit") || 12,
  filters: {
    isFilters:
      fetchFilterParams("category").length > 0 ||
      fetchFilterParams("brand").length > 0
        ? true
        : false,
    categories: fetchFilterParams("category"),
    brands: fetchFilterParams("brand"),
  },
};
/**
 * ---------------------------------------------------
 */

/**
 *---------------------------------------------------
 *[************* Server fetching data **************]
 *---------------------------------------------------
 * 1- Functions
 *      - {handleData} Do things when server is ok.
 *      - {handleServerError} Handle data from server
 *        if server respond 200 or other.
 *      - {handleDataError} handle errors
 *        if it happen in {handleData}.
 *
 * 2- Fetch Api
 */

/**
 * Fetching array of data from server ("/proucts")
 * @param {Array} data
 */
const handleData = (data) => {
  const products = new Products(data, productsDisplay);

  products.productsRender();
  products.paginationRender();
  products.settingbarConroler();
  products.sidebarRender();
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

/**
 * ---------------------------------------------------
 */
