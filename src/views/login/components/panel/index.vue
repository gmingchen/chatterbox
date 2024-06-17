<template>
  <div class="panel padding-30">
    <Brand class="font-size-30 margin_b-20"></Brand>
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.panel {
  box-shadow: var(--el-box-shadow);
  border-radius: var(--el-border-radius-round);
  background-color: #272a37;
}
</style>
