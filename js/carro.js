
const shopContainer = document.querySelector(".shop");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function renderizarCarrito() {
  
  shopContainer.innerHTML = "";

  
  carrito.forEach((producto) => {
    const productoCard = document.createElement("div");
    productoCard.classList.add("producto-card");

    // Crea elementos para mostrar la información del producto
    const imgElement = document.createElement("img");
    imgElement.src = producto.url;
    imgElement.alt = producto.title;

    const titleElement = document.createElement("h3");
    titleElement.textContent = producto.title;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Precio: ${producto.price}`;

    const cantidadElement = document.createElement("p");
    cantidadElement.textContent = `Cantidad: ${producto.cantidad}`;

    const eliminarElement = document.createElement("button");
    eliminarElement.textContent = "Eliminar";
    eliminarElement.addEventListener("click", () => eliminarProducto(producto.id));

    
    productoCard.appendChild(imgElement);
    productoCard.appendChild(titleElement);
    productoCard.appendChild(priceElement);
    productoCard.appendChild(cantidadElement);
    productoCard.appendChild(eliminarElement);

    
    shopContainer.appendChild(productoCard);
  });

  // Actualiza el precio total en la interfaz
  actualizarPrecioTotal();
}

// Función para añadir un producto al carrito
function agregarAlCarrito(producto) {
  const index = carrito.findIndex((p) => p.id === producto.id);

  if (index !== -1) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    carrito[index].cantidad += 1;
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
    producto.cantidad = 1;
    carrito.push(producto);
  }

  // Guarda el carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Renderiza el carrito actualizado
  renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(productId) {
  carrito = carrito.filter((producto) => producto.id !== productId);

  // Guarda el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Renderiza el carrito actualizado
  renderizarCarrito();
}

// Función para actualizar el precio total en la interfaz
function actualizarPrecioTotal() {
  const precioTotalElement = document.createElement("p");
  const precioTotal = carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
  precioTotalElement.textContent = `Precio Total: ${precioTotal}`;
  shopContainer.appendChild(precioTotalElement);
}

// carrito.js

function renderizarCarrito() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Limpiamos el contenedor antes de renderizar

    // Obtén los productos del carrito desde localStorage o donde los almacenes
    const productosEnCarrito = obtenerProductosEnCarrito(); // Necesitas implementar esta función

    // Renderizamos cada producto en el carrito
    productosEnCarrito.forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        // Agrega la información del producto a la carta (imagen, nombre, precio, etc.)
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
        `;

        cartContainer.appendChild(productoCard);
    });
}

// carro.js

let carrito = [];

// Función para obtener los productos en el carrito desde la API
async function obtenerProductosEnCarritoDesdeAPI() {
    try {
        const response = await fetch("URL_DE_TU_API");
        const data = await response.json();
        carrito = data; // Actualizamos el estado local del carrito
        renderizarCarrito();
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
    }
}

// Función para guardar el estado local del carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para renderizar el carrito
function renderizarCarrito() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Limpiamos el contenedor antes de renderizar

    // Renderizamos cada producto en el carrito
    carrito.forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        // Agrega la información del producto a la carta (imagen, nombre, precio, etc.)
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
        `;

        cartContainer.appendChild(productoCard);
    });
}

// Función para eliminar un producto del carrito
function eliminarProducto(idProducto) {
    // Filtramos los productos para excluir el que queremos eliminar
    carrito = carrito.filter(producto => producto.id !== idProducto);
    guardarCarritoEnLocalStorage(); // Guardamos el estado actualizado en localStorage
    renderizarCarrito();
}

// Llamamos a obtenerProductosEnCarritoDesdeAPI al cargar la página
obtenerProductosEnCarritoDesdeAPI();



// // Renderiza el carrito al cargar la página
// renderizarCarrito();

// // Ejemplo en renderizarCarrito
// function renderizarCarrito() {
//     console.log("Renderizando carrito");
//     // ... tu código ...
// }

// // Ejemplo en agregarAlCarrito
// function agregarAlCarrito(producto) {
//     console.log("Agregando al carrito:", producto);
//     // ... tu código ...
// }

// // Ejemplo en eliminarProducto
// function eliminarProducto(productId) {
//     console.log("Eliminando producto:", productId);
//     // ... tu código ...
// }
