<script setup>
defineProps({
  name: String,
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    class="breadcrumb-section set-bg"
    data-setbg="/img/breadcrumb.jpg"
    style="background-image: url('/img/breadcrumb.jpg')"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="breadcrumb__text">
            <h2>{{ name }}</h2>
            <div class="breadcrumb__option">
              <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <router-link v-if="breadcrumb.to" :to="breadcrumb.to">{{ breadcrumb.text }}</router-link>
                <span v-else>{{ breadcrumb.text }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
