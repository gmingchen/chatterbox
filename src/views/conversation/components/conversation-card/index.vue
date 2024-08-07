<template>
  <el-badge class="conversation-card width-full" :value="conversation.unread" :show-zero="false">
    <Card
      :image="avatar"
      :label="name"
      :content="message"
      :tips="time"
      :active="conversation.id === active.id"
      :dotVisible="visible"
      @click="clickHandle">
      <template #content>
        <div class="flex_a_i-center">
          <div class="flex-item_f-1 ellipse">{{ message }}</div>
          <MessageSendStatus :message="conversation.message" v-if="conversation.message"></MessageSendStatus>
        </div>
      </template>
    </Card>
  </el-badge>
</template>

<script setup>
import { ONLINE_STATUS } from '@enums/user'
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

const visible = computed(() => {
  const { friend } = props.conversation
  if (friend) {
    return friend.online === ONLINE_STATUS.ONLINE
  }
  return false
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
.conversation-card {
  ::v-deep(.el-badge__content.is-fixed){
    right: calc(100% - 40px - var(--el-badge-size));
    transform: translateY(20%)
  }
  & + & {
    margin-top: 4px;
  }
}
</style>
