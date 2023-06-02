// Firebase Database Init.
const database = firebase.database();
const dbRef = firebase.database().ref();

// Container will be injected
const navbarCartProducts = document.getElementById("navbarCartProducts");
const navbarCartTotal = document.getElementById("navbarCartTotal");

firebase.auth().onAuthStateChanged((user) => {
  let userId;

  if (user) {
    // User logged in already or has just logged in.
    userId = user.uid;

    // 5) Change cart number .
    firebase
      .database()
      .ref("/carts/" + userId + "/products/")
      .once("value")
      .then((snapshot) => {
        document.getElementById("cartProductsNumber").innerHTML = Object.keys(
          snapshot.val()
        ).length;
      });

    // 2) Fill cart data on cart hover.
    // 3) Fetch user cart pased on user id.

    document.getElementById("cartHover").addEventListener("mouseenter", (e) => {
      document.body.style.overflow = "hidden";
      firebase
        .database()
        .ref("/carts/" + userId + "/products/")
        .once("value")
        .then((snapshot) => {
          const cartProductsId = [];
          const cartProducts = snapshot.val();

          for (id in cartProducts) {
            cartProductsId.push(id);
          }

          // 4) Fetch products that user selected
          firebase
            .database()
            .ref("/products/")
            .once("value")
            .then((snapshot) => {
              let totalPrice = 0;

              navbarCartProducts.innerHTML = cartProductsId
                .map((id) => {
                  const product = snapshot.child(id).val();
                  totalPrice =
                    totalPrice +
                    cartProducts[id].quantity * (product.price / egpusd);

                  return `
                    <div class="product-card">
                      <div class="img-container product-card__image">
                        <img src="${product.images[0]}" alt="${product.title}">
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
                      <div class="product-card__content">
                        <h3 class="name">${product.title}</h3>
                        <div class="price">
                          <div class="price__after">$${
                            product.discountPercentage
                              ? applyDiscount(
                                  product.price,
                                  product.discountPercentage
                                )
                              : (product.price / egpusd).toFixed(2)
                          }</div>
                        </div>
                      </div>
                      <span class="product-card__remove"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                  `;
                })
                .join("");
              navbarCartTotal.innerHTML = `$${totalPrice.toFixed(2)}`;
            });
        });
    });

    document.getElementById("cartHover").addEventListener("mouseleave", () => {
      document.body.style.overflow = "auto";
    });
  } else {
    // User not logged in or has just logged out.
    console.log("No user logged in");
  }
});

// Draft XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

{
  /* <div class="product-card">
  <div class="img-container product-card__image">
    <img src="" alt="">
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
    <h3 class="name">HIGH HEEL SANDAL</h3>
    <div class="price">
      <div class="price__after">$29.00</div>
    </div>
  </div>
  <span class="product-card__remove"><i class="fa-solid fa-xmark"></i></span>
</div> */
}
