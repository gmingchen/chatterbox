<template>
  <div class="video-call" @click="call">
    <el-icon class="cursor-pointer" size="20" >
      <EpVideoCamera></EpVideoCamera>
    </el-icon>
  </div>
</template>

<script setup>
import { MEDIA_TYPE } from '@enums/media'

const conversationStore = useConversationStore()
const mediaStore = useMediaStore()

const active = computed(() => conversationStore.active)

const loading = ref(false)

const call = async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  const { userId, avatar, remark, nickname } = active.value.friend
  const user = {
    id: userId, avatar, name: nickname, type: MEDIA_TYPE.VIDEO
  }
  mediaStore.call(user)

  setTimeout(() => loading.value = false, 1000)
}
</script>

<style lang="scss" scoped>
.video-call {}
</style>
