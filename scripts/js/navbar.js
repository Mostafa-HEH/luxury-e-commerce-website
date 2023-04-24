/**
 * @file Manages Navigation bars for all pages.
 * About navbar v1, v2, v3
 * @author Mostafa Neamatalla <mostafaneamatalla94@gmail.com>
 */

/**
 * @type {HTMLElement} - the navbar v1
 */
const navbarV1 = document.querySelector("#navbar.navbar__v1");

/**
 *  Activeing navbar on scroll.
 */
const activeNavbar = () => {
  /**
   * Active navbar & animation
   * when scrolling is bigger than 500
   */
  if (document.scrollingElement.scrollTop > 500) {
    navbarV1.classList.add("navbar__v1--active");
    navbarV1.classList.add("navbar__v1--animate");
  } else {
    if (navbarV1.parentElement.classList.contains("home-v1"))
      navbarV1.classList.remove("navbar__v1--active");
    navbarV1.classList.remove("navbar__v1--animate");
  }
};

/**
 * Listen to browser scrolldown
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#scroll
 */
document.addEventListener("scroll", activeNavbar);
