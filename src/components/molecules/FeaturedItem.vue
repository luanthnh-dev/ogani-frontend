<script setup>
import { onMounted, reactive, ref } from 'vue';
import { globalState } from './../../store';

defineProps({
  id: Number,
  name: String,
  thumbnail: String,
  description: String,
  amount: Number,
  discount: Number,
  price: Number,
  unit: String,
  mix: String,
});

const addToCart = (product) => {
  const existingItem = globalState.cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.amount++;
  } else {
    globalState.cart.push({ ...product, amount: 1 });
  }
  saveCartToLocalStorage();
};

const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(globalState.cart));
};

const clearCart = () => {
  globalState.cart = [];
  localStorage.removeItem('cart');
};

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    globalState.cart = JSON.parse(cartData);
  }
};

onMounted(() => {
  loadCartFromLocalStorage();
});
</script>

<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mix" :class="mix">
    <div class="featured__item">
      <div class="featured__item__pic set-bg" :style="{ 'background-image': 'url(' + thumbnail + ')' }">
        <ul class="featured__item__pic__hover">
          <li>
            <a href="#"><i class="fa fa-heart"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-retweet"></i></a>
          </li>
          <li>
            <a
              href="#!"
              @click="
                addToCart({
                  id,
                  name,
                  thumbnail,
                  description,
                  amount,
                  discount,
                  price,
                  unit,
                  mix,
                })
              "
              ><i class="fa fa-shopping-cart"></i
            ></a>
          </li>
        </ul>
      </div>
      <div class="featured__item__text">
        <h6>
          <router-link :to="`/detail/${id}`">{{ name }}</router-link>
        </h6>
        <h5>{{ price.toFixed(2) }} {{ unit }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
