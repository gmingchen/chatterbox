<template>
  <el-avatar class="cursor-pointer" v-bind="$attrs" :size="size">
    {{ nameFormat }}
  </el-avatar>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: () => 50
  },
  sliceLength: {
    type: [Number, String],
    default: () => 3
  }
})

const nameFormat = computed(() => {
  const { name, sliceLength } = props
  if (name && name.length > +sliceLength) {
    return name.slice(0, +sliceLength)
  }
  return name
})

</script>

<style lang="scss" scoped>
</style>
