// Read url parameters *Initalized with default settings
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const productID = urlParams.get("id") || "0"; // Product will fetch data from.

// Containers that products will be injected.
const productDetailsContainerV1 = document.getElementById(
  "productDetailsContainerV1"
);
const productDetailsContainerV2 = document.getElementById(
  "productDetailsContainerV2"
);

// 1) Read only Firebase products data & displays it in the page pased on url parameters;
firebase
  .database()
  .ref("/products/" + productID)
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      // 2) Choose between v1 or v2 product details page.
      const product = snapshot.val();
      let v1CurrentImage = 0;
      let v2CurrentImage = 0;

      if (productDetailsContainerV1) {
        productDetailsContainerV1.innerHTML = `
            <div class="images" id="v1Images">
                <div class="images__subs">
                    ${product.images
                      .map(
                        (image, id) =>
                          `<div class="img-container ${
                            v1CurrentImage == id ? "img--active" : ""
                          } img productdetails-subimage"><img src="${image}" alt="${
                            product.title
                          }" data-id="${id}" class="sub-image"/></div>`
                      )
                      .slice(0, 5)
                      .join("")}
                </div>
                <div class="img-container images__main">
                    <img src="${product.images[v1CurrentImage]}" alt="${
          product.title
        }" />
                </div>
            </div>
      
            <div class="product-card-list">
                <div class="product-card-list__content">
                    <h3 class="name">${product.title}</h3>
                    <div class="rate">
                        <div class="rate__stars">${ratesGenerator(
                          product.rating
                        ).join("")}</div>
                        <!-- Not designed yet -->
                        <div class="rate__details">
                            <span>12 Review(s)</span>
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
                    <div class="availability">
                        Availability: <span>${
                          product.stock > 0 ? "In stock" : "Sold out"
                        }</span>
                    </div>
                    <div class="description">${product.description}</div>
                    <div class="data-input">
                        ${
                          product.stock > 0
                            ? `
                            <label class="select-number">
                                Quantity:<input type="number" min="1" max="${product.stock}" value="1">
                            </label>
                        `
                            : ""
                        }
                        ${
                          product.size
                            ? `
                            <label class="select">
                                Size:
                                <select>
                                    ${product.size
                                      .map(
                                        (op) =>
                                          `<option value="${op}">${op}</option>`
                                      )
                                      .join("")}
                                </select>
                            </label>
                        `
                            : ""
                        }
                        ${
                          product.color
                            ? `
                            <label class="select">
                                Color:
                                <select>
                                    ${product.color
                                      .map(
                                        (op) =>
                                          `<option value="${op}">${op}</option>`
                                      )
                                      .join("")}
                                </select>
                            </label>
                        `
                            : ""
                        }
                </div>
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
                ${
                  product.features
                    ? `<div class="featurs">${product.features
                        .map((feature) => feature)
                        .join(" | ")}</div>`
                    : ""
                }
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

        // Change main image view by clicking the sub image.
        document.querySelectorAll("#v1Images .sub-image").forEach((image) =>
          image.addEventListener("click", (e) => {
            // Remove border from last image and add itto current
            document
              .querySelectorAll("#v1Images .productdetails-subimage")
              [v1CurrentImage].classList.remove("img--active");
            v1CurrentImage = e.target.dataset.id;
            document
              .querySelectorAll("#v1Images .productdetails-subimage")
              [v1CurrentImage].classList.add("img--active");

            document.querySelector(
              "#v1Images  .images__main img"
            ).outerHTML = `<img src="${product.images[v1CurrentImage]}" alt="${product.title}" />`;
          })
        );
      }

      if (productDetailsContainerV2) {
        productDetailsContainerV2.innerHTML = `
            <div class="images" id="v2Images">
                <div class="images__subs">
                ${product.images
                  .map(
                    (image, id) =>
                      `<div class="img-container ${
                        v2CurrentImage == id ? "img--active" : ""
                      } img productdetails-subimage" data-id="${id}"><img src="${image}" alt="${
                        product.title
                      }" data-id="${id}" class="sub-image"></div>`
                  )
                  .slice(0, 5)
                  .join("")}
                </div>
                <div class="img-container images__main">
                    <img src="${product.images[v2CurrentImage]}" alt="${
          product.title
        }"/>
                </div>
            </div>
            <div class="product-card-list">
                <div class="product-card-list__content">
                    <h3 class="name">${product.title}</h3>
                    <div class="rate">
                        <div class="rate__stars">${ratesGenerator(
                          product.rating
                        ).join("")}</div>
                        <div class="rate__details">
                            <span>12 Review(s)</span>
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
                    <div class="availability">
                        Availability: <span>${
                          product.stock > 0 ? "In stock" : "Sold out"
                        }</span>
                    </div>
                    <div class="description">${product.description}</div>
                    <div class="data-input">
                        ${
                          product.size
                            ? `
                            <div class="selector">
                                <div class="selector__name">size: </div>
                                <div class="selector__options">
                                    ${product.size
                                      .map(
                                        (op) =>
                                          `<div class="option">${op}</div>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                        `
                            : ""
                        }
                        ${
                          product.color
                            ? `
                              <div class="selector">
                                <div class="selector__name">color: </div>
                                  <div class="selector__options">
                                      ${product.color
                                        .map(
                                          (op) =>
                                            `<div class="option">${op}</div>`
                                        )
                                        .join("")}
                                  </div>
                              </div>
                          `
                            : ""
                        }
                        ${
                          product.stock > 0
                            ? `
                              <label class="select-number">
                                  Quantity:<input type="number" min="1" max="${product.stock}" value="1">
                              </label>
                          `
                            : ""
                        }
                    </div>
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
                    ${
                      product.features
                        ? `<div class="featurs">${product.features
                            .map((feature) => feature)
                            .join(" | ")}</div>`
                        : ""
                    }
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
        // Change main image view by clicking the sub image.
        document.querySelectorAll("#v2Images .sub-image").forEach((image) =>
          image.addEventListener("click", (e) => {
            // Remove border from last image and add itto current
            document
              .querySelectorAll("#v2Images .productdetails-subimage")
              [v2CurrentImage].classList.remove("img--active");
            v2CurrentImage = e.target.dataset.id;
            document
              .querySelectorAll("#v2Images .productdetails-subimage")
              [v2CurrentImage].classList.add("img--active");

            document.querySelector(
              "#v2Images  .images__main img"
            ).outerHTML = `<img src="${product.images[v2CurrentImage]}" alt="${product.title}" />`;
          })
        );
      }
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Darft XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Productdetails v1
//`
// <div class="images">
//     <div class="images__subs">
//         <div class="img-container img img--active"><img src="" alt="alt"></div>
//         <div class="img-container img"><img src="" alt="alt"></div>
//         <div class="img-container img"><img src="" alt="alt"></div>
//         <div class="img-container img"><img src="" alt="alt"></div>
//         <div class="img-container img"><img src="" alt="alt"></div>
//     </div>
//     <div class="img-container images__main">
//         <img src="" alt="alt">
//     </div>
// </div>
// <div class="product-card-list">
//     <div class="product-card-list__content">
//         <h3 class="name">STRIPED CROP TOP</h3>
//         <div class="rate">
//             <div class="rate__stars">
//                 <i class="fa-solid fa-star"></i>
//                 <i class="fa-solid fa-star"></i>
//                 <i class="fa-solid fa-star"></i>
//                 <i class="fa-solid fa-star"></i>
//                 <i class="fa-light fa-star"></i>
//             </div>
//             <div class="rate__details">
//                 <span>12 Review(s)</span>
//                 <span class="seprator"></span>
//                 <span>Add Your Review</span>
//             </div>
//         </div>
//         <div class="price">
//             <div class="price__before">$49.90</div>
//             <div class="price__after">$29.90</div>
//         </div>
//         <div class="availability">
//             Availability: <span>In stock</span>
//         </div>
//         <div class="description">Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat id. Vivamus interdum urna at sapien varius elementum. Suspendisse ut mi felis.</div>
//         <div class="data-input">
//             <label class="select-number">
//                 Quantity:<input type="number" value="1">
//             </label>
//         <label class="select">
//             Size:
//             <select>
//                 <option value="default">xs </option>
//                 <option value="name">l</option>
//                 <option value="price">m </option>
//             </select>
//         </label>
//         <label class="select">
//             Color:
//             <select>
//                 <option value="default">blue </option>
//                 <option value="name">black</option>
//                 <option value="price">green</option>
//             </select>
//         </label>
//     </div>
//     <div class="navigation">
//         <span class="action action-primary black icon">
//             <i class="fa-light fa-bag-shopping"></i>Add to cart
//         </span>
//         <span class="action action-secondary black">
//             <i class="fa-regular fa-retweet"></i>
//         </span>
//         <span class="action action-secondary black">
//             <i class="fa-light fa-heart"></i>
//         </span>
//     </div>
//     <div class="featurs">Free Shipping | Free Return</div>
//         <div class="share">
//             <span>Share:</span>
//             <div class="social-links">
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-facebook-f"></i>
//                 </a>
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-twitter"></i>
//                 </a>
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-pinterest-p"></i>
//                 </a>
//             </div>
//         </div>
//     </div>
// </div>
// `

// Productdetails v2
// `
// <div class="images">
//     <div class="images__subs">
//     <div class="img-container img img--active"><img src="" alt="alt"></div>
//     <div class="img-container img"><img src="" alt="alt"></div>
//     <div class="img-container img"><img src="" alt="alt"></div>
//     <div class="img-container img"><img src="" alt="alt"></div>
//     <div class="img-container img"><img src="" alt="alt"></div>
//     </div>
//     <div class="img-container images__main"><img src="" alt="alt"></div>
// </div>
// <div class="product-card-list">
//     <div class="product-card-list__content">
//         <h3 class="name">TECHNICAL SUIT</h3>
//         <div class="rate">
//             <div class="rate__stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-light fa-star"></i></div>
//             <div class="rate__details"><span>12 Review(s)</span><span class="seprator"></span><span>Add Your Review</span></div>
//         </div>
//         <div class="price">
//             <div class="price__before">$49.90</div>
//             <div class="price__after">$169.00</div>
//         </div>
//         <div class="availability">
//             Availability: <span>In stock</span>
//         </div>
//         <div class="description">Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat id. Vivamus interdum urna at sapien varius elementum. Suspendisse ut mi felis.</div>
//         <div class="data-input">
//             <div class="selector">
//                 <div class="selector__name">size: </div>
//                 <div class="selector__options">
//                     <div class="option option--active">xs</div>
//                     <div class="option">s</div>
//                     <div class="option">l</div>
//                     <div class="option">xxl</div>
//                 </div>
//             </div>
//             <div class="selector">
//                 <div class="selector__name">color: </div>
//                 <div class="selector__options">
//                     <div class="option option--active">white</div>
//                     <div class="option">black</div>
//                     <div class="option">blue</div>
//                     <div class="option">grey</div>
//                 </div>
//             </div>
//             <label class="select-number">
//                 Quantity:
//                 <input type="number" value="1">
//             </label>
//         </div>
//         <div class="navigation">
//             <span class="action action-primary black icon">
//                 <i class="fa-light fa-bag-shopping"></i>Add to cart
//             </span>
//             <span class="action action-secondary black">
//                 <i class="fa-regular fa-retweet"></i>
//             </span>
//             <span class="action action-secondary black">
//                 <i class="fa-light fa-heart"></i>
//             </span>
//         </div>
//         <div class="featurs">Free Shipping | Free Return</div>
//         <div class="share">
//             <span>Share:</span>
//             <div class="social-links">
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-facebook-f"></i>
//                 </a>
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-twitter"></i>
//                 </a>
//                 <a class="action action-primary white" href="#">
//                     <i class="fa-brands fa-pinterest-p"></i>
//                 </a>
//             </div>
//         </div>
//     </div>
// </div>
// `;
