<template>
  <Card
    :image="avatar"
    :label="name"
    :content="message"
    :active="friend.id === active.id"
    :dotVisible="visible"
    @click="clickHandle()">
  </Card>
</template>

<script setup>
import { ONLINE_STATUS } from '@enums/user'
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

const visible = computed(() => props.friend.online === ONLINE_STATUS.ONLINE)

const groupingStore = useGroupingStore()
const active = computed({
  get: () => groupingStore.active || {},
  set: (value) => groupingStore.setActive(value)
})
const clickHandle = () => {
  active.value = props.friend
}
</script>

<style lang="scss" scoped>
</style>
