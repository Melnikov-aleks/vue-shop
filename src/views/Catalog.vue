<template>
  <div class="row">
    <div class="col col-sm-3 menu">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link :to="{ name: 'catalog' }">all</router-link>
        </li>
        <li
          v-for="category in categories"
          :key="category"
          class="list-group-item"
        >
          <router-link :to="{ path: `/catalog/${category}` }">{{
            category
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="col col-sm-9">
      <h1>Products</h1>
      <div class="row">
        <app-product-card
          v-for="product in products"
          :key="product"
          :product="product"
        ></app-product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import AppProductCard from '@/components/ProductCard.vue';

export default {
  components: { AppProductCard },
  created() {
    this.loadProducts(this.$route.params.category?.toString());
  },
  beforeRouteUpdate(to, from, next) {
    this.loadProducts(to.params.category?.toString());
    next();
  },
  computed: {
    ...mapGetters('products', { categories: 'getCategories', products: 'all' }),
  },
  methods: {
    ...mapActions('products', ['loadProducts']),
  },
};
</script>

<style>
</style>
