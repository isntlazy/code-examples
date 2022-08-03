<template>
  <q-form greedy class="q-mt-5 q-mt-sm-7" @submit="login">
    <q-input
      v-model="email"
      standout="bg-grey text-primary"
      label="Email"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mb-3"
      lazy-rules
      :rules="requiredEmailValidation"
    />
    <q-input
      v-model="password"
      standout="bg-grey text-primary"
      label="Пароль"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mb-2"
      type="password"
      :rules="requiredPasswordValidation"
      maxlength="50"
    >
    </q-input>
    <ErrorMessage :error="error" />
    <q-btn
      type="submit"
      unelevated
      color="primary"
      label="Увійти"
      class="q-mt-2 main-button"
    />
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import {
  requiredEmailValidation,
  requiredPasswordValidation,
} from 'src/helpers/formValidationRules';
import ErrorMessage from './ErrorMessage';
import { generateErrorMessage } from '../helpers/validation';

export default defineComponent({
  name: 'AuthSignIn',
  components: { ErrorMessage },

  setup() {
    const $store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const error = ref('');

    const login = async () => {
      error.value = '';
      try {
        await $store.dispatch('auth/signIn', {
          email: email.value,
          password: password.value,
        });
        await router.push('/trips');
        error.value = '';
      } catch (e) {
        error.value = generateErrorMessage(e);
      }
    };

    return {
      requiredEmailValidation,
      requiredPasswordValidation,
      email,
      password,
      login,
      error,
    };
  },
});
</script>

<style scoped></style>
