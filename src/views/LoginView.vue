<script setup>
import { ref } from 'vue';
import AUTH_API from './../apis/authApi';
import { useRouter } from 'vue-router';

const router = useRouter();

let form = ref({
  username: '',
  password: '',
});

let errorMess = ref('');
let isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const user = {
      username: form.value.username,
      password: form.value.password,
    };

    const res = await AUTH_API.login(user);

    localStorage.setItem('token', res.access);

    router.push('/');
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
        <h3 class="heading">Login</h3>
        <form class="login-form" @submit.prevent="handleSubmit">
          <div class="alert alert-danger" role="alert" v-if="!!errorMess.detail">{{ errorMess.detail }}</div>

          <input type="text" v-model="form.username" value="admin" placeholder="username" @input="handleInput" />
          <small style="color: red; text-align: left; display: block" v-if="!!errorMess.username">{{
            errorMess.username[0]
          }}</small>
          <input type="password" v-model="form.password" value="123@abc" placeholder="password" @input="handleInput" />
          <small style="color: red; text-align: left; display: block" v-if="!!errorMess.username">{{
            errorMess.password[0]
          }}</small>
          <div class="btn__login">
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Sign in' }}</button>
          </div>
          <p class="message">Not registered? <router-link to="register">Create an account</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
