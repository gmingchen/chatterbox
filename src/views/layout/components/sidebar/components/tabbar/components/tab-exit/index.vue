<template>
  <Tab label="退出" value="login" :before="exit">
    <EpSwitchButton></EpSwitchButton>
  </Tab>
</template>

<script setup>
import Tab from '../tab/index.vue'
const router = useRouter()
const authStore = useAuthStore()
const rootStore = useRootStore()
const exit = async () => {
  await authStore.logout()
  rootStore.clearData()
}
</script>

<style lang="scss" scoped>
</style>
