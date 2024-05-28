<template>
  <el-tooltip content="长按发送语音" placement="top">
    <el-icon class="cursor-pointer" size="20" @mousedown="mousedownHandle">
      <EpMicrophone></EpMicrophone>
    </el-icon>
  </el-tooltip>
</template>

<script setup>
import { recordVoice } from '@utils'

const mousedownHandle = () => {
  recordVoice(
    (mediaRecorder) => {
      console.log('start', mediaRecorder);
      const stop = () => {
        mediaRecorder.stop()
        document.removeEventListener('mousemove', stop)
      }
      document.addEventListener('mousemove', stop)
    },
    (blob) => {
      console.log('stop', blob);
    }
  )
}

</script>

<style lang="scss" scoped>
</style>
