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


// SLIDER FUNCTION
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let lengthItems = items.length;

// Clonar el primer y último elemento
let firstClone = items[0].cloneNode(true);
let lastClone = items[lengthItems - 1].cloneNode(true);

// Agregar clones al DOM
list.appendChild(firstClone);
list.insertBefore(lastClone, list.firstChild);

// Actualizar la lista de elementos
items = document.querySelectorAll(".slider .list .item");
lengthItems = items.length - 2; // Ajustar el nuevo tamaño

// Establecer la posición inicial del slider en la primera imagen original (índice 1)
let active = 1;
list.style.transition = 'none';
list.style.left = -items[active].offsetLeft + 'px';

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + 'px';

  items.forEach(item => item.classList.remove('active'));
  items[active].classList.add('active');

  let lastActiveDot = document.querySelector(".slider .dots li.active");
  if (lastActiveDot) lastActiveDot.classList.remove('active');

  // Actualizar los puntos
  if (active - 1 >= 0 && active - 1 < lengthItems) {
    dots[active - 1].classList.add('active');
  } else if (active === 0) {
    dots[lengthItems - 1].classList.add('active');
  } else if (active === lengthItems + 1) {
    dots[0].classList.add('active');
  }
}

next.onclick = function() {
  active++;
  list.style.transition = '1s';
  reloadSlider();

  // Verificar último clon y saltar al primer elemento original
  if (active === lengthItems + 1) {
    setTimeout(() => {
      list.style.transition = 'none';
      active = 1;
      list.style.left = -items[active].offsetLeft + 'px';
      reloadSlider(); // Aplicar el efecto de zoom-in a la primera imagen
    }, 1000);
  }
};

prev.onclick = function() {
  active--;
  list.style.transition = '1s';
  reloadSlider();

  // Verificar primer clon y saltar al último elemento original
  if (active === 0) {
    setTimeout(() => {
      list.style.transition = 'none';
      active = lengthItems;
      list.style.left = -items[active].offsetLeft + 'px';
      reloadSlider(); // Aplicar el efecto de zoom-in a la última imagen
    }, 1000);
  }
};

// Autoplay del slider
let refreshSlider = setInterval(() => { next.click() }, 5000);

// Inicializar el slider
reloadSlider();

dots.forEach((li, key) => {
  li.addEventListener('click', function() {
    active = key + 1;
    reloadSlider();
  });
});
// SLIDER CLOSED

// RESERVAS
const productContainers = [...document.querySelectorAll(".product-container")]
const nxtBtn = [...document.querySelectorAll(".nxt-btn")]
const preBtn = [...document.querySelectorAll(".pre-btn")]

productContainers.forEach((item, i) => {
  // Width tarjeta + margen
  const cardWidth = item.querySelector(".product-card").offsetWidth + 20

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += cardWidth
  })

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= cardWidth
  })
})

// MODAL
// Para "Ver más"
const cardButtons = document.querySelectorAll(".card-btn")
const modal = document.getElementById("myModal")
const modalImg = document.getElementById("modal-img")
const modalDescription = document.getElementById("modal-description")
const closeModal = document.querySelector(".close")
const adultsInput = document.getElementById("adults")
const minusAdults = document.getElementById("minus-adults")
const plusAdults = document.getElementById("plus-adults")

// abre el modal
document.querySelectorAll(".card-btn").forEach((btn, i) => {
  btn.addEventListener("click", function() {
    const productCard = btn.closest(".product-card");

    const description = productCard.querySelector(".product-info .product-short-description").innerText;
    const videoSrc = productCard.querySelector(".product-vid iframe").getAttribute("src");

    const modal = document.getElementById("myModal");
    const modalVid = modal.querySelector("#modal-vid iframe");
    const modalDescription = modal.querySelector("#modal-description");

    modalVid.setAttribute("src", videoSrc);
    modalDescription.innerText = description;

    modal.style.display = "block";
    setTimeout(() => {
      modal.style.opacity = "1";
      document.querySelector(".modal-content").style.opacity = "1";
    }, 10);
  });
});

