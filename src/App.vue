<template>
  <el-config-provider :locale="locale" :size="size" :z-index="zIndex">
    <Router />
    <Filing class="filing"></Filing>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
const size = ref('default')
const zIndex = ref(3000)
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-primary);
}
</style>

<style lang="scss" scoped>
.filing {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
}
</style>
