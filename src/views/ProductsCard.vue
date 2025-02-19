<template>
  <div class="products-card">
    <div class="products-card__content container">
      <div class="products-card__content-bg">
        <img :src="image" alt="Product image">
      </div>
      <div class="products-card__info">
        <h5 class="products-card__info-title">{{ title }}</h5>
        <div class="products-card__info-price">
          <div v-if="price" class="products-card__price-old">{{ formattedPrice }}</div>
          <div v-if="priceOld" class="products-card__price-sale">{{ formattedPriceOld }}</div>
          <div v-if="sale && sale > 0" class="products-card__sale">-{{ sale }}%</div>
        </div>
        <div class="products-card__button">
          <div class="products-card__button-counter">
            <button @click="decreaseQuantity">
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H15" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 5V19" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <button class="products-card__button-btn btn" @click.stop="addToCart">Add to cart</button>
        </div>
        <div class="products-card__text">
          <h6>Description</h6>
          <p>{{ shortText }}</p>
          <button v-if="showReadMoreButton" @click.stop="toggleReadMore">
            {{ isExpanded ? "Read less" : "Read more" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = route.query.title || "No title";
const text = route.query.text || "This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user. This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.";
const image = route.query.imag || ""; 
const price = route.query.price ? Number(route.query.price) : 0;
const priceOld = route.query.priceOld ? Number(route.query.priceOld) : null;
const sale = route.query.sale ? Number(route.query.sale) : 0;

const quantity = ref(1);
const isExpanded = ref(false);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value;
};

const shortText = computed(() => {
  if (!text) return "";
  return isExpanded.value || text.length <= 100 ? text : text.slice(0, 650) + "...";
});

const showReadMoreButton = computed(() => text.length > 100);

const formattedPrice = computed(() => {
  return price ? `${price.toFixed(2)}$` : "";
});

const formattedPriceOld = computed(() => {
  return priceOld ? `${priceOld.toFixed(2)}$` : "";
});

const addToCart = () => {
  console.log("Added to cart:", { title, quantity: quantity.value });
};
</script>



  