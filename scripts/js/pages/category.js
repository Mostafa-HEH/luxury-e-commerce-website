// Firebase Database Init.
const database = firebase.database();
const dbRef = firebase.database().ref();

// Read url parameters *Initalized with default settings
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const productsLayout = urlParams.get("layout") || "grid"; // How product displays (Grid/List).
const productsSort = "default"; // Controls how products sort in the page.
const productsCurrentPage = "1"; // Shows prodducts of spacific page.
const productsFilter = {
  categories: "all",
  brands: "all",
}; // Filter pased on rendered sections.

// Containers that products will be injected.
const gridProductsContainer = document.getElementById("gridProductsContainer");
const listProductsContainer = document.getElementById("listProductsContainer");

// 1) Read only Firebase products data & displays it in the page pased on url parameters;
dbRef
  .child("products")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      // 2) Choose between grid or list & render products pased on that.
      if (productsLayout === "grid" || gridProductsContainer)
        gridProductsContainer.innerHTML = snapshot
          .val()
          .map((product, id) => {
            return `<div class="product-card">
              <div class="img-container product-card__image">
                  <img src="${product.thumbnail}" alt="${product.title}">
                  <div class="navigation">
                      <a href="./product-details-v1.html?id=${id}" class="navigation__link">
                          <i class="fa-light fa-magnifying-glass-plus"></i>
                      </a>
                      <span class="navigation__link">
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
                  ${product.tags.map((tag) => `<div class="tag">${tag}</div>`)}
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
          </div>`;
          })
          .join("");

      if (productsLayout === "list" || listProductsContainer)
        listProductsContainer.innerHTML = snapshot
          .val()
          .map((product, id) => {
            return `<div class="product-card-list">
            <div class="img-container product-card__image">
              <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            ${
              product.tags
                ? `<div class="product-card__tags">
                ${product.tags.map((tag) => `<div class="tag">${tag}</div>`)}
              </div>`
                : ""
            }
            <div class="product-card-list__content">
              <a href="./product-details-v1.html?id=${id}" class="name">${
              product.title
            }</a>
              <div class="rate"> ${
                product.rating
                  ? `
                  <div class="rate__stars">
                    ${ratesGenerator(product.rating).join("")}
                  </div>
                `
                  : ""
              }
                <div class="rate__details">
                  <span>2 Review(s)</span>
                  <span class="seprator"></span>
                  <span>Add Your Review</span>
                </div>
              </div>
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
              <div class="description">${
                (product.description?.length > 230
                  ? product.description?.slice(0, 230) + "..."
                  : product.description) || ""
              }</div>
              <div class="navigation">
                <span class="action action-primary black icon">
                  <i class="fa-light fa-bag-shopping"></i>Add to cart
                </span>
                <span class="action action-secondary black">
                  <i class="fa-regular fa-retweet"></i>
                </span>
                <span class="action action-secondary black">
                  <i class="fa-light fa-heart"></i></span>
                </div>
            </div>
          </div>`;
          })
          .join("");
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
    // location.reload();
  });

// Drafts - XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Product grid
// `<div class="product-card">
//     <div class="img-container product-card__image">
//         <img src="" alt="">
//         <div class="navigation">
//             <span class="navigation__link">
//                 <i class="fa-light fa-magnifying-glass-plus"></i>
//             </span>
//             <span class="navigation__link">
//                 <i class="fa-light fa-bag-shopping"></i>
//             </span>
//             <span class="navigation__link">
//                 <i class="fa-regular fa-retweet"></i>
//             </span>
//             <span class="navigation__link">
//                 <i class="fa-light fa-heart"></i>
//             </span>
//         </div>
//     </div>
//     <div class="product-card__tags">
//         <div class="tag">sale</div>
//     </div>
//     <div class="product-card__content">
//         <h3 class="name">Navy Blue suit</h3>
//         <div class="rate">
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star-half-stroke"></i>
//         </div>
//     <div class="price">
//         <div class="price__before">$49.90</div>
//         <div class="price__after">$310.00</div>
//     </div>
//     </div>
// </div>`;

// Product list
// `<div class="product-card-list">
//   <div class="img-container product-card__image">
//     <img src="" alt="">
//   </div>
//   <div class="product-card__tags">
//     <div class="tag">sale</div>
//   </div>
//   <div class="product-card-list__content">
//     <h3 class="name">TOP WITH CROSSOVER STRAPS</h3>
//     <div class="rate">
//       <div class="rate__stars">
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-light fa-star"></i>
//       </div>
//       <div class="rate__details">
//         <span>2 Review(s)</span>
//         <span class="seprator"></span>
//         <span>Add Your Review</span>
//       </div>
//     </div>
//     <div class="price">
//       <div class="price__before">$49.90</div>
//       <div class="price__after">$35.90</div>
//     </div>
//     <div class="description">Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat id. Vivamus interdum urna at sapien varius elementum. Suspendisse ut mi felis.</div>
//     <div class="navigation">
//       <span class="action action-primary black icon">
//         <i class="fa-light fa-bag-shopping"></i>Add to cart
//       </span>
//       <span class="action action-secondary black">
//         <i class="fa-regular fa-retweet"></i>
//       </span>
//       <span class="action action-secondary black">
//         <i class="fa-light fa-heart"></i></span>
//       </div>
//   </div>
// </div>`;
