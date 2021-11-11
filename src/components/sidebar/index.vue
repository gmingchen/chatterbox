<template>
  <div class="sidebar-wrap">
    <bar-left class="width-80" />
    <bar-right />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import BarLeft from '@/components/sidebar-left'
import BarRight from '@/components/sidebar-right'

export default defineComponent({
  components: {
    BarLeft,
    BarRight
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

.sidebar-wrap {
  background-color: $darkColor-2;
  display: flex;
  width: 100%;
}
</style>
