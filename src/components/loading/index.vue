<template>
  <div class="loading flex_a_i-center flex_j_c-center">
    <el-icon class="icon"><EpLoading /></el-icon>
    <span class="text margin_l-4" v-if="text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped>

.loading {
  color: var(--el-color-info-dark-2);
  .icon {
    animation: rotate 1s linear infinite;
  }
  .text {
    font-size: 12px;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      animation: dots 1s infinite steps(3, start);
    }
  }
}
</style>
