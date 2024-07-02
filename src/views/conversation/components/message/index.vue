<template>
  <div class="message flex" :class="reverse ? 'reverse' : ''">
    <Avatar :src="message.avatar" :name="message.nickname" :size="40" @click="avatarClickHandle"></Avatar>
    <div class="wrap flex-item_f-1 margin-n-10 flex_d-column flex_a_i-flex-start">
      <div class="info margin_b-6 flex">
        <span>{{ message.nickname }}</span>
        <span class="email" v-if="message.email">({{ message.email }})</span>
        <span class="time margin-n-10">{{ time }}</span>
      </div>
      <div class="message-wrap flex">
        <ContextMenu :menus="menus" @select="menuSelectHandle">
          <TextMessage ref="refTextMessage" :text="message.text" v-if="message.type === MESSAGE_TYPE.TEXT"></TextMessage>
          <ImageMessage ref="refImageMessage" :image="message.image" v-if="message.type === MESSAGE_TYPE.IMAGE"></ImageMessage>
          <FileMessage :file="message.file" v-if="message.type === MESSAGE_TYPE.FILE"></FileMessage>
          <AudioMessage ref="refAudioMessage" :audio="message.audio" v-if="message.type === MESSAGE_TYPE.AUDIO"></AudioMessage>
          <MessageSendStatus class="margin-n-15" :message="message"></MessageSendStatus>
        </ContextMenu>
      </div>
    </div>
  </div>
</template> 

<script setup>
import TextMessage from './components/text-message/index.vue'
import ImageMessage from './components/image-message/index.vue'
import FileMessage from './components/file-message/index.vue'
import AudioMessage from './components/audio-message/index.vue'

import { dateFormat, timeFormat, fetchFile, downloadFile } from '@utils'

import { MESSAGE_TYPE, MESSAGE_SEND_STATUS } from '@enums/message'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['avatar-click'])

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: () => false
  }
})

const time = computed(() => {
  return timeFormat(props.message.createdAt)
})

const avatarClickHandle = () => {
  emits('avatar-click', props.message)
}

const copy = { label: '复制', value: 1 }
const download = { label: '下载', value: 2 }
const play = { label: '播放', value: 3 }
const menus = computed(() => {
  const { type } = props.message
  if (type === MESSAGE_TYPE.TEXT) {
    return [copy]
  } else if (type === MESSAGE_TYPE.IMAGE) {
    return [download]
  } else if (type === MESSAGE_TYPE.AUDIO) {
    return [play]
  } else if (type === MESSAGE_TYPE.FILE) {
    return [download]
  }
  return []
})

const refTextMessage = ref()
const refImageMessage = ref()
const refAudioMessage = ref()
const menuSelectHandle = async (row) => {
  const { text, image, file, nickname } = props.message
  if (row.value === copy.value) {
    try {
      navigator.clipboard.writeText(text)
      ElMessage({ message: '复制成功~', type: 'success' })
    } catch (error) {
      ElMessage({ message: '复制失败~', type: 'warning' })
    }
  } else if (row.value === download.value) {
    const blob = await fetchFile(image || file)
    if (blob) {
      const name = `${ nickname }_${ +new Date() }`
      downloadFile(blob, name)
    }
  } else if (row.value === play.value) {
    refAudioMessage.value.play()
  }
}
</script>

<style lang="scss" scoped>
.message {
  .avatar {
    flex-shrink: 0;
  }
  .info {
    font-size: 12px;
    color: var(--el-color-info-dark-2);
    .email, .time {
      display: none;
    }
  }
  .message-wrap {
    max-width: 70%;
  }
  &:hover .email, &:hover .time {
    display: inline;
  }
}
.message.reverse {
  flex-direction: row-reverse;
  .wrap {
    align-items: flex-end;
  }
  .info {
    flex-direction: row-reverse;
  }
  .message-wrap {
    flex-direction: row-reverse;
  }
}
</style>
