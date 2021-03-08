<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        :class="{ 'is-invalid': v$.email.$error }"
        id="email"
        v-model="email"
        @input="resetServerErrMsg(v$.email.serverValid.$invalid)"
        :disabled="isLoading"
      />
      <div
        v-for="error in v$.email.$errors"
        :key="error"
        class="invalid-feedback"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        :class="{ 'is-invalid': v$.password.$error }"
        id="password"
        v-model="password"
        @input="resetServerErrMsg(v$.password.serverValid.$invalid)"
        :disabled="isLoading"
      />
      <div
        v-for="error in v$.password.$errors"
        :key="error"
        class="invalid-feedback"
      >
        {{ error.$message }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isLoading">
      Enter
    </button>
    <div v-if="unexpectedError" class="invalid-feedback d-block">
      {{ unexpectedError }}. Try later
    </div>
  </form>
  <p class="text-muted mt-3">
    Not registered?
    <span class="font-italic text-primary" role="button" @click="toRegister"
      >Create an account.</span
    >
  </p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

export default {
  emits: ['done', 'changeAuth'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: '',
      password: '',
      serverErrorMsg: '',
      unexpectedError: '',
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
        serverValid: helpers.withMessage(
          'email invalid',
          this.validateByServerErrorMsg('email')
        ),
        $lazy: true,
      },
      password: {
        required,
        minLength: minLength(6),
        serverValid: helpers.withMessage(
          'password invalid',
          this.validateByServerErrorMsg('password')
        ),
        $lazy: true,
      },
    };
  },
  methods: {
    validateByServerErrorMsg(textToMatch) {
      return () => !this.serverErrorMsg?.toLowerCase().includes(textToMatch);
    },
    resetServerErrMsg(invalidFromServerFlag) {
      if (invalidFromServerFlag) {
        this.serverErrorMsg = '';
        this.v$.$reset();
        this.v$.$touch();
      }
    },
    async onSubmit() {
      this.unexpectedError = '';
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        try {
          await this.login({ email: this.email, password: this.password });
          this.$emit('done');
        } catch (error) {
          if (error.response) {
            this.serverErrorMsg = error.response.data.error.message;
            this.v$.$reset();
            this.v$.$touch();
          } else {
            this.unexpectedError = error.message;
          }
        }
      }
    },
    toRegister() {
      this.$emit('changeAuth', 'register');
    },
    ...mapActions('user', ['login']),
  },
  computed: {
    ...mapGetters('user', ['isLoading']),
  },
};
</script>

<style>
</style>