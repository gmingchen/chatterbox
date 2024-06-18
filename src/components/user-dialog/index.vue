<template>
  <el-dialog
    class="user-dialog"
    v-model="visible"
    width="500"
    :close-on-click-modal="false"
    draggable
    append-to-body>
    <UserPanel :user="user || info"></UserPanel>
    <slot></slot>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
})
const visible = ref(false)

const info = ref({})

defineExpose({
  open: (data) => {
    visible.value = true
    info.value = data
  }
})
</script>

<style lang="scss" scoped>
.user-dialog {
}
</style>
