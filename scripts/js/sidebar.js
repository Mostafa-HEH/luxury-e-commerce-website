// Sidebar (left & right controler)
// -----------------------------------------
const activeRightSidebar = document.querySelector("#activeRightSidebar");
const activeLeftSidebar = document.querySelector("#activeLeftSidebar");
const closeRightSidebar = document.querySelector("#closeRightSidebar");
const closeLeftSidebar = document.querySelector("#closeLeftSidebar");
const rightSidebar = document.querySelector("#rightSidebar");
const leftSidebar = document.querySelector("#leftSidebar");

// Display Sidebar
const displaySidebar = (direction) => {
  if (direction === "right")
    rightSidebar.classList.add("sidebar-right--active");

  if (direction === "left") leftSidebar.classList.add("sidebar-left--active");
};

// Hide sidebar
const hideSidebar = (direction) => {
  if (direction === "right")
    rightSidebar.classList.remove("sidebar-right--active");

  if (direction === "left")
    leftSidebar.classList.remove("sidebar-left--active");
};

// --- Left Sidebar ------------------------------------------------------------
// Show right sidebar
activeRightSidebar.addEventListener("click", () => displaySidebar("right"));

// Hide right sidebar
closeRightSidebar.addEventListener("click", () => hideSidebar("right"));

// Hide right sidebar by click outside
rightSidebar.addEventListener("click", (e) => {
  if (e.target.classList.contains("sidebar"))
    rightSidebar.classList.remove("sidebar-right--active");
});
// -----------------------------------------------------------------------------

// --- Right Sidebar -----------------------------------------------------------
// Show left sidebar
activeLeftSidebar.addEventListener("click", () => displaySidebar("left"));

// Hide left sidebar
closeLeftSidebar.addEventListener("click", () => hideSidebar("left"));

// Hide left sidebar by click outside
leftSidebar.addEventListener("click", (e) => {
  if (e.target.classList.contains("sidebar"))
    leftSidebar.classList.remove("sidebar-left--active");
});
// -----------------------------------------------------------------------------
