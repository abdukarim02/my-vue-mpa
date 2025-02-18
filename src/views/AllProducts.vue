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
                <!-- Показываем только товары со скидкой -->
                <ProductLIstSale 
                    v-for="(product, index) in filteredSaleProducts" 
                    :key="'sale-' + index"
                    :imag="product.imag" 
                    :sale="product.sale" 
                    :title="product.title" 
                    :price="product.price" 
                    :priceOld="product.priceOld"
                />
                
                <!-- Остальные товары без скидки -->
                <ProductLIst
                    v-for="(product, index) in filteredRegularProducts" 
                    :key="'regular-' + index"
                    :imag="product.imag" 
                    :title="product.title" 
                    :price="product.price"
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
    { imag: '/src/assets/product-1.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000 },
    { imag: '/src/assets/product-1.jpg', sale: 10, title: 'Modern lamp', price: 300, priceOld: 400 },
    { imag: '/src/assets/product-1.jpg', title: 'Elegant chair', price: 700 },
    { imag: '/src/assets/product-1.jpg', sale: 5, title: 'Stylish table', price: 450, priceOld: 500 },
    { imag: '/src/assets/product-1.jpg', title: 'Minimalist sofa', price: 900 },
    { imag: '/src/assets/product-1.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500 },
    { imag: '/src/assets/product-1.jpg', title: 'Minimalist sofa', price: 1300 },
    { imag: '/src/assets/product-1.jpg', title: 'Minimalist sofa', price: 600 },
    { imag: '/src/assets/product-1.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500 },
    { imag: '/src/assets/product-1.jpg', title: 'Minimalist sofa', price: 500 },
    { imag: '/src/assets/product-1.jpg', title: 'Minimalist sofa', price: 400 }
]);

const priceFrom = ref(null);
const priceTo = ref(null);
const discountedOnly = ref(false);
const sortOption = ref("default");

const filteredProducts = computed(() => {
    let result = [...products.value];

    // Фильтр по цене (учитываем только если от 100 и выше)
    if (priceFrom.value !== null && priceFrom.value >= 100) {
        result = result.filter(product => product.price >= priceFrom.value);
    }
    if (priceTo.value !== null && priceTo.value >= 100) {
        result = result.filter(product => product.price <= priceTo.value);
    }

    // Фильтр по скидке
    let discountFiltered = discountedOnly.value ? result.filter(product => product.sale && product.priceOld) : result;

    // Сортировка
    let sortedProducts = [...discountFiltered];
    if (sortOption.value === "priceAsc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === "priceDesc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
});

const filteredSaleProducts = computed(() => {
    return filteredProducts.value.filter(product => product.sale && product.priceOld);
});

const filteredRegularProducts = computed(() => {
    return filteredProducts.value.filter(product => !product.sale || !product.priceOld);
});
</script>

