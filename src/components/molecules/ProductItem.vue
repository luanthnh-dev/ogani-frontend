<script setup>
defineProps({
  thumbnail: String,
  id: Number,
  name: String,
  unit: String,
  price: Number,
});
</script>

<template>
  <div class="col-lg-4 col-md-6 col-sm-6">
    <div class="product__item">
      <div
        class="product__item__pic set-bg"
        :data-setbg="thumbnail"
        :style="{ 'background-image': 'url(' + thumbnail + ')' }"
      >
        <ul class="product__item__pic__hover">
          <li>
            <a href="#"><i class="fa fa-heart"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-retweet"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-shopping-cart"></i></a>
          </li>
        </ul>
      </div>
      <div class="product__item__text">
        <h6>
          <router-link :to="`/detail/${id}`">{{ name }}</router-link>
        </h6>
        <h5>{{ price.toFixed(2) }} {{ unit }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
