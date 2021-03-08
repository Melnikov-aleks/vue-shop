<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <form @submit.prevent="$router.push({ name: 'checkoutStepPayment' })">
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
        <button class="btn btn-outline-success" type="submit">Next</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>