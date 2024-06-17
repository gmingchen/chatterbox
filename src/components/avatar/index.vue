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

const nickname = computed(() => {
  const name = userStore.nickname
  const length = 3
  if (name && name.length > length) {
    return name.slice(0, length)
  }
  return name
})
const avatar = computed(() => userStore.avatar)

</script>

<style lang="scss" scoped>
</style>
