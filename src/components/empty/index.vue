<template>
  <el-empty class="empty height-full width-full" :class="absolute ? 'position-center' : ''" :image="Logo">
    <template #description>
      <div class="margin_t-20" v-if="text">{{ text }}</div>
    </template>
  </el-empty>
</template>

<script setup>
import { VideoCamera } from '@element-plus/icons-vue'

import Logo from '@/assets/images/logo.png'

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  absolute: {
    type: Boolean,
    default: () => false
  }
})
</script>

<style lang="scss" scoped>
.empty {
  padding: 0;
  ::v-deep(.el-empty__description) {
    margin: 0;
    color: var(--el-text-color-secondary);
    font-size: var(--el-font-size-base);
  }
  ::v-deep(.el-empty__image) {
    opacity: 0.5;
  }
}
</style>
