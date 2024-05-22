<template>
  <div class="tabbar">
    <div
      class="tabbar-item width-50 height-50 cursor-pointer flex_d-column flex_j_c-center flex_a_i-center"
      v-for="item in tabs" :key="item.value" :class="item.value === active ? 'active' : ''"
      @click="clickHandle(item)">
      <el-icon size="26">
        <component :is="item.icon"></component>
      </el-icon>
      <div class="margin_t-4">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { ChatDotRound, User, More, Bell } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const tabs = ref([
  { label: '会话', value: 'conversation', icon: markRaw(ChatDotRound) },
  { label: '好友', value: 'friend', icon: markRaw(User) },
  { label: '群组', value: 'group', icon: markRaw(More) },
  { label: '验证', value: 'verify', icon: markRaw(Bell) },
])

const active = computed(() => route.name)

const clickHandle = (item) => {
  const { value } = item
  router.push({ name: value })
}
</script>

<style lang="scss" scoped>
.tabbar {
  &-item {
    text-align: center;
    font-size: 12px;
    border-radius: var(--box-border-radius);
    &:hover {
      background-color: var(--item-hover-color)
    }
    &.active {
      color: var(--el-color-primary);
      background-color: var(--item-background-color);
    }
    & + & {
      margin-top: 10px;
    }
  }
}
</style>
