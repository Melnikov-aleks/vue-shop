<template>
  <p v-if="hasLogin" class="text-center mb-1" type="button" @click="onLogOut">
    LogOut
  </p>
  <div v-else class="row mb-1">
    <p
      class="col col-6 text-center d-inline-block m-0"
      type="button"
      @click="openModal('login')"
    >
      Login
    </p>
    <p
      class="col col-6 text-center d-inline-block m-0"
      type="button"
      @click="openModal('register')"
    >
      Register
    </p>
  </div>

  <auth-popup v-if="modal === 'open'" @close="closeModal">
    <template v-slot:title>{{
      modalType.charAt(0).toUpperCase() + modalType.slice(1)
    }}</template>
    <template v-slot:default>
      <app-login
        v-if="modalType === 'login'"
        @done="closeModal"
        @changeAuth="openModal"
      ></app-login>
      <app-register
        v-else-if="modalType === 'register'"
        @done="closeModal"
        @changeAuth="openModal"
      ></app-register>
    </template>
  </auth-popup>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthPopup from './Popup.vue';
import AppLogin from './LoginForm.vue';
import AppRegister from './RegisterForm.vue';

export default {
  components: { AuthPopup, AppLogin, AppRegister },
  data() {
    return {
      modal: 'close',
      modalType: null,
    };
  },
  computed: {
    ...mapGetters('user', ['hasLogin']),
  },
  methods: {
    onLogOut() {
      this.logOut({ email: this.login, password: this.password });
    },
    openModal(type) {
      document.body.classList.add('modal-open');
      this.modal = 'open';
      this.modalType = type;
    },
    closeModal() {
      document.body.classList.remove('modal-open');
      this.modal = 'close';
      this.modalType = null;
    },
    ...mapActions('user', ['logOut']),
  },
};
</script>

<style>
</style>