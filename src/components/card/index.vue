<template>
  <div class="card padding-10 cursor-pointer flex flex_a_i-center">
    <el-badge :value="badge" :show-zero="false">
      <el-avatar :src="avatar"></el-avatar>
    </el-badge>
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
  },
  badge: {
    type: Number,
    default: () => 0
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
