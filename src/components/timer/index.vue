<template>
  <div class="timer">{{ time }}</div>
</template>

<script setup>
import { dayjs } from 'element-plus'

let timer = null
const time = ref('00:00')

const init = () => {
  clearInterval(timer)
  time.value = '00:00:00'
}

const start = () => {
  const start = dayjs()
  timer = setInterval(() => {
    // 超过一天 时长会不对哦 应该也不会出现超过一天的吧
    time.value = dayjs(dayjs().diff(start)).subtract(8, 'hour').format('HH:mm:ss')
  }, 1000)
}

onBeforeMount(() => {
  init()
  start()
})


onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.timer {}
</style>
