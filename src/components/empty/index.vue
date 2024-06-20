<template>
  <el-empty class="empty height-full width-full" :class="absolute ? 'position-center' : ''" :image="Logo">
    <template v-if="icon">
      <el-image :src="Logo"></el-image>
      <el-icon class="cursor-pointer" size="160">
        <component :is="component"></component>
      </el-icon>
    </template>
    <template #description>
      <div class="margin_t-20" v-if="text">{{ text }}</div>
    </template>
  </el-empty>
</template>

<script setup>
import { VideoCamera } from '@element-plus/icons-vue'

import Logo from '@/assets/images/logo.png'

const props = defineProps({
  icon: {
    type: String,
    default: () => ''
  },
  text: {
    type: String,
    default: () => ''
  },
  absolute: {
    type: Boolean,
    default: () => false
  }
})

const component = computed(() => {
  if (props.icon === 'VideoCamera') {
    return VideoCamera
  }
  return null
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
