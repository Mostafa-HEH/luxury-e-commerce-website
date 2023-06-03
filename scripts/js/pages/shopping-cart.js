const shoppingCartItems = document.getElementById("shoppingCartItems");

firebase.auth().onAuthStateChanged((user) => {
  let userId;

  if (user) {
    // User logged in already or has just logged in.
    userId = user.uid;

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

            shoppingCartItems.insertAdjacentHTML(
              "beforeend",
              cartProductsId
                .map((id) => {
                  const product = snapshot.child(id).val();
                  totalPrice =
                    totalPrice +
                    cartProducts[id].quantity * (product.price / egpusd);

                  return `<ul class="items__item">
                  <li class="product">
                  <span class="action action-secondary white">
                  <i class="fa-solid fa-xmark"></i>
                  </span>
                                <div class="img-container img">
                                    <img src="${product.images[0]}" alt="${
                    product.title
                  }"/>
                                </div>
                                <div class="name">${product.title}</div>
                            </li>
                            <li class="price">$${
                              product.discountPercentage
                                ? applyDiscount(
                                    product.price,
                                    product.discountPercentage
                                  )
                                : (product.price / egpusd).toFixed(2)
                            }</li>
                            <li class="quantity">
                                <input class="input" type="number" min="1" max="${
                                  product.stock
                                }" value="${
                    cartProducts[id].quantity
                  }" onchange="(function controlProduct(){
                    if(${cartProducts[id].quantity} < window.event.target.value)
                      addProductToCard(${id})
                    if(${cartProducts[id].quantity} > window.event.target.value)
                      removeProductFromCard(${id})
                  })()">
                            </li>
                            <li class="total">$${(
                              (cartProducts[id].quantity * product.price) /
                              egpusd
                            ).toFixed(2)}</li>
                        </ul>`;
                })
                .join("")
            );
          });
      });
  } else {
    // User not logged in or has just logged out.
    console.log("No user logged in");
  }
});

// Draft XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Item
`<ul class="items__item">
    <li class="product">
        <span class="action action-secondary white">
            <i class="fa-solid fa-xmark"></i>
        </span>
        <div class="img-container img">
            <img src="" alt=""/>
        </div>
        <div class="name">Technical suit</div>
    </li>
    <li class="price">$290.00</li>
    <li class="quantity">
        <input class="input" type="number" value="1">
    </li>
    <li class="total">$290.00</li>
</ul>`;
