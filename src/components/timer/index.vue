<template>
  <div class="timer">{{ time }}</div>
</template>

<script setup>
import { dayjs } from 'element-plus'

let timer = null
const time = ref('00:00')

const init = () => {
  clearInterval(timer)
  time.value = '00:00'
}

const start = () => {
  const start = dayjs()
  timer = setInterval(() => {
    time.value = dayjs(dayjs().diff(start)).format('mm:ss')
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
