// Firebase configration
const firebaseConfig = {
  apiKey: "AIzaSyCFwyjdvYUzBwxiabukGiHzIQADTKzkwNI",
  authDomain: "luxury-e-commerce.firebaseapp.com",
  projectId: "luxury-e-commerce",
  storageBucket: "luxury-e-commerce.appspot.com",
  messagingSenderId: "49081782264",
  appId: "1:49081782264:web:bac36c2107750940bd500d",
  measurementId: "G-H2Y5JJS39Z",
};

const app = firebase.initializeApp(firebaseConfig);

// Facebook auth config
var facebookProvider = new firebase.auth.FacebookAuthProvider();
var twitterProvider = new firebase.auth.TwitterAuthProvider();
facebookProvider.addScope("email");
facebookProvider.setCustomParameters({
  display: "popup",
});

const logInContainer = document.getElementById("logInContainer");
const loadingContainer = document.getElementById("loadingContainer");

// 1) Check if user is logged in and passed on it render how page displays
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in
    logInContainer.innerHTML = await `
      <div class="logged-in" id="loggedIn">
        <div class="logged-in__messege">You logged in with <span class="email">${user.email}</span></div>
        <button class="btn btn-secondary black" id="logOutBtn">Sign out</button>
      </div>
    `;

    // Remove loading component
    loadingContainer.classList.remove("loading-container--active");

    // 3) If logged in data shows user will be able to sign out.
    document.getElementById("logOutBtn").addEventListener("click", (e) => {
      e.preventDefault();

      firebase
        .auth()
        .signOut()
        .then(() => {
          // Add loading component
          loadingContainer.classList.add("loading-container--active");
        })
        .catch((error) => {
          // An error happened.
          console.log("Something went wrong while signout");
        });
    });
  } else {
    // User data from local storage
    let user = JSON.parse(localStorage.getItem("user"));

    // User is signed out
    logInContainer.innerHTML = await `
      <form class="login" id="logInForm" >
        <h6 class="login__head">Sign In</h6>
        <div class="login__container">
          <div class="social-logins"> 
            <div class="btn btn-social facebook" id="facebookLogin"><i class="fa-brands fa-facebook-f"></i>Sign in with facebook</div>
            <div class="btn btn-social twitter" id="twitterLogin"> <i class="fa-brands fa-twitter"></i>Sign in with twitter</div>
          </div>
          <div class="error" id="errorMassage">
            <p class="error__messege">Email or Password is wrong</p>
          </div>
          <input class="input" type="email" name="email" placeholder="Email address *" required id="userEmail">
          <input class="input" type="password" name="password" placeholder="Password *" required id="userPassword">
          <label class="checkbox remember">
            <input type="checkbox" id="remmemberMeCheckbox" ${
              user ? "checked" : ""
            }>
            <div class="checkbox__box"><i class="fa-solid fa-check mark"></i></div><span class="checkbox__txt">Remember me!</span>
          </label>
          <button class="btn btn-primary black" type="submit">Sign in</button><a class="forget" href="#">Fogot your password?</a>
        </div>
      </form>
    `;

    // Remove loading component
    loadingContainer.classList.remove("loading-container--active");

    // If user defined add saved values from local storage.
    if (user) {
      document.getElementById("userEmail").value = user.email;
      document.getElementById("userPassword").value = user.password;
    }

    // 2) If login form displays & user want sign in.
    document.getElementById("logInForm").addEventListener("submit", (e) => {
      e.preventDefault();

      // Collect input email & password values
      let userEmail = document.getElementById("userEmail").value.toLowerCase();
      let userPassword = document.getElementById("userPassword").value;

      // Active remember & save data local storage
      if (document.getElementById("remmemberMeCheckbox").checked) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userEmail,
            password: userPassword,
          })
        );
      }

      // Add loading component
      loadingContainer.classList.add("loading-container--active");

      firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          document
            .getElementById("errorMassage")
            .classList.remove("error--active");
        })
        .catch((error) => {
          // Remove loading component
          loadingContainer.classList.remove("loading-container--active");
          document
            .getElementById("errorMassage")
            .classList.add("error--active");

          console.log("Email or password is wrong");
        });
    });

    // 4) login with facebook auth
    document.getElementById("facebookLogin").addEventListener("click", () => {
      firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          // IdP data available in result.additionalUserInfo.profile.

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
    });

    // 5) login with twitter auth
    document.getElementById("twitterLogin").addEventListener("click", () => {
      firebase
        .auth()
        .signInWithPopup(twitterProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = credential.accessToken;
          var secret = credential.secret;

          // The signed-in user info.
          var user = result.user;
          // IdP data available in result.additionalUserInfo.profile.
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(user);
        });
    });
  }
});
