<script setup>
import { ref } from 'vue';
import AUTH_API from './../apis/authApi';
import { useRouter } from 'vue-router';

const router = useRouter();

let form = ref({
  username: '',
  email: '',
  password: '',
});

let errorMess = ref('');
let isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const user = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    const res = await AUTH_API.register(user);

    if (res) {
      router.push('/login');
    }
  } catch (error) {
    errorMess.value = error;
    console.error('Error registering user:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleInput = () => (errorMess.value = '');
</script>

<template>
  <div style="width: 100%; min-height: 100vh; background-image: url('img/fruit.jpg')">
    <div class="login-page">
      <div class="form">
        <h3 class="heading">Register</h3>
        <form class="login-form" @submit.prevent="handleSubmit">
          <div class="alert alert-danger" role="alert" v-if="!!errorMess.detail">{{ errorMess.detail }}</div>
          <input type="text" v-model="form.username" placeholder="username" @input="handleInput" />
          <small style="color: red; text-align: left; display: block" v-if="!!errorMess.username">{{
            errorMess.username[0]
          }}</small>
          <input type="email" v-model="form.email" placeholder="email" @input="handleInput" />
          <small style="color: red; text-align: left; display: block" v-if="!!errorMess.email">{{
            errorMess.email[0]
          }}</small>
          <input type="password" v-model="form.password" placeholder="password" @input="handleInput" />
          <small style="color: red; text-align: left; display: block" v-if="!!errorMess.password">{{
            errorMess.password[0]
          }}</small>
          <div class="btn__register">
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Sign up' }}</button>
          </div>
          <p class="message">Already registered? <router-link to="login"> Login</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
