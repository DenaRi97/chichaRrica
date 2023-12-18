const URL = "http://localhost:3000/data";
const photos = document.querySelector(".gallery__fotos");
const buttonCategory = document.querySelector(".gallery__buttonCategory");
const containerSubCategory = document.querySelector(".gallery_filtersSubCategory");
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
    })
    })

    .then(data => {

        const galeria = data.map(item =>{



            const image = document.createElement("img");//añadimos un img para cada foto
            let sourceImage = item.url //llamamos a la ruta de la imagen
            image.src = sourceImage //esto lo hacemos para dejarlo mejor anidado
            // console.log(image.src);
            return image;
        })

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
  }

    const dataIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    const selectedData = data[dataIndex];

    modalTitle.innerHTML = `<h2>${selectedData.title}</h2>`;
    modalPrice.innerHTML = `<p>${selectedData.price}</p>`;
    currentIndex = dataIndex;
  })
//Funcion para mostrar todas las imagenes
    function showAllImages(images) { 

        photos.innerHTML = ''

        images.forEach(item => {
           
            const imgElement = document.createElement('img');  // Crea un elemento img
                        
            imgElement.src = item.url;//coge la ruta de la imagen
        
            photos.appendChild(imgElement);// Añade la imagen como hijo de gallery__fotos
        })
        
      }
    


//Botones filtros categorías -----------------------------------------------------------

buttonCategory.addEventListener("click", function() {
    // console.log('category');

    
    if (buttonSubCategory.style.display === 'block') { //al hacer clic muestrame las categorias
        buttonSubCategory.style.display = 'none'; //al hacer clic de nuevo desaparecen
        hideAllButtons(containerSubCategory)

        fetch(URL)
            .then(response => response.json())
            .then(data => showAllImages(data))
            .catch(error => console.error('Houston tenemos un problema', error))
        

    } else {
        buttonSubCategory.style.display = 'block';
        showAllButtons(containerSubCategory)
    }
});

// Manejador de clic en el botón de cierre
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Manejadores de clic en los botones de paginación
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

function showPrevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    showModal(data[currentIndex]);
  }
}

function showNextImage() {
  if (currentIndex < data.length - 1) {
    currentIndex++;
    showModal(data[currentIndex]);
  }
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

//Filtrar API por subcategorías -------------------------------------------------------------------------
    
document.addEventListener('DOMContentLoaded', function() {
    
    const buttons = document.querySelectorAll('.buttonSubCategory'); //botones subcategoria
    const galleryFotosElement = document.querySelector('.gallery__fotos')

    
    buttons.forEach(button => {
        button.addEventListener('click', function(event) { //creamos un evento
        
        // console.clear()
        const keyword = event.currentTarget.getAttribute('data-keyword'); //cogemos el valor del boton sobre el que hemos hecho clic
            
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            
            const matchingItems = data.filter(item => item.keyword === keyword);
            // Usamos la funcion filter para crear un nuevo array (filterItems) que contiene los elementos del array original cuyo campo 'keyword' coincide con la keyword del boton

            if (matchingItems.length > 0) { //comprueba si hay coincidencias
              console.log('Resultados para', keyword, ':', matchingItems);
              showAllImages(matchingItems) //muestra las img en pantalla

            }             
          })
          .catch(error => console.error('Houston tenemos un problema:', error));
      });
    });

});
   

//Ajustar altura de forma automatica----------------------------------------------------------------------------
 
// Guarda la altura original al cargar la página
const alturaOriginal = document.querySelector('.gallery__fotos').offsetHeight;

// Función para ajustar la altura de las imágenes
function ajustarAltura() {
    const galeria = document.querySelector('.gallery__fotos');
    
    // Lógica para ajustar la altura según la subcategoría o filtro aplicado
    // Puedes adaptar esto según cómo obtienes y aplicas los datos de la API
    // Aquí un ejemplo básico:
    const subcategoriaSeleccionada = obtenerSubcategoriaSeleccionada(); // Implementa esta función
    
    if (subcategoriaSeleccionada) {
        // Lógica para ajustar la altura según la subcategoría
        galeria.style.columnCount = 2; // o el número que desees para la subcategoría
    } else {
        // Restablece a la altura original si no hay filtro
        galeria.style.columnCount = 'auto';
    }
}

// Llama a la función al cargar la página y cuando se aplique el filtro
document.addEventListener('DOMContentLoaded', ajustarAltura);
document.addEventListener('cambioFiltro', ajustarAltura); // Escucha un evento personalizado o ajusta según cómo aplicas los filtros

  




//Chuleta para mostrar los objetos del Array
 // for(let i=0; i < data.length; i++) { //recorre el array
            // //    console.log(data[i].keyword)
            //    if(data[i].keyword === `${personas}`){
            //     console.log(data[i])
            //    }
               
            // }




