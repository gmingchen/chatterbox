<template>
  <el-image class="file-message width-120 height-120" :src="file" :preview-src-list="[file]">
    <template #error>
      <div class="error-wrap height-full flex_j_c-center flex_a_i-center">
        <el-icon :size="50"><EpDocument /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup>
defineProps({
  file: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped>
.file-message {
  border-radius: var(--box-border-radius);
  .error-wrap {
    background-color: var(--card-hover-background-color); 
    color: var(--el-color-info-dark-2);
  }
}
</style>
