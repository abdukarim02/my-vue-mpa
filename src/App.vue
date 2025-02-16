<script setup>
import Navbar from './components/Navbar.vue';
import Contact from './components/Contact.vue';
</script>

<template>
  <Navbar />
  <section class="wrapper">
    <router-view/>
  </section>
  <Contact/>
</template>
