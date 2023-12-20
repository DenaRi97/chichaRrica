// carro.js
document.addEventListener("DOMContentLoaded", function () {
    const carritoDisplay = document.getElementById("products__display");
    const carritoInfo = document.createElement("section");
    carritoInfo.id = "carrito-info";
    carritoDisplay.appendChild(carritoInfo);
  
    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
      const productoItem = document.createElement("div");
      productoItem.className = "producto-carrito";
  
      // Agregar la imagen
      const imagenProducto = document.createElement("img");
      imagenProducto.src = producto.url;
      imagenProducto.style.width = "40px";
      imagenProducto.style.height = "52px";
      imagenProducto.style.flexShrink = "0";
      imagenProducto.style.borderRadius = "10px";
      productoItem.appendChild(imagenProducto);
  
      // Agregar botones de incremento y decremento
      const botonRestar = document.createElement("button");
      botonRestar.innerHTML = "-";
      // Agregar lógica para restar un producto del carrito
      botonRestar.addEventListener("click", function () {
        // Lógica para decrementar la cantidad del producto
      });
  
      const cantidadProducto = document.createElement("span");
      cantidadProducto.innerText = "1"; // Aquí irá la lógica para actualizar la cantidad
  
      const botonSumar = document.createElement("button");
      botonSumar.innerHTML = "+";
      // Agregar lógica para sumar un producto al carrito
      botonSumar.addEventListener("click", function () {
        // Lógica para incrementar la cantidad del producto
      });
  
      productoItem.appendChild(botonRestar);
      productoItem.appendChild(cantidadProducto);
      productoItem.appendChild(botonSumar);
  
      // Agregar el nombre del producto
      const nombreProducto = document.createElement("span");
      nombreProducto.innerText = producto.title;
      productoItem.appendChild(nombreProducto);
  
      carritoInfo.appendChild(productoItem);
    }
  
    // Lógica para verificar si el carrito está vacío
    function actualizarEstadoCarrito() {
      if (carritoInfo.children.length === 0) {
        const parrafoVacio = document.createElement("p");
        parrafoVacio.innerText =
          "El carrito de la compra se encuentra vacío, echa un vistazo a la galería.";
        carritoInfo.appendChild(parrafoVacio);
  
        const botonGaleria = document.createElement("button");
        botonGaleria.innerText = "Ir a la galería";
        // Agregar lógica para redirigir a la galería
        botonGaleria.addEventListener("click", function () {
          // Lógica para redirigir a la galería
        });
        carritoInfo.appendChild(botonGaleria);
      }
    }
  
    // Lógica para agregar productos al carrito (puedes llamar a esta función desde el modal)
    function agregarProductoAlCarrito(producto) {
      agregarAlCarrito(producto);
      actualizarEstadoCarrito();
    }
  
    // Ejemplo del Producto a mostrar
    const productoEjemplo = {
      id: "001",
      title: "Foto Hombre",
      url: "../img/imagen001.jpg",
      price: "10€",
    };
  
    agregarProductoAlCarrito(productoEjemplo);
  });
  document.addEventListener("DOMContentLoaded", function () {
    const productsDisplay = document.getElementById("products__display");

    if (carritoEstaVacio()) {
        mostrarCarritoVacio();
    } else {
        const productosCarrito = obtenerProductosCarrito();
        mostrarProductosEnCarrito(productosCarrito);
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//     const productsDisplay = document.getElementById("products__display");

//     if (carritoEstaVacio()) {
//         mostrarCarritoVacio();
//     } else {
//         const productosCarrito = obtenerProductosCarrito();
//         mostrarProductosEnCarrito(productosCarrito);
//     }
// });

// function carritoEstaVacio() {
//     const carrito = obtenerCarritoDesdeLocalStorage();
//     return carrito === null || carrito.length === 0;
// }

// function mostrarCarritoVacio() {
//     const mensajeVacio = document.createElement("p");
//     mensajeVacio.textContent = "El carrito de la compra se encuentra vacío, échale un vistazo a la galería.";

//     const botonGaleria = document.createElement("button");
//     botonGaleria.textContent = "Ir a la Galería";
//     botonGaleria.addEventListener("click", function () {
//         window.location.href = "gallery.html";
//     });

//     productsDisplay.appendChild(mensajeVacio);
//     productsDisplay.appendChild(botonGaleria);
// }

// function obtenerProductosCarrito() {
//     return obtenerCarritoDesdeLocalStorage();
// }

// function mostrarProductosEnCarrito(productos) {
//     productos.forEach((producto) => {
//         const productoContainer = document.createElement("section");
//         productoContainer.className = "producto-container";

//         const imagenProducto = document.createElement("img");
//         imagenProducto.src = producto.url;
//         imagenProducto.style.width = "40px";
//         imagenProducto.style.height = "52px";
//         imagenProducto.style.flexShrink = "0";
//         imagenProducto.style.borderRadius = "10px";

//         const botonDecremento = document.createElement("button");
//         botonDecremento.textContent = "-";
//         // Añadir lógica para decremento

//         const cantidadProducto = document.createElement("span");
//         cantidadProducto.textContent = "1"; // Ajustar según la cantidad real del producto

//         const botonIncremento = document.createElement("button");
//         botonIncremento.textContent = "+";
//         // Añadir lógica para incremento

//         const nombreProducto = document.createElement("p");
//         nombreProducto.textContent = producto.title;

//         productoContainer.appendChild(imagenProducto);
//         productoContainer.appendChild(botonDecremento);
//         productoContainer.appendChild(cantidadProducto);
//         productoContainer.appendChild(botonIncremento);
//         productoContainer.appendChild(nombreProducto);

//         productsDisplay.appendChild(productoContainer);
//     });
// }

// function obtenerCarritoDesdeLocalStorage() {
//     const carritoString = localStorage.getItem("carrito");
//     return carritoString ? JSON.parse(carritoString) : [];
// }


  