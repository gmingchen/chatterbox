<template>
  <div class="countdown flex_j_c-center flex_a_i-center font-size-12">
    <el-button
      v-show="!visible"
      class="button" 
      type="primary" 
      link
      :disabled="disabled"
      @click="click">
      {{ buttonText }}
    </el-button>
    <Countdown v-show="visible" ref="refCountdown" :duration="duration" @done="done"></Countdown>
  </div>
</template>

<script setup>
const emits = defineEmits(['click'])

const props = defineProps({
  duration: {
    type: Number,
    default: () => 0
  },
  buttonText: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: () => false
  }
})

const visible = ref(false)

const refCountdown = ref()

const click = () => {
  visible.value = true
  refCountdown.value.run()
  emits('click')
}

const done = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.countdown {
  .button {
    color: var(--el-color-primary);
    &:hover {
      color: var(--el-button-hover-link-text-color);
    }
  }
  .seconds {
    color: var(--el-color-info-light-3);
  }
}
</style>
