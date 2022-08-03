<script setup>
import { TrashIcon, PencilIcon, PlusSmIcon, ArchiveIcon, SaveIcon, ArrowLeftIcon } from '@heroicons/vue/solid'
const props = defineProps({
  type: {
    type: String,
    default: 'primary', // simple, primary, secondary, success, danger, warning, info, light, dark
  },
  icon: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
})
const typeClasses = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  danger: 'bg-danger-500 hover:bg-danger-800 text-white',
  simple: 'bg-transparent hover:bg-gray-100 text-gray-700',
}
const icons = {
  trash: TrashIcon,
  pencil: PencilIcon,
  plus: PlusSmIcon,
  archive: ArchiveIcon,
  save: SaveIcon,
  arrowLeft: ArrowLeftIcon,
}
</script>

<template>
  <button
    :class="typeClasses[props.type]"
    class="flex font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
    type="button"
  >
    <span class="flex row items-center">
      <component :is="icons[props.icon]" class="w-5 h-5" :class="{ 'mr-2': props.text }" />
      <span v-if="props.text">{{ props.text }}</span>
    </span>
  </button>
</template>
