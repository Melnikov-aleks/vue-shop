<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col col-sm-6 text-center">
          <router-link :to="{ name: 'catalog' }">Shop</router-link>
        </div>
        <div class="col col-sm-6 text-center">
          <app-auth-info></app-auth-info>
          <router-link :to="{ name: 'cart' }"
            >In Cart: {{ length }}</router-link
          >
        </div>
      </div>
      <hr />
    </div>
  </header>
  <div class="container">
    <!-- <div class="row">
      <div class="col col-sm-3 menu">
        <ul class="list-group">
          <li
            v-for="category in categories"
            :key="category"
            class="list-group-item"
          >
            <a href="#">{{ category }}</a>
          </li>
        </ul>
      </div>
      <div class="col col-sm-9">
      </div>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppAuthInfo from '@/components/AuthInfo.vue';

export default {
  components: { AppAuthInfo },
  created() {
    this.loadProducts();
    this.loadCategories();
  },
  computed: {
    ...mapGetters('cart', ['length']),
  },
  methods: {
    ...mapActions('products', ['loadProducts', 'loadCategories']),
  },
};
</script>

<style lang="scss">
.menu {
  border-right: 1px solid #ddd;
}

.list-group-item {
  transition: background 0.3s, color 0.3s;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item.active a {
  color: inherit;
}
</style>
