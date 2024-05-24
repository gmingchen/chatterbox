<template>
  <Card :avatar="avatar" :name="name" :message="message" :time="time"></Card>
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
    return friend.name
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
</script>

<style lang="scss" scoped>
</style>
