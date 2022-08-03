<template>
  <div class="backend-error q-mb-1 q-ml-1">
    <div v-show="error">
      <q-icon class="q-mr-2" name="fas fa-exclamation-circle" /> <span>{{ error }} </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorMessage',
  props: {
    error: { type: String, required: true }
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.backend-error {
  font-size: $font-size-xs;
  color: $negative;
  height: $size-3;
}
</style>

