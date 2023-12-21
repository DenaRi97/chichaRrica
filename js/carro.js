// carrito.js

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
