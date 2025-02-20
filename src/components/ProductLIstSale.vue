<template>
    <div class="product">
        <router-link 
            class="product__link" 
            :to="{
                path: '/products-card',
                query: {
                    image,
                    title,
                    price,
                    priceOld,
                    sale,
                    shortText
                }
            }">
        </router-link>
        <div class="product__bg">
            <div v-if="sale > 0" class="product__bg-sale">-{{ sale }}%</div>
            <img :src="image" alt="product-bg" class="product__bg-img">
        </div>
        <div class="product__info">
            <p class="product__info-name">{{ title }}</p>
            <div class="product__info-footer">
                <span class="product__footer-price">{{ formattedPrice }}</span>
                <span v-if="priceOld" class="product__footer-sale">{{ formattedPriceOld }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  image: String,
  title: String,
  price: Number,
  priceOld: Number,
  sale: Number,
});

const formattedPrice = computed(() => {
  return props.price != null ? `${props.price.toFixed(2)}$` : "0.00$";
});

const formattedPriceOld = computed(() => {
  return props.priceOld != null ? `${props.priceOld.toFixed(2)}$` : "";
});
</script>
