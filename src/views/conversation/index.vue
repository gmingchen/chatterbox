<template>
  <div class="conversation flex">
    <el-scrollbar class="width-280 padding-n-10">
      <ConversationCard
        class="card"
        :class="item.id === active.id ? 'active' : '' "
        v-for="item in list"
        :key="item.id"
        :conversation="item"
        @click="clickHandle(item)">
      </ConversationCard>
    </el-scrollbar>
    <MessagePanel class="flex-item_f-1"></MessagePanel>
  </div>
</template>

<script setup>
import ConversationCard from './components/conversation-card/index.vue'
import MessagePanel from './components/message-panel/index.vue'

defineOptions({
  name: 'Conversation'
})

const conversationStore = useConversationStore()

const active = computed({
  get: () => conversationStore.active || {},
  set: (value) => conversationStore.active = value
})

const list = computed(() => conversationStore.list)

const clickHandle = (row) => {
  active.value = row
}

onBeforeMount(() => {
  conversationStore.getList()
})
</script>

<style lang="scss" scoped>
.conversation {
  .card.active, .card:hover {
    background-color: var(--card-hover-background-color);
  }
  .card + .card {
    margin-top: 4px;
  }
}
</style>
