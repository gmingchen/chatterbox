<template>
  <el-input ref="refCaptchaInput" v-bind="$attrs">
    <template #append>
      <CountdownButton
        class="min-width-40"
        :duration="60"
        button-text="发送验证码"
        :disabled="disabled"
        @click="sendHandle">
      </CountdownButton>
    </template>
  </el-input>
</template>

<script setup>
import useBindExposed from '@/hooks/bind-exposed'

const emits = defineEmits(['send'])

defineProps({
  disabled: {
    type: Boolean,
    default: () => false 
  }
})

const refCaptchaInput = ref()

const sendHandle = () => {
  emits('send')
}

onMounted(() => {
  useBindExposed(refCaptchaInput)
})
</script>

<style lang="scss" scoped>
.captcha-input {}
</style>
