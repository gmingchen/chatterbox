<template>
  <Card :avatar="avatar" :name="name" :message="message"></Card>
</template>

<script setup>
import { messageFormat, dateFormat } from '@utils'

const props = defineProps({
  friend: {
    type: Object,
    required: true,
  },
})

const avatar = computed(() => {
  const { avatar } = props.friend
  return avatar
})

const name = computed(() => {
  const { nickname, remark } = props.friend
  return remark || nickname 
})

const message = computed(() => {
  const { nickname, remark } = props.friend
  return remark ? nickname : ''
})
</script>

<style lang="scss" scoped>
</style>
