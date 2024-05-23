<template>
  <div class="card padding-10 cursor-pointer flex flex_a_i-center">
    <el-avatar :src="avatar"></el-avatar>
    <div class="flex-item_f-1 margin-n-10">
      <div class="name">{{ name }}</div>
      <div class="message margin_t-4 ellipse">{{ message }}</div>
    </div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: () => '',
  },
  time: {
    type: String,
    default: () => '',
  }
})
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);

  .message, .time {
    font-size: 12px;
    color: var(--el-color-info-dark-2);
  }
}
</style>
