<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from './../components/molecules/Breadcrumb.vue';
import RelatedProduct from './../components/molecules/RelatedProduct.vue';

import PRODUCT_API from './../apis/productApi';

const route = useRoute();
let { productId } = route.params;

const product = ref({});
const productRelated = ref([]);

const fetchProduct = async () => {
  try {
    const res = await PRODUCT_API.findProductById(productId);

    product.value = res.data;
    productRelated.value = res.data?.category?.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(fetchProduct);

// Watch for changes in route.params
watch(
  () => route.params,
  async (newParams) => {
    productId = newParams.productId;
    await fetchProduct();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
);

console.log(product);
</script>

<template>
  <breadcrumb
    :name="product?.name"
    :breadcrumbs="[
      { text: 'Home', to: '/' },
      { text: `${product?.category?.name}`, to: `/category/${product?.category?.slug}` },
      { text: `${product?.name}` },
    ]"
  />

  <!-- Product Details Section Begin -->
  <section class="product-details spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product__details__pic">
            <div class="product__details__pic__item">
              <img class="product__details__pic__item--large" :src="product?.thumbnail" alt="" />
            </div>
            <div class="product__details__pic__slider owl-carousel">
              <img :data-imgbigurl="product?.thumbnail + '?sig=1'" :src="product?.thumbnail + '?sig=1'" alt="" />
              <img :data-imgbigurl="product?.thumbnail + '?sig=2'" :src="product?.thumbnail + '?sig=2'" alt="" />
              <img :data-imgbigurl="product?.thumbnail + '?sig=3'" :src="product?.thumbnail + '?sig=3'" alt="" />
              <img :data-imgbigurl="product?.thumbnail + '?sig=4'" :src="product?.thumbnail + '?sig=4'" alt="" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product__details__text">
            <h3>{{ product?.name }}</h3>
            <div class="product__details__rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-o"></i>
              <span>({{ product?.review }} reviews)</span>
            </div>
            <div class="product__details__price">
              {{ product && product.price ? product.price.toFixed(2) : 0 }} {{ product && product.unit }}
            </div>
            <p>
              {{ product?.description }}
            </p>
            <div class="product__details__quantity">
              <div class="quantity">
                <div class="pro-qty">
                  <input type="text" value="1" />
                </div>
              </div>
            </div>
            <a href="#" class="primary-btn">ADD TO CARD</a>
            <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
            <ul>
              <li>
                <b>Availability</b> <span>{{ product?.amount > 0 ? 'In Stock' : 'Out of stock' }}</span>
              </li>
              <!-- <li>
                <b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span>
              </li> -->
              <li>
                <b>Weight</b> <span>{{ product?.weight }} kg</span>
              </li>
              <li>
                <b>Share on</b>
                <div class="share">
                  <a href="#"><i class="fa fa-facebook"></i></a>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                  <a href="#"><i class="fa fa-instagram"></i></a>
                  <a href="#"><i class="fa fa-pinterest"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="product__details__tab">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab" aria-selected="true"
                  >Description</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab" aria-selected="false">Information</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab" aria-selected="false"
                  >Reviews <span>(1)</span></a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tabs-1" role="tabpanel">
                <div class="product__details__tab__desc">
                  <h6>Products Infomation</h6>
                  <p>
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci
                    porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget
                    malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id
                    imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non
                    nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                  </p>
                  <p>
                    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
                    ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor
                    lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit
                    amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit
                    amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.
                  </p>
                </div>
              </div>
              <div class="tab-pane" id="tabs-2" role="tabpanel">
                <div class="product__details__tab__desc">
                  <h6>Products Infomation</h6>
                  <p>
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci
                    porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget
                    malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id
                    imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non
                    nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                  </p>
                  <p>
                    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
                    ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor
                    lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                  </p>
                </div>
              </div>
              <div class="tab-pane" id="tabs-3" role="tabpanel">
                <div class="product__details__tab__desc">
                  <h6>Products Infomation</h6>
                  <p>
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci
                    porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget
                    malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id
                    imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non
                    nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Product Details Section End -->

  <related-product :product-related="productRelated" />
</template>

<style scoped></style>
