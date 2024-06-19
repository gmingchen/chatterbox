<template>
  <div class="other">
    <el-divider>其它登录方式</el-divider>
    <div class="flex_j_c-space-around">
      <QQ></QQ>
    </div>
  </div>
</template>

<script setup>
import QQ from './qq/index.vue'

</script>

<style lang="scss" scoped>
.other {
  overflow: hidden;
  ::v-deep(.el-divider__text) {
    background-color: var(--wrap-background-color);
  }
}
</style>
