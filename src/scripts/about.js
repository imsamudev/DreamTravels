document.getElementById("learnMoreBtn").addEventListener("click", function () {
  const aboutContent = document.querySelector(".about-content");
  const button = document.getElementById("learnMoreBtn");

  if (aboutContent.classList.contains("expanded")) {
    aboutContent.style.maxHeight = "18rem";
    setTimeout(() => {
      aboutContent.classList.remove("expanded");
      button.textContent = "Leer más";
    }, 500);
  } else {
    aboutContent.classList.add("expanded");
    aboutContent.style.maxHeight = `${aboutContent.scrollHeight}px`;
    button.textContent = "Mostrar menos";
  }
});
