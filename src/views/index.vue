<template>
  <div class="index-container">
    <div class="index-content">
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/sidebar/index.vue'
</script>

<style lang="scss" scoped>
.index {
  &-container {
    padding: 10vh 0;
  }
  &-content {
    margin: 0 auto;
    padding: 20px 20px 20px 0;
    width: 70vw;
    height: 80vh;
    min-height: 300px;
    min-width: 600px;
    background-color: var(--gl-background-color);
    border-radius: 12px;
    box-shadow: 0 11px 20px 0 rgba(0,0,0,.5);
  }
}
</style>
