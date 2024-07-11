<template>
  <div ref="refEditor" class="editor padding-15">
    <div class="tools flex">
      <Expression @select="expressionSelectHandle"></Expression>
      <Image class="tool" @select="imageSelectHandle"></Image>
      <File class="tool" @select="fileSelectHandle"></File>
      <template v-if="active.friend">
        <VoiceCall class="tool"></VoiceCall>
        <VideoCall class="tool"></VideoCall>
      </template>
    </div>
    <div class="margin_t-10 flex flex_a_i-flex-end">
      <el-input
        ref="refTextarea"
        class="flex-item_f-1"
        v-model="text"
        type="textarea"
        rows="3"
        resize="none"
        placeholder="善语结善缘，恶言伤人心~（拖动、粘贴文件到此，可发送文件）"
        maxlength="500"
        show-word-limit
        @keydown="textareaListener"
      />
      <div class="send-wrap">
        <el-icon class="cursor-pointer" size="20" @click="textSendHandle"
          ><EpPromotion
        /></el-icon>
        <Audio @complete="audioCompleteHandle"></Audio>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

import Expression from './components/expression/index.vue'
import Image from './components/image/index.vue'
import File from './components/file/index.vue'
import VoiceCall from './components/voice-call/index.vue'
import VideoCall from './components/video-call/index.vue'
import Audio from './components/audio/index.vue'

import { generateUUID } from '@utils'
import { IMAGE_ACCEPT } from '@constants/file'
import { MESSAGE_TYPE, MESSAGE_SEND_STATUS } from '@enums/message'

import { sendApi } from '@/api/message'
import { uploadImageApi, uploadFileApi } from '@/api/file'

const conversationStore = useConversationStore()
const rootStore = useRootStore()
const userStore = useUserStore()

const active = computed(() => conversationStore.active)

const loading = ref(false)
const refEditor = ref()
const refTextarea = ref()
const text = ref('')

const sendHandle = async (type, content) => {
  if (!content.trim()) {
    ElMessage({
      message: '消息内容不能为空~',
      type: 'warning',
      grouping: true,
    })
    return
  }
  const { id, nickname, avatar, sex, email } = userStore

  const uuid = generateUUID()
  const message = {
    id: uuid,
    type: type,
    text: type === MESSAGE_TYPE.TEXT ? content.trim() : '',
    image: type === MESSAGE_TYPE.IMAGE ? content : '',
    audio: type === MESSAGE_TYPE.AUDIO ? content : '',
    file: type === MESSAGE_TYPE.FILE ? content : '',
    status: 1,
    createdAt: new Date(),
    userId: id,
    nickname,
    avatar,
    sex,
    email,
    sendStatus: MESSAGE_SEND_STATUS.PENDING,
  }

  const conversation = { ...active.value, message }

  rootStore.addMessage(conversation)

  text.value = ''
  loading.value = true
  const { roomId } = active.value
  const params = { roomId, type, content }
  const r = await sendApi(params)
  if (r) {
    // rootStore.addMessage(r.data)
    rootStore.updateMessage(uuid, r.data, MESSAGE_SEND_STATUS.SUCCESS)
  } else {
    rootStore.updateMessage(uuid, conversation, MESSAGE_SEND_STATUS.FAIL)
  }
  loading.value = false
}

const expressionSelectHandle = (content) => {
  const index = refTextarea.value.ref.selectionStart
  text.value = text.value.slice(0, index) + content + text.value.slice(index)
  refTextarea.value.focus()
  nextTick(() => {
    const endIndex = index + content.length
    refTextarea.value.ref.setSelectionRange(endIndex, endIndex)
  })
}
const imageSelectHandle = (url) => {
  sendHandle(MESSAGE_TYPE.IMAGE, url)
}
const fileSelectHandle = (url) => {
  sendHandle(MESSAGE_TYPE.FILE, url)
}
const audioCompleteHandle = (url) => {
  sendHandle(MESSAGE_TYPE.AUDIO, url)
}
const textSendHandle = () => {
  sendHandle(MESSAGE_TYPE.TEXT, text.value)
}

/**
 * 监听textarea 键盘事件 取消回车换行 改为 shift+回车 换行
 */
const textareaListener = (e) => {
  if (e.keyCode === 13 && !loading.value) {
    if (!e.shiftKey) {
      textSendHandle()
      e.preventDefault()
      return false
    }
  }
}

/**
 * 上传文件
 * @param {*} file 文件
 * @param {*} messageType 消息类型
 */
const uploadFile = async (file, messageType) => {
  const r =
    messageType === MESSAGE_TYPE.IMAGE
      ? await uploadImageApi({ file })
      : await uploadFileApi({ file })
  if (r) {
    return r.data
  }
}

/**
 * 发送文件
 * @param {} file 文件
 */
const sendFile = async (file) => {
  if (file) {
    const messageType = IMAGE_ACCEPT.includes(file.type.toUpperCase())
      ? MESSAGE_TYPE.IMAGE
      : MESSAGE_TYPE.FILE
    const url = await uploadFile(file, messageType)
    if (url) {
      sendHandle(messageType, url)
    }
  }
}

/**
 * 发送文件
 * @param {} files 文件列表
 */
const sendFiles = async (files) => {
  const max = 3
  if (files.length > max) {
    return ElMessage({
      message: `一次最多上传${ max }个文件~`,
      type: 'warning',
      grouping: true,
    })
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    await sendFile(file)
  }
}

/**
 * 粘贴文件处理
 */
const pasteFileHandle = () => {
  refEditor.value.addEventListener('paste', async e => {
    // 粘贴事件 监听函数：获取粘贴板文件数据、上传文件、发送消息
    const items = (e.clipboardData || e.originalEvent.clipboardData).items
    const files = []
    for (const index in items) {
      const item = items[index]
      if (item.kind === 'file') {
        files.push(item.getAsFile())
      }
    }
    await sendFiles(files)
  })
}

/**
 * 拖拽文件处理
 */
const dragFileHandle = () => {
  const events = ['dragenter','dragover', 'drop', 'dragleave']
  events.forEach(event => {
    refEditor.value.addEventListener(event, e => {
      e.preventDefault()
      e.stopPropagation()
    })
  })
  // 记录最后拖拽进入的元素 处理 进入子元素会触发 dragleave 的问题
  let lastElement = null
  refEditor.value.addEventListener('dragenter', (e) => {
    lastElement = e.target
    refEditor.value.classList.add('highlight')
  })
  refEditor.value.addEventListener('drop', async e => {
    // 鼠标放下事件 监听函数：获取文件数据、上传文件、发送消息
    refEditor.value.classList.remove('highlight')
    const files = e.dataTransfer.files
    await sendFiles(files)
  })
  refEditor.value.addEventListener('dragleave', (e) => {
    if (e.target === lastElement) {
      refEditor.value.classList.remove('highlight')
    }
  })
}

onMounted(() => {
  pasteFileHandle()
  dragFileHandle()
})
</script>

<style lang="scss" scoped>
.editor {
  padding: 10px 15px 10px 15px;
  border-radius: var(--el-border-radius-round);
  border-top: 1px solid var(--wrap-background-color);
  &.highlight {
    box-shadow: var(--el-box-shadow);
  }
  .tools {
    color: var(--el-color-info-dark-2);
    .tool {
      margin-left: 10px;
    }
  }
  .send-wrap {
    color: var(--el-color-info-dark-2);
  }
  ::v-deep(.el-textarea__inner) {
    padding: 0;
    box-shadow: none;
    border: none;
  }
}
</style>
