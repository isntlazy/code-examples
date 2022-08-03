<template>
  <q-form v-if="!confirmCodeMode" greedy class="q-mt-5 q-mt-sm-7" @submit="register">
    <q-input
      v-model="fullName"
      standout="bg-grey text-primary"
      label="Як до вас звертатись?"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mb-3"
      lazy-rules
      :rules="requiredFullNameValidation"
      maxlength="50"
    />
    <q-input
      v-model="email"
      standout="bg-grey text-primary"
      label="Email"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mb-3"
      lazy-rules
      :rules="requiredEmailValidation"
      maxlength="50"
    />
    <q-input
      v-model="password"
      standout="bg-grey text-primary"
      label="Пароль"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mb-3"
      type="password"
      :rules="requiredPasswordValidation"
      maxlength="50"
    />
    <ErrorMessage :error="signUpError" />
    <q-btn
      unelevated
      color="primary"
      label="Зареєструватись"
      class="q-mt-2 main-button"
      type="submit"
    />
  </q-form>
  <q-form v-else greedy @submit="confirmCode">
    <q-input
      v-model="code"
      standout="bg-grey text-primary"
      label="Будь ласка введіть код із вашого Email"
      input-class="q-pt-6 q-pb-2 text-primary main-input"
      class="q-mt-5"
      lazy-rules
      :rules="requiredConfirmCodeValidation"
      maxlength="5"
    />
    <ErrorMessage :error="codeError" />
    <q-btn
      unelevated
      color="primary"
      label="Підтвердити"
      class="q-mt-5 main-button"
      type="submit"
    />
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
// import { useRouter } from 'vue-router';
import {
  requiredEmailValidation,
  requiredFullNameValidation,
  requiredPasswordValidation,
  requiredConfirmCodeValidation
} from 'src/helpers/formValidationRules';
import ErrorMessage from './ErrorMessage';
import { generateErrorMessage } from '../helpers/validation';

export default defineComponent({
  name: 'AuthSignUp',
  components: { ErrorMessage },
  emits: ['showLogin'],

  setup(props, context) {
    const $store = useStore();
    // const router = useRouter();
    const fullName = ref('');
    const email = ref('');
    const password = ref('');
    const signUpError = ref('');
    const code = ref('');
    const confirmCodeMode = ref(false);
    const codeError = ref('');

    const register = async () => {
      try {
        await $store.dispatch('auth/signUp', {
          fullName: fullName.value,
          email: email.value,
          password: password.value,
        });
        signUpError.value = ''
        confirmCodeMode.value = true;
      } catch (e) {
        signUpError.value = generateErrorMessage(e);
      }
    };

    const confirmCode = async () => {
      try {
        await $store.dispatch('auth/confirmCode', {
          confirmationCode: code.value,
          email: email.value
        });
        codeError.value = ''
        confirmCodeMode.value = false;
        // await router.push('/trips');
        context.emit('showLogin');
      } catch (e) {
        codeError.value = generateErrorMessage(e);
      }
    };

    return {
      requiredConfirmCodeValidation,
      requiredPasswordValidation,
      requiredFullNameValidation,
      requiredEmailValidation,
      confirmCode,
      confirmCodeMode,
      fullName,
      email,
      password,
      code,
      register,
      signUpError,
      codeError
    };
  },
});
</script>

<style scoped></style>
