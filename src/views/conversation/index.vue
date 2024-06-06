<template>
  <div class="conversation flex">
    <el-scrollbar class="width-280 padding-n-10">
      <ConversationCard v-for="item in list" :key="item.id" :conversation="item"></ConversationCard>
    </el-scrollbar>
    <MessagePanel class="flex-item_f-1"></MessagePanel>
    <GroupUserPanel class="margin_l-10 width-200" v-if="active.group"></GroupUserPanel>
  </div>
</template>

<script setup>
import ConversationCard from './components/conversation-card/index.vue'
import MessagePanel from './components/message-panel/index.vue'
import GroupUserPanel from './components/group-user-panel/index.vue'

defineOptions({
  name: 'Conversation'
})

const conversationStore = useConversationStore()
const active = computed({
  get: () => conversationStore.active || {},
  set: (value) => conversationStore.setActive(value)
})

const list = computed(() => conversationStore.list)

onBeforeMount(() => {
  conversationStore.getList()
})
</script>

<style lang="scss" scoped>
.conversation {
}
</style>
