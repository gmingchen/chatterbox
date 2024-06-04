<template>
  <div class="tabbar">
    <div
      class="tabbar-item width-50 height-50 cursor-pointer flex_d-column flex_j_c-center flex_a_i-center"
      v-for="item in tabs"
      :key="item.value"
      :class="item.value === active ? 'active' : ''"
      @click="clickHandle(item)">
      <el-badge :is-dot="item.value === 'conversation' && hasUnread">
        <el-icon size="26">
          <component :is="item.icon"></component>
        </el-icon>
      </el-badge>
      <div class="margin_t-4">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { ChatDotRound, User, More, Bell, SwitchButton } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const rootStore = useRootStore()
const conversationStore = useConversationStore()

const hasUnread = computed(() => conversationStore.hasUnread)

const tabs = ref([
  { label: '会话', value: 'conversation', icon: markRaw(ChatDotRound) },
  { label: '好友', value: 'friend', icon: markRaw(User) },
  { label: '群组', value: 'group', icon: markRaw(More) },
  { label: '验证', value: 'verify', icon: markRaw(Bell) },
  { label: '退出', value: 'login', icon: markRaw(SwitchButton) },
])

const active = computed(() => route.name)

const clickHandle = async (item) => {
  const { value } = item
  if (value === 'login') {
    await authStore.logout()
    rootStore.clearData()
  }
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
      background-color: var(--tabbar-hover-color)
    }
    &.active {
      color: var(--el-color-primary);
      background-color: var(--tabbar-background-color);
    }
    & + & {
      margin-top: 10px;
    }
    &:last-child {
      margin-top: 30px;
    }
  }
}
</style>
