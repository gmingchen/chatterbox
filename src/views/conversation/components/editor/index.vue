<template>
  <div class="editor  padding-15">
    <div class="tool flex">
      <el-icon class="icon cursor-pointer" size="20" v-for="(item, index) in tools" :key="index">
        <component :is="item.icon"></component>
      </el-icon>
    </div>
    <div class="margin_t-10">
      <el-input v-model="text" type="textarea" rows="2" resize="none" placeholder="善语结善缘，恶言伤人心~" />
    </div>
  </div>
</template>

<script setup>
import { PictureRounded, Picture, Folder, Mic, VideoCamera, Microphone, } from '@element-plus/icons-vue'

const tools = ref([
  { label: '', icon: PictureRounded },
  { label: '', icon: Picture },
  { label: '', icon: Folder },
  { label: '', icon: Mic },
  { label: '', icon: VideoCamera },
])

const text = ref('')
</script>

<style lang="scss" scoped>
.editor {
  padding: 10px 15px 10px 15px;
  // border-radius: var(--box-border-radius);
  // background-color: var(--wrap-background-color);
  .tool {
    color: var(--el-color-info-dark-2);
    .icon + .icon {
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
