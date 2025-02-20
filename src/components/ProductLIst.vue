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
                    shortText
                }
            }">
        </router-link>
        <div class="product__bg">
            <img :src="image" alt="product-bg" class="product__bg-img">
        </div>
        <div class="product__info">
            <p class="product__info-name">{{ title }}</p>
            <div class="product__info-footer">
                <span class="product__footer-price">{{price}}$</span>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
  image: String,
  title: String,
  price: Number,
});
</script>