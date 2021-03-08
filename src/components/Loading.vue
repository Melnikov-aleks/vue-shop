<template>
  <div class="loading w-100 text-center">
    <fa-icon class="m-auto d-block" icon="spinner" pulse size="6x"></fa-icon>
    <strong class="mt-3 d-inline-block">Loading...</strong>
  </div>
</template>

<script>
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: { FaIcon },
};
</script>

<style>
</style>