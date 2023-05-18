/**
 * @file Class representing products depends on product class.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

class Products extends Product {
  displayArray;

  constructor(productsArray, renderType) {
    super();
    this.productsArray = productsArray;
    this.renderType = renderType;
  }

  /**
   * Soring array of data
   * @param {*} a - Compare value 1
   * @param {*} b Compare value 2
   * @param {Sring} sortwWith - attribute to sort with
   * @returns Sorted array
   */
  sortArray(a, b, sortwWith) {
    if (a[sortwWith] < b[sortwWith]) return -1;
    if (a[sortwWith] > b[sortwWith]) return 1;
    return 0;
  }

  /**
   * Generates last new products.
   * @param {Number} numberToShow - Number of new products displays.
   */
  newProducts(numberToShow) {
    this.displayArray = this.productsArray.slice(-numberToShow);
  }

  /**
   * Generate products rates more than reteMin
   * and if no products, it decrese reteMin 0.5 until it gets products
   * @param {*} reteMin - Minmum rating number
   */
  topProducts(reteMin) {
    let products = [];

    while (!(products.length > 0)) {
      products = this.productsArray
        .filter((item) => item.rating >= reteMin)
        .sort((a, b) => this.sortArray(a, b, "rating"))
        .reverse();

      reteMin = reteMin - 0.5;
    }

    this.displayArray = products;
  }

  saleProducts(percentage) {
    let products = [];

    while (!(products.length > 0)) {
      products = this.productsArray
        .filter((item) => item.discountPercentage >= percentage)
        .sort((a, b) => this.sortArray(a, b, "discountPercentage"))
        .reverse();

      percentage = percentage - 5;
    }

    this.displayArray = products;
  }

  /**
   * Generats top 8 all featured
   * @param {Number} numberToShow - Limit number of products to show
   */
  allFeatured(numberToShow) {
    let all = [];
    this.watchesFeatured(8);
    all = [...this.displayArray];
    this.shoesFeatured(8);
    this.displayArray = [...all, ...this.displayArray]
      .sort((a, b) => this.sortArray(a, b, "rating"))
      .reverse()
      .slice(-numberToShow);
  }

  /**
   * Generats top 8 watches
   * @param {Number} numberToShow - Limit number of products to show
   */
  watchesFeatured(numberToShow) {
    this.displayArray = [
      ...this.productsArray.filter((item) => item.department === "watches"),
      ...this.productsArray.filter((item) => item.category === "watches"),
    ]
      .sort((a, b) => this.sortArray(a, b, "rating"))
      .reverse()
      .slice(-numberToShow);
  }

  /**
   * Generats top 8 shoes
   * @param {Number} numberToShow - Limit number of products to show
   */
  shoesFeatured(numberToShow) {
    this.displayArray = [
      ...this.productsArray.filter((item) => item.department === "shoes"),
      ...this.productsArray.filter((item) => item.category === "shoes"),
    ]
      .sort((a, b) => this.sortArray(a, b, "rating"))
      .reverse()
      .slice(-numberToShow);
  }

  customRender(show) {
    switch (show) {
      case "new-products":
        this.newProducts(8);
        break;

      case "top-products":
        this.topProducts(4);
        break;

      case "sale-products":
        this.saleProducts(20);
        break;

      case "all-featured":
        this.allFeatured(8);
        break;

      case "watches-featured":
        this.watchesFeatured(8);
        break;

      case "shoes-featured":
        this.shoesFeatured(8);
        break;

      default:
        this.displayArray = this.productsArray;
        break;
    }
  }

  /**
   * Generates products array pased on renderType.
   */
  productsRender() {
    return this.displayArray
      .map((item) => {
        if (this.renderType === "list") return this.productListRender(item);
        if (this.renderType === "grid") return this.productGridRender(item);
      })
      .join("");
  }
}
