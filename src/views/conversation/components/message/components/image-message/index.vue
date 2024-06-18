<template>
  <el-image class="image-message width-120 height-120" :src="image" :preview-src-list="[image]" fit="cover">
    <template #error>
      <div class="error-wrap height-full flex_j_c-center flex_a_i-center">
        <el-icon :size="50"><EpPicture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped>
.image-message {
  border-radius: var(--box-border-radius);
  .error-wrap {
    background-color: var(--card-hover-background-color); 
    color: var(--el-color-info-dark-2);
  }
}
</style>
