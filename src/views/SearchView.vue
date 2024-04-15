<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../components/organisms/Sidebar.vue';
import Filter from '../components/molecules/Filter.vue';
import SaleOff from '../components/molecules/SaleOff.vue';
import ProductItem from '../components/molecules/ProductItem.vue';
import { globalState } from './../store';
import PRODUCT_API from './../apis/productApi';

const route = useRoute();
const products = ref([]);

const getProductByName = async () => {
  try {
    const res = await PRODUCT_API.findAllProduct({ name: route.query.name || '' });

    products.value = res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(getProductByName);
</script>

<template>
  <section class="product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-5">
          <!-- SIDEBAR BEGIN -->
          <sidebar />
          <!-- SIDEBAR END -->
        </div>
        <div class="col-lg-9 col-md-7">
          <sale-off />
          <filter />

          <div class="row">
            <product-item
              v-for="(product, index) in products"
              :key="index"
              :id="product.id"
              :name="product.name"
              :thumbnail="product.thumbnail"
              :unit="product.unit"
              :price="product.price"
            />
          </div>
          <div class="product__pagination">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#"><i class="fa fa-long-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
