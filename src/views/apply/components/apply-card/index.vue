<template>
  <el-badge class="apply-card width-full" :is-dot="hidden">
    <Card
      :image="image"
      :content="content"
      :label="label"
      :tips="tips"
      :active="apply.id === active.id"
      @click="clickHandle">
    </Card>
  </el-badge>
</template>

<script setup>
import { APPLY_STATUS, applyStatusList } from '@enums/apply'
import { dateFormat } from '@utils'

const props = defineProps({
  apply: {
    type: Object,
    default: () => {}
  }
})

const image = computed(() => {
  const { user } = props.apply
  if (user) {
    return user.avatar
  }
  return ''
})

const label = computed(() => {
  const { user } = props.apply
  if (user) {
    return user.nickname
  }
  return ''
})

const content = computed(() => {
  let result = '附加消息：'
  const { content, user } = props.apply
  if (user) {
    result += content || ''
  }
  return result
})

const tips = computed(() => {
  const { status, createdAt } = props.apply
  if (status === APPLY_STATUS.AUDIT) {
    return dateFormat(createdAt)
  } else {
    const statusItem = applyStatusList.find(item => item.value === status)
    return statusItem ? statusItem.label : '-'
  }
})

const hidden = computed(() => props.apply.status === APPLY_STATUS.AUDIT)

const applyStore = useApplyStore()
const active = computed({
  get: () => applyStore.active || {},
  set: (value) => applyStore.setActive(value)
})
const clickHandle = () => {
  active.value = props.apply
}
</script>

<style lang="scss" scoped>
.apply-card {
  ::v-deep(.el-badge__content.is-fixed){
    --margin: 4px;
    top: var(--margin);
    right: calc(8px - var(--margin));
    transform: translateY(20%)
  }
  & + & {
    margin-top: 4px;
  }
}
</style>
