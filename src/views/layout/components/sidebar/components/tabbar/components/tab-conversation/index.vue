<template>
  <Tab label="会话" value="conversation">
    <el-badge :is-dot="hasUnread">
      <EpChatDotRound></EpChatDotRound>
    </el-badge>
  </Tab>
</template>

<script setup>
import Tab from '../tab/index.vue'

const conversationStore = useConversationStore()
const hasUnread = computed(() => conversationStore.hasUnread)
</script>

<style lang="scss" scoped>
</style>
