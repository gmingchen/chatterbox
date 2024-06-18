<template>
  <div class="user-box flex_d-column flex_j_c-center flex_a_i-center">
    <Avatar class="cursor-pointer" :src="avatar" :name="name" :size="80"></Avatar>
    <div class="margin_t-20 font-size-18">{{ name }}</div>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped>
.user-box {}
</style>
