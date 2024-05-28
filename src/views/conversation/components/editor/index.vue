<template>
  <div class="editor  padding-15">
    <div class="tools flex">
      <Expression @select="expressionSelectHandle"></Expression>
      <Image class="tool" @select="imageSelectHandle"></Image>
      <File class="tool" @select="fileSelectHandle"></File>
      <VoiceCall class="tool"></VoiceCall>
      <VideoCall class="tool"></VideoCall>
    </div>
    <div class="margin_t-10 flex flex_a_i-flex-end">
      <el-input
        ref="refTextarea"
        class="flex-item_f-1"
        v-model="text"
        type="textarea"
        rows="3"
        resize="none"
        placeholder="善语结善缘，恶言伤人心~"
        maxlength="500"
        show-word-limit
        @keydown="textareaListener" />
      <div>
        <el-icon class="cursor-pointer" size="20"><EpPromotion /></el-icon>
        <Voice></Voice>
      </div>
    </div>
  </div>
</template>

<script setup>
import Expression from './components/expression/index.vue'
import Image from './components/image/index.vue'
import File from './components/file/index.vue'
import VoiceCall from './components/voice-call/index.vue'
import VideoCall from './components/video-call/index.vue'
import Voice from './components/voice/index.vue'

const refTextarea = ref()
const text = ref('')

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
  console.log(url);
}
const fileSelectHandle = (url) => {
  console.log(url);
}

const sendHandle = () => {}

/**
 * 监听textarea 键盘事件 取消回车换行 改为 shift+回车 换行
 */
const textareaListener = (e) => {
  if (e.keyCode === 13) {
    if (!e.shiftKey) {
      sendHandle()
      e.preventDefault()
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  padding: 10px 15px 10px 15px;
  .tools {
    color: var(--el-color-info-dark-2);
    .tool {
      margin-left: 10px;
    }
  }
  ::v-deep(.el-textarea__inner) {
    padding: 0;
    box-shadow: none;
    border: none
  }
}
</style>
