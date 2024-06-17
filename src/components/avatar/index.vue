<template>
  <el-avatar class="cursor-pointer" :src="avatar" :size="size">
    {{ nickname }}
  </el-avatar>
</template>

<script setup>

defineProps({
  size: {
    type: Number,
    default: () => 50
  }
})

const userStore = useUserStore()

const nickname = computed(() => userStore.nickname)
const avatar = computed(() => userStore.avatar)
</script>

<style lang="scss" scoped>
</style>
