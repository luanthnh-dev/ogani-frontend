<script setup>
import { onMounted, ref } from 'vue';
import PRODUCT_API from '../../apis/productApi';

const latestProducts = ref([]);
const topRatedProducts = ref([]);
const reviewProducts = ref([]);
const sliderItems = ref({});

const fetchProducts = async () => {
  try {
    const [latestRes, topRatedRes, reviewRes] = await Promise.all([
      PRODUCT_API.findLatestProducts(),
      PRODUCT_API.findTopRatedProductsAPIView(),
      PRODUCT_API.findReviewProductsAPIView(),
    ]);
    latestProducts.value = latestRes.data;
    topRatedProducts.value = topRatedRes.data;
    reviewProducts.value = reviewRes.data;

    sliderItems.value = {
      latestProducts: chunkArray(latestProducts.value, 3),
      topRatedProducts: chunkArray(topRatedProducts.value, 3),
      reviewProducts: chunkArray(reviewProducts.value, 3),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

onMounted(fetchProducts);
</script>

<template>
  <section class="latest-product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Latest Products</h4>
            <div class="latest-product__slider owl-carousel">
              <div
                v-for="(sliderItem, index) in sliderItems.latestProducts"
                :key="index"
                class="latest-prdouct__slider__item"
              >
                <a
                  v-for="(product, productIndex) in sliderItem"
                  :key="productIndex"
                  :href="product.link"
                  class="latest-product__item"
                >
                  <div class="latest-product__item__pic">
                    <img :src="product.thumbnail" :alt="product.name" />
                  </div>
                  <div class="latest-product__item__text">
                    <h6>{{ product.name }}</h6>
                    <span>{{ product.price.toFixed(2) }} {{ product.unit }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Top Rated Products</h4>
            <div class="latest-product__slider owl-carousel">
              <div
                v-for="(sliderItem, index) in sliderItems.topRatedProducts"
                :key="index"
                class="latest-prdouct__slider__item"
              >
                <a
                  v-for="(product, productIndex) in sliderItem"
                  :key="productIndex"
                  :href="product.link"
                  class="latest-product__item"
                >
                  <div class="latest-product__item__pic">
                    <img :src="product.thumbnail" :alt="product.name" />
                  </div>
                  <div class="latest-product__item__text">
                    <h6>{{ product.name }}</h6>
                    <span>{{ product.price.toFixed(2) }} {{ product.unit }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Review Products</h4>
            <div class="latest-product__slider owl-carousel">
              <div
                v-for="(sliderItem, index) in sliderItems.reviewProducts"
                :key="index"
                class="latest-prdouct__slider__item"
              >
                <a
                  v-for="(product, productIndex) in sliderItem"
                  :key="productIndex"
                  :href="product.link"
                  class="latest-product__item"
                >
                  <div class="latest-product__item__pic">
                    <img :src="product.thumbnail" :alt="product.name" />
                  </div>
                  <div class="latest-product__item__text">
                    <h6>{{ product.name }}</h6>
                    <span>{{ product.price.toFixed(2) }} {{ product.unit }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
