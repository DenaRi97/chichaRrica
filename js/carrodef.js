
document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");
    const cartContainer = document.getElementById("cart");

  //FUNCION PARA LLAMAR A LA API----------------------------------------------------------------------------------
    function fetchProducts() {   // Simula una llamada a la API para obtener productos
        
        return new Promise(resolve => {
            setTimeout(() => { // Simula un retraso de tiempo antes de cumplir la promesa
                resolve([ // resuelve la promesa con un array de productos despues del retraso
                    { id: 1, name: "Product 1", price: 20 },
                    { id: 2, name: "Product 2", price: 30 },
                    { id: 3, name: "Product 3", price: 25 },
                ]);
            }, 500); // Simula un retraso de medio segundo cuando carga la API
        });
    }

    
    
    
    const cart = []; // Inicia un arreglo vacio para representar el carrito
    //Este carro vacio almacenara informacion sobre los productos y sus cantidades en el carrito

    // ---FUNCION PARA AÑADIR PRODUCTOS AL CARRITO-----------------------------------------------------------
    window.addToCart = function (productId) {
        fetchProducts().then(products => { // llama a la API para obtener la lista de productos
            const existingItem = cart.find(item => item.product.id === productId); //busca un elemento con el ID 'cart' y si lo encuentra, se asigna a 'existingItem'

            if (existingItem) {
                existingItem.quantity++; //si ya existe con elemento con el mismo ID de producto, incrementa la cantidad
            } else {
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push({ product, quantity: 1 });// si se encuentra el producto pero no coincide con el mismo ID, se agrega un nuevo objeto al carrito con la info del producto y la cantidad inicial de 1
                }
            }

            updateCartDisplay(); // llama a la funcion para actualizar la visualizacion del carrito
        });
    };




    // -----FUNCION PARA ACTUALIZAR LA VISUALIZACION DEL CARRITO-------------------------------------
    function updateCartDisplay() {
        cartContainer.innerHTML = ""; //limpiamos el HTML
        cart.forEach(item => { // recorre cada elemento del carrito
            const cartItem = document.createElement("div"); //agrega un 'div' para cada elemento del carrito
            cartItem.innerHTML = `
                <p>${item.product.name} - $${item.product.price} x ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItem);
        });
    }




    // ----FUNCION PARA MOSTRAR PRODUCTOS EN LA GALERIA------------------------------
    //Esta funcion se activa al hacer clic en boton AÑADIR de la ficha de producto
    function displayGallery() { 
        fetchProducts().then(products => { //lamamos a la API
            products.forEach(product => { //recorre cada producto del array
                const galleryItem = document.createElement("div"); //crea un 'div' para cada producto
                galleryItem.classList.add("gallery-item");
                galleryItem.innerHTML = `
                    <img src="product-image.jpg" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>$${product.price}</p>
                    <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                galleryContainer.appendChild(galleryItem); //agrega el 'div' al contenedor de galeria
            });
        });
    }
    
    displayGallery(); // llama a la funcion mostrando los productos
});




//---FUNCION PARA AÑADIR Y ELIMINAR PRODUCTOS DEL CARRITO----------------------------------------------------------------
// //variables
// let allContainerCart = document.querySelector('.products');
// let containerBuyCart = document.querySelector('.card-items');
// let priceTotal = document.querySelector('.price-total')
// let amountProduct = document.querySelector('.count-product');


// let buyThings = []; //arreglo vacio que contendra los productos que se agreguen al carrito 
// let totalCard = 0; //variable para hacer seguimiento del precio total de los productos
// let countProduct = 0; //variable para hacer seguimiento del numero total de productos



// loadEventListenrs(); //funcion para los 'event listeners' de la pagina
// function loadEventListenrs(){
//     allContainerCart.addEventListener('click', addProduct); //al hacer clic en este contenedor, añadimos el producto

//     containerBuyCart.addEventListener('click', deleteProduct); // al hacer clic en este contenedor, borramos el producto
// }

//---------------

