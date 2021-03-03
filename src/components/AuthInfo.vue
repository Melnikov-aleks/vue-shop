<template>
  <p v-if="hasLogin" class="" @click="onLogOut">LogOut</p>
  <div v-else class="row">
    <div class="col col-sm-6" @click="openModal('login')">Login</div>
    <div class="col col-sm-6" @click="openModal('register')">Register</div>
  </div>
  <teleport to="body">
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
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthPopup from '@/components/AuthPopup.vue';
import AppLogin from '@/components/Login.vue';
import AppRegister from '@/components/Register.vue';

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
    // ...mapActions('auth', ['openModal']),
  },
};
</script>

<style>
</style>