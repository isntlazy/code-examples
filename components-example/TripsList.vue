<template>
  <div class="bg-grey q-mt-6 q-mt-sm-7">
    <div class="q-py-6 q-py-lg-5 q-py-xxl-7 container q-px-4 q-px-xxs-5 q-px-sm-0">
      <div class="row q-col-gutter-6 q-col-gutter-lg-5 q-col-gutter-xxl-7">
        <router-link v-for="trip in trips" :key="trip.id" :to="`/trip/${trip?.id}`" tag="div" class="col-12 col-sm-6 col-lg-3 trip">
          <div class="column justify-between bg-white full-width full-height rounded-borders q-pt-2 q-pb-3 q-px-3">
            <div class="row items-start">
              <h5 class="title-text col q-pr-2">{{ trip.name }}</h5>
              <q-img src="~/assets/icons/trips_pic.svg" class="trip-img q-mt-lg-3 q-mt-xxl-6" />
            </div>
            <div class="row justify-between">
              <span class="col small-bold-text">{{ trip.startsAt }}</span>
              <div class="row q-col-gutter-5">
                <div class="col-auto">
                  <i class="fas fa-user-friends"></i>
                  <span class="trip-data-count small-bold-text q-ml-1">{{ trip.members || 2 }}</span>
                </div>
                <div class="col-auto">
                  <i class="fas fa-moon"></i>
                  <span class="trip-data-count small-bold-text q-ml-1">{{ trip.nights || 3 }}</span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted} from 'vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'TripsList',

  setup () {
    const $store = useStore();
    const trips = ref([]);

    onMounted(async () => {
      try {
        trips.value = await $store.dispatch('trip/getAll');
      } catch (e) {
        console.log(e)
      }
    })

    return {
      trips
    }
  }
})
</script>

<style lang="scss" scoped>

.trip {
  height: 9rem;

  @media (min-width: $breakpoint-sm-min) {
    height: 9.5rem;
  }

  @media (min-width: $breakpoint-xl-min) {
    height: 11rem;
  }

  @media (min-width: $breakpoint-xxl-min) {
    height: 13.25rem;
  }
}

.trip-img {
  width: 6.25rem;

  @media (min-width: $breakpoint-xl-min) {
    width: 7.5rem;
  }

  @media (min-width: $breakpoint-xxl-min) {
    width: 8.75rem;
  }
}

.trip-data-count {
  position: relative;
  bottom: -2px;
}

</style>
