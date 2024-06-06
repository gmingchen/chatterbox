<template>
  <Card :image="avatar" :label="name" :content="message"></Card>
</template>

<script setup>
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
