import {products} from '../script/products.js';
import {cart,removeFromCart,updateDeliveryOption} from '../script/cart.js';
import {deliveryOption} from '../script/delivery.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


let cartSummaryHTML='';

cart.forEach((cartItem)=>{
  const productId=cartItem.productId;

  let matchingItem;

  products.forEach((product)=>{
    if(productId===product.id){
      matchingItem=product;
    }
  });


  const deliveryOptionId=cartItem.deliveryId;
  let deliveryDateOption;

  deliveryOption.forEach((option)=>{
     if(option.deliveryId===deliveryOptionId){
       deliveryDateOption=option;
     }
  });

  const date=dayjs();
  const deliveryDate=date.add(deliveryDateOption.deliveryDays,'days');
  const dateFormat= deliveryDate.format('dddd, MMMM D');


  cartSummaryHTML +=`
    <div class="order-container js-cart-container-${matchingItem.id}">
          <div class="date">Delivery date: ${dateFormat}</div>

          <div class="product-grid">
            <img src="${matchingItem.image}" class="product-image">
            <div class="details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-cost">
                $${(matchingItem.priceCents/100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity : <span class="quantity">${cartItem.quantity}</span>
                </span>
                <span class="update-product">Update</span>
                <span class="delete-product" data-product-id="${matchingItem.id}">Delete</span>
              </div>
            </div>

          <div class="delivery-options">
            <div class="choose-date">
              Choose a delivery option:
            </div>
            ${deliveryOptions(matchingItem,cartItem)}
          </div>
        </div>
      </div>
  `;

})



function deliveryOptions(matchingItem,cartItem){
  let html='';
  deliveryOption.forEach((delivery)=>{
  const date=dayjs();
  const deliveryDate=date.add(delivery.deliveryDays,'days');
  const dateFormat= deliveryDate.format('dddd, MMMM D');

  const priceString = delivery.priceCents
    ===0 
    ? 'FREE'
    : `$${(delivery.priceCents/100).toFixed(2)}`;

  const ischecked=delivery.deliveryId===cartItem.deliveryId;

  html+=` 
    <div class="option js-delivery-id"
      data-product-id="${matchingItem.id}"
      data-delivery-id="${delivery.id}"
    >
      <input  type="radio"
        ${ischecked ? 'checked':''}
      name="delivery-option-${matchingItem.id}">
      <div>
        <div class="delivery-date">${dateFormat}</div>
        <div class="shipping">${priceString} - Shipping</div>
      </div>
    </div>`;
  });
  return html;
}


document.querySelector('.order-summary')
   .innerHTML=cartSummaryHTML;


document.querySelectorAll('.delete-product')
   .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        
        const container=document.querySelector(`.js-cart-container-${productId}`);

        container.remove();
      });
   });


document.querySelector('.js-delivery-id')
  .forEach((element)=>{
   element.addEventListener('click',()=>{
    const {productId,deliveryId}=element.dataset;
    updateDeliveryOption(productId,deliveryId);
   })
}) 