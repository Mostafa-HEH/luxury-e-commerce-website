/**
 * @file Manages Navigation bars for all pages.
 * About navbar v1, v2, v3
 * 1 - makeing navbar sticky at the top of the page when srcolling down.
 * 2 - active drop down links in small screen size menu.
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
    navbarV1?.classList.add("navbar__v1--active");
    navbarV1?.classList.add("navbar__v1--animate");
  } else {
    if (navbarV1?.parentElement.classList.contains("home-v1"))
      navbarV1?.classList.remove("navbar__v1--active");
    navbarV1?.classList.remove("navbar__v1--animate");
  }
};

/**
 * Listen to browser scrolldown
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#scroll
 */
document.addEventListener("scroll", activeNavbar);

/**
 * @type {HTMLElement} - the navbar(small screen) sub links
 */
const navbarLinks = document.querySelectorAll(".pages-links .links__link");

/**
 *  Activing sub links ins small screens.
 */
const activeSubLinks = (link) => {
  if (link.classList.contains("links__link--active"))
    link.classList.remove("links__link--active");
  else link.classList.add("links__link--active");
};

/**
 *  Iterate into links to catch clicked link
 */
navbarLinks.forEach((link) => {
  /**
   * Listen to sub liks in small screen click
   *
   * @type {HTMLElement} - the target of the event
   * @listens .pages-links .links__link#click
   */
  link.children[1]?.addEventListener("click", () => activeSubLinks(link));
});

/**
 * @type {HTMLElement} - The navbar search icon
 */
const searchPopupOpen = document.querySelectorAll(".search .search-icon");

/**
 * @type {HTMLElement} - Search popup
 */
const searchPopup = document.querySelectorAll(".search-popup");

/**
 * @type {HTMLElement} - Search popup close icon
 */
const searchPopupClose = document.querySelectorAll(".search-popup .close");

/**
 *  Open popup search.
 */
const openPopup = () => {
  searchPopup.forEach((pop) => pop.classList.add("search-popup--active"));
  document.body.style.overflow = "hidden";
};

/**
 *  Close popup search.
 */
const closePopup = () => {
  searchPopup.forEach((pop) => pop.classList.remove("search-popup--active"));
  document.body.style.overflow = "unset";
};

/**
 * Listen to navbar search icon click
 *
 * @type {HTMLElement} - the target of the event
 * @listens .search-icon#click
 */
searchPopupOpen.forEach((icon) => icon.addEventListener("click", openPopup));

/**
 * Listen to popup close icon click
 *
 * @type {HTMLElement} - the target of the event
 * @listens .search-popup .close#click
 */
searchPopupClose.forEach((icon) => icon.addEventListener("click", closePopup));
