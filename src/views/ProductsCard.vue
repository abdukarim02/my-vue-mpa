<template>
    <router-link :to="`/products-card/${id}`" class="products-card">
      <div class="products-card__content container">
        <div class="products-card__content-bg">
          <img :src="imag" alt="Product image">
        </div>
        <div class="products-card__info">
          <h5 class="products-card__info-title">{{ title }}</h5>
          <div class="products-card__info-price">
            <!-- Здесь можно настроить порядок отображения цены, старой цены и скидки -->
            <div class="products-card__price-old">{{ priceOld }}$</div>
            <div class="products-card__price-sale">{{ price }}$</div>
            <div class="products-card__sale">{{ sale }}%</div>
          </div>
          <div class="products-card__button">
            <div class="products-card__button-counter">
              <button>
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H15" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <span>1</span>
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 5V19" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
            <button class="products-card__button-btn btn">Add to cart</button>
          </div>
          <div class="products-card__text">
            <h6>Description</h6>
            <p>{{ text }}</p>
            <p>{{ text }}</p>
            <button>Read more</button>
          </div>
        </div>
      </div>
    </router-link>
  </template>
  
  <script setup>
  defineProps({
    id: [String, Number],
    imag: String,
    title: String,
    price: Number,
    priceOld: Number,
    sale: Number,
    text: String,
  });
  </script>
  