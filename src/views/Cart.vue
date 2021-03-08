<template>
  <div>
    <h1>Cart</h1>
    <hr />
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <router-link
              :to="{ name: 'product', params: { id: product.id } }"
              >{{ product.title }}</router-link
            >
          </td>
          <td>&dollar;{{ product.price.toFixed(2) }}</td>
          <td>
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
                <button class="btn btn-danger" @click="remove(product.id)">
                  &times;
                </button>
              </div>
            </div>
          </td>
          <td class="table-active">
            &dollar;{{ +(product.price * product.cnt).toFixed(2) }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2"></td>
          <td>
            {{ totalCnt }}
          </td>
          <td class="table-active">&dollar;{{ totalPrice.toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>
    <router-link
      :to="{ name: 'checkout' }"
      class="btn btn-success"
      :class="{ disabled: !cartLength || !hasLogin }"
      >Order now</router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    addToCart({ id, title, price }, cnt) {
      this.add({ id, title, price, cnt });
    },
    setToCart({ id, title, price, cnt: oldCnt }, e) {
      this.set({ id, title, price, cnt: e.target.value });
      if (
        oldCnt === this.item(id).cnt &&
        oldCnt.toString() !== e.target.value
      ) {
        this.$forceUpdate();
      }
    },
    ...mapActions('cart', ['remove', 'set', 'add']),
  },
  computed: {
    ...mapGetters('user', ['hasLogin']),
    ...mapGetters('cart', {
      products: 'all',
      item: 'item',
      cartLength: 'length',
    }),
    totalCnt() {
      return this.products.reduce((acc, pr) => {
        const newAcc = acc + pr.cnt;
        return newAcc;
      }, 0);
    },
    totalPrice() {
      return this.products.reduce((acc, pr) => {
        const newAcc = acc + pr.cnt * pr.price;
        return newAcc;
      }, 0);
    },
  },
};
</script>
