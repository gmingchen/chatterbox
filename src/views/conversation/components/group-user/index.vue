<template>
  <div class="group-user padding-5 cursor-pointer flex flex_a_i-center">
    <OnlineDot :visible="hidden">
      <Avatar :src="avatar" :name="name" :size="30" slice-length="2"></Avatar>
    </OnlineDot>
    <div class="flex-item_f-1 font-size-12 margin_l-10 ellipse">{{ name }}</div>
  </div>
</template>

<script setup>
import { ONLINE_STATUS } from '@enums/user'

const props = defineProps({
  avatar: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  online: {
    type: Number,
    default: () => 0
  }
})
const hidden = computed(() => props.online === ONLINE_STATUS.ONLINE)
</script>

<style lang="scss" scoped>
.group-user {
  border-radius: var(--box-border-radius);
  color: var(--el-color-info-dark-2);
  &:hover {
    background-color: var(--card-hover-background-color);
  }
  &:first-child {
    margin-top: 10px;
  }
}
</style>
