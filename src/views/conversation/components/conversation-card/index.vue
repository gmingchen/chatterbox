<template>
  <el-badge class="conversation-card width-full" :value="conversation.unread" :show-zero="false">
    <Card
      :image="avatar"
      :label="name"
      :content="message"
      :tips="time"
      :active="conversation.id === active.id"
      @click="clickHandle">
    </Card>
  </el-badge>
</template>

<script setup>
import { messageFormat, dateFormat } from '@utils'

const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },
})
const avatar = computed(() => {
  const { friend, group } = props.conversation
  if (friend) {
    return friend.avatar
  }
  if (group) {
    return group.avatar
  }
  return ''
})

const name = computed(() => {
  const { friend, group } = props.conversation
  if (friend) {
    return friend.nickname
  }
  if (group) {
    return group.name
  }
  return ''
})

const message = computed(() => {
  if (props.conversation.message) {
    const { nickname, type, text } = props.conversation.message
    return messageFormat(nickname, type, text)
  }
  return ''
})

const time = computed(() => {
  if (props.conversation.message) {
    const { createdAt } = props.conversation.message
    return dateFormat(createdAt)
  }
  return ''
})


const conversationStore = useConversationStore()
const active = computed({
  get: () => conversationStore.active || {},
  set: (value) => conversationStore.setActive(value)
})
const clickHandle = () => {
  active.value = props.conversation
}
</script>

<style lang="scss" scoped>
.conversation-card + .conversation-card {
  margin-top: 4px;
}
</style>