// cerrar modal
document.querySelector(".close").addEventListener("click", function() {
  const modal = document.getElementById("myModal");
  
  modal.style.opacity = "0";
  modal.querySelector(".modal-content").style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    modal.querySelector("#modal-vid video").setAttribute("src", "");
  }, 500);
});

// cerrar modal fuera
window.addEventListener("click", function(event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.opacity = "0";
    modal.querySelector(".modal-content").style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      modal.querySelector("#modal-vid video").setAttribute("src", "");
    }, 500);
  }
});


// adultos limit
minusAdults.addEventListener("click", () => {
  if (adultsInput.value > 1) {
    adultsInput.value--;
  }
});

plusAdults.addEventListener("click", () => {
  if (adultsInput.value < 5) {
    adultsInput.value++;
  }
});

// Reservar ahora
const handleReservation = (event) => {
  event.preventDefault();
  
  const reserveBtn = event.target;

  reserveBtn.textContent = "Viaje reservado";
  reserveBtn.classList.add("reserved");
  
  setTimeout(() => {
    closeModalFunc();
    setTimeout(() => {
      reserveBtn.textContent = "Reservar ahora";
      reserveBtn.classList.remove("reserved");
    }, 500);
  }, 1000);
};

document.querySelector(".reserve-btn").addEventListener("click", handleReservation);

function closeModalFunc() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.opacity = "0";
    modal.querySelector(".modal-content").style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      modal.querySelector("#modal-vid video").setAttribute("src", "");
    }, 500);
  }
}


// Validacion de formulario
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let valid = true;

  // Validación de nombre
  const nameField = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const nameValue = nameField.value.trim();

  if (nameValue === "") {
      nameError.textContent = "Completar nombre";
      nameError.style.display = "block";
      valid = false;
  } else if (!nameValue.includes(" ")) {
      nameError.textContent = "Completar nombre completo";
      nameError.style.display = "block";
      valid = false;
  } else {
      nameError.style.display = "none";
  }

  // Validación de email
  const emailField = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailValue = emailField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
      emailError.textContent = "Completar email";
      emailError.style.display = "block";
      valid = false;
  } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Escribir un email válido";
      emailError.style.display = "block";
      valid = false;
  } else {
      emailError.style.display = "none";
  }

  // Validación de asunto
  const subjectField = document.getElementById('subject');
  const subjectError = document.getElementById('subjectError');
  if (subjectField.value.trim() === "") {
      subjectError.textContent = "Completar asunto";
      subjectError.style.display = "block";
      valid = false;
  } else {
      subjectError.style.display = "none";
  }

  // Validación de mensaje
  const messageField = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  const messageValue = messageField.value.trim();

  if (messageValue === "") {
      messageError.textContent = "Completar mensaje";
      messageError.style.display = "block";
      valid = false;
  } else if (messageValue.length > 100) {
      messageError.textContent = "Máximo 100 caracteres";
      messageError.style.display = "block";
      valid = false;
  } else {
      messageError.style.display = "none";
  }

  if (valid) {
      alert("El formulario fue enviado");
      event.target.submit();
  }
});

// Contador de caracter
const messageField = document.getElementById('message');
const charCount = document.getElementById('charCount');

messageField.addEventListener('input', function () {
  const length = messageField.value.length;
  charCount.textContent = `${length}/100`;

  if (length === 0 || length >= 100) {
      charCount.style.display = "none";
  } else {
      charCount.style.display = "block";
  }
});
// contador al cargar la página
window.addEventListener('load', function () {
  const length = messageField.value.length;
  charCount.textContent = `${length}/100`;

  if (length === 0 || length >= 100) {
      charCount.style.display = "none";
  } else {
      charCount.style.display = "block";
  }
});

