<template>
  <div class="modal" @click="closeModal">
    <div class="modal-dialog">
      <div class="modal-content" @click.stop="">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
    // ...mapActions('auth', ['closeModal']),
  },
  computed: {
    // ...mapGetters('auth', ['modalType']),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
}
</style>