<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { globalState } from './../../store';
import PRODUCT_API from './../../apis/productApi';

defineProps({
  isNormal: false,
});

const router = useRouter();
let searchInput = ref('');

const handleSubmit = async () => {
  try {
    const query = { name: searchInput.value };
    await router.push({ name: 'search', query });

    const res = await PRODUCT_API.findAllProduct({ name: searchInput.value });

    globalState.productsSearch = res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
</script>

<template>
  <section class="hero" :class="{ isNormal: true, 'hero-normal': isNormal }">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="hero__categories">
            <div class="hero__categories__all">
              <i class="fa fa-bars"></i>
              <span>All departments</span>
            </div>
            <ul>
              <li><a href="#">Fresh Meat</a></li>
              <li><a href="#">Vegetables</a></li>
              <li><a href="#">Fruit & Nut Gifts</a></li>
              <li><a href="#">Fresh Berries</a></li>
              <li><a href="#">Ocean Foods</a></li>
              <li><a href="#">Butter & Eggs</a></li>
              <li><a href="#">Fastfood</a></li>
              <li><a href="#">Fresh Onion</a></li>
              <li><a href="#">Papayaya & Crisps</a></li>
              <li><a href="#">Oatmeal</a></li>
              <li><a href="#">Fresh Bananas</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="hero__search">
            <div class="hero__search__form">
              <form action="#">
                <div class="hero__search__categories">
                  All Categories
                  <span class="arrow_carrot-down"></span>
                </div>
                <input type="text" placeholder="What do yo u need?" v-model="searchInput" />
                <a href="#!" class="site-btn" @click="handleSubmit">SEARCH</a>
              </form>
            </div>
            <div class="hero__search__phone">
              <div class="hero__search__phone__icon">
                <i class="fa fa-phone"></i>
              </div>
              <div class="hero__search__phone__text">
                <h5>+65 11.188.888</h5>
                <span>support 24/7 time</span>
              </div>
            </div>
          </div>
          <div v-if="!isNormal" class="hero__item set-bg" data-setbg="/img/hero/banner.jpg">
            <div class="hero__text">
              <span>FRUIT FRESH</span>
              <h2>Vegetable <br />100% Organic</h2>
              <p>Free Pickup and Delivery Available</p>
              <a href="#" class="primary-btn">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
