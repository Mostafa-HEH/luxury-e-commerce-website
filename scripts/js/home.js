/**
 * @file Home page scripts.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

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
  if (newProducts) newProducts.innerHTML = products.productsRender();

  // Change displayed products top-products as default.
  if (topProducts.dataset.page === "home-v1")
    products.customRender("top-products");
  if (
    topProducts.dataset.page === "home-v2" ||
    topProducts.dataset.page === "home-v3"
  )
    products.customRender("all-featured");
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
