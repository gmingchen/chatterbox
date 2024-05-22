<template>
  <div class="layout flex-item_f-1">
    <div class="wrap height-full flex">
      <Sidebar></Sidebar>
      <Router class="flex-item_f-1"></Router>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar/index.vue'
</script>

<style lang="scss" scoped>
.layout {
  padding: 10vh 0;
  .wrap {
    width: 80vw;
    margin: auto;
    background-color: var(--wrap-background-color);
    box-shadow: var(--el-box-shadow);
    border-radius: var(--el-border-radius-round);
  }
}
</style>
