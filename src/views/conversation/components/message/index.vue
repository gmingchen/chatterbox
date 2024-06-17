<template>
  <div class="message flex" :class="reverse ? 'reverse' : ''">
    <el-avatar class="avatar" :src="message.avatar"></el-avatar>
    <div class="wrap flex-item_f-1 margin-n-10 flex_d-column flex_a_i-flex-start">
      <div class="nickname margin_b-6">
        {{ message.nickname }}
      </div>
      <TextMessage :text="message.text" v-if="message.type === MESSAGE_TYPE.TEXT"></TextMessage>
      <ImageMessage :image="message.image" v-if="message.type === MESSAGE_TYPE.IMAGE"></ImageMessage>
      <FileMessage :file="message.file" v-if="message.type === MESSAGE_TYPE.FILE"></FileMessage>
      <AudioMessage :audio="message.audio" v-if="message.type === MESSAGE_TYPE.AUDIO"></AudioMessage>
    </div>
  </div>
</template> 

<script setup>
import TextMessage from './components/text-message/index.vue'
import ImageMessage from './components/image-message/index.vue'
import FileMessage from './components/file-message/index.vue'
import AudioMessage from './components/audio-message/index.vue'

import { MESSAGE_TYPE } from '@enums/message'

defineProps({
  message: {
    type: Object,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: () => false
  }
})
</script>

<style lang="scss" scoped>
.message {
  .avatar {
    flex-shrink: 0;
  }
  
  .nickname {
    font-size: 12px;
    color: var(--el-color-info-dark-2);;
  }
}
.message.reverse {
  flex-direction: row-reverse;
  .wrap {
    align-items: flex-end;
  }
}
</style>
