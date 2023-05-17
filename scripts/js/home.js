/**
 * @file Home page scripts.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

// Home new products
const newProducts = document.getElementById("newProducts");

/**
 * Fetching array of data from server ("/proucts")
 * @param {Array} data
 */
const handleData = (data) => {
  const products = new Products(data, "grid");
  products.customRender("new-products");
  newProducts.innerHTML = products.productsRender();
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
