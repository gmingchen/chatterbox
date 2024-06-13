<template>
  <div class="status flex_a_i-center flex_j_c-center">
    <div class="text">{{ text }}</div>
  </div>
  
</template>

<script setup>
import { MEDIA_STATUS } from '@enums/media'

const props = defineProps({
  status: {
    type: Number,
    default: () => 0
  }
})

const text = computed(() => {
  let result = ''
  const { status } = props
  if (status === MEDIA_STATUS.INVITING) {
    result = '等待对方接受邀请'
  }
  return result
})
</script>

<style lang="scss" scoped>
.status {
  position: relative;
  .text::after {
    position: absolute;
    content: '';
    animation: dots 1s infinite steps(3, start);
  }
}
</style>
