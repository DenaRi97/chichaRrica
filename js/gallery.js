const URL = "http://localhost:3000/data";
const photos = document.querySelector(".gallery__fotos");
const buttonCategory = document.querySelector(".gallery__buttonCategory");
const containerSubCategory = document.querySelector(
  ".gallery_filtersSubCategory"
);
const buttonSubCategory = document.querySelector(".gallery__buttonSubCategory");

// Variables para la paginación
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;

// Almacenar datos obtenidos de la API
let data;

// Muestra la API
fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Algo está pasando");
    }
    return response.json();
  })
  .then((responseData) => {
    data = responseData;
    const galeria = data.map((item) => {
      const image = document.createElement("img");
      let sourceImage = item.url;
      image.src = sourceImage;
      image.dataset.price = item.price;

      image.addEventListener("click", function () {
        showModal(item);
      });

      return image;
    });

    photos.append(...galeria);
  })
  .catch((error) => console.log("La hemos cagado"));

// Función para mostrar el modal con el precio
function showModal(item) {
  modal.style.display = "block";
  modalImage.src = item.url;
  modalTitle.innerHTML = `<h2>${item.title}</h2>`;
  modalPrice.innerHTML = `<p>${item.price}</p>`;
  currentIndex = data.indexOf(item);

  // Oculta el nav con id "main-header"
  const mainHeader = document.getElementById("main-header");
  mainHeader.style.display = "none";
}

// Obtén referencias a los elementos del modal
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeModal = document.querySelector(".close");

// Manejador de clic en una imagen
photos.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    modal.style.display = "block";
    modalImage.src = event.target.src;

    const dataIndex = Array.from(event.target.parentNode.children).indexOf(
      event.target
    );
    const selectedData = data[dataIndex];

    modalTitle.innerHTML = `<h2>${selectedData.title}</h2>`;
    modalPrice.innerHTML = `<p>${selectedData.price}</p>`;
    currentIndex = dataIndex;
  }
});

// Manejador de clic en el botón de cierre
closeModal.addEventListener("click", function () {
  modal.style.display = "none";

  // Muestra nuevamente el nav con id "main-header"
  const mainHeader = document.getElementById("main-header");
  mainHeader.style.display = "block";
});

// Manejadores de clic en los botones de paginación
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Si estás en la primera página, ve a la última
      currentIndex = data.length - 1;
    }
    showModal(data[currentIndex]);
  }

function showNextImage() {
    if (currentIndex < data.length - 1) {
      currentIndex++;
    } else {
      // Si estás en la última página, vuelve a la primera
      currentIndex = 0;
    }
    showModal(data[currentIndex]);
  }

// Botones filtros
buttonCategory.addEventListener("click", function () {
  if (buttonSubCategory.style.display === "block") {
    buttonSubCategory.style.display = "none";
    hideAllButtons(containerSubCategory);
  } else {
    buttonSubCategory.style.display = "block";
    showAllButtons(containerSubCategory);
  }
});

function hideAllButtons(container) {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.display = "none";
  });
}

function showAllButtons(container) {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.display = "block";
  });
}

// Filtrar API por subcategorías ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".buttonSubCategory"); //botones subcategoría

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const keyword = event.currentTarget.getAttribute("data-keyword");

      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const matchingItems = data.filter((item) => item.keyword === keyword);

          if (matchingItems.length > 0) {
            console.log("Resultados para", keyword, ":", matchingItems);
            showAllImages(matchingItems);
          }
        })
        .catch((error) => console.error("Houston tenemos un problema:", error));
    });
  });
});

// Ajustar altura de forma automática --------------------------------------------------------

// Guarda la altura original al cargar la página
const alturaOriginal = document.querySelector('.gallery__fotos').offsetHeight;

// Función para ajustar la altura de las imágenes
function ajustarAltura() {
  const galeria = document.querySelector(".gallery__fotos");

  // Lógica para ajustar la altura según la subcategoría o filtro aplicado
  // Puedes adaptar esto según cómo obtienes y aplicas los datos de la API
  // Aquí un ejemplo básico:
  const subcategoriaSeleccionada = obtenerSubcategoriaSeleccionada(); // Implementa esta función

  if (subcategoriaSeleccionada) {
    // Lógica para ajustar la altura según la subcategoría
    galeria.style.columnCount = 2; // o el número que desees para la subcategoría
  } else {
    // Restablece a la altura original si no hay filtro
    galeria.style.columnCount = "auto";
  }
}

// Llama a la función al cargar la página y cuando se aplique el filtro
document.addEventListener("DOMContentLoaded", ajustarAltura);
document.addEventListener("cambioFiltro", ajustarAltura); // Escucha un evento personalizado o ajusta según cómo aplicas los filtros

// Función ficticia para obtener la subcategoría seleccionada
function obtenerSubcategoriaSeleccionada() {
  // Implementa la lógica necesaria para obtener la subcategoría seleccionada
  // Puede depender de cómo has estructurado tu página y cómo obtienes la información de los filtros

  return null; // Cambia esto según tu implementación
}

// Función para mostrar todas las imágenes
function showAllImages(images) {
  photos.innerHTML = "";

  images.forEach((item) => {
    const imgElement = document.createElement("img");
    imgElement.src = item.url;
    photos.appendChild(imgElement);
  });
}

//prueba commit