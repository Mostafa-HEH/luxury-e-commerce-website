/**
 * @file Manages rendering product in product details v1 & v2.
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

//TODO this function is have twins in products js
/**
 * Receve url parameter and returns value
 * @param {String} parameter - Url parameter.
 * @returns Value of parameter from url
 */
const URLParameter = (parameter) => {
  return urlParams.get(parameter);
};

//TODO make subImages that more than 5 slides
const imagesRender = (images, title) => {
  /**
   * Generate image segment
   * @param {String} img - Image source code
   * @param {Number} idx - Image index
   * @returns {HTMLElement}
   */
  const subImage = (img, idx) => {
    return `
    <div class="img-container img ${
      idx === currentImage ? "img--active" : ""
    } productdetails-subimage" data-id="${idx}"><img src="${img}" alt="${title}"></div>
    `;
  };

  const currentImage = 0;

  return `
        <div class="images">
            <div class="images__subs"> 
                ${images
                  .map((img, idx) => subImage(img, idx))
                  .slice(0, 5)
                  .join("")}
            </div>
            <div class="img-container images__main" id="productDetailsMainImage">
              <img src="${images[currentImage]}" alt="${title}">
            </div>
        </div>
        `;
};

// Collecting url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = parseInt(URLParameter("id"));

const productDetailsV1 = document.getElementById("productDetailsV1");

/**
 * Fetching array of data from server ("/proucts")
 * @param {Array} data
 */
const handleData = async (data) => {
  const { images, title } = data.filter((item) => item.id === productID)[0];

  productDetailsV1.innerHTML = await `      
    ${imagesRender(images, title)}
    <div class="product-card-list">
        <div class="product-card-list__content">
        <h3 class="name">STRIPED CROP TOP</h3>
        <div class="rate">
            <div class="rate__stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-light fa-star"></i></div>
            <div class="rate__details"><span>12 Review(s)</span><span class="seprator"></span><span>Add Your Review</span></div>
        </div>
        <div class="price">
            <div class="price__before">$49.90</div>
            <div class="price__after">$29.90</div>
        </div>
        <div class="availability">Availability: <span>In stock</span></div>
        <div class="description">Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat id. Vivamus interdum urna at sapien varius elementum. Suspendisse ut mi felis.</div>
        <div class="data-input">
            <label class="select-number">Quantity:
            <input type="number" value="1">
            </label>
            <label class="select">Size:
            <select>
                <option value="default">xs </option>
                <option value="name">l</option>
                <option value="price">m </option>
            </select>
            </label>
            <label class="select">Color:
            <select>
                <option value="default">blue </option>
                <option value="name">black</option>
                <option value="price">green</option>
            </select>
            </label>
        </div>
        <div class="navigation"><span class="action action-primary black icon"><i class="fa-light fa-bag-shopping"></i>Add to cart</span><span class="action action-secondary black"><i class="fa-regular fa-retweet"></i></span><span class="action action-secondary black"><i class="fa-light fa-heart"></i></span></div>
        <div class="featurs">Free Shipping | Free Return</div>
        <div class="share"><span>Share:</span>
            <div class="social-links"> <a class="action action-primary white" href="#"><i class="fa-brands fa-facebook-f"></i></a><a class="action action-primary white" href="#"><i class="fa-brands fa-twitter"></i></a><a class="action action-primary white" href="#"><i class="fa-brands fa-pinterest-p"></i></a></div>
        </div>
        </div>
    </div>`;

  // Images - Main & Sub Image
  const productDetailsMainImage = document.getElementById(
    "productDetailsMainImage"
  );
  const productDetailsSubImage = document.querySelectorAll(
    ".productdetails-subimage"
  );

  // Controls sub images click
  productDetailsSubImage.forEach((img) => {
    img.addEventListener("click", () => {
      const imgId = img.dataset.id;

      // Add active class to clicked image and remove from others
      productDetailsSubImage.forEach((subImge) => {
        if (imgId == subImge.dataset.id) img.classList.add("img--active");
        else subImge.classList.remove("img--active");
      });

      // Rerender seletet sub image as main image
      productDetailsMainImage.innerHTML = `<img src="${images[imgId]}" alt="${title}">`;
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
