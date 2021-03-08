<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col col-2 text-center"></div>
        <div class="col col-8 text-center">
          <router-link class="lead" :to="{ name: 'catalog' }"
            >Vue-Shop</router-link
          >
        </div>
        <div class="col col-2 text-center">
          <app-auth-info></app-auth-info>
          <router-link class="text-decoration-none" :to="{ name: 'cart' }">
            <fa-icon icon="shopping-cart"></fa-icon>
            {{ length }}</router-link
          >
        </div>
      </div>
      <hr />
    </div>
  </header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters, mapActions } from 'vuex';
import AppAuthInfo from '@/components/AuthInfo.vue';

export default {
  components: { AppAuthInfo, FaIcon },
  created() {
    this.loadCategories();
    this.checkUser();
  },
  computed: {
    ...mapGetters('cart', ['length']),
  },
  methods: {
    ...mapActions('products', ['loadProducts', 'loadCategories']),
    ...mapActions('user', ['checkUser']),
  },
};
</script>

<style lang="scss">
</style>
