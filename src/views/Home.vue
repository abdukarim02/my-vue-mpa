<template>
    <section class="main">
        <div class="main__content container">
            <div class="main__content-info">
                <h1 class="main__info-title">Amazing Discounts on Garden Products!</h1>
                <a href="#" class="main__info-btn btn">Check out</a>
            </div>
        </div>
    </section>
    <section class="categories">
        <div class="categories__content container">
            <div class="categories__content-info">
                <h2 class="categories__info-title title">Categories</h2>
                <router-link class="categories__info-link" to="/categories">All categories</router-link>
            </div>
            <div class="categories__blocks">
                <CategoriesBlock :limit="4" />
            </div>
        </div>
    </section>
    <section class="discount">
        <div class="discount__content container">
            <div class="discount__content-info">
                <h2 class="discount__content-title title">5% off on the first order</h2>
                <div class="discount__content-body">
                    <div class="discount__body-bg">
                        <img src="@/assets/discount-bg.png" alt="Discount Background" />
                    </div>
                    <form class="discount__body-form">
                        <input type="text" class="discount__form-input" placeholder="Name" />
                        <input type="tel" class="discount__form-input" placeholder="Phone number" />
                        <input type="email" class="discount__form-input" placeholder="Email" />
                        <button class="discount__form-btn btn">Get a discount</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <section class="sale">
        <div class="sale__content container">
            <div class="sale__content-info">
                <h2 class="sale__content-title title">Sale</h2>
                <router-link class="categories__info-link" to="/allproducts">All sales</router-link>
            </div>
            
            <div class="sale__content-wrap">
                <ProductList :limit="4"
                    v-for="(product, index) in products" 
                    :key="index"
                    :image="product.image" 
                    :sale="product.sale" 
                    :title="product.title" 
                    :price="product.price" 
                    :priceOld="product.priceOld" 
                    :shortText="product.shortText"
                />
            </div>
        </div>
    </section>
</template>
<script setup>
import ProductList from '../components/ProductLIstSale.vue';
import CategoriesBlock from '../components/CategoriesBlock.vue';
const products = [
    { image: '/src/assets/product-1.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'High-quality pruner with ergonomic grip.' },
    { image: '/src/assets/product-2.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'High-quality pruner with ergonomic grip.' },
    { image: '/src/assets/product-3.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'High-quality pruner with ergonomic grip.' },
    { image: '/src/assets/product-4.jpg', sale: 15, title: 'Decorative forged bridge', price: 500, priceOld: 1000, shortText: 'High-quality pruner with ergonomic grip.' },
];
</script>
<style setup>
.categories__wrap-flex {
    width: 24%;
}
</style>

