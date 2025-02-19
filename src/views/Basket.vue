<template>
    <div class="basket">
      <div class="basket__content container">
        <h2 class="basket__content-title title">Shopping cart</h2>
        <div class="basket__content-body" v-if="addToCart.length">
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <form class="basket__order-form" @submit.prevent="submitOrder">
                <input
                    type="text"
                    v-model="customerName"
                    class="basket__form-input"
                    placeholder="Name"
                    required
                    pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                    title="Only letters are allowed"
                />
                <input
                    type="tel"
                    v-model="customerPhone"
                    class="basket__form-input"
                    placeholder="Phone number"
                    required
                    pattern="^\+\d{11}$"
                    title="Phone number must start with '+' and contain 11 digits"
                />
                <input
                    type="email"
                    v-model="customerEmail"
                    class="basket__form-input"
                    placeholder="Email"
                    required
                />
                <button class="basket__form-btn btn">Order</button>
            </form>

          </div>
        </div>
  
        <div class="basket__content-messages" v-else>
          <p class="basket__messages-text">Looks like you have no items in your basket currently.</p>
          <router-link to="/all-products" class="basket__messages-btn btn">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  
    <div class="dark" v-if="orderSuccess">
      <div class="dark__content">
        <div class="dark__content-info">
          <h5 class="dark__info-name">Congratulations! </h5>
          <p class="dark__info-text">Your order has been successfully placed on the website.</p>
          <p class="dark__info-text">A manager will contact you shortly to confirm your order.</p>
        </div>
        <button class="dark__content-btn" @click="orderSuccess = false">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M33 11L11 33" stroke="white" stroke-width="3.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 11L33 33" stroke="white" stroke-width="3.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        
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
  
  const customerName = ref("");
  const customerPhone = ref("");
  const customerEmail = ref("");
  const orderSuccess = ref(false);
  
  // Валидация
  const isNameValid = computed(() => /^[A-Za-zА-Яа-яЁё\s]+$/.test(customerName.value));
  const isPhoneValid = computed(() => /^\+\d{11}$/.test(customerPhone.value));
  const isEmailValid = computed(() => customerEmail.value.includes("@"));
  const isFormValid = computed(() => isNameValid.value && isPhoneValid.value && isEmailValid.value);
  
  const increaseQuantity = (item) => item.quantity++;
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) item.quantity--;
  };
  const removeFromCart = (item) => {
    addToCart.value = addToCart.value.filter((cartItem) => cartItem.id !== item.id);
  };
  
  const submitOrder = () => {
    if (isFormValid.value) {
      orderSuccess.value = true;
      addToCart.value = [];
      customerName.value = "";
      customerPhone.value = "";
      customerEmail.value = "";
    }
  };
  </script>
  
  
