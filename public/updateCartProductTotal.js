
//   productSubTotal.textContent = `₹${totalProductPrice}`;
//   productFinalTotal.textContent = `₹${totalProductPrice + 50}`;
// };
// import { getCartProducts } from './getCartProducts';


// const getCartProductFromLS = () => {
//     const products = localStorage.getItem("cartProducts");
//     return products ? JSON.parse(products) : [];
// };

// // Function to update cart value (number of items in the cart)
// export const updateCartValue = (cartProducts) => {
//     const cartValue = document.querySelector("#cartValue");
//     cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${cartProducts.length} </i>`;
// };

// export const renderCartProducts = () => {
//     const productSubTotal = document.querySelector(".productSubTotal");
//     const productFinalTotal = document.querySelector(".productFinalTotal");
//     const cartContainer = document.querySelector(".cart-container"); 

//     const localCartProducts = getCartProductFromLS();
//     let initialValue = 0;

//     const totalProductPrice = localCartProducts.reduce((accum, curElem) => {
//         const productPrice = parseInt(curElem.price) || 0;
//         return accum + productPrice;
//     }, initialValue);

//     productSubTotal.textContent = `₹${totalProductPrice}`;
//     productFinalTotal.textContent = `₹${totalProductPrice + 50}`; 


//     cartContainer.innerHTML = '';


//     localCartProducts.forEach((product) => {
//         const cartItem = document.createElement("div");
//         cartItem.classList.add("cart-item");

        
//         cartItem.innerHTML = `
//             <img src="${product.image}" alt="${product.name}" class="cart-item-image" />
//             <div class="cart-item-details">
//                 <h4>${product.name}</h4>
//                 <p>Price: ₹${product.price}</p>
//                 <p>Quantity: ${product.quantity}</p>
//             </div>
//         `;

     
//         cartContainer.appendChild(cartItem);
//     });

    
//     updateCartValue(localCartProducts);
// };


// export const refreshCart = () => {
//     renderCartProducts(); 
// };


// document.addEventListener("DOMContentLoaded", () => {
//     refreshCart();
// });
// Fetch products from the API
// const fetchCartProductsFromAPI = async () => {
//   try {
//       const response = await fetch('../api/products.json'); // Replace with your API endpoint
//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();

      
//       console.log("API Response:", data);

     
//       localStorage.setItem("cartProducts", JSON.stringify(data));

//       return data; 
//   } catch (error) {
//       console.error("Failed to fetch products:", error);
//       return [];
//   }
// };


// const renderCartProducts = async () => {
//   const productSubTotal = document.querySelector(".productSubTotal");
//   const productFinalTotal = document.querySelector(".productFinalTotal");
//   const cartContainer = document.querySelector(".cart-container");


//   const localCartProducts = await fetchCartProductsFromAPI();


//   console.log("Cart Products:", localCartProducts);

//   let initialValue = 0;

  
//   const totalProductPrice = localCartProducts.reduce((accum, curElem) => {
//       const productPrice = parseInt(curElem.price) || 0;
//       return accum + productPrice;
//   }, initialValue);

  
//   productSubTotal.textContent = `₹${totalProductPrice}`;
//   productFinalTotal.textContent = `₹${totalProductPrice + 50}`;


//   cartContainer.innerHTML = '';


//   localCartProducts.forEach((product, index) => {
//       if (!product.image) {
//           console.warn(`Product at index ${index} is missing an image:`, product);
//       }

//       const cartItem = document.createElement("div");
//       cartItem.classList.add("cart-item");

// 
   
//       cartContainer.appendChild(cartItem);
//   });


//   updateCartValue(localCartProducts);
// };


// export const updateCartValue = (cartProducts) => {
//   const cartValue = document.querySelector("#cartValue");
//   cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${cartProducts.length} </i>`;
// };


// export const refreshCart = async () => {
//   await renderCartProducts();
// };


// document.addEventListener("DOMContentLoaded", async () => {
//   await refreshCart();
// });
// Fetch products from API
import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");

  let localCartProducts = getCartProductFromLS();
  let initialValue = 0;
  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    let productPrice = parseInt(curElem.price) || 0;
    return accum + productPrice;
  }, initialValue);
  

  productSubTotal.textContent = `₹${totalProductPrice}`;
  productFinalTotal.textContent = `₹${totalProductPrice + 50}`;
};