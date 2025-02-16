<template>
    <div class="categories__content-wrap">
        <div 
            v-for="(category, index) in filteredCategories" 
            :key="index" 
            :class="['categories__wrap-flex', `categories__wrap-flex--${category.cols || 'default'}`]"
        >
            <div class="categories__flex-bg">
                <img :src="category.image" :alt="category.name" class="categories__bg-img">
            </div>
            <div class="categories__flex-info">
                <p>{{ category.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

// Принимаем `limit` как пропс
const props = defineProps({
    limit: {
        type: Number,
        default: 4, // По умолчанию 4 блока
    }
});

const categories = [
    { name: 'Garden Tools', image: '/src/assets/category-1.png', cols: '2' },
    { name: 'Plants', image: '/src/assets/category-1.png', cols: '3' },
    { name: 'Furniture', image: '/src/assets/category-1.png', cols: '1' },
    { name: 'Outdoor Decor', image: '/src/assets/category-1.png', cols: '2' },
    { name: 'Lighting', image: '/src/assets/category-1.png', cols: '1' }
];

// Фильтруем категории на основе переданного `limit`
const filteredCategories = computed(() => categories.slice(0, props.limit));
</script>


