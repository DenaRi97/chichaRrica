
document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");
    const cartContainer = document.getElementById("cart");

    // Simulated API call to fetch products
    function fetchProducts() {
        // In a real scenario, you would fetch data from an actual API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Product 1", price: 20 },
                    { id: 2, name: "Product 2", price: 30 },
                    { id: 3, name: "Product 3", price: 25 },
                ]);
            }, 500); // Simulating a delay as if fetching from a server
        });
    }

    // Initialize cart
    const cart = [];

    // Function to add product to cart
    window.addToCart = function (productId) {
        fetchProducts().then(products => {
            const existingItem = cart.find(item => item.product.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push({ product, quantity: 1 });
                }
            }

            updateCartDisplay();
        });
    };

    // Function to update cart display
    function updateCartDisplay() {
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${item.product.name} - $${item.product.price} x ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Display gallery items
    function displayGallery() {
        fetchProducts().then(products => {
            products.forEach(product => {
                const galleryItem = document.createElement("div");
                galleryItem.classList.add("gallery-item");
                galleryItem.innerHTML = `
                    <img src="product-image.jpg" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>$${product.price}</p>
                    <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                galleryContainer.appendChild(galleryItem);
            });
        });
    }

    // Display gallery items when the page loads
    displayGallery();
});



// //variables
// let allContainerCart = document.querySelector('.products');
// let containerBuyCart = document.querySelector('.card-items');
// let priceTotal = document.querySelector('.price-total')
// let amountProduct = document.querySelector('.count-product');


// let buyThings = [];
// let totalCard = 0;
// let countProduct = 0;

// //functions
// loadEventListenrs();
// function loadEventListenrs(){
//     allContainerCart.addEventListener('click', addProduct);

//     containerBuyCart.addEventListener('click', deleteProduct);
// }

// function addProduct(e){
//     e.preventDefault();
//     if (e.target.classList.contains('btn-add-cart')) {
//         const selectProduct = e.target.parentElement; 
//         readTheContent(selectProduct);
//     }
// }

// function deleteProduct(e) {
//     if (e.target.classList.contains('delete-product')) {
//         const deleteId = e.target.getAttribute('data-id');

//         buyThings.forEach(value => {
//             if (value.id == deleteId) {
//                 let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
//                 totalCard =  totalCard - priceReduce;
//                 totalCard = totalCard.toFixed(2);
//             }
//         });
//         buyThings = buyThings.filter(product => product.id !== deleteId);
        
//         countProduct--;
//     }
//     //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
//     if (buyThings.length === 0) {
//         priceTotal.innerHTML = 0;
//         amountProduct.innerHTML = 0;
//     }
//     loadHtml();
// }

// function readTheContent(product){
//     const infoProduct = {
//         image: product.querySelector('div img').src,
//         title: product.querySelector('.title').textContent,
//         price: product.querySelector('div p span').textContent,
//         id: product.querySelector('a').getAttribute('data-id'),
//         amount: 1
//     }

//     totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
//     totalCard = totalCard.toFixed(2);

//     const exist = buyThings.some(product => product.id === infoProduct.id);
//     if (exist) {
//         const pro = buyThings.map(product => {
//             if (product.id === infoProduct.id) {
//                 product.amount++;
//                 return product;
//             } else {
//                 return product
//             }
//         });
//         buyThings = [...pro];
//     } else {
//         buyThings = [...buyThings, infoProduct]
//         countProduct++;
//     }
//     loadHtml();
//     //console.log(infoProduct);
// }

// function loadHtml(){
//     clearHtml();
//     buyThings.forEach(product => {
//         const {image, title, price, amount, id} = product;
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

//         containerBuyCart.appendChild(row);

//         priceTotal.innerHTML = totalCard;

//         amountProduct.innerHTML = countProduct;
//     });
// }
//  function clearHtml(){
//     containerBuyCart.innerHTML = '';
//  }