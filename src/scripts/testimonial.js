const container = document.querySelector(".testimonials-container");
const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

function updateSlider() {
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateNavigationButtons();
}

function updateNavigationButtons() {
  if (window.innerWidth >= 769) {
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
    nextButton.style.display =
      currentIndex === testimonials.length - 1 ? "none" : "block";
  } else {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
}

nextButton.addEventListener("click", () => {
  if (currentIndex < testimonials.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
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

  if (xDiff > 0 && currentIndex < testimonials.length - 1) {
    currentIndex++;
  } else if (xDiff < 0 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
  xStart = null;
}

updateSlider();

window.addEventListener("resize", updateNavigationButtons);
