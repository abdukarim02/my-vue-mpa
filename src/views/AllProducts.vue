<template>
    <section class="sale">
        <div class="sale__content container">
            <div class="sale__content-info">
                <h2 class="sale__content-title title">All products</h2>
            </div>

            <!-- Фильтр товаров -->
            <div class="sale__content-filter">
                <div class="sale__filter-body">
                    <p class="sale__body-name">Price</p>
                    <input v-model.number="priceFrom" class="price" type="number" placeholder="from">
                    <input v-model.number="priceTo" class="price" type="number" placeholder="to">
                </div>
                <div class="sale__filter-body">
                    <p class="sale__body-name">Discounted items</p>
                    <input v-model="discountedOnly" class="discounted" type="checkbox">
                </div>
                <div class="sale__filter-body">
                    <p class="sale__body-name">Sorted</p>
                    <select v-model="sortOption" class="filter__select">
                        <option value="default">by default</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div class="sale__content-wrap">
                <ProductLIstSale 
                    v-for="(product, index) in filteredProducts.sale" 
                    :key="'sale-' + index"
                    :imag="product.imag" 
                    :sale="product.sale" 
                    :title="product.title" 
                    :price="product.price" 
                    :priceOld="product.priceOld"
                    :shortText="product.shortText"
                />
                <ProductLIst
                    v-for="(product, index) in filteredProducts.regular" 
                    :key="'regular-' + index"
                    :imag="product.imag" 
                    :title="product.title" 
                    :price="product.price"
                    :shortText="product.shortText"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductLIstSale from '../components/ProductLIstSale.vue';
import ProductLIst from '../components/ProductLIst.vue';

const products = ref([
    { imag: '/src/assets/product-1.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-2.jpg', sale: 10, title: 'Modern lamp', price: 300, priceOld: 400, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-3.jpg', title: 'Elegant chair', price: 700, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-4.jpg', sale: 5, title: 'Stylish table', price: 450, priceOld: 500, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-5.jpg', title: 'Minimalist sofa', price: 900, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-6.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-7.jpg', title: 'Minimalist sofa', price: 1300, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-8.jpg', title: 'Minimalist sofa', price: 600, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-9.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-10.jpg', title: 'Minimalist sofa', price: 500, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' },
    { imag: '/src/assets/product-11.jpg', title: 'Minimalist sofa', price: 400, shortText: 'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won’t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement, possibly the highest accolade in gardening, for peace of mind this pruner comes with a ten-year guarantee against manufacturing defects. Supplied with replacement blade and spare spring. You may also be interested in our pack of two replacement springs.' }
]);

const priceFrom = ref(null);
const priceTo = ref(null);
const discountedOnly = ref(false);
const sortOption = ref("default");

const filteredProducts = computed(() => {
    let result = [...products.value];

    // Фильтр по цене
    if (priceFrom.value !== null) {
        result = result.filter(product => product.price >= priceFrom.value);
    }
    if (priceTo.value !== null) {
        result = result.filter(product => product.price <= priceTo.value);
    }

    // Фильтр по скидке
    if (discountedOnly.value) {
        result = result.filter(product => product.sale && product.priceOld);
    }

    // Сортировка
    if (sortOption.value === "priceAsc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === "priceDesc") {
        result.sort((a, b) => b.price - a.price);
    }

    return {
        sale: result.filter(product => product.sale && product.priceOld),
        regular: result.filter(product => !product.sale || !product.priceOld)
    };
});
</script>


