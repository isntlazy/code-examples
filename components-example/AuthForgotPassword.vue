<template>
  <div class="flex items-end justify-end justify-sm-start relative-position q-mt-11 q-mt-sm-9 q-mt-xl-12">
    <q-img src="~/assets/icons/forgot_password_pic.svg" class="q-ml-5 forgot-img" />
    <q-btn unelevated color="grey" text-color="primary" label="забули пароль?" class="q-px-9 main-button main-button--sm forgot-btn" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent ( {
  name: 'AuthForgotPassword',

})
</script>

<style lang="scss" scoped>
.forgot-img {
  position: absolute;
  bottom: 0;
  right: 50%;
  width: 8.375rem;

  @media (min-width: $breakpoint-xs-min) {
    right: 35%;
  }

  @media (min-width: $breakpoint-sm-min) {
    position: relative;
    right: 0;
  }
}

.forgot-btn {
  margin-left: -$size-7;
}

</style>
