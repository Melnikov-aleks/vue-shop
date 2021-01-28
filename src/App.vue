<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col col-sm-3">
          <div>In Cart: {{}}</div>
        </div>
      </div>
      <hr />
    </div>
  </header>
  <div class="content"></div>
  <div class="container">
    <div class="row">
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
        <products></products>
      </div>
    </div>
  </div>
</template>

<script>
import Products from '@/components/Products.vue';
import { mapGetters } from 'vuex';

export default {
  components: { Products },
  computed: {
    ...mapGetters('products', { categories: 'getCategories' }),
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
