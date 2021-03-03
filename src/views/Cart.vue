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
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
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
                    product.cnt,
                    product.title,
                    product.price,
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
                <button class="btn btn-danger" @click="remove(product.id)">
                  X
                </button>
              </div>
            </div>
          </td>
          <td>{{ product.price * product.cnt }}</td>
          <!-- @click="setCnt({ id: product.id, cnt: product.cnt - 1 })" -->
          <!-- @click="setCnt({ id: product.id, cnt: product.cnt + 1 })" -->
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'checkout' }" class="btn btn-success"
      >Order now</router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    setToCart(id, oldCnt, title, price, e) {
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
    ...mapGetters('cart', {
      products: 'all',
      item: 'item',
    }),
  },
};
</script>
