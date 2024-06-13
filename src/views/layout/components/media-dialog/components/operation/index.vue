<template>
  <div class="operation flex_j_c-space-around">
    <el-button type="danger" circle size="large" @click="closeHandle">
      <el-icon class="font-size-20"><EpClose /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
const mediaStore = useMediaStore()

const closeHandle = () => {
  mediaStore.cancel()
}
</script>

<style lang="scss" scoped>
.operation {
}
</style>
