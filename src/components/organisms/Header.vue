<script setup>
import { computed, onMounted, ref } from 'vue';
import { globalState } from './../../store';
import { useRouter } from 'vue-router';

const router = useRouter();

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    globalState.cart = JSON.parse(cartData);
  }
};

onMounted(() => {
  loadCartFromLocalStorage();
});

const isLoggedIn = ref(false);

if (localStorage.getItem('token')) {
  isLoggedIn.value = true;
}

const totalAmount = computed(() => {
  return globalState.cart.reduce((total, item) => total + item.amount, 0);
});

const totalPrice = computed(() => {
  return globalState.cart.reduce((total, item) => total + item.amount * item.price, 0);
});

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.setItem('cart', JSON.stringify([]));
  router.push('login');
};
</script>

<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="header__top__left">
              <ul>
                <li><i class="fa fa-envelope"></i> luanthnh.dev@gmail.com</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="header__top__right d-flex justify-content-end">
              <div class="header__top__right__social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-pinterest-p"></i></a>
              </div>
              <div class="header__top__right__language">
                <img src="/img/language.png" alt="" />
                <div>English</div>
                <span class="arrow_carrot-down"></span>
                <ul>
                  <li><a href="#">Spanis</a></li>
                  <li><a href="#">English</a></li>
                </ul>
              </div>
              <div class="header__top__right__auth d-flex">
                <template v-if="isLoggedIn">
                  <a href="orders" class="mr-3"><i class="fa fa-history" aria-hidden="true"></i> Orders</a>
                  <a href="#!" @click="handleLogout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                </template>
                <template v-else>
                  <router-link to="login"><i class="fa fa-user"></i> Login</router-link>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container header-bottom">
      <div class="row">
        <div class="col-lg-3">
          <div class="header__logo">
            <a href="/"><img src="/img/logo.png" alt="" /></a>
          </div>
        </div>
        <div class="col-lg-6">
          <nav class="header__menu">
            <ul>
              <!-- <li class="active"><router-link to="/">Home</router-link></li>
              <li><router-link to="/shop">Shop</router-link></li>
              <li>
                <a href="#">Pages</a>
                <ul class="header__menu__dropdown">
                  <li><a href="./shop-details.html">Shop Details</a></li>
                  <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                  <li><a href="./checkout.html">Check Out</a></li>
                  <li><a href="./blog-details.html">Blog Details</a></li>
                </ul>
              </li>
              <li><a href="./blog.html">Blog</a></li>
              <li><a href="./contact.html">Contact</a></li> -->
            </ul>
          </nav>
        </div>
        <div class="col-lg-3">
          <div class="header__cart">
            <ul>
              <li>
                <a href="#"><i class="fa fa-heart"></i> <span>1</span></a>
              </li>
              <li>
                <router-link to="cart"
                  ><i class="fa fa-shopping-bag"></i> <span>{{ totalAmount }}</span></router-link
                >
              </li>
            </ul>
            <div class="header__cart__price">
              item: <span>{{ totalPrice.toFixed(2) }} VND</span>
            </div>
          </div>
        </div>
      </div>
      <div class="humberger__open">
        <i class="fa fa-bars"></i>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
