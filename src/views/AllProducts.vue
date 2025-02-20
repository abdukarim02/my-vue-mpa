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
                    :image="product.image" 
                    :sale="product.sale" 
                    :title="product.title" 
                    :price="product.price" 
                    :priceOld="product.priceOld"
                    :shortText="product.shortText"
                    @add-to-cart="handleAddToCart"
                />
                <ProductLIst
                    v-for="(product, index) in filteredProducts.regular" 
                    :key="'regular-' + index"
                    :image="product.image" 
                    :title="product.title" 
                    :price="product.price"
                    :shortText="product.shortText"
                    @add-to-cart="handleAddToCart"
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
    { image: '/src/assets/product-1.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'High-quality pruner with ergonomic grip.' },
    { image: '/src/assets/product-2.jpg', sale: 10, title: 'Modern lamp', price: 300, priceOld: 400, shortText: 'Elegant lamp to light up your space.' },
    { image: '/src/assets/product-3.jpg', title: 'Elegant chair', price: 700, shortText: 'Comfortable and stylish chair for any home.' },
    { image: '/src/assets/product-4.jpg', sale: 5, title: 'Stylish table', price: 450, priceOld: 500, shortText: 'A minimalist yet functional table.' },
    { image: '/src/assets/product-5.jpg', title: 'Minimalist sofa', price: 900, shortText: 'Modern sofa with high durability.' },
    { image: '/src/assets/product-6.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500, shortText: 'Premium carpet with soft texture.' },
    { image: '/src/assets/product-7.jpg', title: 'Minimalist sofa', price: 1300, shortText: 'Spacious and comfortable seating.' },
    { image: '/src/assets/product-8.jpg', title: 'Minimalist sofa', price: 600, shortText: 'Perfect for small apartments.' },
    { image: '/src/assets/product-9.jpg', sale: 20, title: 'Luxury carpet', price: 1200, priceOld: 1500, shortText: 'High-end carpet with unique patterns.' },
    { image: '/src/assets/product-10.jpg', title: 'Minimalist sofa', price: 500, shortText: 'Compact and stylish sofa for modern homes.' },
    { image: '/src/assets/product-11.jpg', title: 'Minimalist sofa', price: 400, shortText: 'Affordable and elegant design.' }
]);

const priceFrom = ref(null);
const priceTo = ref(null);
const discountedOnly = ref(false);
const sortOption = ref("default");

const filteredProducts = computed(() => {
    let result = [...products.value];

    // Фильтр по цене
    if (Number.isFinite(priceFrom.value)) {
        result = result.filter(product => product.price >= priceFrom.value);
    }
    if (Number.isFinite(priceTo.value)) {
        result = result.filter(product => product.price <= priceTo.value);
    }

    // Фильтр по скидке
    if (discountedOnly.value) {
        result = result.filter(product => product.sale);
    }

    // Сортировка
    switch (sortOption.value) {
        case "priceAsc":
            result.sort((a, b) => a.price - b.price);
            break;
        case "priceDesc":
            result.sort((a, b) => b.price - a.price);
            break;
    }

    return {
        sale: result.filter(product => product.sale),
        regular: result.filter(product => !product.sale)
    };
});

const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
};
</script>



