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
    <div class="form-group">
      <label for="passwordRepeat">Повторите пароль</label>
      <input type="password" class="form-control" id="passwordRepeat" />
    </div>
    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="check"
        v-model="check"
      />
      <label class="form-check-label" for="check">Согласен с условиями</label>
    </div>
    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
  </form>
  <p class="text-muted mt-3">
    Уже есть аккаунт?
    <span class="font-italic text-primary" role="button" @click="toLogin"
      >Войти</span
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
      check: false,
    };
  },
  methods: {
    onSubmit() {
      this.register({ email: this.email, password: this.password });
      this.$emit('done');
    },
    toLogin() {
      this.$emit('changeAuth', 'login');
    },
    ...mapActions('user', ['register']),
  },
};
</script>

<style>
</style>