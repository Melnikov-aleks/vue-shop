<template>
  <teleport to="body">
    <transition name="fade" appear>
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
                :disabled="loading"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </transition>
    <div class="modal-backdrop show"></div>
  </teleport>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      if (!this.loading) this.$emit('close');
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>