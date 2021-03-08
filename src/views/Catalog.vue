<template>
  <div class="row">
    <div class="col col-sm-3 menu">
      <div class="list-group">
        <router-link
          :to="{ path: `/catalog` }"
          class="list-group-item list-group-item-action"
          exact-active-class="active"
        >
          all
        </router-link>
        <router-link
          v-for="category in categories"
          :key="category"
          :to="{ path: `/catalog/${category}` }"
          class="list-group-item list-group-item-action"
          exact-active-class="active"
        >
          {{ category }}
        </router-link>
      </div>
    </div>
    <div class="col col-sm-9">
      <h1>Products</h1>
      <app-loading v-if="loading"></app-loading>
      <div v-else class="row">
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

import AppLoading from '@/components/Loading.vue';
import AppProductCard from '@/components/ProductCard.vue';

export default {
  components: { AppProductCard, AppLoading },
  created() {
    this.loadProducts(this.$route.params.category?.toString());
  },
  beforeRouteUpdate(to, from, next) {
    this.loadProducts(to.params.category?.toString());
    next();
  },
  computed: {
    ...mapGetters('products', {
      categories: 'getCategories',
      products: 'all',
      loading: 'loading',
    }),
  },
  methods: {
    ...mapActions('products', ['loadProducts']),
  },
};
</script>

<style>
</style>
