<script setup>
import Hero from '../components/molecules/Hero.vue';
import Breadcrumb from '../components/molecules/Breadcrumb.vue';
import { globalState } from './../store';
import { computed, onMounted, ref } from 'vue';

import USER_API from './../apis/userApi';
import ORDER_API from './../apis/orderAPI';

let userCurrent = ref({});
let errorMess = ref('');
let isLoading = ref(false);

const getUserCurrent = async () => {
  try {
    const res = await USER_API.getUserCurrent();
    userCurrent.value = res;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const formData = {
  fullName: ref(''),
  address: ref(''),
  city: ref(''),
  country: ref(''),
  phone: ref(''),
  email: ref(''),
  createAccount: ref(false),
  accountPassword: ref(''),
  shipToDifferentAddress: ref(false),
  orderNotes: ref(''),
};

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    globalState.cart = JSON.parse(cartData);
  }
};

onMounted(() => {
  loadCartFromLocalStorage();
  getUserCurrent();
});

const totalPrice = computed(() => {
  return globalState.cart.reduce((total, item) => total + item.amount * item.price, 0);
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // const postData = {
    //   receiver_name: formData.fullName.value,
    //   receiver_phone: formData.phone.value,
    //   receiver_address: formData.address.value,
    //   user_id: userCurrent?.id,
    //   description: formData.orderNotes.value,
    //   total: totalPrice,
    //   is_ordered: true,
    //   is_paid: true,
    // };

    const response = await ORDER_API.createNewOrder({
      receiver_name: 'LuanThnh',
      receiver_phone: '0335960746',
      receiver_address: 'Da nang',
      user_id: 2,
      description: 'ormData.orderNotes.value',
    });

    console.log('Order created successfully:', response.data);

    Object.keys(formData).forEach((key) => {
      formData[key].value = '';
    });
  } catch (error) {
    console.error('Error creating order:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <hero :is-normal="true" />
  <breadcrumb name="Checkout" :breadcrumbs="[{ text: 'Home', to: '/' }, { text: `Checkout` }]" />

  <!-- Checkout Section Begin -->
  <section class="checkout spad">
    <div class="container">
      <div class="checkout__form">
        <h4>Billing Details</h4>
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-lg-8 col-md-6">
              <div class="checkout__input">
                <p>Full Name<span>*</span></p>
                <input type="text" v-model="formData.fullName" />
              </div>
              <div class="checkout__input">
                <p>Address<span>*</span></p>
                <input
                  type="text"
                  placeholder="Street Address"
                  class="checkout__input__add"
                  v-model="formData.address"
                />
              </div>
              <div class="checkout__input">
                <p>Phone<span>*</span></p>
                <input type="text" v-model="formData.phone" />
              </div>
              <div class="checkout__input">
                <p>Description<span>*</span></p>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="formData.orderNotes"
                ></textarea>
              </div>
              <!-- <div class="checkout__input__checkbox">
                <label for="acc">
                  Create an account?
                  <input type="checkbox" id="acc" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p>
                Create an account by entering the information below. If you are a returning customer please login at the
                top of the page
              </p>
              <div class="checkout__input">
                <p>Account Password<span>*</span></p>
                <input type="text" />
              </div>
              <div class="checkout__input__checkbox">
                <label for="diff-acc">
                  Ship to a different address?
                  <input type="checkbox" id="diff-acc" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="checkout__input">
                <p>Order notes<span>*</span></p>
                <input type="text" placeholder="Notes about your order, e.g. special notes for delivery." />
              </div> -->
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="checkout__order">
                <h4>Your Order</h4>
                <div class="checkout__order__products">Products <span>Total</span></div>
                <ul v-for="(product, index) in globalState.cart" :key="index">
                  <li>
                    {{ product?.name }}
                    <span>{{ (product?.price * product?.amount).toFixed(2) }} {{ product?.unit }}</span>
                  </li>
                </ul>
                <div class="checkout__order__total">
                  Total <span>{{ totalPrice.toFixed(2) }} {{ globalState.cart[0]?.unit }}</span>
                </div>
                <!-- <div class="checkout__input__checkbox">
                  <label for="acc-or">
                    Create an account?
                    <input type="checkbox" id="acc-or" />
                    <span class="checkmark"></span>
                  </label>
                </div> -->
                <div class="checkout__input__checkbox">
                  <label for="payment">
                    Check Payment
                    <input type="checkbox" id="payment" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="checkout__input__checkbox">
                  <label for="paypal">
                    Paypal
                    <input type="checkbox" id="paypal" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <button type="submit" class="site-btn" :disabled="isLoading">
                  {{ isLoading ? 'Loading...' : 'PLACE ORDER' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- Checkout Section End -->
</template>

<style scoped></style>
