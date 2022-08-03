<script setup>
import FCButton from '@/components/atoms/FCButton.vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: { type: Array, default: () => [] },
  headerItems: { type: Array, default: () => [] },
  newBtn: { type: Boolean, default: true },
  hasArchive: { type: Boolean, default: false },
  newBtnText: { type: String, default: '' },
  entity: { type: String, default: '' },
})

const emit = defineEmits(['delete'])

const router = useRouter()
</script>

<template>
  <div>
    <div class="flex flex-wrap mt-8">
      <div class="w-full mb-12 px-16">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div class="rounded-t mb-0 px-4 py-6 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative flex justify-between w-full pl-4 max-w-full flex-grow flex-1">
                <h3 class="text-lg text-blueGray-700 uppercase font-bold">{{ props.title }}</h3>
                <div class="flex">
                  <f-c-button v-if="props.hasArchive" class="mr-6" icon="archive" type="simple" text="Архів" />
                  <f-c-button
                    @click="router.push({ name: `new-${props.entity}` })"
                    v-if="props.newBtn"
                    icon="plus"
                    :text="props.newBtnText"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th
                    :key="item.id"
                    v-for="item in props.headerItems"
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    {{ item.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :key="dataItem.id"
                  v-for="dataItem in props.data"
                  class="border border-solid border-l-0 border-r-0 hover:bg-sky-50"
                >
                  <template :key="index" v-for="(headerItem, index) in props.headerItems">
                    <td
                      v-if="dataItem[headerItem.id] && headerItem.type === 'image'"
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                    >
                      <img :src="dataItem[headerItem.id]" class="h-12 w-12 bg-white rounded-full border" /><span
                        class="ml-3 font-bold text-blueGray-600"
                      >
                      </span>
                    </td>
                    <td
                      v-else-if="dataItem[headerItem.id] !== undefined"
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ dataItem[headerItem.id] }}
                    </td>
                  </template>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div class="flex justify-end">
                      <f-c-button
                        @click="router.push({ name: entity, params: { id: dataItem.id } })"
                        class="mr-4"
                        icon="pencil"
                        type="primary"
                      />
                      <f-c-button @click="emit('delete', dataItem.id)" icon="trash" type="danger" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
