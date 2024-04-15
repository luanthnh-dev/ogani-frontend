<script setup>
import Hero from '../components/molecules/Hero.vue';
import Breadcrumb from '../components/molecules/Breadcrumb.vue';
import { globalState } from './../store';
import { computed, onMounted } from 'vue';

const increaseAmount = (product) => {
  product.amount++;
  updateCart();
};

const decreaseAmount = (product) => {
  if (product.amount > 1) {
    product.amount--;
  }
  updateCart();
};

const updateCart = () => {
  saveCartToLocalStorage();
};

const removeFromCart = (product) => {
  const index = globalState.cart.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    globalState.cart.splice(index, 1);

    saveCartToLocalStorage();
  }
};

const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(globalState.cart));
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

const totalPrice = computed(() => {
  return globalState.cart.reduce((total, item) => total + item.amount * item.price, 0);
});
</script>

<template>
  <hero :is-normal="true" />
  <breadcrumb name="Shopping Cart" :breadcrumbs="[{ text: 'Home', to: '/' }, { text: `Shopping Cart` }]" />

  <!-- Shoping Cart Section Begin -->
  <section class="shoping-cart spad">
    <div style="padding: 0 120px">
      <div class="row">
        <div class="col-lg-8">
          <div class="shoping__cart__table">
            <table>
              <thead>
                <tr>
                  <th class="shoping__product">Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="(product, index) in globalState.cart" :key="index">
                <tr>
                  <td class="shoping__cart__item">
                    <img :src="product?.thumbnail" alt="" width="66px" />
                    <h5>{{ product?.name }}</h5>
                  </td>
                  <td class="shoping__cart__price">{{ product?.price.toFixed(2) }} {{ product?.unit }}</td>
                  <td class="shoping__cart__quantity">
                    <div class="quantity">
                      <div class="pro-qty">
                        <a class="dec qtybtn" href="#!" @click="decreaseAmount(product)">-</a>
                        <input type="text" :value="product?.amount" readonly />
                        <a class="inc qtybtn" href="#!" @click="increaseAmount(product)">+</a>
                      </div>
                    </div>
                  </td>
                  <td class="shoping__cart__total">
                    {{ (product?.price * product?.amount).toFixed(2) }} {{ product?.unit }}
                  </td>
                  <td class="shoping__cart__item__close" @click="removeFromCart(product)">
                    <span class="icon_close"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="shoping__checkout">
            <h5>Cart Total</h5>
            <ul>
              <li>
                Total <span>{{ totalPrice.toFixed(2) }} VND</span>
              </li>
            </ul>
            <router-link to="checkout" class="primary-btn">PROCEED TO CHECKOUT</router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="shoping__cart__btns">
            <a href="#" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
            <!--                            <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>
                                                            Upadate Cart</a>-->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Shoping Cart Section End -->
</template>

<style scoped></style>
