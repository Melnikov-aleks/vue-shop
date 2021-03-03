<template>
  <div class="col col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mt-3">
    <div class="card text-center">
      <div class="card-body">
        <img class="card-img-top h-50 d-inline-block" :src="product.image" />
        <h4 class="card-title">{{ product.title }}</h4>
        <router-link :to="{ name: 'product', params: { id: product.id } }"
          >Read more</router-link
        >
        <hr />
        <div class="input-group">
          <input type="number" class="form-control" v-model="cnt" />
          <!-- @change="onInput" -->
          <!-- :value="cnt" -->
          <div class="input-group-append">
            <button
              class="btn btn-success"
              @click="addToCart(product.id, product.title, product.price)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">{{ product.price }}&#36;</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      cnt: '',
    };
  },
  methods: {
    addToCart(id, title, price) {
      this.add({ id, title, price, cnt: Math.max(1, this.cnt) });
      this.cnt = '';
    },
    ...mapActions('cart', ['add']),
  },
};
</script>

<style>
</style>