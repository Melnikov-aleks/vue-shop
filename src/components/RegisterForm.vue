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
    <div class="form-group">
      <label for="passwordRepeat">Repeat password</label>
      <input
        type="password"
        class="form-control"
        :class="{ 'is-invalid': v$.repeatPassword.$error }"
        id="passwordRepeat"
        v-model="repeatPassword"
        :disabled="isLoading"
      />
      <div
        v-for="error in v$.repeatPassword.$errors"
        :key="error"
        class="invalid-feedback"
      >
        {{ error.$message }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isLoading">
      Sign Up
    </button>
    <div v-if="unexpectedError" class="invalid-feedback d-block">
      {{ unexpectedError }}. Try later
    </div>
  </form>
  <p class="text-muted mt-3">
    Already have an account?
    <span class="font-italic text-primary" role="button" @click="toLogin"
      >Login here.</span
    >
  </p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from '@vuelidate/validators';

export default {
  emits: ['done', 'changeAuth'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
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
      repeatPassword: {
        required,
        minLength: sameAs(this.password),
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
          await this.register({ email: this.email, password: this.password });
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
    toLogin() {
      this.$emit('changeAuth', 'login');
    },
    ...mapActions('user', ['register']),
  },
  computed: {
    ...mapGetters('user', ['isLoading']),
  },
};
</script>

<style>
</style>