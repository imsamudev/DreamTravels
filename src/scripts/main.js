// NAVBAR FUNCTION
const navbarToggle = document.getElementById("navbarToggle");
const navbarLinks = document.getElementById("navbarLinks");
const navbar = document.querySelector(".navbar");

navbarToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  scrollNavbar();
});

function scrollNavbar() {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
// NAVBAR CLOSED
