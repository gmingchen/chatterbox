<template>
  <Panel :image="user.avatar" :title="user.nickname" :list="list"></Panel>
</template>

<script setup>
import { dayjs } from 'element-plus'
import { sexList } from '@enums/user'

const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
})

const list = computed(() => {
  const { email, sex, lastAt, createdAt } = props.user

  const sexItem = sexList.find(item => item.value === sex)
  const duration = dayjs(new Date()).diff(dayjs(createdAt), 'day') + '天'
  return [
    { label: '邮箱', value: email || '-' },
    { label: '性别', value: sexItem ? sexItem.label : '-' },
    { label: '最后登录时间', value: lastAt || '-' },
    { label: '加入Chatterbox', value: duration || '-' },
  ]
})
</script>

<style lang="scss" scoped>
</style>
