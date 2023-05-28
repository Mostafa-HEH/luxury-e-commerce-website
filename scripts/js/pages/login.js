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
            <div class="btn btn-social facebook"><i class="fa-brands fa-facebook-f"></i>Sign in with facebook</div>
            <div class="btn btn-social twitter"> <i class="fa-brands fa-twitter"></i>Sign in with twitter</div>
          </div>
          <input class="input" type="email" name="email" placeholder="Email address *" required id="userEmail">
          <input class="input" type="password" name="password" placeholder="Password *" required id="userPassword">
          <label class="checkbox remember">
            <input type="checkbox" id="remmemberMeCheckbox" checked="${
              user ? true : false
            }">
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
          // ...
        })
        .catch((error) => {
          // Remove loading component
          loadingContainer.classList.remove("loading-container--active");

          console.log("Email or password is wrong");
        });
    });
  }
});
