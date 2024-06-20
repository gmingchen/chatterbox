<template>
  <el-dialog
    class="media-dialog"
    v-model="visible"
    width="300"
    :close-on-click-modal="false"
    draggable
    append-to-body
    :show-close="false"
    :close-on-press-escape="false">
    <div class="content height-400 flex_d-column" :class="!showVideo ? 'flex_j_c-space-between' : 'flex_j_c-flex-end'">
      <UserBox v-if="!showVideo" :avatar="active.avatar" :name="active.name"></UserBox>
      <Status v-if="!showVideo" :active="active"></Status>
      <Operation class="opreation margin_b-10" :active="active"></Operation>
      <video id="video"></video>
      <div v-if="showVideo" class="video-empty">
        <Empty icon="VideoCamera"></Empty>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import UserBox from './components/user-box/index.vue'
import Status from './components/status/index.vue'
import Operation from './components/operation/index.vue'

import { MEDIA_TYPE, MEDIA_STATUS } from '@enums/media'

const mediaStore = useMediaStore()

const visible = computed({
  get: () => mediaStore.visible,
  set: (value) => mediaStore.visible = value
})
const active = computed(() => mediaStore.active || {})

const showVideo = computed(() => {
  const { status, type } = active.value
  return status === MEDIA_STATUS.ING && type === MEDIA_TYPE.VIDEO
})

const ontrack = (event) => {
  const video = document.getElementById('video')
  video.srcObject = event.streams[0];
  video.play()
  console.log('ontrack', event);
}

onMounted(async () => {
  // mediaStore.init(ontrack)
})
</script>

<style lang="scss">
.media-dialog {
  padding: 0;
  .content {
    position: relative;
    .opreation {
      position: relative;
      z-index: 10;
    }
    #video, .video-empty {
      height: 100%;
      width: 100%;
      position: absolute;
      background-color: transparent;
    }
    #video {
      z-index: 1;
    }
  }
}
</style>
