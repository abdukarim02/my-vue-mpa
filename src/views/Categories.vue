<script setup>
import CategoriesBlock from '../components/CategoriesBlock.vue';
</script>

<template>
    <div class="categories__content container">
            <div class="categories__content-info">
                <h2 class="categories__info-title title">Categories</h2>
            </div>
            <CategoriesBlock class="categories__wrap-flex-1" :limit="5" />
        </div>
</template>
<style setup>
.categories__content {
    margin: 80px auto;
}
.categories__wrap-flex-1 .categories__wrap-flex {
    width: 18%;
}
</style>