<template>
  <div class="basket">
    <div class="basket__content container">
      <h2 class="basket__content-title title">Shopping cart</h2>
      <div class="basket__content-body">
        <div class="basket__body-card">
          <div v-for="item in addToCart" :key="item.id" class="basket__card">
            <div class="basket__card-bg">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="basket__info">
              <div class="basket__card-info">
                <div class="basket__info-name">{{ item.name }}</div>
                <div class="basket__info-footer">
                  <div class="basket__footer-button">
                    <button @click="decreaseQuantity(item)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)">+</button>
                  </div>
                  <div class="basket__footer-price">
                    <span class="basket__price-old">${{ item.oldPrice }}</span>
                    <span class="basket__price-sel">${{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div class="basket__card-close">
                <button @click="removeFromCart(item)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#282828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="#282828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="basket__body-order">
          <div class="basket__order-content">
            <div class="basket__content-name">Order details</div>
            <div class="basket__content-fram">
              <span class="basket__fram-name">{{ totalItems }} items</span>
              <div class="basket__fram-footer">
                <span class="basket__footer-name">Total</span>
                <span class="basket__footer-price">${{ totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <form class="basket__order-form">
            <input type="text" class="basket__form-input" placeholder="Name" />
            <input type="phone" class="basket__form-input" placeholder="Phone number" />
            <input type="email" class="basket__form-input" placeholder="Email" />
            <button class="basket__form-btn btn">Order</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";

const addToCart = ref([
    { id: 1, name: "Secateurs", image: "/src/assets/product-1.jpg", price: 240, oldPrice: 155, quantity: 1 },
    { id: 2, name: "Secateurs", image: "/src/assets/product-1.jpg", price: 240, oldPrice: 155, quantity: 1 },
    { id: 3, name: "Secateurs", image: "/src/assets/product-1.jpg", price: 240, oldPrice: 155, quantity: 1 },
]);

const totalItems = computed(() => addToCart.value.reduce((sum, item) => sum + item.quantity, 0));
const totalPrice = computed(() => addToCart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

const increaseQuantity = (item) => item.quantity++;
const decreaseQuantity = (item) => {
  if (item.quantity > 1) item.quantity--;
};
const removeFromCart = (item) => {
  addToCart.value = addToCart.value.filter((cartItem) => cartItem.id !== item.id);
};

const handleAddToCart = (newItem) => {
  const existingItem = addToCart.value.find((item) => item.name === newItem.name);
  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    addToCart.value.push(newItem);
  }
};
</script>
