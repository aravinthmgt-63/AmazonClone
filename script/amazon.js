

import {products} from '../script/products.js';
import {cart,addToCart,saveToStorage} from '../script/cart.js';

let productsItemHTML='';

products.forEach((product)=>{
   productsItemHTML+=`
       <div class="product-container">
          <div class="product-image">
            <img src="${product.image}" class="image">
          </div>
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-rating">
            <img src="images/ratings/rating-${product.rating.stars*10}.png" class="rating-stars">
            ${product.rating.count}
          </div>
          <div class="price">$${(product.priceCents/100).toFixed(2)}</div>
          <div class="quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" class="check-mark">
            Added
          </div>
          <div>
            <button class="add" data-product-id="${product.id}">Add To cart</button>
          </div>
        </div>
   `;
})

document.querySelector('.grid-container')
   .innerHTML=productsItemHTML;


export function updateCart(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
     cartQuantity += cartItem.quantity;
  });
  document.querySelector('.quantity')
     .innerHTML=cartQuantity;   
}

document.querySelectorAll('.add').forEach((button)=>{
  button.addEventListener('click',()=>{

     const productId=button.dataset.productId;
     addToCart(productId);
     updateCart();

     console.log(cart);
     const product = button.closest('.product-container');
     const msg = product.querySelector('.added-to-cart');
     msg.classList.add('show');

     setTimeout(()=>{
       msg.classList.remove('show');
     },2000);
  });

});
