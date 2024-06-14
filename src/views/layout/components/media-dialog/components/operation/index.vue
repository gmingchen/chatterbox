<template>
  <div class="operation flex_j_c-space-around">
    <el-button v-if="showAccept" type="primary" circle size="large" @click="acceptHandle">
      <el-icon class="font-size-20"><EpCheck /></el-icon>
    </el-button>
    <el-button 
      v-if="showClose"
      type="danger"
      circle
      size="large"
      @click="clickHandle">
      <el-icon class="font-size-20"><EpClose /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { MEDIA_STATUS } from '@enums/media'
import { connection, channel, offerHandler, answerHandler, remoteHandler } from '@utils/connection'



const mediaStore = useMediaStore()

const props = defineProps({
  active: {
    type: Object,
    default: () => {}
  }
})

const showAccept = computed(() => {
  const { status } = props.active
  return status === MEDIA_STATUS.CALLING
})
const showClose = computed(() => {
  const { status } = props.active
  return status === MEDIA_STATUS.INVITING ||
    status === MEDIA_STATUS.REJECTED ||
    status === MEDIA_STATUS.CALLING ||
    status === MEDIA_STATUS.CANCELED ||
    status === MEDIA_STATUS.ING
})


const acceptHandle = () => {
  console.log('接受');
  const { id } = props.active
  mediaStore.accept(id)
}

const cancelHandler = () => {
  console.log('取消');
  mediaStore.cancel()
}

const rejectHandler = () => {
  console.log('拒绝');
  const { id } = props.active
  mediaStore.reject(id)
  mediaStore.close()
}

const closeHandler = () => {
  console.log('关闭');
  mediaStore.close()
}

const finishHandler = () => {
  console.log('终止');
}

const clickHandle = () => {
  const { status } = props.active
  // if (status === MEDIA_STATUS.INVITING) {
  //   cancelHandler()
  // } else if (status === MEDIA_STATUS.CALLING) {
  //   rejectHandler()
  // } else if (status === MEDIA_STATUS.ING) {
  //   finishHandler()
  // } else if (status === MEDIA_STATUS.CANCELED) {
  //   closeHandler()
  // } else if (status === MEDIA_STATUS.REJECTED) {
  //   closeHandler()
  // }
  // channel.send(111)
  console.log(connection);
  console.log(channel);
}
</script>

<style lang="scss" scoped>
.operation {
}
</style>
