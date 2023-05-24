fetch("http://localhost:3000/carts")
  .then((res) => res.json())
  .then((data) => {
    let productsLength = 0;
    let cartTotal = 0;

    document.getElementById("cartProducts").innerHTML = data.map((cart) => {
      const products = cart.products;
      cartTotal = cart.total;

      return products
        .map(({ thumbnail, title, price }) => {
          productsLength++;

          return `
          <div class="product-card">
              <div class="img-container product-card__image">
                  <img src="${thumbnail}" alt="${title}">
                  <div class="navigation">
                      <span class="navigation__link">
                      <i class="fa-light fa-magnifying-glass-plus"></i>
                      </span>
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
              <div class="product-card__content">
                  <h3 class="name">${title}</h3>
                  <div class="price">
                      <div class="price__after">$${(price / 31).toFixed(
                        2
                      )}</div>
                  </div>
              </div>
              <span class="product-card__remove">
                  <i class="fa-solid fa-xmark"></i>
              </span>
          </div>
          `;
        })
        .join("");
    });

    document.getElementById("cartProductsNumber").innerText = productsLength;
    document.getElementById("cartTotal").innerText = `$${(
      cartTotal / 31
    ).toFixed(2)}`;
  });
