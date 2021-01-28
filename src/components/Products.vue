<template>
  <h1>Products</h1>
  <div class="row">
    <div
      class="col col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mt-3"
      v-for="(product, i) in products"
      :key="i"
    >
      <div class="card text-center">
        <div class="card-body">
          <img class="card-img-top" :src="product.image" />
          <h3 class="card-title">{{ product.title }}</h3>
          <!-- <router-link :to="`/product/${product.id}`">Read more</router-link> -->
          <hr />
          <div class="input-group">
            <input type="number" class="form-control" />
            <!-- @change="onInput" -->
            <!-- :value="cnt" -->
            <div class="input-group-append">
              <button
                class="btn btn-success"
                @click="addToCart({ id: product.id, cnt: 4 })"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer text-muted">{{ product.price }}&#36;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('products', { products: 'getAll' }),
  },
  methods: {
    ...mapActions('cart', { addToCart: 'add' }),
  },
};
</script>

<style lang="scss" scoped>
</style>
