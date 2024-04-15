<script setup>
import { onMounted } from 'vue';
import Banner from '../components/molecules/Banner.vue';
import CategoryList from '../components/molecules/CategoryList.vue';
import Featured from '../components/molecules/Featured.vue';
import FromBlog from '../components/molecules/FromBlog.vue';
import Hero from '../components/molecules/Hero.vue';
import LatestProduct from '../components/molecules/LatestProduct.vue';

// onMounted(() => {
//   const script1 = document.createElement('script');
//   script1.src = '/js/jquery-3.3.1.min.js';
//   document.body.appendChild(script1);

//   const script2 = document.createElement('script');
//   script2.src = '/js/bootstrap.min.js';
//   document.body.appendChild(script2);

//   const script3 = document.createElement('script');
//   script3.src = '/js/jquery.nice-select.min.js';
//   document.body.appendChild(script3);

//   const script4 = document.createElement('script');
//   script4.src = '/js/jquery-ui.min.js';
//   document.body.appendChild(script4);

//   const script5 = document.createElement('script');
//   script5.src = '/js/jquery.slicknav.js';
//   document.body.appendChild(script5);

//   const script6 = document.createElement('script');
//   script6.src = '/js/mixitup.min.js';
//   document.body.appendChild(script6);

//   const script7 = document.createElement('script');
//   script7.src = '/js/owl.carousel.min.js';
//   document.body.appendChild(script7);

//   const scriptLast = document.createElement('script');
//   scriptLast.src = '/js/main.js';
//   document.body.appendChild(scriptLast);
// });
</script>

<template>
  <hero />
  <category-list />
  <featured />
  <banner />
  <latest-product />
  <from-blog />
</template>

<style></style>
