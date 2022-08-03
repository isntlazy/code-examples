<template>
  <div class="period-container">
    <Datepicker
      :enableTimePicker="false"
      autoApply
      :clearable="false"
      :textInputOptions="{ openMenu: true }"
      range
      multiCalendars
      :monthChangeOnScroll="false"
      :modelValue="period"
      :presetRanges="presetRanges"
      @update:modelValue="handleDate"
      format="dd/MM/yyyy - dd/MM/yyyy"
    >
      <template #dp-input="{}">
        <div class="period">
          <div>
            <font-awesome-icon :icon="['fas', 'calendar']" />
          </div>
          <div>
            {{ startDate }}
            <span class="mx-3">‣</span>
            {{ endDate }}
          </div>
        </div>
      </template>
    </Datepicker>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { ref, computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, addMonths, addYears, subMonths } from 'date-fns'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})
const props = defineProps({
  period: { type: Array, required: true }
})
const emit = defineEmits(['setPeriod'])
const { period } = toRefs(props)
const currentDate = new Date()
const startDate = computed(() => {
  return format(period.value[0], 'yyyy-MM-dd')
})
const endDate = computed(() => {
  return format(period.value[1], 'yyyy-MM-dd')
})
const presetRanges = ref([
  { label: t('periodSelector.monthFromNow'), range: [currentDate, addMonths(currentDate, 1)] },
  { label: t('periodSelector.quarterFromNow'), range: [currentDate, addMonths(currentDate, 3)] },
  { label: t('periodSelector.sixMonthsFromNow'), range: [currentDate, addMonths(currentDate, 6)] },
  { label: t('periodSelector.yearFromNow'), range: [currentDate, addYears(currentDate, 1)] },
  {
    label: t('periodSelector.nextMonth'),
    range: [startOfMonth(addMonths(currentDate, 1)), endOfMonth(addMonths(currentDate, 1))]
  },
  {
    label: t('periodSelector.nextQuarter'),
    range: [startOfMonth(addMonths(currentDate, 3)), endOfMonth(addMonths(currentDate, 3))]
  },
  {
    label: t('periodSelector.nextYear'),
    range: [startOfYear(addYears(currentDate, 1)), endOfYear(addYears(currentDate, 1))]
  },
  { label: t('periodSelector.currentMonth'), range: [startOfMonth(currentDate), endOfMonth(currentDate)] },
  {
    label: t('periodSelector.currentQuarter'),
    range: [startOfMonth(currentDate), addMonths(endOfMonth(currentDate), 3)]
  },
  {
    label: t('periodSelector.currentYear'),
    range: [startOfYear(currentDate), endOfYear(currentDate)]
  },
  {
    label: t('periodSelector.previousMonth'),
    range: [startOfMonth(subMonths(currentDate, 1)), endOfMonth(subMonths(currentDate, 1))]
  },
  {
    label: t('periodSelector.previousQuarter'),
    range: [startOfMonth(subMonths(currentDate, 3)), endOfMonth(subMonths(currentDate, 3))]
  },
  {
    label: t('periodSelector.previousYear'),
    range: [startOfYear(subMonths(currentDate, 12)), endOfYear(subMonths(currentDate, 12))]
  },
  {
    label: t('periodSelector.monthToDate'),
    range: [subMonths(currentDate, 1), currentDate]
  },
  { label: t('periodSelector.quarterToDate'), range: [subMonths(currentDate, 3), currentDate] },
  { label: t('periodSelector.yearToDate'), range: [subMonths(currentDate, 12), currentDate] }
])
const handleDate = (value) => {
  emit('setPeriod', value)
}
</script>

<style lang="scss">
@import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';
.period {
  @apply flex items-center my-3 bg-cgray-100 rounded-lg cursor-pointer shadow;
  & > div {
    @apply mr-3 py-4 px-6 font-normal;
    font-family: 'Manrope', sans-serif;
  }
}
</style>