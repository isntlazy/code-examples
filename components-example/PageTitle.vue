<template>
  <div class="col-6 col-md-12 col-xl-10 col-xxl-9 q-pl-8 q-pl-xxs-5 q-pl-sm-0">
    <h1 class="heading-primary">{{ title }}</h1>
    <p class="q-mt-2 q-mt-sm-4 heading-text">
      {{ text }}
    </p>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent ( {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
})
</script>
