<template>
  <span class="countdown">{{ seconds }}s</span>
</template>

<script setup>
const emits = defineEmits(['done'])
const props = defineProps({
  duration: {
    type: Number,
    default: () => 0
  },
})

const seconds = ref(0)
let timer = null

const stop = () => {
  clearInterval(timer)
  seconds.value = 0
}

const done = () => {
  stop()
  emits('done')
}

const run = () => {
  seconds.value = props.duration
  timer = setInterval(() => {
    seconds.value--
    if (!seconds.value) {
      done()
    }
  }, 1000)
}

onBeforeUnmount(() => {
  stop()
})

defineExpose({
  run,
  stop
})
</script>

<style lang="scss" scoped>
.countdown {
  color: var(--el-color-info-light-3);
}
</style>
