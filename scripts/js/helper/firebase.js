// Add product to cart
const addProductToCard = (productId) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.

      firebase
        .database()
        .ref("carts/" + user.uid + "/products/" + productId)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            // 6) Get pervious quantity and Incrment it
            firebase
              .database()
              .ref("carts/" + user.uid + "/products/" + productId)
              .once("value")
              .then((snapshot) => {
                firebase
                  .database()
                  .ref("carts/" + user.uid + "/products/" + productId)
                  .set({
                    quantity: snapshot.val().quantity + 1,
                  });
              });
          } else {
            // 4) Add product to cart
            firebase
              .database()
              .ref("carts/" + user.uid + "/products/" + productId)
              .set({
                quantity: 1,
              });

            // 5) Update cart number.
            firebase
              .database()
              .ref("/carts/" + user.uid + "/products/")
              .once("value")
              .then((snapshot) => {
                document.getElementById("cartProductsNumber").innerHTML =
                  Object.keys(snapshot.val()).length;
              });
          }
        });
    } else {
      // User not logged in or has just logged out.
      console.log("No user logged in");
    }
  });
};

// Remove product from cart
const removeProductFromCard = (productId) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.

      firebase
        .database()
        .ref("carts/" + user.uid + "/products/" + productId)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            // 6) Get pervious quantity and Incrment it
            firebase
              .database()
              .ref("carts/" + user.uid + "/products/" + productId)
              .once("value")
              .then((snapshot) => {
                firebase
                  .database()
                  .ref("carts/" + user.uid + "/products/" + productId)
                  .set({
                    quantity: snapshot.val().quantity - 1,
                  });
              });
          } else {
            // 4) Add product to cart
            firebase
              .database()
              .ref("carts/" + user.uid + "/products/" + productId)
              .set({
                quantity: 1,
              });

            // 5) Update cart number.
            firebase
              .database()
              .ref("/carts/" + user.uid + "/products/")
              .once("value")
              .then((snapshot) => {
                document.getElementById("cartProductsNumber").innerHTML =
                  Object.keys(snapshot.val()).length;
              });
          }
        });
    } else {
      // User not logged in or has just logged out.
      console.log("No user logged in");
    }
  });
};