// function addProduct(e){ 
//     e.preventDefault();
//     if (e.target.classList.contains('btn-add-cart')) { //si se hizo clic en un boton de añadir al carrito
//         const selectProduct = e.target.parentElement; //obtiene el elemento padre del boton clicado
//         readTheContent(selectProduct);
//     }
// }

//------------------

// function deleteProduct(e) {
//     if (e.target.classList.contains('delete-product')) { //verifica si se hizo clic en un elemento para borrar productos
//         const deleteId = e.target.getAttribute('data-id'); //obtiene el id del producto a eliminar

//         buyThings.forEach(value => { //recorre cada elemento del array
//             if (value.id == deleteId) {
//                 let priceReduce = parseFloat(value.price) * parseFloat(value.amount); //formula para calcular el precio total tras eliminar un producto
//                 totalCard =  totalCard - priceReduce; //reduce el precio total del carrito
//                 totalCard = totalCard.toFixed(2); //ajusta el precio total a 2 decimales
//             }
//         });
//         buyThings = buyThings.filter(product => product.id !== deleteId); //filtra el array para eliminar el producto
        
//         countProduct--; //reduce la cantidad de productos añadidos al carrito
//     }
//     
//     if (buyThings.length === 0) { //si no hay productos en el carrito, actualiza el precio y el contador de productos
//         priceTotal.innerHTML = 0;
//         amountProduct.innerHTML = 0;
//     }
//     loadHtml(); //actualiza la info del carrito
// }




//---FUNCION INFO DEL PRODUCTO----------------------------------------------------------------

// function readTheContent(product){
//     const infoProduct = { //crea un objeto del producto con info del array
//         image: product.querySelector('div img').src,
//         title: product.querySelector('.title').textContent,
//         price: product.querySelector('div p span').textContent,
//         id: product.querySelector('a').getAttribute('data-id'),
//         amount: 1
//     }


//     totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price); //formula para actualizar el precio total
//     totalCard = totalCard.toFixed(2); //ajusta el precio total a 2 decimales


//     const exist = buyThings.some(product => product.id === infoProduct.id); //usa 'some' para revisar si algun elemento del array cumple esta condicion
//     if (exist) { //si el producto ya existe en el carrito
//         const pro = buyThings.map(product => {
//             if (product.id === infoProduct.id) { //si encuentra el producto
//                 product.amount++; //incrementa la cantidad
//                 return product;
//             } else {
//                 return product //y sino, deja el producto como estaba
//             }
//         });
//         buyThings = [...pro];
//     } else {
//         buyThings = [...buyThings, infoProduct] // si el producto no existe en el carrito
//         countProduct++; //añade el nuevo producto e incrementa el contador
//     }
//     loadHtml(); //actualiza el HTML
//     //console.log(infoProduct);
// }



//-- FUNCION PARA CARGAR NUEVOS ELEMENTOS AL CARRITO EN EL HTML-------------------------------------------------------------
// function loadHtml(){
//     clearHtml(); //llama a la funcion de abajo, el contenido anterior se elimina y se carga el nuevo
//     buyThings.forEach(product => { //recorre cada elemento del array
//         const {image, title, price, amount, id} = product; //accedemos a las propiedades del objeto
//         const row = document.createElement('div');
//         row.classList.add('item');
//         row.innerHTML = `
//             <img src="${image}" alt="">
//             <div class="item-content">
//                 <h5>${title}</h5>
//                 <h5 class="cart-price">${price}$</h5>
//                 <h6>Amount: ${amount}</h6>
//             </div>
//             <span class="delete-product" data-id="${id}">X</span>
//         `;

//         containerBuyCart.appendChild(row); //agrega el nuevo 'div' al contenedor del carrito

//         priceTotal.innerHTML = totalCard; //actualiza el precio total del carrito

//         amountProduct.innerHTML = countProduct; //actualiza la cantidad total de productos
//     });
// }


//--FUNCION PARA BORRAR CONTENIDO ANTERIOR Y CARGAR LOS NUEVOS ELEMENTOS EN EL HTML-------------------------------------
//  function clearHtml(){
//     containerBuyCart.innerHTML = '';
//  }