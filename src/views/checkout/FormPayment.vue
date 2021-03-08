<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <h3 class="text-center">Any Payment actions</h3>
      <button class="btn btn-outline-success" type="button" @click="doBuying">
        Buy
      </button>
    </div>
  </div>
  <app-popup
    v-if="modal === 'open'"
    :loading="status === 'loading'"
    @close="closeModal"
  >
    <template v-slot:title> Checking purchase </template>
    <template v-slot:default>
      <div class="d-flex flex-wrap justify-content-center">
        <template v-if="status === 'loading'">
          <app-loading></app-loading>
        </template>
        <template v-else-if="status === 'error'">
          <fa-icon
            class="text-danger"
            icon="exclamation-triangle"
            size="3x"
          ></fa-icon>
          <strong class="w-100 text-center text-danger mt-3"
            >Loading failed</strong
          >
        </template>
        <template v-else-if="status === 'done'">
          <fa-icon class="text-success" icon="check-circle" size="3x"></fa-icon>
          <strong class="w-100 text-center text-success mt-3">OK</strong>
        </template>
      </div>
    </template>
    <template v-slot:footer>
      <template v-if="status !== 'loading'">
        <div class="modal-footer">
          <router-link
            :to="{ name: 'catalog' }"
            v-if="status === 'done'"
            type="button"
            class="btn btn-success"
          >
            Done
          </router-link>
          <router-link
            :to="{ name: 'cart' }"
            v-else-if="status === 'error'"
            type="button"
            class="btn btn-danger"
          >
            To cart
          </router-link>
        </div>
      </template>
    </template>
  </app-popup>
</template>

<script>
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import { mapActions } from 'vuex';
import AppPopup from '@/components/Popup.vue';
import AppLoading from '@/components/Loading.vue';

export default {
  components: { AppPopup, FaIcon, AppLoading },
  data() {
    return {
      modal: 'close',
      status: '',
    };
  },
  methods: {
    ...mapActions('cart', ['toOrder']),
    async doBuying() {
      try {
        this.modal = 'open';
        this.status = 'loading';
        await this.toOrder();
        this.status = 'done';
        setTimeout(() => {
          this.$router.push({ name: 'catalog' });
        }, 1000);
      } catch (error) {
        this.status = 'error';
      }
    },
    closeModal() {
      this.modal = 'close';
    },
  },
};
</script>

<style>
</style>