<template>
  <div class="full-width">
    <div class="row text-center q-gutter-x-2 q-gutter-lg-x-5 q-gutter-xxl-x-7 q-mt-6 q-mt-xxs-12 q-mt-md-4">
      <div v-for="(item, key) in statistics" :key="key" class="bg-grey rounded-borders col q-mt-4 q-py-2 statistic-block">
        <h5 class="heading-text">{{ item.label }}</h5>
        <span class="secondary-heading">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'TripsStatistics',

  setup () {
    const statistics = ref({
      personalTrips: {
        label: 'створені мною',
        count: 2
      },
      takePartTrips: {
        label: 'беру участь',
        count: 4
      }
    });

    statistics.value = {
      allTrips: {
        label: 'всього',
        count: statistics.value.personalTrips.count + statistics.value.takePartTrips.count
      },
      ...statistics.value
    };

    return {
      statistics
    }
  }
})
</script>

<style lang="scss" scoped>
  .statistic-block {
    @media (min-width: $breakpoint-md-min) {
      max-width: 10rem;
    }
  }
</style>
