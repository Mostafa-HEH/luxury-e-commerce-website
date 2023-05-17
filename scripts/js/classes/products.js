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
   * Generates last new products.
   * @param {Number} numberToShow - Number of new products displays.
   */
  newProducts(numberToShow) {
    this.displayArray = this.productsArray.slice(-numberToShow);
  }

  customRender(show) {
    switch (show) {
      case "new-products":
        this.newProducts(8);
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
