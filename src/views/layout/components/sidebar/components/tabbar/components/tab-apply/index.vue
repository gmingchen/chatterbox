<template>
  <Tab label="验证" value="apply">
    <el-badge :value="count" :hidden="hidden" :max="max" :offset="[count > max ? -6 : 0, 0]">
      <EpChatDotRound></EpChatDotRound>
    </el-badge>
  </Tab>
</template>

<script setup>
import Tab from '../tab/index.vue'

const applyStore = useApplyStore()
const count = computed(() => applyStore.auditCount)
const hidden = computed(() => count.value <= 0)

const max = 9

onBeforeMount(() => {
  applyStore.getAuditCount()
})
</script>

<style lang="scss" scoped>
</style>
