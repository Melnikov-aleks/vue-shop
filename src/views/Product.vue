<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    Back to products
    <hr />
    <div class="alert alert-success">
      {{ product.price }}
    </div>
    <div class="alert alert-success">{{ product }}</div>
    <template v-if="product.cnt">
      <div>В корзине</div>
      <div class="input-group">
        <div class="input-group-prepend">
          <button
            class="btn btn-outline-warning"
            @click="
              add({
                id: product.id,
                title: product.title,
                price: product.price,
                cnt: -1,
              })
            "
          >
            -
          </button>
        </div>
        <input
          class="form-control"
          :value="product.cnt"
          @change="
            setToCart(
              product.id,
              product.title,
              product.price,
              product.cnt,
              $event
            )
          "
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-success"
            @click="
              add({
                id: product.id,
                title: product.title,
                price: product.price,
                cnt: 1,
              })
            "
          >
            +
          </button>
        </div>
      </div>
      <button
        v-if="product.cnt"
        class="btn btn-danger"
        @click="remove(product.id)"
      >
        Убрать из корзины
      </button>
    </template>
    <button
      v-else
      class="btn btn-success"
      @click="
        add({
          id: product.id,
          title: product.title,
          price: product.price,
          cnt: 1,
        })
      "
    >
      Добавить в корзину
    </button>
  </div>
  <!-- <app-e404 v-else title="Product not found"></app-e404> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('products', ['item']),
    ...mapGetters('cart', { inCart: 'item', all: 'all' }),
    product() {
      return {
        ...this.item(this.$route.params.id),
        ...this.inCart(this.$route.params.id),
      };
    },
  },
  methods: {
    ...mapActions('cart', ['remove', 'set', 'add']),
    setToCart(id, title, price, oldCnt, e) {
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