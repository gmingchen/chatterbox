<template>
  <div class="status flex_a_i-center flex_j_c-center">
    <div :class="padding ? 'padding' : ''">{{ text }}</div>
    <div v-if="time">{{ time }}</div>
  </div>
  
</template>

<script setup>
import { dayjs } from 'element-plus'

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

let timer = null
const time = ref('')

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

watch(() => props.active.status, (newValue) => {
  if (newValue === MEDIA_STATUS.ING) {
    const start = dayjs()
    time.value = '00:00'
    timer = setInterval(() => {
      time.value = dayjs(dayjs().diff(start)).format('mm:ss')
    }, 1000)
  } else {
    clearInterval(timer)
    time.value = ''
  }
})

onBeforeUnmount(() => {
  clearInterval(timer)
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
