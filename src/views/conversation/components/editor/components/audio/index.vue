<template>
  <el-tooltip :visible="visible" placement="top" trigger="hover">
    <el-icon class="cursor-pointer" size="20" @mousedown="mousedownHandle">
      <EpMicrophone></EpMicrophone>
    </el-icon>
    <template #content>
      <div class="tips">语音录制中</div>
    </template>
  </el-tooltip>
</template>

<script setup>
import { dayjs, ElMessage } from 'element-plus';
import { recordAudio } from '@utils'
import { uploadAudioApi } from '@/api/file'

const emits = defineEmits(['complete'])

const visible = ref(false)

const mousedownHandle = (event) => {
  if (event.button) {
    return
  }
  
  let startTime = ''
  recordAudio(
    // 开始录制
    (mediaRecorder) => {
      visible.value = true
      startTime = dayjs()
      const stop = () => {
        mediaRecorder.stop()
        document.removeEventListener('mousemove', stop)
      }
      document.addEventListener('mousemove', stop)
      setTimeout(() => stop(), 10000)
    },
    // 录制完成
    async (blob) => {
      const duration = dayjs().diff(startTime)
      if (duration < 1000) {
        ElMessage({
          message: '说话时间太短~',
          type: 'warning'
        })
      } else {
        // 上传
        const r = await uploadAudioApi(blob)
        if (r) {
          emits('complete', r.data)
        }
      }
      visible.value = false
    },
    // 异常
    () => {
      setTimeout(() => visible.value = false, 1000)
    }
  )
}

</script>

<style lang="scss" scoped>
.tips {
  position: relative;
  &::after {
    position: absolute;
    content: '';
    animation: dots 1s infinite steps(3, start);
  }
}
</style>
