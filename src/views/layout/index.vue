<template>
  <div class="layout flex-item_f-1">
    <div class="wrap height-full flex">
      <Sidebar></Sidebar>
      <Router class="flex-item_f-1" :keepalives="['Conversation', 'Friend', 'Group', 'Apply']"></Router>
    </div>
    <Websocket></Websocket>
    <MediaDialog></MediaDialog>
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar/index.vue'
import Websocket from './components/websocket/index.vue'
import MediaDialog from './components/media-dialog/index.vue'
</script>

<style lang="scss" scoped>
.layout {
  padding: 10vh 0;
  .wrap {
    padding: 20px 20px 20px 0;
    width: 80vw;
    margin: auto;
    background-color: var(--wrap-background-color);
    box-shadow: var(--el-box-shadow);
    border-radius: var(--el-border-radius-round);
  }
}
</style>
