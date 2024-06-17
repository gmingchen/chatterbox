<template>
  <el-popconfirm
    width="180"
    confirm-button-text="确认"
    cancel-button-text="取消"
    title="是否确认退出登录？"
    @confirm="exit">
    <template #reference>
      <Tab label="退出">
        <EpSwitchButton></EpSwitchButton>
      </Tab>
    </template>
  </el-popconfirm>
</template>

<script setup>
import Tab from '../tab/index.vue'
const router = useRouter()
const authStore = useAuthStore()
const rootStore = useRootStore()
const exit = async () => {
  await authStore.logout()
  rootStore.clearData()
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
</style>
