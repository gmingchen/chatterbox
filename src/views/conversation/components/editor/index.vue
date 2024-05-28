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
        class="flex-item_f-1"
        v-model="text"
        type="textarea"
        rows="3"
        resize="none"
        placeholder="善语结善缘，恶言伤人心~"
        maxlength="500"
        show-word-limit />
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

const text = ref('')

const expressionSelectHandle = (content) => {
  console.log(content);
}
const imageSelectHandle = (url) => {
  console.log(url);
}
const fileSelectHandle = (url) => {
  console.log(url);
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
