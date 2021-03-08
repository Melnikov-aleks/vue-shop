<template>
  <button
    type="button"
    class="btn btn-link"
    aria-label="Back"
    @click="$router.back()"
  >
    <span aria-hidden="true">&lsaquo;</span>
    Back
  </button>
  <app-loading v-if="loading"></app-loading>
  <div v-else-if="product">
    <h1 class="display-4">{{ product.title }}</h1>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col col-sm-4">
          <img :src="product.image" class="img-fluid img-thumbnail" alt="..." />
        </div>
        <div class="col col-sm-8">
          <p class="lead">
            {{ product.description }}
          </p>
          <p>Price: &dollar;{{ product.price }}</p>
          <template v-if="product.cnt">
            <p class="m-0">In cart:</p>
            <div class="row">
              <div class="col col-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-warning"
                      @click="addToCart(product, -1)"
                    >
                      &minus;
                    </button>
                  </div>
                  <input
                    class="form-control"
                    :value="product.cnt"
                    @change="setToCart(product, $event)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-success"
                      @click="addToCart(product, 1)"
                    >
                      &plus;
                    </button>
                  </div>
                </div>
              </div>
              <div class="col col-4">
                <button class="btn btn-danger" @click="remove(product.id)">
                  Delete from cart
                </button>
              </div>
            </div>
            <p>Total: &dollar;{{ (product.price * product.cnt).toFixed(2) }}</p>
          </template>
          <button v-else class="btn btn-success" @click="addToCart(product, 1)">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <app-e404 v-else>Product not found!</app-e404>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppE404 from '@/components/E404.vue';
import AppLoading from '@/components/Loading.vue';

export default {
  components: { AppE404, AppLoading },
  created() {
    this.loadProduct(this.$route.params.id);
  },
  computed: {
    ...mapGetters('products', ['toShow', 'loading']),
    ...mapGetters('cart', { inCart: 'item' }),
    product() {
      if (this.toShow)
        return {
          ...this.toShow,
          ...this.inCart(this.$route.params.id),
        };
      return undefined;
    },
  },
  methods: {
    ...mapActions('cart', ['remove', 'set', 'add']),
    ...mapActions('products', ['loadProduct']),
    addToCart({ id, title, price }, cnt) {
      this.add({ id, title, price, cnt });
    },
    setToCart({ id, title, price, cnt: oldCnt }, e) {
      this.set({ id, title, price, cnt: e.target.value });
      if (
        oldCnt === this.inCart(id).cnt &&
        oldCnt.toString() !== e.target.value
      ) {
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style>
</style>