// Variables para el carrito
const carritoContainer = document.getElementById("cart");
const carritoIcon = document.querySelector(".bi-cart-fill");
const carritoCantidad = document.querySelector(".cart__count");

// Inicializar el carrito desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para añadir un producto al carrito
function addToCart() {
  const selectedData = data[currentIndex];
  selectedData.selectedSize = document.getElementById("tamanioSelect").value; // Agrega el tamaño seleccionado al objeto del producto

  carrito.push(selectedData);

  // Actualizar el icono y la cantidad en el carrito
  updateCartIcon();

  // Actualizar el localStorage con el nuevo contenido del carrito
  updateLocalStorage();

  // Actualizar la cantidad y el total en el carrito
  updateTotal();
}

// Función para actualizar el icono y la cantidad en el carrito
function updateCartIcon() {
  carritoCantidad.textContent = carrito.length;

  // Puedes cambiar el aspecto del icono cuando hay elementos en el carrito
  carritoIcon.classList.add("cart__icon--active");
}


// Función para mostrar el carrito en el modal
function showCartInModal() {
    const cartItemsContainer = document.getElementById("cartItems");
  
    // Limpia el contenido actual
    cartItemsContainer.innerHTML = "";
  
    // Crea elementos para cada producto en el carrito y añádelos al contenedor
    carrito.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart__item");
  
      // Agrega la miniatura de la imagen
      const itemImage = document.createElement("img");
      itemImage.src = item.url;
      itemImage.alt = item.title;
      cartItem.appendChild(itemImage);
  
      const itemInfo = document.createElement("div");
      itemInfo.classList.add("item-info");
  
      const itemName = document.createElement("p");
      itemName.textContent = item.title;
  
      // Muestra el tamaño seleccionado en el carrito
      const itemSize = document.createElement("p");
      itemSize.textContent = `Tamaño: ${item.selectedSize}`;
      itemInfo.appendChild(itemSize);
  
      // Agrega un campo de entrada para la cantidad
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = getItemQuantity(item);
      quantityInput.min = 1;
      quantityInput.addEventListener("input", () => {
        const enteredValue = parseInt(quantityInput.value, 10);
        if (!isNaN(enteredValue) && enteredValue >= 1) {
          item.quantity = enteredValue;
          updateTotal();
          updateLocalStorage();
          showCartInModal(); // Actualiza la vista del modal al cambiar la cantidad
        }
      });
      itemInfo.appendChild(quantityInput);
  
      const itemPrice = document.createElement("p");
      itemPrice.textContent = calculatePrice(item, item.selectedSize);
  
      itemInfo.appendChild(itemName);
      itemInfo.appendChild(itemPrice);
  
      // Agrega un botón para eliminar el producto del carrito
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => removeItemFromCart(item));
      itemInfo.appendChild(deleteButton);
  
      cartItem.appendChild(itemInfo);
      cartItemsContainer.appendChild(cartItem);
    });
  
    // Añadir botón para vaciar el carrito
    const clearCartButton = document.createElement("button");
    clearCartButton.classList.add("vaciarCarrito")
    clearCartButton.classList.add("button");
    clearCartButton.textContent = "Vaciar Carrito";
    clearCartButton.addEventListener("click", clearCart);
    cartItemsContainer.appendChild(clearCartButton);
  
    // Añadir elemento para mostrar el total
    const totalContainer = document.createElement("div");
    totalContainer.classList.add("total-container");
    totalContainer.innerHTML = `<p>Total: <span id='cartTotal'>${getCartTotal()}€</span></p>`;
    cartItemsContainer.appendChild(totalContainer);
  
    // Muestra el modal del carrito
    const cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
  }
  
  
  // Nueva función para obtener el total del carrito
  function getCartTotal() {
    let total = 0;
    carrito.forEach((item) => {
      const itemQuantity = getItemQuantity(item);
      const itemPrice = calculatePrice(item, item.selectedSize);
      total += itemPrice * itemQuantity;
    });
    return total.toFixed(2);
  }
  
  // Otra función para eliminar un elemento del carrito
  function removeItemFromCart(item) {
    carrito = carrito.filter((cartItem) => !(cartItem.url === item.url && cartItem.selectedSize === item.selectedSize));
    updateLocalStorage();
    showCartInModal();
  }
  
  

// Evento click para mostrar el carrito en el modal
carritoIcon.addEventListener("click", showCartInModal);

function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

// Función para actualizar el localStorage con el contenido actual del carrito
function updateLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para vaciar el carrito y actualizar el localStorage
function clearCart() {
  carrito = [];
  updateLocalStorage();
  updateCartIcon();
  showCartInModal(); // Para actualizar la vista del modal después de vaciar el carrito
}

// Función para actualizar el total en función de los tamaños seleccionados
function updateTotal() {
  const totalElement = document.getElementById("cartTotal");
  const cantidadElement = document.getElementById("cartCantidad");

  let total = 0;
  let cantidad = 0;

  // Itera sobre los elementos del carrito
  carrito.forEach((item) => {
    const itemQuantity = getItemQuantity(item);
    const itemPrice = calculatePrice(item, item.selectedSize);

    total += itemPrice * itemQuantity;
    cantidad += itemQuantity;
  });

  // Actualiza el contenido de los elementos total y cantidad
  totalElement.textContent = total.toFixed(2);
  cantidadElement.textContent = cantidad;
  console.log("total", totalElement )
}

// Función para obtener la cantidad seleccionada de un producto
function getItemQuantity(item) {
    const cartItem = document.querySelector(`.cart__item img[src="${item.url}"]`);
    
    // Verifica si se encontró el elemento del carrito
    if (cartItem) {
      const quantityInput = cartItem.querySelector("input");
      
      // Verifica si se encontró el elemento de entrada de cantidad
      if (quantityInput) {
        return parseInt(quantityInput.value, 10) || 1; // Valor predeterminado a 1 si no se especifica
      }
    }
  
    // Si algo falla, devolver 1 como valor predeterminado
    return 1;
  }
  

// Función para calcular el precio en función del tamaño seleccionado
function calculatePrice(item, size) {
  // Asumiendo que tu objeto 'item' tiene propiedades como 'priceSmall', 'priceMedium', 'priceLarge'
  switch (size) {
    case "pequeno":
      return item.priceSmall || 0;
    case "mediano":
      return item.priceMedium || 0;
    case "grande":
      return item.priceLarge || 0;
    default:
      return 0;
  }
}
