<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/organisms/Header.vue';
import Footer from './components/organisms/Footer.vue';
import Loader from './components/atoms/Loader.vue';

const route = useRoute();
const showHeaderFooter = ref(true);

watch(route, () => {
  showHeaderFooter.value = route.path !== '/login' && route.path !== '/register';
});
</script>

<template>
  <Loader />
  <Header v-if="showHeaderFooter" />
  <main>
    <RouterView />
  </main>
  <Footer v-if="showHeaderFooter" />
</template>

<style scoped></style>
