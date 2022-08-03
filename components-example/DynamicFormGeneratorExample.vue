<template>
  <section class="login-view flex min-h-screen">
    <section class="login-view__lf flex-1">
      <div class="px-10 mt-8 sm:px-20 sm:mt-18">
        <h1>{{ t('views.login.signInTitle') }}</h1>

        <SchemaFormWithValidation @submit="submitForm" :schema="schema" class="my-8">
          <template #afterForm>
            <router-link to="/reset" class="mt-3 inline-block link-gray font-medium text-sm">{{
              t('views.login.forgotPassword')
            }}</router-link>
            <div class="mt-10">
              <button
                type="submit"
                class="w-full text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                :class="!email.length || !password.length ? 'bg-cblue-600' : 'bg-cblue-500 hover:bg-cblue-400'"
              >
                {{ t('views.login.signInButton') }}
              </button>
            </div>
          </template>
        </SchemaFormWithValidation>

        <Alert v-if="authErrorMessage.value && authErrorMessage.value.length" :text="authErrorMessage.value" />

        <div class="mt-8">
          <span class="inline-block font-medium text-sm text-gray-500">{{ t('views.login.signInWith') }}</span>
          <button class="inline-block ml-8 sign-in-icon apple align-middle" />
          <button class="inline-block ml-4 sign-in-icon twitter align-middle" />
          <button class="inline-block ml-4 sign-in-icon google align-middle" />
        </div>

        <div class="pt-6 font-medium">
          {{ t('views.login.noAccount') }}
          <router-link to="/signup" class="ml-2 font-medium text-sm">{{ t('views.login.create') }}</router-link>
        </div>
      </div>
    </section>
    <section class="login-view__rh flex-1 hidden md:block">
      <div class="login-view__jumbo px-20 pt-16">
        <img src="@/assets/img/logo/logo--bg-transparent.png" class="login-view__logo" alt="logo" />
        <span class="login-view__slogan inline-block mt-20 text-4xl font-medium text-white hidden">{{
          t('views.login.jumboText')
        }}</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import * as yup from 'yup'
import { ref, markRaw, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSchemaForm } from 'formvuelate'
import { useRoutesStore } from '@/stores/routesStore'
import useAuth from '@/composables/useAuth'
import { SchemaFormFactory } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import TextInput from '@/components/forms/TextInput'
import PasswordInput from '@/components/forms/PasswordInput'
import Alert from '@/components/Alert'
import { useRouter } from 'vue-router'

markRaw(TextInput)
markRaw(PasswordInput)

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})

const { fetchRoutes } = useRoutesStore()
const { login, authErrorMessage } = useAuth()
const router = useRouter()

onMounted(async () => {
  fetchRoutes()
})

const email = ref('')
const password = ref('')

const schema = ref({
  email: {
    component: TextInput,
    label: t('views.login.email'),
    name: 'email',
    required: true,
    default: '',
    validations: yup.string().required().email()
  },
  password: {
    component: TextInput,
    label: t('views.login.password'),
    name: 'password',
    type: 'password',
    required: true,
    default: ''
  }
})

const submitForm = async () => {
  await login(formData.value)
  router.push({
    name: 'dashboard'
  })
}

const formData = ref({})
useSchemaForm(formData)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin({})])
</script>

<style lang="scss" scoped>
.login-view {
  margin: 0 auto;
  background-color: #4a4cf0;

  &__lf {
    background-color: #fff;
    border-top-right-radius: 2.7rem;
    .sign-in-icon {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: contain;
      transition: 0.1s transform cubic-bezier(0.6, -0.28, 0.735, 0.045);

      &:hover {
        transform: scale3d(1.1, 1.1, 1.1);
      }

      &.apple {
        background-image: url('~@/assets/img/social/login-icon-apple.png');
      }

      &.twitter {
        background-image: url('~@/assets/img/social/login-icon-twitter.png');
      }

      &.google {
        background-image: url('~@/assets/img/social/login-icon-google.png');
      }
    }
  }

  &__jumbo {
    min-height: 100vh;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 65%;
    background-position: center;
    background-image: url('~@/assets/img/login-illustration.svg');
  }

  &__logo {
    width: 1.9375rem;
    height: 1.875rem;
  }

  &__slogan {
    display: block;
    letter-spacing: 0.0238rem;
  }
}
</style>