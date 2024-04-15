<script setup>
import { onMounted, ref } from 'vue';
import FeaturedItem from './../molecules/FeaturedItem.vue';
import PRODUCT_API from './../../apis/productApi';

const productList = ref([]);

onMounted(async () => {
  const res = await PRODUCT_API.findAllProduct();

  productList.value = res.data;
  console.log(res.data);
});
</script>

<template>
  <section class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Featured Product</h2>
          </div>
          <div class="featured__controls">
            <ul>
              <li class="active" data-filter="*">All</li>
              <li data-filter=".oranges">Oranges</li>
              <li data-filter=".fresh-meat">Fresh Meat</li>
              <li data-filter=".vegetables">Vegetables</li>
              <li data-filter=".fastfood">Fastfood</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row featured__filter">
        <featured-item
          v-for="(product, index) in productList"
          :key="index"
          :id="product.id"
          :name="product.name"
          :thumbnail="product.thumbnail"
          :description="product.description"
          :amount="product.amount"
          :discount="product.discount"
          :price="product.price"
          :unit="product.unit"
          :mix="product.mix"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
