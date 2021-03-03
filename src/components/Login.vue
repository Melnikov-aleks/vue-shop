<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Адрес электронной почты</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >Мы никогда никому не передадим Вашу электронную почту.</small
      >
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>
  <p class="text-muted mt-3">
    Еще нет аккаунта?
    <span class="font-italic text-primary" role="button" @click="toRegister"
      >Регистрация</span
    >
  </p>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  emits: ['done', 'changeAuth'],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.login({ email: this.email, password: this.password });
      this.$emit('done');
    },
    toRegister() {
      this.$emit('changeAuth', 'register');
    },
    ...mapActions('user', ['login']),
  },
};
</script>

<style>
</style>