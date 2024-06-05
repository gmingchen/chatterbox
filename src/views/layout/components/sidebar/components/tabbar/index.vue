<template>
  <div class="tabbar">
    <Conversation></Conversation>
    <Friend></Friend>
    <Group></Group>
    <Apply></Apply>
    <Exit></Exit>
  </div>
</template>

<script setup>
import Conversation from './components/tab-conversation/index.vue'
import Friend from './components/tab-friend/index.vue'
import Group from './components/tab-group/index.vue'
import Apply from './components/tab-apply/index.vue'
import Exit from './components/tab-exit/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
}
</style>
