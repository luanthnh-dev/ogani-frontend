<script setup>
import ProductItem from './ProductItem.vue';

defineProps({
  productRelated: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <!-- Related Product Section Begin -->
  <section class="related-product">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title related__product__title">
            <h2>Related Product</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <product-item
          v-for="(product, index) in productRelated"
          :key="index"
          :id="product.id"
          :name="product.name"
          :thumbnail="product.thumbnail"
          :unit="product.unit"
          :price="product.price"
        />
      </div>
    </div>
  </section>
  <!-- Related Product Section End -->
</template>

<style scoped></style>
