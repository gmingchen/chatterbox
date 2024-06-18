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
    <div class="content height-400 flex_d-column flex_j_c-space-between">
      <UserBox :avatar="active.avatar" :name="active.name"></UserBox>
      <Status :active="active"></Status>
      <Operation class="opreation margin_b-10" :active="active"></Operation>
      <video src="https://ovopark-oss-dev.oss-cn-hangzhou.aliyuncs.com/wanji/150/2024/3/4/17095188079602201" id="video" ></video>
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

const ontrack = (event) => {
  console.log('ontrack', event);
}

onMounted(async () => {
  mediaStore.init(ontrack)
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
    #video {
      height: 100%;
      width: 100%;
      position: absolute;
      background-color: transparent;
    }
  }
}
</style>
