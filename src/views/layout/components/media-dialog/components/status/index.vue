<template>
  <div class="status flex_a_i-center flex_j_c-center">
    <div :class="padding ? 'padding' : ''">{{ text }}</div>
  </div>
  
</template>

<script setup>
import { MEDIA_TYPE, MEDIA_STATUS } from '@enums/media'

const props = defineProps({
  active: {
    type: Object,
    default: () => {}
  }
})

const padding = computed(() => {
  const { status } = props.active
  return status === MEDIA_STATUS.INVITING || status === MEDIA_STATUS.CALLING
})

const text = computed(() => {
  let result = ''
  const { status, type } = props.active
  const describe = type === MEDIA_TYPE.VOICE ? '语音通话' : '视频通话'
  if (status === MEDIA_STATUS.INVITING) {
    result = `等待对方接受${ describe }邀请`
  } else if (status === MEDIA_STATUS.REJECTED) {
    result = `对方已拒绝${ describe }邀请`
  } else if (status === MEDIA_STATUS.CALLING) {
    result = `邀请你进行${ describe }`
  } else if (status === MEDIA_STATUS.CANCELED) {
    result = `对方已取消${ describe }邀请`
  }
  return result
})
</script>

<style lang="scss" scoped>
.status {
  position: relative;
  .padding::after {
    position: absolute;
    content: '';
    animation: dots 1s infinite steps(3, start);
  }
}
</style>
