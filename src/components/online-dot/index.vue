<template>
  <div class="online-dot">
    <slot></slot>
    <div class="dot" v-show="visible"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => true
  }
})
</script>

<style lang="scss" scoped>
.online-dot {
  position: relative;
  .dot {
    --dot-size: 8px;
    position: absolute;
    height: var(--dot-size) !important;
    width: var(--dot-size) !important;
    background-color: var(--el-color-success);
    border-radius: 50%;
    bottom: calc(var(--dot-size) / 2);
    right: 0;
  }
}
</style>
