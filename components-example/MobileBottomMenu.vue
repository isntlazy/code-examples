<template>
  <div class="row bg-white q-pt-2 q-pb-3 mobile-menu">
    <q-btn
      v-for="item in menuItems"
      :key="item.text"
      :icon="`fas ${item.icon}`"
      stack
      class="col menu-item"
      :class="{ 'menu-item--active': $route.path === item.link }"
      :to="item.link"
    >
      <span class="mobile-menu-text q-mt-1">{{ item.text }}</span>
    </q-btn>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent ( {
  name: 'MobileBottomMenu',
  props: {

  },
  setup () {
    const menuItems = ref([
      {
        icon: 'fa-campground',
        text: 'Мандрівка',
        link: '/trip/1'
      },
      {
        icon: 'fa-user-friends',
        text: 'Учасники',
        link: '/trip/1/participants'
      },
      {
        icon: 'fa-utensils',
        text: 'Їжа',
        link: '/trip/1/food'
      },
      {
        icon: 'fa-socks',
        text: 'Спорядження',
        link: '/trip/1/equipment'
      },
      {
        icon: 'fa-bus',
        text: 'Транспорт',
        link: ''
      }
    ]);

    return {
      menuItems
    }
  }
})
</script>

<style lang="scss">
  .mobile-menu {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

    &:before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: $grey;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .mobile-menu-text {
    text-transform: none;
    font-size: $font-size-xxs;

    @media (max-width: $breakpoint-min) {
      display: none;
    }
  }

  .menu-item {
    opacity: .7;

    &:before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: $accent;
      position: absolute;
      top: -$size-2;
      left: 0;
      opacity: 0;
    }

    .q-icon {
      width: $size-6;
      height: $size-6;
      font-size: $font-size-xl;
    }

    &--active {
      color: $accent;
      opacity: 1;

      &:before {
        opacity: 1;
      }
    }
  }
</style>
