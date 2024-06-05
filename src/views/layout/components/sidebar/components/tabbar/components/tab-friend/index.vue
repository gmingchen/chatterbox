<template>
  <Tab label="好友" value="friend" @click="router.push({ name: 'friend' })">
    <EpUser></EpUser>
  </Tab>
</template>

<script setup>
import Tab from '../tab/index.vue'
const router = useRouter()
</script>

<style lang="scss" scoped>
</style>
