<template>
  <Card class="width-150" :image="user.avatar" :label="user.nickname" :content="sexLabel" :dotVisible="visible"></Card>
</template>

<script setup>
import { sexList, ONLINE_STATUS } from '@enums/user'

const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
})

const sexLabel = computed(() => {
  const sexItem = sexList.find(item => item.value === props.user.sex)
  return sexItem ? sexItem.label : ''
})

const visible = computed(() => props.user.online === ONLINE_STATUS.ONLINE)
</script>

<style lang="scss" scoped>
.card {
  padding: 4px 10px;
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .sex {
    font-size: 12px;
    color: var(--el-color-info-dark-2);
  }
}
</style>
