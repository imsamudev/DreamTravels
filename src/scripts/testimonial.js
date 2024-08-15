const container = document.querySelector(".testimonials-container");
const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

function updateSlider() {
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateSlider();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateSlider();
});

container.addEventListener("touchstart", handleTouchStart, false);
container.addEventListener("touchmove", handleTouchMove, false);

let xStart = null;

function handleTouchStart(evt) {
  xStart = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
  if (!xStart) return;

  let xDiff = xStart - evt.touches[0].clientX;

  if (xDiff > 0) {
    currentIndex = (currentIndex + 1) % testimonials.length;
  } else {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  updateSlider();
  xStart = null;
}
