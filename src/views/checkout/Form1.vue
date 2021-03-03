<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <form action="">
        <div class="form-row">
          <div class="form-group col-md-6">
            <input
              type="text"
              class="form-control"
              id="inputFirstName"
              placeholder="First Name"
            />
          </div>
          <div class="form-group col-md-6">
            <input
              type="text"
              class="form-control"
              id="inputLastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Address"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <input
              type="text"
              class="form-control"
              id="inputCity"
              placeholder="City"
            />
          </div>
          <div class="form-group col-md-6">
            <input
              type="text"
              class="form-control"
              id="inputZip"
              placeholder="Zip"
            />
          </div>
        </div>
        <button
          class="btn btn-outline-success"
          @click.prevent="$router.push({ name: 'checkoutStepPayment' })"
        >
          <!-- @click="add({ id: product.id, cnt: 1 })" -->
          +
        </button>
      </form>
      <router-link :to="{ name: 'checkoutStepPayment' }">Next</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$router.push({ name: 'checkoutStepPayment' });
    },
  },
};
</script>

<style>
</style>